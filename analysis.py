"""STS Heavy 離線分析（Web v1）。

本版本以 week15.py 的核心流程為基礎：
- Heavy 模型重新辨識整部影片；
- 最近 5 幀 Moving Average；
- 沿用原本 sts_state 9/0/1/2/3 與 down/down1/down2/up；
- 沿用原本 trunk / heel 評分；
- 暫不加入校正流程，先使用 week15.py 的預設門檻。

Web 端新增的必要處理：
- 只接受可信 FPS 的分析影片（server.py 會先用 FFmpeg 正規化為 30 FPS MP4）；
- 記錄 landmarks、visibility、連續失敗等診斷欄位；
- 側面影片採用較可靠單側，避免遠側 landmark 污染左右中點；
- 保留 raw 與平滑後角度，方便比較。
"""

from __future__ import annotations

import csv
import math
from collections import deque
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Iterable

import cv2
import numpy as np

from ai_advice import generate_posture_advice


BASE_DIR = Path(__file__).resolve().parent
DEFAULT_HEAVY_MODEL_PATH = BASE_DIR / "pose_landmarker_heavy.task"

# ===== week15.py 原本的核心設定（校正功能暫緩） =====
SMOOTH_N = 5
DOWN_HIP_THRESHOLD = 110.0
SIT_KNEE_THRESHOLD = 120.0
STAND_KNEE_THRESHOLD = 160.0
TRUNK_DELTA_THRESHOLD = 5.0
HIP_RISE_DELTA_PX = 20.0
HIP_STABLE_DELTA_PX = 3.0
HEEL_TARGET_THRESHOLD = 20.0

# 側面影片的可見度基本門檻。這不是醫療門檻，只是 landmark 品質篩選。
LANDMARK_VISIBILITY_THRESHOLD = 0.25
SIDE_SWITCH_MARGIN = 0.10
MISSING_RESET_FRAMES = 5

TRUNK_RED_TH = 50.0
HEEL_RED_TH = 20.0


class AnalysisError(RuntimeError):
    """影片或分析結果無法安全使用時拋出。"""


def _safe_float(value: Any, default: float = 0.0) -> float:
    try:
        if value is None or value == "":
            return default
        return float(value)
    except (TypeError, ValueError):
        return default


def _mean(values: Iterable[float]) -> float:
    items = list(values)
    return float(sum(items) / len(items)) if items else 0.0


def _maximum(values: Iterable[float]) -> float:
    items = list(values)
    return float(max(items)) if items else 0.0


def _minimum(values: Iterable[float]) -> float:
    items = list(values)
    return float(min(items)) if items else 0.0


def _to_pixel(x_norm: float, y_norm: float, width: int, height: int) -> tuple[float, float]:
    x = min(max(float(x_norm), 0.0), 1.0)
    y = min(max(float(y_norm), 0.0), 1.0)
    return x * width, y * height


def _angle_relative_horizontal(dx: float, dy: float) -> float:
    return float(math.degrees(math.atan2(abs(dy), max(abs(dx), 1e-6))))


def _calculate_angle(
    a: tuple[float, float],
    b: tuple[float, float],
    c: tuple[float, float],
) -> float:
    a_np = np.asarray(a, dtype=float)
    b_np = np.asarray(b, dtype=float)
    c_np = np.asarray(c, dtype=float)

    ba = a_np - b_np
    bc = c_np - b_np
    norm_ba = float(np.linalg.norm(ba))
    norm_bc = float(np.linalg.norm(bc))
    if norm_ba <= 1e-9 or norm_bc <= 1e-9:
        return 0.0

    cos_theta = float(np.dot(ba, bc) / (norm_ba * norm_bc))
    cos_theta = float(np.clip(cos_theta, -1.0, 1.0))
    return float(np.degrees(np.arccos(cos_theta)))


def _visibility(landmark: Any) -> float:
    value = getattr(landmark, "visibility", 1.0)
    try:
        number = float(value)
    except (TypeError, ValueError):
        return 0.0
    return number if math.isfinite(number) else 0.0


def _trunk_score_calculate(trunk_max: float) -> float:
    """保留原本的軀幹評分公式。"""
    if trunk_max <= 15:
        return 100.0
    if trunk_max >= 35:
        return 30.0
    return float(30 + (35 - trunk_max) * (69 / 19))


