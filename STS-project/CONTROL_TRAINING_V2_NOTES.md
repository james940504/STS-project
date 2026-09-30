# Controlled Movement v2 修正摘要

本版以 `STS_Web_0823_control_v1` 為基礎，並套用使用者最新的 `style(3).css`（其中 control report 已放寬為 1400px / 96%，取消內層 max-height 與 scrollbar）。Classic / Infinite / Timed 主流程不改。

## 1. 兩個控制模式固定加入 5 秒 Hold

### Controlled Sit
`SITTING / 原 STS 四階段 -> STANDING -> HOLD 5s -> WAIT_DESCENT -> DESCENDING -> SEATED`

- `stsPhase === 3` 後進入 5 秒站立保持。
- Hold 中若已明顯離開站姿，5 秒重新計算。
- Hold 完成後才顯示使用者設定的下降目標秒數。
- 真正下降 onset 用 150 ms time-based debounce 確認，確認後把 start time 回推到候選 onset，避免確認延遲灌進 Actual time。
- 坐下完成用 200 ms time-based confirmation，取確認開始點作為 Actual end time。

### Heel Control
`WAIT_STAND -> BASELINE -> RAISING -> HOLD 5s -> WAIT_LOWER -> LOWERING -> BASELINE`

- 先用 0.5 秒真實時間建立 baseline，不依賴固定幀數。
- Heel Raise 達到最低工程抬升幅度後進入頂端 Hold。
- 若 Hold 期間仍繼續抬高，從新的頂端重新計 5 秒。
- 若腳跟掉離頂端容許區，Hold 重新開始；不會直接誤觸發 lowering。
- Hold 完成後才允許開始下降，lowering onset 同樣使用 150 ms time-based debounce。
- 回 baseline 使用 200 ms time-based confirmation。

> 5 秒 Hold 是目前系統固定的訓練 protocol，不代表臨床正常值；150/200 ms、角度差等數值都是 state-machine 工程參數。

## 2. SideSelector 修正

- Classic 與 Controlled Sit 仍沿用原 STS SideSelector（shoulder / hip / knee / ankle）。
- Heel Control 改由下肢＋足部 landmarks（hip / knee / ankle / heel / toe）的 visibility 選側，不再讓 shoulder visibility 主導選腳。
- 一個 Control Rep 內使用 `controlLockedSide` 鎖住同一側，Rep 完成後才解鎖並允許下一 Rep 重新選側。
- 報告每個 Rep 會記錄此次使用左側或右側。

## 3. UI / Report

- 模式設定名稱改為「目標下降時間」。
- 遊戲中倒數卡會動態切換：
  - Hold 時：`保持剩餘 5.0 -> 0.0 s`
  - Hold 完成後：`本次剩餘 <使用者設定秒數>`
- 左上模式 badge 顯示 `保持 5 秒｜下降目標 X 秒`。
- Control Score 仍只比較「下降 Actual vs Target」，不把 Hold 混入分數。
- Report 每 Rep 顯示：Hold 5.0s ✓、下降時間、Control Score、鎖定側、Position–Time 圖、0.5 秒角度表。
- Heavy 仍未加入這兩個控制模式。
