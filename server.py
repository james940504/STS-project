"""Local Flask server for STS Web + Heavy analysis (Web v1)."""

from __future__ import annotations

import json
import logging
import math
import mimetypes
import os
import re
import shutil
import subprocess
import uuid
from datetime import datetime
from pathlib import Path
from typing import Any

import cv2
import pymysql
from flask import Flask, jsonify, request, send_from_directory, url_for, session
from werkzeug.security import generate_password_hash, check_password_hash
from ai_proxy import ai_bp
from analysis import AnalysisError, analyze_video_with_heavy



BASE_DIR = Path(__file__).resolve().parent
RECORDS_DIR = BASE_DIR / "records"
RECORDS_DIR.mkdir(parents=True, exist_ok=True)

app = Flask(__name__, static_folder=None)
app.config["MAX_CONTENT_LENGTH"] = 500 * 1024 * 1024
# Flask session cookie 簽章 key；正式部署請用 STS_SECRET_KEY 環境變數覆蓋。
app.secret_key = os.environ.get("STS_SECRET_KEY", "dev-secret-change-me")

# MySQL 連線設定。團隊可透過 STS_DB_* 環境變數使用各自的本機/部署資料庫。
DB_CONFIG = {
    "host": os.environ.get("STS_DB_HOST", "127.0.0.1"),
    "user": os.environ.get("STS_DB_USER", "root"),
    "password": os.environ.get("STS_DB_PASSWORD", "imnptu114"),
    "database": os.environ.get("STS_DB_NAME", "sts_game"),
    "charset": "utf8mb4",
    "cursorclass": pymysql.cursors.DictCursor,
}


def get_db():
    return pymysql.connect(**DB_CONFIG)


# ───────── 個人訓練歷史（每個帳號各自一份） ─────────
# 啟動後第一次用到歷史功能時自動建表（CREATE TABLE IF NOT EXISTS），不需要手動執行 SQL；
# 同樣的語法也寫在 STS.sql，方便在 Workbench 手動建立。
HISTORY_DDL = """
CREATE TABLE IF NOT EXISTS training_sessions (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  client_id VARCHAR(40) NOT NULL,
  played_at_ms BIGINT NOT NULL,
  mode VARCHAR(32) NULL,
  difficulty VARCHAR(16) NULL,
  result VARCHAR(16) NULL,
  score INT NULL,
  reps INT NULL,
  seconds FLOAT NULL,
  posture_total SMALLINT NULL,
  trunk_score SMALLINT NULL,
  heel_score SMALLINT NULL,
  knee_score SMALLINT NULL,
  metrics_json JSON NULL,
  record_session_id VARCHAR(64) NULL,
  heavy_json JSON NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_user_client (user_id, client_id),
  KEY idx_user_played (user_id, played_at_ms)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
"""
_history_table_ready = False
_CLIENT_ID_RE = re.compile(r"[A-Za-z0-9_-]{8,40}")


def _ensure_history_table() -> None:
    global _history_table_ready
    if _history_table_ready:
        return
    conn = get_db()
    try:
        with conn.cursor() as cur:
            cur.execute(HISTORY_DDL)
        conn.commit()
        _history_table_ready = True
    finally:
        conn.close()


def _json_safe(value: Any) -> Any:
    """NaN / Infinity 不是合法 JSON，MySQL JSON 欄位會拒收，一律換成 None。"""
    if isinstance(value, float):
        return value if math.isfinite(value) else None
    if isinstance(value, dict):
        return {str(k): _json_safe(v) for k, v in value.items()}
    if isinstance(value, (list, tuple)):
        return [_json_safe(v) for v in value]
    return value


def _opt_int(value: Any, lo: int | None = None, hi: int | None = None) -> int | None:
    try:
        number = float(value)
    except (TypeError, ValueError):
        return None
    if not math.isfinite(number):
        return None
    number = int(round(number))
    if lo is not None:
        number = max(lo, number)
    if hi is not None:
        number = min(hi, number)
    return number


def _opt_float(value: Any) -> float | None:
    try:
        number = float(value)
    except (TypeError, ValueError):
        return None
    return number if math.isfinite(number) else None