def _heel_score_calculate(heel_max: float) -> float:
    """保留原本的足跟評分邏輯。"""
    if heel_max >= 35:
        return 100.0
    elif 15 < heel_max < 35:
        return float(30 + abs((heel_max - 15) * (68 / 19)))
    else:
        return 30.0


class MovingAverageFilter:
    """平均濾波器，為最近 5 幀平均。"""

    def __init__(self, size: int = SMOOTH_N) -> None:
        self.hip_y = deque(maxlen=size)
        self.hip = deque(maxlen=size)
        self.knee = deque(maxlen=size)
        self.trunk = deque(maxlen=size)
        self.heel = deque(maxlen=size)

    @staticmethod
    def _smooth(value: float, buffer: deque[float]) -> float:
        buffer.append(float(value))
        return float(sum(buffer) / len(buffer))

    def apply(self, raw: dict[str, float | str]) -> dict[str, float | str]:
        heel_raw = float(raw["heel_angle"])
        return {
            **raw,
            "hip_y": self._smooth(float(raw["hip_y"]), self.hip_y),
            "hip_angle": self._smooth(float(raw["hip_angle"]), self.hip),
            "knee_angle": self._smooth(float(raw["knee_angle"]), self.knee),
            "trunk_vert": self._smooth(float(raw["trunk_vert"]), self.trunk),
            # heel 若本幀無效，不把 NaN 放入平均；沿用當前 buffer 平均。
            "heel_angle": (
                self._smooth(heel_raw, self.heel)
                if math.isfinite(heel_raw)
                else (_mean(self.heel) if self.heel else math.nan)
            ),
        }

    def reset(self) -> None:
        self.hip_y.clear()
        self.hip.clear()
        self.knee.clear()
        self.trunk.clear()
        self.heel.clear()


class SideSelector:
    """側面影片選擇較可靠的一側，避免每幀左右亂跳。"""

    def __init__(self) -> None:
        self.current_side: str | None = None

    def choose(self, left_score: float, right_score: float) -> str | None:
        left_ok = left_score >= LANDMARK_VISIBILITY_THRESHOLD
        right_ok = right_score >= LANDMARK_VISIBILITY_THRESHOLD
        if not left_ok and not right_ok:
            return None
        if left_ok and not right_ok:
            self.current_side = "left"
            return self.current_side
        if right_ok and not left_ok:
            self.current_side = "right"
            return self.current_side

        # 兩側都能用時，除非另一側明顯更好，否則沿用上一側，避免切換抖動。
        if self.current_side == "left" and left_score + SIDE_SWITCH_MARGIN >= right_score:
            return "left"
        if self.current_side == "right" and right_score + SIDE_SWITCH_MARGIN >= left_score:
            return "right"

        self.current_side = "left" if left_score >= right_score else "right"
        return self.current_side


def _side_min_visibility(landmarks: list[Any], indices: tuple[int, ...]) -> float:
    if any(index >= len(landmarks) for index in indices):
        return 0.0
    return min(_visibility(landmarks[index]) for index in indices)


def extract_pose_metrics(
    landmarks: list[Any],
    width: int,
    height: int,
    selector: SideSelector,
) -> dict[str, float | str] | None:
    """由 Heavy landmarks 取得單側 STS 原始角度。"""

    left_body = (11, 23, 25, 27)   # shoulder, hip, knee, ankle
    right_body = (12, 24, 26, 28)
    left_min = _side_min_visibility(landmarks, left_body)
    right_min = _side_min_visibility(landmarks, right_body)
    side = selector.choose(left_min, right_min)
    if side is None:
        return None

    def point(index: int) -> tuple[float, float]:
        return _to_pixel(landmarks[index].x, landmarks[index].y, width, height)

    if side == "left":
        shoulder_i, hip_i, knee_i, ankle_i = left_body
        heel_i, toes_i = 29, 31
        selected_min = left_min
    else:
        shoulder_i, hip_i, knee_i, ankle_i = right_body
        heel_i, toes_i = 30, 32
        selected_min = right_min

    shoulder = point(shoulder_i)
    hip = point(hip_i)
    knee = point(knee_i)
    ankle = point(ankle_i)

    trunk_dx = shoulder[0] - hip[0]
    trunk_dy = shoulder[1] - hip[1]
    trunk_vert = 90.0 - _angle_relative_horizontal(trunk_dx, trunk_dy)
    hip_angle = _calculate_angle(shoulder, hip, knee)
    knee_angle = _calculate_angle(hip, knee, ankle)

    heel_angle = math.nan
    foot_min = 0.0
    if heel_i < len(landmarks) and toes_i < len(landmarks):
        foot_min = min(_visibility(landmarks[heel_i]), _visibility(landmarks[toes_i]))
        if foot_min >= LANDMARK_VISIBILITY_THRESHOLD:
            heel = point(heel_i)
            toes = point(toes_i)
            heel_angle = _angle_relative_horizontal(
                heel[0] - toes[0], heel[1] - toes[1]
            )

    return {
        "selected_side": side,
        "left_min_visibility": float(left_min),
        "right_min_visibility": float(right_min),
        "selected_min_visibility": float(selected_min),
        "foot_min_visibility": float(foot_min),
        "hip_y": float(hip[1]),
        "hip_angle": float(hip_angle),
        "knee_angle": float(knee_angle),
        "trunk_vert": float(trunk_vert),
        "heel_angle": float(heel_angle),
    }


