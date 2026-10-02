"""Heavy analysis posture-advice helper - OpenAI API + local fallback."""

from __future__ import annotations

import json
import logging
import os
import time
from pathlib import Path
from typing import Any

import pandas as pd

logger = logging.getLogger(__name__)

_ENV_PATH = Path(__file__).resolve().parent / ".env"

try:
    from dotenv import load_dotenv

    _env_loaded = load_dotenv(_ENV_PATH)
    print(
        f"[AI Advice][import] .env 路徑={_ENV_PATH} 是否存在={_ENV_PATH.is_file()} 是否成功載入={_env_loaded}",
        flush=True,
    )
except ImportError:
    print("[AI Advice][import] 尚未安裝 python-dotenv，無法自動載入 .env", flush=True)

DEFAULT_OPENAI_MODEL = "gpt-6-luna"

try:
    from openai import OpenAI

    HAS_OPENAI_SDK = True
except ImportError as _sdk_exc:
    HAS_OPENAI_SDK = False
    print(f"[AI Advice][import] openai SDK 匯入失敗：{_sdk_exc!r}", flush=True)

print(f"[AI Advice][import] HAS_OPENAI_SDK={HAS_OPENAI_SDK}", flush=True)


def _safe_score(value: Any) -> float:
    try:
        return max(0.0, min(100.0, float(value)))
    except (TypeError, ValueError):
        return 0.0


def local_posture_advice(profile: dict[str, Any]) -> dict[str, str]:
    """本機備援診斷邏輯。"""
    reps = int(profile.get("reps", 0) or 0)
    trunk_score = _safe_score(profile.get("trunk_score"))
    heel_score = _safe_score(profile.get("heel_score"))

    if reps <= 0:
        return {
            "title": "資料不足",
            "analysis": "尚未辨識到完整起立動作，目前無法可靠評估姿勢品質。",
            "tip": "請確認數據檔內容完整，並包含至少一次完整坐下到站立。",
            "limitations": "沒有完整起立動作，無法進行可靠的動作品質分析。",
            "safety_note": "本結果僅供訓練回饋參考，不作為疾病診斷、治療或醫療處置依據。",
            "source": "local",
        }

    trunk_bad = trunk_score < 50.0
    heel_bad = heel_score < 50.0

    if trunk_bad and heel_bad:
        title, analysis, tip = (
            "需要改善",
            "起立時軀幹前傾偏多，同時站立後的腳跟抬起幅度不足。",
            "起身時維持核心穩定並逐步伸展髖膝，站穩後再完整抬起腳跟。",
        )
    elif trunk_bad:
        title, analysis, tip = (
            "注意軀幹控制",
            "起立過程軀幹前傾較明顯，可能過度使用上半身或代償發力。",
            "起身時收緊核心、胸口保持向前上方，由臀腿主動完成站立。",
        )
    elif heel_bad:
        title, analysis, tip = (
            "注意腳跟伸展",
            "坐站動作整體穩定，但站立後的腳跟抬起幅度仍有提升空間。",
            "站穩後再將腳跟抬高，維持短暫穩定後再放下。",
        )
    else:
        title, analysis, tip = (
            "表現良好",
            "軀幹控制與站立後腳跟伸展皆維持在良好範圍。",
            "維持目前動作穩定度，可嘗試增加訓練次數。",
        )

    return {
        "title": title,
        "analysis": analysis,
        "tip": tip,
        "limitations": "本機備援僅依整體軀幹與足跟分數提供基本回饋，未進行完整時間序列語意分析。",
        "safety_note": "本結果僅供訓練回饋參考；若出現疼痛、暈眩、明顯不穩或近期受傷，應停止訓練並諮詢合格醫療或復健專業人員。",
        "source": "local",
    }


# 單次請求大小保護：OpenAI 有每分鐘 token 上限（TPM），單次請求超過會直接 429 "Request too large"，重試無用。
# 縮短後的數字約 0.61 token/字元，22 萬字元 ≈ 13.5 萬 token，留空間給 prompt 與輸出。
MAX_CSV_CHARS = 220_000
# 錄影不超過這個秒數 → 保留每一幀（只視大小縮短小數）；超過才每隔幾幀取一筆。
MAX_FULL_SERIES_SEC = 70.0


def _round_number_text(value: str, decimals: int) -> str:
    """只縮短帶小數點的數字字串；True/False、空白、文字一律原樣保留。"""
    if "." not in value:
        return value
    try:
        number = float(value)
    except ValueError:
        return value
    if number != number or number in (float("inf"), float("-inf")):
        return value
    text = f"{number:.{decimals}f}"
    if "." in text:
        text = text.rstrip("0").rstrip(".")
    return "0" if text in ("-0", "") else text