def _opt_text(value: Any, limit: int) -> str | None:
    if value is None:
        return None
    text = str(value).strip()
    return text[:limit] if text else None


def _json_load(value: Any) -> Any:
    if value is None or isinstance(value, (dict, list)):
        return value
    try:
        return json.loads(value)
    except (TypeError, ValueError):
        return None


def _history_row_to_entry(row: dict[str, Any]) -> dict[str, Any]:
    return {
        "id": row["client_id"],
        "at": int(row["played_at_ms"]),
        "mode": row["mode"],
        "diff": row["difficulty"],
        "result": row["result"],
        "score": row["score"] or 0,
        "reps": row["reps"] or 0,
        "seconds": float(row["seconds"] or 0),
        "posture": {
            "total": row["posture_total"],
            "trunk": row["trunk_score"],
            "heel": row["heel_score"],
            "knee": row["knee_score"],
        },
        "metrics": _json_load(row["metrics_json"]) or {},
        "sessionId": row["record_session_id"],
        "heavy": _json_load(row["heavy_json"]),
        "synced": True,
        "schema": 2,
    }


def _upsert_history_entry(cur, user_id: int, raw: dict[str, Any]) -> bool:
    """依 (user_id, client_id) 新增或更新一筆前端回報的訓練紀錄；不會動到 Heavy 欄位。"""
    client_id = str(raw.get("id") or "")
    if not _CLIENT_ID_RE.fullmatch(client_id):
        return False
    posture = raw.get("posture") if isinstance(raw.get("posture"), dict) else {}
    metrics = raw.get("metrics") if isinstance(raw.get("metrics"), dict) else {}
    played = _opt_int(raw.get("at"))
    if played is None:
        played = int(datetime.now().timestamp() * 1000)
    cur.execute(
        "INSERT INTO training_sessions "
        "(user_id, client_id, played_at_ms, mode, difficulty, result, score, reps, seconds, "
        " posture_total, trunk_score, heel_score, knee_score, metrics_json) "
        "VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) "
        "ON DUPLICATE KEY UPDATE played_at_ms=VALUES(played_at_ms), mode=VALUES(mode), "
        "difficulty=VALUES(difficulty), result=VALUES(result), score=VALUES(score), "
        "reps=VALUES(reps), seconds=VALUES(seconds), posture_total=VALUES(posture_total), "
        "trunk_score=VALUES(trunk_score), heel_score=VALUES(heel_score), "
        "knee_score=VALUES(knee_score), metrics_json=VALUES(metrics_json)",
        (
            user_id,
            client_id,
            played,
            _opt_text(raw.get("mode"), 32),
            _opt_text(raw.get("diff"), 16),
            _opt_text(raw.get("result"), 16),
            _opt_int(raw.get("score"), 0, 10_000_000),
            _opt_int(raw.get("reps"), 0, 100_000),
            _opt_float(raw.get("seconds")),
            _opt_int(posture.get("total"), 0, 100),
            _opt_int(posture.get("trunk"), 0, 100),
            _opt_int(posture.get("heel"), 0, 100),
            _opt_int(posture.get("knee"), 0, 100),
            json.dumps(_json_safe(metrics), ensure_ascii=False) if metrics else None,
        ),
    )
    return True

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("sts-server")

MODE_LABELS = {
    "classic": "通關模式",
    "infinite": "無限模式",
    "timed": "限時模式",
}
DIFFICULTY_LABELS = {
    "easy": "簡單",
    "normal": "普通",
    "hard": "困難",
}


def _safe_float(value: Any, default: float = 0.0) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


def _safe_int(value: Any, default: int = 0) -> int:
    try:
        return int(float(value))
    except (TypeError, ValueError):
        return default


def _new_session_id() -> str:
    stamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    return f"{stamp}_{uuid.uuid4().hex[:6]}"