@dataclass
class RepRecord:
    rep: int
    start_time: float
    completion_time: float | None = None
    complete: bool = False
    hip_values: list[float] = field(default_factory=list)
    knee_values: list[float] = field(default_factory=list)
    trunk_values: list[float] = field(default_factory=list)
    heel_values: list[float] = field(default_factory=list)
    score_values: list[float] = field(default_factory=list)

    def add(self, metrics: dict[str, float | str], score: float) -> None:
        self.hip_values.append(float(metrics["hip_angle"]))
        self.knee_values.append(float(metrics["knee_angle"]))
        heel = float(metrics["heel_angle"])
        if math.isfinite(heel):
            self.heel_values.append(heel)
        self.score_values.append(float(score))

    def summarize(self) -> dict[str, float | int]:
        end = self.completion_time if self.completion_time is not None else self.start_time
        return {
            "rep": self.rep,
            "start_time": float(self.start_time),
            "completion_time": float(end),
            "duration": float(max(0.0, end - self.start_time)),
            "min_hip": _minimum(self.hip_values),
            "max_hip": _maximum(self.hip_values),
            "min_knee": _minimum(self.knee_values),
            "max_knee": _maximum(self.knee_values),
            "max_trunk": _maximum(self.trunk_values),
            "max_heel": _maximum(self.heel_values),
            "max_score": _maximum(self.score_values),
        }


