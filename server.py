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
from flask import Flask, jsonify, request, send_from_directory, url_for

from analysis import AnalysisError, analyze_video_with_heavy


BASE_DIR = Path(__file__).resolve().parent
RECORDS_DIR = BASE_DIR / "records"
RECORDS_DIR.mkdir(parents=True, exist_ok=True)

app = Flask(__name__, static_folder=None)
app.config["MAX_CONTENT_LENGTH"] = 500 * 1024 * 1024

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
    return send_from_directory(session_dir, filename, as_attachment=False)


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
    app.run(host=host, port=port, debug=debug, use_reloader=False)