def _video_extension(content_type: str, original_name: str) -> str:
    content_type = (content_type or "").lower()
    if "mp4" in content_type:
        return ".mp4"
    if "webm" in content_type:
        return ".webm"
    if "quicktime" in content_type:
        return ".mov"

    suffix = Path(original_name or "").suffix.lower()
    if suffix in {".webm", ".mp4", ".mov", ".mkv", ".avi"}:
        return suffix
    guessed = mimetypes.guess_extension(content_type) if content_type else None
    return guessed or ".webm"


def _inspect_video(video_path: Path) -> dict[str, float | int]:
    cap = cv2.VideoCapture(str(video_path))
    try:
        if not cap.isOpened():
            raise AnalysisError(f"OpenCV 無法開啟影片：{video_path.name}")
        fps = float(cap.get(cv2.CAP_PROP_FPS))
        frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0)
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH) or 0)
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT) or 0)
        ok, frame = cap.read()
        if not ok or frame is None or frame.size == 0:
            raise AnalysisError(f"影片沒有可讀取的第一幀：{video_path.name}")
        duration_sec = frame_count / fps if fps > 0 and frame_count > 0 else 0.0
        return {
            "fps": fps,
            "frame_count": frame_count,
            "width": width,
            "height": height,
            "duration_sec": duration_sec,
        }
    finally:
        cap.release()


def _prepare_analysis_video(
    raw_path: Path,
    session_dir: Path,
    session_id: str,
) -> tuple[Path, dict[str, float | int]]:
    """一律將瀏覽器影片正規化為固定 30 FPS H.264 MP4。"""

    ffmpeg = shutil.which("ffmpeg")
    if ffmpeg is None:
        raise AnalysisError(
            "系統找不到 FFmpeg。請先確認 PowerShell 執行 ffmpeg -version 能顯示版本。"
        )

    converted_path = session_dir / f"analysis_input_{session_id}.mp4"
    command = [
        ffmpeg,
        "-y",
        "-fflags",
        "+genpts",
        "-i",
        str(raw_path),
        "-map",
        "0:v:0",
        "-vf",
        "fps=30",
        "-fps_mode",
        "cfr",
        "-an",
        "-c:v",
        "libx264",
        "-preset",
        "veryfast",
        "-crf",
        "18",
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        "-avoid_negative_ts",
        "make_zero",
        str(converted_path),
    ]

    logger.info("Normalizing video with FFmpeg: %s", raw_path.name)
    completed = subprocess.run(
        command,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        timeout=600,
        check=False,
    )
    if completed.returncode != 0 or not converted_path.is_file():
        logger.error("FFmpeg conversion failed:\n%s", completed.stderr[-5000:])
        raise AnalysisError("FFmpeg 影片正規化失敗，請查看 server.py 終端機紀錄")

    info = _inspect_video(converted_path)
    fps = float(info["fps"])
    if not math.isfinite(fps) or not 29.0 <= fps <= 31.0:
        raise AnalysisError(f"FFmpeg 轉檔後 FPS 仍不正常：{fps}")
    if int(info["frame_count"]) <= 0:
        raise AnalysisError("FFmpeg 轉檔完成，但影片總影格數不正常")

    logger.info(
        "Normalized video: %s | fps=%.3f frames=%s duration=%.3fs",
        converted_path.name,
        fps,
        info["frame_count"],
        info["duration_sec"],
    )
    return converted_path, info


def _session_info_from_form() -> dict[str, Any]:
    mode_key = str(request.form.get("mode", ""))
    difficulty_key = str(request.form.get("difficulty", ""))
    return {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "mode_key": mode_key,
        "mode": MODE_LABELS.get(mode_key, mode_key),
        "difficulty_key": difficulty_key,
        "difficulty": DIFFICULTY_LABELS.get(difficulty_key, difficulty_key),
        "result": str(request.form.get("result", "")),
        "game_score": _safe_int(request.form.get("game_score")),
        "game_reps": _safe_int(request.form.get("game_reps")),
        "game_time": _safe_float(request.form.get("game_time")),
        "language": str(request.form.get("language", "zh-TW")),
        "calibration_integrated": False,
    }


