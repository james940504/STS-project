# STS Integration v1 — 2026-08-11

## 版本來源
- 核心後端：0805 `server.py` + `analysis.py`
- 前端功能：0811 `app.js` / `social.js` / `legal.js` / `phone.html`
- UI/CSS：0810 `style.css` / `social.css` / `legal.css` + 0810 放大版設定頁

## 已完成整合
- 前端姿勢模型恢復為 MediaPipe **Full + GPU**。
- 保留 0805 後端 **Heavy** 獨立重跑、FFmpeg 固定 30 FPS、CSV/PDF 流程。
- 恢復 0805 MediaRecorder 自動上傳流程。
- Calibration 完成 + 倒數結束後才 `startVideoRecording()`，校正過程不錄進 Heavy 正式影片。
- Caught / Win / Timed End 都會 `stopVideoRecording({...metadata})` 並自動呼叫 `/api/analyze`。
- 結果頁恢復原始錄影、Heavy 分析狀態、PDF、CSV、姿勢曲線與名稱欄位。
- 加入 0811 Calibration、i18n、TTS、前端 5-frame smoothing、knee valgus、Phone Camera、AI diagnosis。
- 加入 Flask `/phone.html` 路由。
- Calibration hip Y 改成與遊戲一致的 video pixel 座標，不再使用 `y * 1000`。
- 起身門檻開始真正使用 `dynHipDelta`。
- TTS 語音引擎會依語言切換 `zh-TW` / `en-US`，主要遊戲與校正語音已改用 i18n。
- Knee valgus 最小值改成追蹤完整 0→1→2 起身階段。
- 每次新遊戲會清空前端 smoothing buffers，避免上一局資料污染下一局。
- 補回 0811 JS 仍引用但 HTML 被刪掉的 `chart-cvs` / `name-wrap`。
- 修正 0811 未宣告的 Calibration `phase` / `isTimeUp` / `counter` 狀態。
- 套用 0810 16:9 / 大型 UI / Camera & Game layout / Social & Legal CSS。


## 下一輪實機測試優先順序
1. 電腦 Webcam → Calibration → Countdown → 正式遊戲。
2. 確認正式遊戲才出現「錄影中」。
3. 分別測 Caught / Win / Timed End 是否停止錄影。
4. 確認結果頁能預覽/下載影片。
5. 確認 Flask 收到 `/api/analyze`，FFmpeg 轉成 30 FPS。
6. 確認 Heavy CSV/PDF 成功並能從結果頁開啟。
7. 再測 English + TTS。
8. 最後測 Phone Camera（需 HTTPS/secure context）。

# 
- Gemini API key 目前仍在前端，正式部署前應搬到 Flask 環境變數。
- Calibration 畫面中的部分提示文字仍是中文字串，英文 UI 尚未 100% 覆蓋所有校正視覺文字。
- Phone Camera 需要 HTTPS；單純 `http://LAN-IP:5000` 在手機瀏覽器可能無法取得相機權限。
- Heavy 後端仍使用固定 STS threshold，不直接套用前端 Calibration 參數；目前 Calibration 主要改善前端即時辨識。

## 2026-08-17 本週修改
- Calibration 視覺提示改由 `getText()` / i18n 管理，與既有 TTS 語言設定一致。
- 補齊 AI 動態訊息的 i18n key，並將遊戲啟動/攝影機主要動態提示接入 i18n。
- 前端新增 `MPSideSelector`：visibility=0.25、switch margin=0.10，與 Heavy 後端一致。
- STS trunk / hip / knee / heel 改取 SideSelector 選中的同一側；knee valgus 仍保留雙側計算。
- 每次 Calibration 與正式新局開始時 reset SideSelector，避免上一局狀態污染。
- 新增 `requirements.txt`、`.env.example`，`.gitignore` 增加 `.env` / `records/` / log。
- Heavy PDF 新增「姿勢評語與建議」：Heavy 先計算 trunk/heel 分數，再由 Gemini 解讀；無 API key、逾時或解析失敗時自動使用本機規則備援。
- Heavy AI 僅解讀目前後端正式評分的 trunk + heel，不自行推測 knee valgus。