def _csv_duration_sec(header: list[str], rows: list[list[str]]) -> float:
    """用最後一列的 video_time_ms 估錄影秒數；欄位不存在時用 30fps 推估。"""
    try:
        idx = header.index("video_time_ms")
        return float(rows[-1][idx]) / 1000.0
    except (ValueError, IndexError):
        return len(rows) / 30.0


def _compact_csv_text(raw_text: str) -> str:
    """盡量保留完整時間序列：
    1. 錄影 <= MAX_FULL_SERIES_SEC：保留全部列、全部欄，只在過大時縮短小數（2 → 1 → 0 位）。
    2. 錄影更長：改成每隔幾幀取一筆（stage / rep 有變化的那一列一定保留），再縮短小數。
    無論如何都會壓到 MAX_CSV_CHARS 以內，不會超標還照送。"""
    import csv
    import io

    parsed = list(csv.reader(io.StringIO(raw_text)))
    if len(parsed) < 2:
        return raw_text
    header, rows = parsed[0], parsed[1:]
    duration = _csv_duration_sec(header, rows)

    def col(name: str) -> int | None:
        return header.index(name) if name in header else None

    key_cols = [i for i in (col("stage_heavy"), col("rep_heavy")) if i is not None]

    def pick(step: int) -> list[list[str]]:
        if step <= 1:
            return rows
        kept: list[list[str]] = []
        prev: list[str] | None = None
        for i, row in enumerate(rows):
            changed = prev is not None and any(
                j < len(row) and j < len(prev) and row[j] != prev[j] for j in key_cols
            )
            if i % step == 0 or changed:
                kept.append(row)
            prev = row
        return kept

    first_step = 1 if duration <= MAX_FULL_SERIES_SEC else 2
    result, used_step, used_dec, used_rows = raw_text, 1, 2, rows
    done = False
    for step in [first_step] + [s for s in (2, 3, 4, 6, 8, 12, 20, 30) if s > first_step]:
        chosen = pick(step)
        for decimals in (2, 1, 0):
            out = io.StringIO()
            writer = csv.writer(out, lineterminator="\n")
            writer.writerow(header)
            for row in chosen:
                writer.writerow([_round_number_text(v, decimals) for v in row])
            result = out.getvalue()
            used_step, used_dec, used_rows = step, decimals, chosen
            if len(result) <= MAX_CSV_CHARS:
                done = True
                break
        if done:
            break

    if used_step > 1:
        note = (
            f"# 註：錄影約 {duration:.0f} 秒，為控制資料量，時間序列每 {used_step} 幀取 1 筆"
            f"（stage / rep 變化的列一定保留），共 {len(used_rows)}/{len(rows)} 列；"
            "數值已縮短小數位數。\n"
        )
        result = note + result
    print(
        f"[AI Advice][payload] 錄影約 {duration:.0f} 秒；CSV 保留 {len(used_rows)}/{len(rows)} 列"
        f"（每 {used_step} 幀取 1 筆，小數 {used_dec} 位）；字元數 {len(raw_text)} -> {len(result)}",
        flush=True,
    )
    return result


def _read_complete_csv_text(file_path: Path) -> str:
    """讀取完整 Heavy CSV/Excel，保留每一列時間序列作為 AI 的過程證據（僅縮短小數位數）。"""
    try:
        if file_path.suffix.lower() == ".csv":
            return _compact_csv_text(file_path.read_text(encoding="utf-8-sig", errors="replace"))

        df = pd.read_excel(file_path)
        return _compact_csv_text(df.to_csv(index=False))
    except Exception as exc:
        logger.warning("[AI Advice] 讀取完整 CSV/Excel 失敗 (%s)", exc)
        return ""