@app.post("/api/register")
def api_register():
    data = request.get_json(silent=True) or {}
    username = (data.get("username") or "").strip()
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    if not username or not email or not password:
        return jsonify({"success": False, "message": "請填寫完整資料"}), 400
    if len(password) < 6:
        return jsonify({"success": False, "message": "密碼至少需要 6 個字元"}), 400

    password_hash = generate_password_hash(password)

    conn = get_db()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT id FROM users WHERE email=%s OR username=%s",
                (email, username),
            )
            if cur.fetchone():
                return jsonify({"success": False, "message": "帳號或信箱已被使用"}), 409

            cur.execute(
                "INSERT INTO users (username, email, password_hash, coins, starter_given) "
                "VALUES (%s, %s, %s, %s, %s)",
                (username, email, password_hash, 1000, True),
            )
            conn.commit()
            user_id = cur.lastrowid
    finally:
        conn.close()

    session["user_id"] = user_id
    return jsonify({
        "success": True,
        "user": {"id": user_id, "username": username, "email": email, "coins": 1000, "save": {}},
    })


@app.post("/api/login")
def api_login():
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    if not email or not password:
        return jsonify({"success": False, "message": "請輸入電子郵件與密碼"}), 400

    conn = get_db()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM users WHERE email=%s", (email,))
            user = cur.fetchone()
    finally:
        conn.close()

    if not user or not check_password_hash(user["password_hash"], password):
        return jsonify({"success": False, "message": "帳號或密碼錯誤"}), 401

    try:
        save = json.loads(user["save_data"]) if user["save_data"] else {}
    except (TypeError, ValueError):
        save = {}

    session["user_id"] = user["id"]
    return jsonify({
        "success": True,
        "user": {
            "id": user["id"],
            "username": user["username"],
            "email": user["email"],
            "coins": user["coins"],
            "save": save,
        },
    })


@app.post("/api/logout")
def api_logout():
    session.pop("user_id", None)
    return jsonify({"success": True})


@app.get("/api/me")
def api_me():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"success": False, "message": "未登入"}), 401

    conn = get_db()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT id, username, email, coins, save_data FROM users WHERE id=%s",
                (user_id,),
            )
            user = cur.fetchone()
    finally:
        conn.close()

    if not user:
        session.pop("user_id", None)
        return jsonify({"success": False, "message": "帳號不存在"}), 401

    try:
        save = json.loads(user["save_data"]) if user["save_data"] else {}
    except (TypeError, ValueError):
        save = {}

    return jsonify({
        "success": True,
        "user": {
            "id": user["id"],
            "username": user["username"],
            "email": user["email"],
            "coins": user["coins"],
            "save": save,
        },
    })


@app.post("/api/coins")
def api_update_coins():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"success": False, "message": "未登入"}), 401

    data = request.get_json(silent=True) or {}
    try:
        coins = int(data.get("coins"))
    except (TypeError, ValueError):
        return jsonify({"success": False, "message": "coins 必須是數字"}), 400

    conn = get_db()
    try:
        with conn.cursor() as cur:
            cur.execute("UPDATE users SET coins=%s WHERE id=%s", (coins, user_id))
            conn.commit()
    finally:
        conn.close()

    return jsonify({"success": True, "coins": coins})


@app.post("/api/save")
def api_save():
    """把整包本機存檔（金幣、擁有道具、任務、成就、簽到紀錄...）同步寫回資料庫，
    讓同一個帳號換裝置登入時可以還原完整進度。"""
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"success": False, "message": "未登入"}), 401

    data = request.get_json(silent=True) or {}
    save = data.get("save")
    if not isinstance(save, dict):
        return jsonify({"success": False, "message": "save 必須是物件"}), 400

    save_json = json.dumps(save, ensure_ascii=False)
    # coins 額外拉出來更新獨立欄位，方便之後做排行榜等查詢；save_data 裡也會留一份完整備份。
    try:
        coins = int(save.get("coins", 0))
    except (TypeError, ValueError):
        coins = 0

    conn = get_db()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "UPDATE users SET save_data=%s, coins=%s WHERE id=%s",
                (save_json, coins, user_id),
            )
            conn.commit()
    finally:
        conn.close()

    return jsonify({"success": True})