class STSStateMachine:
    """依 week15.py 預設門檻重跑 Heavy STS 動作。"""

    def __init__(self) -> None:
        self.sts_state = 9
        self.stage = ""
        self.prev_hip_y: float | None = None
        self.init_hip_y: float | None = None
        self.init_trunk: float | None = None

        self.trunk_max = 0.0
        self.heel_max = 0.0
        self.trunk_score = 0.0
        self.heel_score = 0.0
        self.score = 0.0

        self.rep_count = 0
        self.current_rep: RepRecord | None = None
        self.rep_records: list[dict[str, float | int]] = []
        self.incomplete_reps = 0

    def reset_tracking_reference(self) -> None:
        self.prev_hip_y = None

    def _finalize_current(self) -> None:
        if self.current_rep is None:
            return
        if self.current_rep.complete:
            self.rep_records.append(self.current_rep.summarize())
        elif self.current_rep.hip_values:
            self.incomplete_reps += 1
        self.current_rep = None

    def _start_rep(self, time_sec: float, metrics: dict[str, float | str]) -> None:
        self._finalize_current()
        self.current_rep = RepRecord(rep=self.rep_count + 1, start_time=time_sec)
        self.init_hip_y = float(metrics["hip_y"])
        self.init_trunk = float(metrics["trunk_vert"])
        self.trunk_max = 0.0
        self.heel_max = 0.0
        self.trunk_score = 0.0
        self.heel_score = 0.0
        self.score = 0.0

    def update(
        self,
        metrics: dict[str, float | str],
        time_sec: float,
    ) -> dict[str, float | int | str]:
        hip_y = float(metrics["hip_y"])
        if self.prev_hip_y is None:
            hip_change = 0.0
        else:
            hip_change = hip_y - self.prev_hip_y
        self.prev_hip_y = hip_y

        hip_angle = float(metrics["hip_angle"])
        knee_angle = float(metrics["knee_angle"])
        trunk_vert = float(metrics["trunk_vert"])
        heel_angle = float(metrics["heel_angle"])

        stable_sitting = (
            hip_angle < DOWN_HIP_THRESHOLD
            and knee_angle < SIT_KNEE_THRESHOLD
            and abs(hip_change) < HIP_STABLE_DELTA_PX
        )

        # 狀態 9/3 → 0：坐下穩定，開始新一次動作。
        if stable_sitting:
            if self.sts_state in (3, 9):
                self.sts_state = 0
                self.stage = "down"
                self._start_rep(time_sec, metrics)

            # 狀態 0 → 1：坐姿中軀幹開始前傾。
            if self.init_trunk is not None:
                self.trunk_max = max(self.trunk_max, trunk_vert)
                self.trunk_score = _trunk_score_calculate(self.trunk_max)
                if (
                    self.sts_state == 0
                    and (trunk_vert - self.init_trunk) > TRUNK_DELTA_THRESHOLD
                ):
                    self.sts_state = 1
                    self.stage = "down1"

        # 狀態 0/1 → 2：髖部往上移動。
        if self.sts_state in (0, 1) and self.init_hip_y is not None:
            if (self.init_hip_y - hip_y) > HIP_RISE_DELTA_PX:
                self.sts_state = 2
                self.stage = "down2"

        # 狀態 0/2 → 3：膝部伸直且髖部穩定，完成站立。
        if knee_angle > STAND_KNEE_THRESHOLD and abs(hip_change) < HIP_STABLE_DELTA_PX:
            if self.sts_state in (0, 2):
                self.sts_state = 3
                self.stage = "up"
                self.rep_count += 1
                if self.current_rep is not None:
                    self.current_rep.complete = True
                    self.current_rep.completion_time = time_sec

        # 站立期間更新足跟與總分。
        if self.sts_state == 3:
            if math.isfinite(heel_angle):
                self.heel_max = max(self.heel_max, heel_angle)
            self.heel_score = _heel_score_calculate(self.heel_max)
            self.score = (self.heel_score + self.trunk_score) / 2.0

        if self.current_rep is not None:
            self.current_rep.add(metrics, self.score)
            if self.sts_state in (0, 1):
                self.current_rep.trunk_values.append(trunk_vert)    

        return {
            "stage": self.stage,
            "rep": self.rep_count,
            "hip_change": float(hip_change),
            "trunk_max": float(self.trunk_max),
            "heel_max": float(self.heel_max),
            "trunk_score": float(self.trunk_score),
            "heel_score": float(self.heel_score),
            "score": float(self.score),
        }

    def finish(self) -> None:
        self._finalize_current()


def summarize_frame_metrics(frame_records: list[dict[str, Any]]) -> dict[str, float | int | str]:
    valid = [record for record in frame_records if record.get("metrics_valid")]
    trunk_values = [_safe_float(record.get("trunk_vert_heavy")) for record in valid]
    heel_values = [
        _safe_float(record.get("heel_angle_heavy"))
        for record in valid
        if record.get("heel_angle_heavy") not in (None, "")
    ]
    hip_values = [_safe_float(record.get("hip_angle_heavy")) for record in valid]
    knee_values = [_safe_float(record.get("knee_angle_heavy")) for record in valid]

    last_valid = max((int(record["frame_idx"]) for record in valid), default=-1)
    longest_failure = max(
        (int(record.get("consecutive_failures", 0)) for record in frame_records),
        default=0,
    )
    rate = len(valid) / len(frame_records) * 100.0 if frame_records else 0.0

    warnings: list[str] = []
    if rate < 20.0:
        warnings.append("姿勢有效率低於 20%")
    if frame_records and last_valid >= 0 and last_valid < int(len(frame_records) * 0.8):
        warnings.append("最後 20% 影片沒有有效姿勢")
    if longest_failure >= 30:
        warnings.append(f"最長連續 {longest_failure} 幀沒有有效姿勢")

    return {
        "total_frames": len(frame_records),
        "valid_pose_frames": len(valid),
        "pose_detection_rate": float(rate),
        "last_valid_frame": last_valid,
        "longest_failure_streak": longest_failure,
        "avg_trunk": _mean(trunk_values),
        "max_trunk": _maximum(trunk_values),
        "avg_heel": _mean(heel_values),
        "max_heel": _maximum(heel_values),
        "min_hip": _minimum(hip_values),
        "max_hip": _maximum(hip_values),
        "min_knee": _minimum(knee_values),
        "max_knee": _maximum(knee_values),
        "quality_warning": "；".join(warnings),
    }