def _build_prompt(
    profile: dict[str, Any],
    analysis_summary: dict[str, Any] | None,
    rep_records: list[dict[str, Any]] | None,
    csv_text: str,
) -> str:
    authoritative = analysis_summary or {
        "overall": profile,
        "reps": rep_records or [],
    }

    authoritative_json = json.dumps(
        authoritative,
        ensure_ascii=False,
        separators=(",", ":"),
    )

    csv_section = csv_text if csv_text else "（未提供 CSV 時間序列）"

    return f"""
你是「坐站（Sit-to-Stand, STS）訓練回饋助手」，不是醫師，也不是診斷系統。
你的任務是把已由 Python / Heavy 模型計算的數據轉成清楚、保守、可執行的訓練回饋。

【最高優先規則】
1. Python 摘要中的分數、平均、最大值、標準差、前後半段差異與完成次數是「權威數值」。不得自行重算後覆寫，也不得自行改變評分門檻。
2. 完整 CSV 只用來追蹤時間序列、動作先後、某一次 rep 或某一 stage 何時出現變化，以及確認 Python 摘要所描述的趨勢是否有過程證據。
3. 若 Python 摘要與 CSV 看似不一致，請在 limitations 指出「資料存在不一致，需人工複核」，不可自行選一方並宣稱為真。
4. 只能描述觀察到的動作表現，例如「後半段軀幹前傾增加」、「各次完成時間差異較大」。
5. 禁止診斷或暗示疾病、受傷、肌肉失憶、神經問題、關節病變、跌倒風險等醫療結論；也不得宣稱某個數值代表特定疾病。
6. 不得把相關性寫成因果。若資料只支持「可能」，必須使用「可能、可觀察到、建議留意」等保守語句。
7. 不得推測疼痛、疲勞、頭暈、肌力不足、心理狀態或使用者沒有提供的症狀。若想提及，只能寫成需要另外確認的可能因素，不能當成結論。
8. 建議限於低風險的動作練習原則：速度控制、動作穩定、適度休息、保持支撐環境、依既定訓練方式改善；不可給藥物、治療處方或高風險運動處置。
9. 若資料品質 warning 不為空、有效姿勢比例偏低、或完整 reps 太少，必須降低語氣確定度並寫入 limitations。
10. 若出現疼痛、暈眩、明顯失衡、呼吸不適或近期受傷，安全提醒應建議停止訓練並尋求合格醫療或復健專業人員評估。

【分析順序】
A. 先用 Python 摘要確認整體表現與資料品質。
B. 比較每一次 rep 的 duration、max_trunk、max_heel、score 與前後半段趨勢。
C. 再查看 CSV 時間序列，說明主要變化出現在哪些 rep / stage / 時間附近。
D. 最多挑 2~3 個最有證據、最值得改善的重點，不要把每個數字都寫成問題。
E. 建議必須與觀察到的數據直接對應；沒有證據就不要寫。

【Python 權威摘要 JSON】
{authoritative_json}

【完整 Heavy CSV 時間序列】
{csv_section}

只輸出一個 JSON object，不要 Markdown，不要額外說明：
{{
  "title": "10字內的中性標題，不使用疾病或恐嚇性詞彙",
  "analysis": "120-220字。說明整體表現、1~3個最重要的趨勢，至少引用具體 rep 或數值依據；不能醫療診斷。",
  "tip": "80-160字。提供2~3項低風險、可執行且直接對應數據的訓練建議。",
  "limitations": "30-100字。說明資料品質、資料不足或模型無法判斷的項目；若無重大限制也要說明本分析僅依影片姿勢資料。",
  "safety_note": "30-100字。健康照護安全提醒，不恐嚇、不診斷。"
}}
""".strip()


def _is_non_retryable_openai_error(error_text: str) -> bool:
    """401/403/多數 400 類錯誤重試通常沒有幫助。"""
    upper = error_text.upper()
    return any(
        token in upper
        for token in (
            "401",
            "403",
            "INVALID_API_KEY",
            "AUTHENTICATION",
            "PERMISSION_DENIED",
            "INSUFFICIENT_QUOTA",
            "BILLING_HARD_LIMIT_REACHED",
            "REQUEST TOO LARGE",   # 單次請求本身超過 TPM 上限，等再久也一樣
            "MODEL_NOT_FOUND",
        )
    )