@app.get("/api/history")
def api_history_list():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"success": False, "message": "未登入"}), 401
    mode = _opt_text(request.args.get("mode"), 32)
    limit = _opt_int(request.args.get("limit"), 1, 1000) or 500
    try:
        _ensure_history_table()
        conn = get_db()
        try:
            with conn.cursor() as cur:
                if mode:
                    cur.execute(
                        "SELECT * FROM training_sessions WHERE user_id=%s AND mode=%s "
                        "ORDER BY played_at_ms DESC LIMIT %s",
                        (user_id, mode, limit),
                    )
                else:
                    cur.execute(
                        "SELECT * FROM training_sessions WHERE user_id=%s "
                        "ORDER BY played_at_ms DESC LIMIT %s",
                        (user_id, limit),
                    )
                rows = cur.fetchall()
        finally:
            conn.close()
    except Exception:
        logger.exception("讀取訓練歷史失敗")
        return jsonify({"success": False, "message": "讀取訓練歷史失敗"}), 500
    return jsonify({"success": True, "entries": [_history_row_to_entry(r) for r in rows]})


@app.post("/api/history")
def api_history_push():
    """前端把本機尚未同步的紀錄批次送上來（單筆或 {"entries": [...]} 皆可）。"""
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"success": False, "message": "未登入"}), 401
    data = request.get_json(silent=True) or {}
    entries = data.get("entries")
    if entries is None:
        entries = [data] if data else []
    if not isinstance(entries, list) or len(entries) > 200:
        return jsonify({"success": False, "message": "entries 格式不正確或一次超過 200 筆"}), 400
    saved_ids: list[str] = []
    try:
        _ensure_history_table()
        conn = get_db()
        try:
            with conn.cursor() as cur:
                for raw in entries:
                    if isinstance(raw, dict) and _upsert_history_entry(cur, int(user_id), raw):
                        saved_ids.append(str(raw.get("id")))
            conn.commit()
        finally:
            conn.close()
    except Exception:
        logger.exception("寫入訓練歷史失敗")
        return jsonify({"success": False, "message": "寫入訓練歷史失敗"}), 500
    return jsonify({"success": True, "saved": len(saved_ids), "saved_ids": saved_ids})


@app.delete("/api/history")
def api_history_clear():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"success": False, "message": "未登入"}), 401
    try:
        _ensure_history_table()
        conn = get_db()
        try:
            with conn.cursor() as cur:
                cur.execute("DELETE FROM training_sessions WHERE user_id=%s", (user_id,))
                deleted = cur.rowcount
            conn.commit()
        finally:
            conn.close()
    except Exception:
        logger.exception("清除訓練歷史失敗")
        return jsonify({"success": False, "message": "清除訓練歷史失敗"}), 500
    return jsonify({"success": True, "deleted": deleted})


@app.delete("/api/history/<client_id>")
def api_history_remove(client_id: str):
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"success": False, "message": "未登入"}), 401
    if not _CLIENT_ID_RE.fullmatch(client_id):
        return jsonify({"success": False, "message": "無效的紀錄 id"}), 400
    try:
        _ensure_history_table()
        conn = get_db()
        try:
            with conn.cursor() as cur:
                cur.execute(
                    "DELETE FROM training_sessions WHERE user_id=%s AND client_id=%s",
                    (user_id, client_id),
                )
                deleted = cur.rowcount
            conn.commit()
        finally:
            conn.close()
    except Exception:
        logger.exception("刪除訓練歷史失敗")
        return jsonify({"success": False, "message": "刪除訓練歷史失敗"}), 500
    return jsonify({"success": True, "deleted": deleted})


@app.get("/")
def index():
    return send_from_directory(BASE_DIR, "index.html")


@app.get("/index.html")
def index_html():
    return send_from_directory(BASE_DIR, "index.html")


@app.get("/STS_Home.html")
def sts_home():
    return send_from_directory(BASE_DIR, "STS_Home.html")


@app.get("/phone.html")
def phone_camera_page():
    return send_from_directory(BASE_DIR, "phone.html")


@app.get("/css/<path:filename>")
def css_file(filename: str):
    return send_from_directory(BASE_DIR / "css", filename)