def build_posture_profile(
    rep_records: list[dict[str, float | int]],
) -> dict[str, float | int]:
    """Summarize only the posture items that Heavy currently scores reliably."""

    if not rep_records:
        return {
            "reps": 0,
            "trunk_score": 0.0,
            "heel_score": 0.0,
            "overall_score": 0.0,
            "avg_max_trunk": 0.0,
            "avg_max_heel": 0.0,
        }

    trunk_scores = [
        _trunk_score_calculate(_safe_float(record.get("max_trunk")))
        for record in rep_records
    ]
    heel_scores = [
        _heel_score_calculate(_safe_float(record.get("max_heel")))
        for record in rep_records
    ]
    overall_scores = [
        (trunk_score + heel_score) / 2.0
        for trunk_score, heel_score in zip(trunk_scores, heel_scores)
    ]

    return {
        "reps": len(rep_records),
        "trunk_score": _mean(trunk_scores),
        "heel_score": _mean(heel_scores),
        "overall_score": _mean(overall_scores),
        "avg_max_trunk": _mean(_safe_float(record.get("max_trunk")) for record in rep_records),
        "avg_max_heel": _mean(_safe_float(record.get("max_heel")) for record in rep_records),
    }


def _register_pdf_fonts() -> tuple[str, str]:
    import os

    from reportlab.pdfbase import pdfmetrics
    from reportlab.pdfbase.ttfonts import TTFont

    windows_fonts = Path(os.environ.get("WINDIR", "C:/Windows")) / "Fonts"
    regular_candidates = [
        windows_fonts / "msjh.ttc",
        windows_fonts / "mingliu.ttc",
        Path("/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc"),
        Path("/usr/share/fonts/opentype/noto/NotoSerifCJK-Regular.ttc"),
        Path("/usr/share/fonts/truetype/arphic/uming.ttc"),
    ]
    bold_candidates = [
        windows_fonts / "msjhbd.ttc",
        windows_fonts / "msjh.ttc",
        Path("/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"),
    ]

    def register_first(name: str, candidates: list[Path]) -> str | None:
        for candidate in candidates:
            if not candidate.is_file():
                continue
            try:
                pdfmetrics.registerFont(TTFont(name, str(candidate), subfontIndex=0))
                return name
            except Exception:
                continue
        return None

    regular = register_first("STS-CJK-Regular", regular_candidates)
    bold = register_first("STS-CJK-Bold", bold_candidates)
    if regular is None:
        return "Helvetica", "Helvetica-Bold"
    return regular, bold or regular