def generate_posture_advice(
    profile: dict[str, Any],
    excel_path: str | Path | None = None,
    analysis_summary: dict[str, Any] | None = None,
    rep_records: list[dict[str, Any]] | None = None,
    **kwargs: Any,
) -> dict[str, str]:
    """將 Heavy 摘要送至 OpenAI API；失敗時回退到本機規則。"""
    print("[AI Advice][call] generate_posture_advice() 被呼叫了", flush=True)

    fallback = local_posture_advice(profile)
    api_key = os.environ.get("OPENAI_API_KEY", "").strip()

    print(
        f"[AI Advice][call] OPENAI_API_KEY長度={len(api_key)} HAS_OPENAI_SDK={HAS_OPENAI_SDK} excel_path={excel_path}",
        flush=True,
    )

    if not api_key:
        print(
            "[AI Advice][call] 找不到 OPENAI_API_KEY，改用本機規則備援。",
            flush=True,
        )
        return fallback

    if not HAS_OPENAI_SDK:
        print(
            "[AI Advice][call] 尚未安裝 openai SDK，改用本機規則備援。",
            flush=True,
        )
        return fallback

    model_name = os.environ.get("OPENAI_MODEL", DEFAULT_OPENAI_MODEL).strip()
    file_path = Path(excel_path).resolve() if excel_path else None

    csv_text = (
        _read_complete_csv_text(file_path)
        if (file_path and file_path.is_file())
        else ""
    )

    print(
        f"[AI Advice][payload] Python摘要={'有' if analysis_summary else '無'} "
        f"rep_records={len(rep_records or [])} CSV字元數={len(csv_text)}",
        flush=True,
    )

    prompt = _build_prompt(
        profile,
        analysis_summary=analysis_summary,
        rep_records=rep_records,
        csv_text=csv_text,
    )
    client = OpenAI(api_key=api_key)

    response = None
    last_error: Exception | None = None

    for attempt in range(1, 10):
        try:
            print(
                f"[AI Advice][call] OpenAI 第 {attempt}/10 次嘗試，model={model_name}",
                flush=True,
            )

            response = client.responses.create(
                model=model_name,
                input=prompt,
            )

            print(
                f"[AI Advice][call] OpenAI 第 {attempt}/10 次成功",
                flush=True,
            )
            break

        except Exception as exc:
            last_error = exc
            error_text = str(exc)

            print(f"[AI Advice][retry] 第 {attempt}/10 次失敗", flush=True)
            print(f"[AI Advice][retry] type={type(exc).__name__}", flush=True)
            print(f"[AI Advice][retry] message={error_text}", flush=True)

            if _is_non_retryable_openai_error(error_text):
                print(
                    "[AI Advice][retry] 判定為驗證/權限/額度類錯誤，不再重試。",
                    flush=True,
                )
                break

            if attempt < 10:
                wait_seconds = 4
                print(
                    f"[AI Advice][retry] 等待 {wait_seconds} 秒後再試",
                    flush=True,
                )
                time.sleep(wait_seconds)

    if response is None:
        print(
            "[AI Advice][call] OpenAI 多次嘗試仍失敗，改用本機規則備援",
            flush=True,
        )
        if last_error is not None:
            print(
                f"[AI Advice][fallback] 最後錯誤={type(last_error).__name__}: {last_error}",
                flush=True,
            )
        return fallback

    try:
        raw_text = (response.output_text or "").strip()
        clean_text = (
            raw_text.removeprefix("```json")
            .removeprefix("```")
            .removesuffix("```")
            .strip()
        )
        data = json.loads(clean_text)

        result = {
            "title": str(data.get("title", fallback["title"])),
            "analysis": str(data.get("analysis", fallback["analysis"])),
            "tip": str(data.get("tip", fallback["tip"])),
            "limitations": str(data.get("limitations", fallback.get("limitations", ""))),
            "safety_note": str(data.get("safety_note", fallback.get("safety_note", ""))),
            "source": "openai",
        }

        print(
            "[AI Advice][call] OpenAI 建議解析完成，source=openai",
            flush=True,
        )
        return result

    except Exception as exc:
        print(
            "[AI Advice][parse] OpenAI 有回應，但 JSON 解析失敗，改用本機規則備援",
            flush=True,
        )
        print(f"[AI Advice][parse] type={type(exc).__name__}", flush=True)
        print(f"[AI Advice][parse] message={exc}", flush=True)
        print(
            f"[AI Advice][parse] raw_response={getattr(response, 'output_text', '')!r}",
            flush=True,
        )
        return fallback


if __name__ == "__main__":
    # 直接執行 `python ai_advice.py` 時使用的小測試。
    # server.py import 本檔時不會執行這一段。
    test_profile = {
        "reps": 6,
        "trunk_score": 30.0,
        "heel_score": 80.0,
        "overall_score": 55.0,
        "avg_max_trunk": 35.0,
        "avg_max_heel": 30.0,
    }

    test_summary = {
        "overall": test_profile,
        "consistency": {
            "duration_std_sec": 0.18,
            "trunk_max_std_deg": 3.2,
            "heel_max_std_deg": 2.8,
            "overall_score_std": 4.5,
        },
        "trends": {
            "duration": {"first_half_avg": 2.1, "second_half_avg": 2.5, "change": 0.4},
            "trunk_max": {"first_half_avg": 31.0, "second_half_avg": 37.0, "change": 6.0},
            "heel_max": {"first_half_avg": 32.0, "second_half_avg": 29.0, "change": -3.0},
        },
        "data_quality": {
            "pose_detection_rate_percent": 96.0,
            "quality_warning": "",
        },
        "reps": [],
    }

    test_result = generate_posture_advice(
        test_profile,
        analysis_summary=test_summary,
    )

    print("測試結果：", flush=True)
    print(test_result, flush=True)