@app.get("/js/<path:filename>")
def js_file(filename: str):
    return send_from_directory(BASE_DIR / "js", filename)

@app.get("/img/<path:filename>")
def img_file(filename: str):
    return send_from_directory(BASE_DIR / "img", filename)

@app.get("/api/health")
def health():
    return jsonify({
        "success": True,
        "message": "STS backend is running",
        "ffmpeg": shutil.which("ffmpeg"),
    })


@app.get("/records/<session_id>/<path:filename>")
def download_record(session_id: str, filename: str):
    if not re.fullmatch(r"[A-Za-z0-9_-]+", session_id):
        return jsonify({"success": False, "message": "無效的 session_id"}), 404
    session_dir = RECORDS_DIR / session_id
    if not session_dir.is_dir():
        return jsonify({"success": False, "message": "找不到分析資料"}), 404
    # 有記錄擁有者（user_id）的分析資料只有本人能看；舊資料沒有 user_id，維持原本可讀取。
    try:
        meta = json.loads((session_dir / f"session_{session_id}.json").read_text(encoding="utf-8"))
        owner = meta.get("user_id")
    except (OSError, ValueError):
        owner = None
    if owner is not None and session.get("user_id") != owner:
        return jsonify({"success": False, "message": "沒有權限查看這份分析資料"}), 403
    return send_from_directory(session_dir, filename, as_attachment=False)


def _attach_heavy_to_history(
    user_id: int, record_session_id: str, session_info: dict[str, Any], result: dict[str, Any]
) -> None:
    """把 Heavy 分析的正式分數與 AI 評語掛到這位使用者的歷史紀錄上。
    前端會在表單帶 history_client_id，讓它對上遊戲結束時前端寫的那一筆；
    沒帶（或格式不對）就用 srv_<session_id> 另建一筆，避免分析結果沒地方存。"""
    client_id = str(request.form.get("history_client_id", "")).strip()
    if not _CLIENT_ID_RE.fullmatch(client_id):
        client_id = f"srv_{record_session_id}"[:40]

    profile = result.get("posture_profile") or {}
    summary = result.get("summary") or {}
    ai_summary = result.get("ai_analysis_summary") or {}
    advice = result.get("posture_advice") or {}
    rep_records = result.get("rep_records") or []
    durations = [
        float(r.get("duration")) for r in rep_records
        if isinstance(r, dict) and _opt_float(r.get("duration")) is not None
    ]
    heavy = _json_safe({
        "reps": result.get("heavy_reps"),
        "overall_score": profile.get("overall_score"),
        "trunk_score": profile.get("trunk_score"),
        "heel_score": profile.get("heel_score"),
        "avg_max_trunk_deg": profile.get("avg_max_trunk"),
        "avg_max_heel_deg": profile.get("avg_max_heel"),
        "avg_rep_duration_sec": (sum(durations) / len(durations)) if durations else None,
        "consistency": ai_summary.get("consistency"),
        "trends": ai_summary.get("trends"),
        "pose_detection_rate_percent": summary.get("pose_detection_rate"),
        "advice": {
            "source": advice.get("source"),
            "title": advice.get("title"),
            "analysis": advice.get("analysis"),
            "tip": advice.get("tip"),
        },
    })
    _ensure_history_table()
    conn = get_db()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO training_sessions "
                "(user_id, client_id, played_at_ms, mode, difficulty, result, score, reps, seconds, "
                " record_session_id, heavy_json) "
                "VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) "
                "ON DUPLICATE KEY UPDATE record_session_id=VALUES(record_session_id), "
                "heavy_json=VALUES(heavy_json)",
                (
                    user_id,
                    client_id,
                    int(datetime.now().timestamp() * 1000),
                    _opt_text(session_info.get("mode_key"), 32),
                    _opt_text(session_info.get("difficulty_key"), 16),
                    _opt_text(session_info.get("result"), 16),
                    _opt_int(session_info.get("game_score"), 0, 10_000_000),
                    _opt_int(session_info.get("game_reps"), 0, 100_000),
                    _opt_float(session_info.get("game_time")),
                    record_session_id,
                    json.dumps(heavy, ensure_ascii=False),
                ),
            )
        conn.commit()
    finally:
        conn.close()