def generate_pdf_report(
    pdf_path: str | Path,
    summary: dict[str, float | int | str],
    rep_records: list[dict[str, float | int]],
    session_info: dict[str, Any],
    video_info: dict[str, float | int],
    incomplete_reps: int,
    posture_profile: dict[str, float | int],
    posture_advice: dict[str, str],
) -> None:
    from reportlab.lib import colors
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
    from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle
    from xml.sax.saxutils import escape

    regular_font, bold_font = _register_pdf_fonts()
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(name="CJKTitle", parent=styles["Title"], fontName=bold_font))
    styles.add(ParagraphStyle(name="CJKHeading", parent=styles["Heading2"], fontName=bold_font))
    styles.add(ParagraphStyle(name="CJKBody", parent=styles["BodyText"], fontName=regular_font, leading=15))

    pdf_path = Path(pdf_path)
    pdf_path.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(str(pdf_path), pagesize=A4)
    elements: list[Any] = [Paragraph("STS Heavy 動作分析報告", styles["CJKTitle"]), Spacer(1, 12)]

    summary_data = [
        ["項目", "結果"],
        ["分析時間", str(session_info.get("timestamp", ""))],
        ["遊戲模式", str(session_info.get("mode", ""))],
        ["遊戲難度", str(session_info.get("difficulty", ""))],
        ["前端遊戲次數（僅供比較）", str(session_info.get("game_reps", ""))],
        ["Heavy 重新分析次數", str(len(rep_records))],
        ["Heavy 未完成動作", str(incomplete_reps)],
        ["分析影片 FPS", f"{_safe_float(video_info.get('fps')):.2f}"],
        ["分析影片長度", f"{_safe_float(video_info.get('duration_sec')):.2f} 秒"],
        ["姿勢有效率", f"{_safe_float(summary.get('pose_detection_rate')):.1f}%"],
        ["品質提醒", str(summary.get("quality_warning", "")) or "無"],
    ]
    table = Table(summary_data, colWidths=[210, 285], repeatRows=1)
    table.setStyle(TableStyle([
        ("FONTNAME", (0, 0), (-1, -1), regular_font),
        ("FONTNAME", (0, 0), (-1, 0), bold_font),
        ("BACKGROUND", (0, 0), (-1, 0), colors.lightgrey),
        ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
        ("PADDING", (0, 0), (-1, -1), 6),
    ]))
    elements.extend([Paragraph("1. 分析摘要", styles["CJKHeading"]), table, Spacer(1, 16)])

    elements.append(Paragraph("2. 完整起立紀錄", styles["CJKHeading"]))
    if rep_records:
        rows = [["次數", "完成時間", "動作時間", "軀幹最大", "腳跟最大", "最高分數"]]
        for record in rep_records:
            rows.append([
                str(record["rep"]),
                f"{_safe_float(record['completion_time']):.2f}s",
                f"{_safe_float(record['duration']):.2f}s",
                f"{_safe_float(record['max_trunk']):.1f}°",
                f"{_safe_float(record['max_heel']):.1f}°",
                f"{_safe_float(record['max_score']):.1f}",
            ])
        rep_table = Table(rows, colWidths=[55, 85, 85, 85, 85, 85], repeatRows=1)
        rep_table.setStyle(TableStyle([
            ("FONTNAME", (0, 0), (-1, -1), regular_font),
            ("FONTNAME", (0, 0), (-1, 0), bold_font),
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#F9E9D2")),
            ("GRID", (0, 0), (-1, -1), 0.45, colors.grey),
            ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ("FONTSIZE", (0, 0), (-1, -1), 8.5),
            ("PADDING", (0, 0), (-1, -1), 4),
        ]))
        elements.append(rep_table)
    else:
        elements.append(Paragraph("尚未辨識到完整的坐下→起身→站立動作。", styles["CJKBody"]))

    advice_source = "Gemini AI" if posture_advice.get("source") == "gemini" else "本機規則備援"
    profile_rows = [
        ["評分項目", "Heavy 平均結果"],
        ["軀幹控制", f"{_safe_float(posture_profile.get('trunk_score')):.1f} / 100"],
        ["腳跟伸展", f"{_safe_float(posture_profile.get('heel_score')):.1f} / 100"],
        ["綜合姿勢分數", f"{_safe_float(posture_profile.get('overall_score')):.1f} / 100"],
        ["建議產生方式", advice_source],
    ]
    profile_table = Table(profile_rows, colWidths=[210, 285], repeatRows=1)
    profile_table.setStyle(TableStyle([
        ("FONTNAME", (0, 0), (-1, -1), regular_font),
        ("FONTNAME", (0, 0), (-1, 0), bold_font),
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#E8F1FF")),
        ("GRID", (0, 0), (-1, -1), 0.45, colors.grey),
        ("PADDING", (0, 0), (-1, -1), 5),
    ]))

    advice_title = escape(str(posture_advice.get("title", "姿勢建議")))
    advice_analysis = escape(str(posture_advice.get("analysis", "")))
    advice_tip = escape(str(posture_advice.get("tip", "")))
    elements.extend([
        Spacer(1, 16),
        Paragraph("3. 姿勢評語與建議", styles["CJKHeading"]),
        profile_table,
        Spacer(1, 8),
        Paragraph(f"<b>{advice_title}</b>", styles["CJKBody"]),
        Paragraph(f"姿勢評語：{advice_analysis}", styles["CJKBody"]),
        Paragraph(f"改善建議：{advice_tip}", styles["CJKBody"]),
        Spacer(1, 16),
        Paragraph("4. 說明", styles["CJKHeading"]),
        Paragraph("- 本報告由 Heavy 模型重新分析影片，不沿用前端 stage、rep 或動作品質分數。", styles["CJKBody"]),
        Paragraph("- AI 僅解讀 Heavy 已計算的軀幹與腳跟結果；若 AI 服務不可用，會自動改用本機規則，不影響 PDF 產生。", styles["CJKBody"]),
        Paragraph("- 本報告內容僅供訓練回饋參考，不作為疾病診斷、治療或醫療處置依據。", styles["CJKBody"]),
        Paragraph("- CSV 同時保留 raw 與 smooth 角度，便於確認異常值出現在哪一層。", styles["CJKBody"]),
    ])
    doc.build(elements)


