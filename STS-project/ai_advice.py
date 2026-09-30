"""Heavy analysis posture-advice helper - Lightweight Rep Summary Version."""

from __future__ import annotations

import json
import logging
import os
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

DEFAULT_GEMINI_MODEL = "gemini-3.6-flash"

try:
    from google import genai
    from google.genai import types

    HAS_GENAI_SDK = True
except ImportError as _sdk_exc:
    HAS_GENAI_SDK = False
    print(f"[AI Advice][import] google-genai 匯入失敗：{_sdk_exc!r}", flush=True)

print(f"[AI Advice][import] HAS_GENAI_SDK={HAS_GENAI_SDK}", flush=True)


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

    return {"title": title, "analysis": analysis, "tip": tip, "source": "local"}


def _extract_rep_summary_table(file_path: Path) -> str:
    """從 Excel/CSV 擷取精簡的「次數/完成時間/動作時間/軀幹最大/腳跟最大/最高分數」文字表。"""
    try:
        if file_path.suffix.lower() == ".csv":
            df = pd.read_csv(file_path)
        else:
            df = pd.read_excel(file_path)

        if df.empty or "rep_heavy" not in df.columns:
            return ""

        lines = [
            "次數\t完成時間\t動作時間\t軀幹最大\t腳跟最大\t最高分數"
        ]

        # 依 rep_heavy 分組，排除準備期 (rep_heavy <= 0)
        grouped = df[df["rep_heavy"] > 0].groupby("rep_heavy")

        for rep_id, group in grouped:
            if len(group) < 3:  # 忽略雜訊極少幀
                continue

            # 計算完成時間與動作持續時間
            if "video_time_ms" in group.columns:
                end_time_sec = group["video_time_ms"].iloc[-1] / 1000.0
                start_time_sec = group["video_time_ms"].iloc[0] / 1000.0
                duration_sec = max(0.1, end_time_sec - start_time_sec)
            else:
                end_time_sec = group["frame_idx"].iloc[-1] / 30.0
                duration_sec = len(group) / 30.0

            trunk_max = (
                group["trunk_vert_heavy"].max()
                if "trunk_vert_heavy" in group.columns
                else 0.0
            )
            heel_max = (
                group["heel_angle_heavy"].max()
                if "heel_angle_heavy" in group.columns
                else 0.0
            )
            score_max = (
                group["score_heavy"].max()
                if "score_heavy" in group.columns
                else 0.0
            )

            lines.append(
                f"{int(rep_id)}\t{end_time_sec:.2f}s\t{duration_sec:.2f}s\t{trunk_max:.1f}°\t{heel_max:.1f}°\t{score_max:.1f}"
            )

        return "\n".join(lines)

    except Exception as exc:
        logger.warning(f"[AI Advice] 擷取 Rep 輕量摘要失敗 ({exc})")
        return ""


def _build_prompt(profile: dict[str, Any], rep_table_text: str) -> str:
    summary_section = (
        f"【各次起立動作明細表】\n{rep_table_text}"
        if rep_table_text
        else "【無明細數據，請僅參考總體數據】"
    )

    return f"""
你是專業的物理治療師與姿勢矯正教練。
請根據下方的坐站訓練統計數據進行專業分析。

【整體摘要】
- 完成次數：{int(profile.get('reps', 0) or 0)} 次
- 軀幹得分：{_safe_score(profile.get('trunk_score')):.1f}/100
- 足跟得分：{_safe_score(profile.get('heel_score')):.1f}/100
- 綜合得分：{_safe_score(profile.get('overall_score')):.1f}/100

{summary_section}

請針對「各次動作時間變長/變短」、「軀幹前傾角度變化」、「腳跟抬起幅度」與「得分穩定度」進行觀察，嚴格以 JSON 格式輸出：
{{
  "title": "簡短標題（10字內）",
  "analysis": "針對動作時間、軀幹角度與腳跟抬起的觀察評語（60-100字）",
  "tip": "具體的姿勢調整與動作發力建議（60-100字）"
}}
""".strip()


def generate_posture_advice(
    profile: dict[str, Any],
    excel_path: str | Path | None = None,
    **kwargs: Any,
) -> dict[str, str]:
    """擷取 Excel 摘要文字表傳送至 Gemini API。"""
    print("[AI Advice][call] generate_posture_advice() 被呼叫了", flush=True)

    fallback = local_posture_advice(profile)
    api_key = os.environ.get("GEMINI_API_KEY", "").strip()
    print(
        f"[AI Advice][call] api_key長度={len(api_key)} HAS_GENAI_SDK={HAS_GENAI_SDK} excel_path={excel_path}",
        flush=True,
    )

    if not api_key:
        print(
            "[AI Advice][call] 找不到 GEMINI_API_KEY（環境變數未設定或 .env 未被載入），改用本機規則。",
            flush=True,
        )
        return fallback

    if not HAS_GENAI_SDK:
        print(
            "[AI Advice][call] 尚未安裝 google-genai SDK（import google.genai 失敗），改用本機規則。",
            flush=True,
        )
        return fallback

    model_name = os.environ.get("GEMINI_MODEL", DEFAULT_GEMINI_MODEL).strip()
    file_path = Path(excel_path).resolve() if excel_path else None

    # 本地端提煉輕量化的文字表格
    rep_table_text = (
        _extract_rep_summary_table(file_path)
        if (file_path and file_path.is_file())
        else ""
    )

    try:
        client = genai.Client(api_key=api_key)
        prompt = _build_prompt(profile, rep_table_text)

        response = client.models.generate_content(
            model=model_name,
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json"
            ),
        )

        clean_text = (
            response.text.strip()
            .removeprefix("```json")
            .removesuffix("```")
            .strip()
        )
        data = json.loads(clean_text)

        return {
            "title": str(data.get("title", fallback["title"])),
            "analysis": str(data.get("analysis", fallback["analysis"])),
            "tip": str(data.get("tip", fallback["tip"])),
            "source": "gemini",
        }
    except Exception:
        import traceback

        print("[AI Advice][call] Gemini API 呼叫失敗，改用本機規則備援", flush=True)
        traceback.print_exc()

    return fallback