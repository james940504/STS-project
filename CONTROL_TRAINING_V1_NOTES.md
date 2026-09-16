# Controlled Sit / Heel Control v1

## Scope
- Existing Classic / Infinite / Timed modes remain intact.
- Adds `controlled_sit` and `heel_control`.
- User selects a target control time (default 5.0 s, UI technical range 0.5–30 s).
- No red/yellow/green-light gameplay in the two control modes; track and character remain.
- Character advance is calculated once per completed rep from timing adherence, not instantaneous velocity.
- Front-end Full data generates the first analysis report. Heavy is intentionally not invoked for these two modes in v1.

## Controlled Sit
- Original STS phase prompts are retained for sit → forward trunk → hip rise → stand complete.
- Once standing is complete, the next descent is recorded.
- Per-frame normalized position: `(hipY - repStandHipY) / (calibMaxHipY - repStandHipY)`, clamped to 0–1.
- Raw per-frame fields: time, position, hipY, trunk angle, hip angle, knee angle.
- Rep completes after seated posture is detected for consecutive frames.

## Heel Control
- Does not use the four STS gameplay phases.
- Flow: wait for standing → baseline → raising → lowering → baseline.
- Per-frame normalized lowering position: `(peakAngle - currentAngle) / (peakAngle - baselineAngle)`, clamped to 0–1.
- Raw per-frame fields: time, position, Heel–Toe angle.

## Control score
`error = abs(actualSec - targetSec) / targetSec`

`controlScore = clamp(0, 100, 100 * (1 - error))`

This is a task/cadence adherence score, not a clinical or smoothness score.

## Character movement
`step = 0.05 + 0.15 * (controlScore / 100)^1.5`

The rep is completed first; then the character advances.

## Front-end report
- One session contains all reps.
- Each rep shows one Position-vs-Time chart with a target trajectory and actual trajectory.
- Raw data are retained every processed MediaPipe frame.
- Table display is sampled/interpolated every 0.5 s, plus the exact final time.
- Controlled Sit table: trunk / hip / knee angles.
- Heel table: Heel–Toe angle.
- SPARC / Heavy / final filtering are intentionally left for the next phase.