def analyze_video_with_heavy(
    raw_video_path: str | Path,
    output_csv_path: str | Path,
    output_pdf_path: str | Path,
    session_info: dict[str, Any] | None = None,
    model_path: str | Path | None = None,
) -> dict[str, Any]:
    """使用 Heavy 模型獨立重跑影片，回傳可序列化摘要。"""

    session_info = dict(session_info or {})
    raw_video_path = Path(raw_video_path).resolve()
    output_csv_path = Path(output_csv_path).resolve()
    output_pdf_path = Path(output_pdf_path).resolve()
    model_path = Path(model_path or DEFAULT_HEAVY_MODEL_PATH).resolve()

    if not raw_video_path.is_file():
        raise AnalysisError(f"找不到分析影片：{raw_video_path}")
    if not model_path.is_file():
        raise AnalysisError(f"找不到 Heavy 模型：{model_path}")

    try:
        import mediapipe as mp
        from mediapipe.tasks import python
        from mediapipe.tasks.python import vision
    except ImportError as exc:
        raise AnalysisError("尚未安裝 mediapipe，請在 STS 環境中安裝 requirements.txt") from exc

    output_csv_path.parent.mkdir(parents=True, exist_ok=True)
    output_pdf_path.parent.mkdir(parents=True, exist_ok=True)

    cap = cv2.VideoCapture(str(raw_video_path))
    if not cap.isOpened():
        raise AnalysisError(f"OpenCV 無法開啟分析影片：{raw_video_path.name}")

    fps = float(cap.get(cv2.CAP_PROP_FPS))
    if not math.isfinite(fps) or fps <= 1.0 or fps > 120.0:
        cap.release()
        raise AnalysisError(
            f"分析影片 FPS 不可信（{fps}）。請確認 server.py 已先用 FFmpeg 轉成固定 30 FPS MP4。"
        )

    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH) or 0)
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT) or 0)
    metadata_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0)

    base_options = python.BaseOptions(model_asset_path=str(model_path))
    options = vision.PoseLandmarkerOptions(
        base_options=base_options,
        min_tracking_confidence=0.5,
        min_pose_detection_confidence=0.5,
        running_mode=vision.RunningMode.VIDEO,
    )

    smoother = MovingAverageFilter()
    selector = SideSelector()
    state_machine = STSStateMachine()
    frame_records: list[dict[str, Any]] = []

    frame_idx = 0
    consecutive_failures = 0
    longest_failure = 0

    try:
        with vision.PoseLandmarker.create_from_options(options) as landmarker:
            while cap.isOpened():
                ok, frame = cap.read()
                if not ok:
                    break

                frame_height, frame_width = frame.shape[:2]
                width = width or frame_width
                height = height or frame_height
                video_time_ms = int(round(frame_idx / fps * 1000.0))
                time_sec = video_time_ms / 1000.0

                rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)
                result = landmarker.detect_for_video(mp_image, video_time_ms)

                row: dict[str, Any] = {
                    "frame_idx": frame_idx,
                    "video_time_ms": video_time_ms,
                    "landmarks_found": False,
                    "metrics_valid": False,
                    "reject_reason": "",
                    "selected_side": "",
                    "left_min_visibility": "",
                    "right_min_visibility": "",
                    "selected_min_visibility": "",
                    "foot_min_visibility": "",
                    "consecutive_failures": consecutive_failures,
                    "stage_heavy": state_machine.stage,
                    "rep_heavy": state_machine.rep_count,
                    "hip_y_raw": "",
                    "hip_y_heavy": "",
                    "hip_change_heavy": "",
                    "hip_angle_heavy_raw": "",
                    "hip_angle_heavy": "",
                    "knee_angle_heavy_raw": "",
                    "knee_angle_heavy": "",
                    "trunk_vert_heavy_raw": "",
                    "trunk_vert_heavy": "",
                    "heel_angle_heavy_raw": "",
                    "heel_angle_heavy": "",
                    "trunk_max_heavy": state_machine.trunk_max,
                    "heel_max_heavy": state_machine.heel_max,
                    "trunk_score_heavy": state_machine.trunk_score,
                    "heel_score_heavy": state_machine.heel_score,
                    "score_heavy": state_machine.score,
                }

                if not result.pose_landmarks:
                    row["reject_reason"] = "no_pose_landmarks"
                    consecutive_failures += 1
                else:
                    row["landmarks_found"] = True
                    raw_metrics = extract_pose_metrics(
                        result.pose_landmarks[0], frame_width, frame_height, selector
                    )
                    if raw_metrics is None:
                        row["reject_reason"] = "no_valid_body_side"
                        consecutive_failures += 1
                    else:
                        consecutive_failures = 0
                        smooth_metrics = smoother.apply(raw_metrics)
                        state = state_machine.update(smooth_metrics, time_sec)

                        raw_heel = float(raw_metrics["heel_angle"])
                        smooth_heel = float(smooth_metrics["heel_angle"])
                        row.update({
                            "metrics_valid": True,
                            "selected_side": raw_metrics["selected_side"],
                            "left_min_visibility": raw_metrics["left_min_visibility"],
                            "right_min_visibility": raw_metrics["right_min_visibility"],
                            "selected_min_visibility": raw_metrics["selected_min_visibility"],
                            "foot_min_visibility": raw_metrics["foot_min_visibility"],
                            "stage_heavy": state["stage"],
                            "rep_heavy": state["rep"],
                            "hip_y_raw": raw_metrics["hip_y"],
                            "hip_y_heavy": smooth_metrics["hip_y"],
                            "hip_change_heavy": state["hip_change"],
                            "hip_angle_heavy_raw": raw_metrics["hip_angle"],
                            "hip_angle_heavy": smooth_metrics["hip_angle"],
                            "knee_angle_heavy_raw": raw_metrics["knee_angle"],
                            "knee_angle_heavy": smooth_metrics["knee_angle"],
                            "trunk_vert_heavy_raw": raw_metrics["trunk_vert"],
                            "trunk_vert_heavy": smooth_metrics["trunk_vert"],
                            "heel_angle_heavy_raw": "" if not math.isfinite(raw_heel) else raw_heel,
                            "heel_angle_heavy": "" if not math.isfinite(smooth_heel) else smooth_heel,
                            "trunk_max_heavy": state["trunk_max"],
                            "heel_max_heavy": state["heel_max"],
                            "trunk_score_heavy": state["trunk_score"],
                            "heel_score_heavy": state["heel_score"],
                            "score_heavy": state["score"],
                        })

                if consecutive_failures >= MISSING_RESET_FRAMES:
                    # 避免恢復後拿很久以前的髖部與角度繼續比較。
                    smoother.reset()
                    state_machine.reset_tracking_reference()

                longest_failure = max(longest_failure, consecutive_failures)
                row["consecutive_failures"] = consecutive_failures
                frame_records.append(row)
                frame_idx += 1
    finally:
        cap.release()

    state_machine.finish()
    if not frame_records:
        raise AnalysisError("影片中沒有可讀取的影格")

    valid_count = sum(1 for row in frame_records if row["metrics_valid"])
    if valid_count == 0:
        raise AnalysisError("影片已解碼，但 Heavy 模型沒有產生任何有效姿勢資料")

    fields = list(frame_records[0].keys())
    with output_csv_path.open("w", newline="", encoding="utf-8-sig") as csv_file:
        writer = csv.DictWriter(csv_file, fieldnames=fields)
        writer.writeheader()
        writer.writerows(frame_records)

    summary = summarize_frame_metrics(frame_records)
    summary["longest_failure_streak"] = longest_failure
    duration_sec = len(frame_records) / fps
    video_info = {
        "fps": fps,
        "width": width,
        "height": height,
        "metadata_frames": metadata_frames,
        "decoded_frames": len(frame_records),
        "duration_sec": duration_sec,
    }

    posture_profile = build_posture_profile(state_machine.rep_records)
    posture_advice = generate_posture_advice(posture_profile, excel_path=output_csv_path)

    # 方便 server / 前端之後直接顯示 Heavy 的正式分數與建議來源。
    summary["avg_trunk_score"] = float(posture_profile["trunk_score"])
    summary["avg_heel_score"] = float(posture_profile["heel_score"])
    summary["overall_posture_score"] = float(posture_profile["overall_score"])
    summary["advice_source"] = str(posture_advice.get("source", "local"))

    generate_pdf_report(
        pdf_path=output_pdf_path,
        summary=summary,
        rep_records=state_machine.rep_records,
        session_info=session_info,
        video_info=video_info,
        incomplete_reps=state_machine.incomplete_reps,
        posture_profile=posture_profile,
        posture_advice=posture_advice,
    )

    return {
        "heavy_reps": state_machine.rep_count,
        "incomplete_reps": state_machine.incomplete_reps,
        "summary": summary,
        "video_info": video_info,
        "rep_records": state_machine.rep_records,
        "posture_profile": posture_profile,
        "posture_advice": posture_advice,
    }