@app.post("/api/analyze")
def analyze_upload():
    video = request.files.get("video")
    if video is None or not video.filename:
        return jsonify({"success": False, "message": "沒有收到影片檔案"}), 400

    session_id = _new_session_id()
    session_dir = RECORDS_DIR / session_id
    session_dir.mkdir(parents=True, exist_ok=False)

    extension = _video_extension(video.mimetype, video.filename)
    raw_filename = f"raw_{session_id}{extension}"
    csv_filename = f"metrics_heavy_{session_id}.csv"
    pdf_filename = f"report_heavy_{session_id}.pdf"
    metadata_filename = f"session_{session_id}.json"

    raw_path = session_dir / raw_filename
    csv_path = session_dir / csv_filename
    pdf_path = session_dir / pdf_filename
    metadata_path = session_dir / metadata_filename

    session_info = _session_info_from_form()
    session_info.update({
        "session_id": session_id,
        "original_filename": video.filename,
        "content_type": video.mimetype,
        "stored_filename": raw_filename,
    })
    current_user_id = session.get("user_id")
    if current_user_id:
        session_info["user_id"] = current_user_id

    try:
        video.save(raw_path)
        if not raw_path.is_file() or raw_path.stat().st_size <= 0:
            raise AnalysisError("上傳影片為空檔案")

        analysis_video_path, normalized_info = _prepare_analysis_video(
            raw_path, session_dir, session_id
        )
        session_info["analysis_input_filename"] = analysis_video_path.name
        session_info["normalized_video_info"] = normalized_info
        metadata_path.write_text(
            json.dumps(session_info, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )

        result = analyze_video_with_heavy(
            raw_video_path=analysis_video_path,
            output_csv_path=csv_path,
            output_pdf_path=pdf_path,
            session_info=session_info,
        )

        if current_user_id:
            try:
                _attach_heavy_to_history(int(current_user_id), session_id, session_info, result)
            except Exception:
                logger.exception("Heavy 結果寫入個人歷史失敗（不影響分析回應）")

        return jsonify({
            "success": True,
            "message": "Heavy 分析完成",
            "session_id": session_id,
            "heavy_reps": result["heavy_reps"],
            "incomplete_reps": result["incomplete_reps"],
            "summary": result["summary"],
            "posture_profile": result.get("posture_profile", {}),
            "posture_advice": result.get("posture_advice", {}),
            "video_url": url_for(
                "download_record", session_id=session_id, filename=raw_filename
            ),
            "analysis_video_url": url_for(
                "download_record",
                session_id=session_id,
                filename=analysis_video_path.name,
            ),
            "csv_url": url_for(
                "download_record", session_id=session_id, filename=csv_filename
            ),
            "pdf_url": url_for(
                "download_record", session_id=session_id, filename=pdf_filename
            ),
        })

    except AnalysisError as exc:
        logger.exception("STS analysis failed for session %s", session_id)
        return jsonify({
            "success": False,
            "message": str(exc),
            "session_id": session_id,
            "video_url": url_for(
                "download_record", session_id=session_id, filename=raw_filename
            ) if raw_path.exists() else None,
        }), 422
    except Exception:
        logger.exception("Unexpected STS analysis error for session %s", session_id)
        return jsonify({
            "success": False,
            "message": "後端分析發生未預期錯誤，請查看 server.py 終端機紀錄",
            "session_id": session_id,
        }), 500


@app.errorhandler(413)
def upload_too_large(_error):
    return jsonify({"success": False, "message": "影片檔案太大，請縮短錄影時間"}), 413


if __name__ == "__main__":
    host = os.environ.get("STS_HOST", "127.0.0.1")
    port = int(os.environ.get("STS_PORT", "5000"))
    debug = os.environ.get("STS_DEBUG", "1") == "1"
    app.register_blueprint(ai_bp)
    from password_reset import register_password_reset
    register_password_reset(app, get_db)
    app.run(host=host, port=port, debug=debug, use_reloader=False)