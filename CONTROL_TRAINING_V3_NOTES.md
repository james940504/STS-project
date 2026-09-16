# Controlled Sit / Heel Control v3

## 本版修改重點

1. **兩個模式統一使用「校正活動範圍 85% → Hold 5 秒 → 下降」**。
2. **Heel**：校正 Stage 1（站起＋墊腳尖）同步記錄個人最大 Heel–Toe angle。遊戲時，當 `heelAngle >= calibratedHeelMaxAngle * 0.85` 即進入 Hold。
3. Heel Hold 期間不再追 Peak，也不會因為又抬高一些就重設 5 秒。只有低於 85% 門檻才會中斷並重新 Hold。
4. Hold 完成後，以當下 Heel angle 作為本次下降起點，之後的 Position 由該角度正規化到 baseline。
5. **Controlled Sit**：使用校正的 `userStandHipBaseline` 與 `calibMaxHipY` 建立站－坐正規化範圍。`StandCompletion >= 0.85` 才進入 Hold；Hold 期間也只要求維持在 85% 站立區。
6. Controlled Sit Hold 完成時，將當下 HipY 設為本次下降 Position 的 P=0 起點。
7. 保留 v2 的 Rep 內鎖側、time-based onset/end debounce、5 秒 Hold、下降 Control Score、前端報告。
8. 套用使用者目前的 `style(3).css`，保留已放寬的 Control Report UI。

> 85% 目前是本系統的個人化訓練／工程參數，不是臨床正常門檻。
