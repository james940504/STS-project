const i18n = {
  'zh-TW': {
    // ── 1. 原有的設定面板 ──
    'set-title': '⚙️ 遊戲<span>設定</span>',
    'lbl-set-lang': '選擇語言',
    'lbl-set-mute': '遊戲音效',
    'lbl-set-part': '背景粒子特效',
    'set-back-btn': '確認並返回',
    'set-mute-on': '播放中',
    'set-mute-off': '已靜音',
    'set-part-on': '開啟',
    'set-part-off': '關閉',

    // ── 2. 右上角系統圖示工具提示 (title) ──
    'title-signin': '每日簽到',
    'title-quests': '每日/每週任務',
    'title-achievements': '成就徽章',
    'title-challenge': '好友挑戰',
    'title-legal': '隱私權與安全聲明',
    'title-shop': '商城',
    'title-board': '排行榜',
    'title-tutorial': '遊戲規則',
    'title-settings': '遊戲設定',
    'title-ai-coach': '呼叫 AI 教練',

    // ── 3. AI 聊天視窗 ──
    'ai-title': 'AI <span>教練</span>',
    'ai-welcome': '你好！我是專屬 AI 訓練員。有什麼我可以幫忙的嗎？',
    'ai-preset-rules': '遊戲規則',
    'ai-preset-benefits': '坐站訓練好處',
    'ai-preset-skills': '高分技巧',
    'ai-input-holder': '問我問題...',
    'ai-btn-send': '送出',

    // ── 4. 主選單與通用返回 ──
    'menu-logo-title': '123<span>木頭人</span>',
    'menu-logo-sub': 'PRO — 姿勢矯正版',
    'menu-btn-start': '開始遊戲',
    'menu-btn-ad': '看廣告領 500 🪙',
    'menu-legal-footer': '🔒 隱私權政策・攝影機使用說明・運動安全提醒',
    'btn-back': '← 返回',
    'btn-back-menu': '← 返回主選單',

    // ── 5. 各個畫面標題與步驟 ──
    'chars-title': '選擇<span>角色</span>',
    'chars-next': '下一步：選模式 →',
    'mode-title': '選擇<span>模式</span>',
    'mode-next': '下一步：選難度 →',
    'mode-start-control': '開始訓練 ▶',
    'control-target-label': '目標下降時間',
    'control-target-hint': '兩個控制模式都會先固定保持 3 秒；此處只設定後續下降節奏，不代表醫療正常值。',
    'diff-title': '選擇<span>難度</span>',
    'diff-next': '開始遊戲 ▶',

    // ── 6. 遊戲說明 ──
    'tut-title': '遊戲<span>說明</span>',
    'tut-cap-stand': '站立',
    'tut-cap-sit': '坐下',
    'tut-cap-tiptoe': '墊腳尖',
    'tut-cap-step': '= +1步！',
    'tut-head-green': '綠燈時',
    'tut-body-green': '完成<strong>站➔坐➔站➔墊腳</strong>即前進<br>姿勢越好，步伐越大',
    'tut-head-yellow': '黃燈時',
    'tut-body-yellow': '<strong>起立後切黃燈</strong><br>請準備<strong>坐下</strong>',
    'tut-head-red': '紅燈時',
    'tut-body-red': '必須<strong>坐下且靜止</strong><br>亂動或站立<br><strong style="color:var(--red)">Game Over！</strong>',
    'tut-safety-note': '⚠️ <strong>運動安全提醒：</strong>本遊戲僅供一般運動參考，並非醫療器材，不能取代物理治療師或醫師之專業評估。若有心血管疾病、平衡感不佳或跌倒病史，請先諮詢醫師；運動中如有不適請立即停止。',
    'tut-safety-more': '查看完整聲明 →',
    'tut-btn-menu': '← 返回主選單',
    'tut-btn-chars': '去選角色 ▶',

    // ── 7. 任務與成就 ──
    'quests-title': '每日<span>任務</span>',
    'quests-daily-sec': '📅 每日任務',
    'quests-weekly-sec': '🗓️ 每週任務',
    'quests-btn-menu': '← 返回主選單',
    'ach-title': '成就<span>徽章</span>',
    'ach-btn-menu': '← 返回主選單',

    // ── 8. 遊戲中畫面 UI ──
    'game-light-green': '🟢 綠燈 — 自由移動',
    'game-light-yellow': '🟡 黃燈 — 請準備坐下',
    'game-light-red': '🔴 紅燈 — 坐下且靜止！',
    'game-timer-lbl': '剩餘時間',
    'game-state-body': '遊戲開始',
    'game-state-lbl': '當前狀態',
    'game-rep-lbl': '次',
    'game-posture-lbl': '單次姿勢分',
    'game-control-score-lbl': '本次控制分',
    'game-rep-remaining': '本次剩餘',
    'game-hold-remaining': '保持剩餘',
    'game-control-ready': '準備控制動作',
    'game-control-hold': '站立保持中',
    'game-control-hold-recover': '請站穩並重新保持',
    'game-control-wait-descent': '保持完成，開始控制坐下',
    'game-control-sit': '控制坐下中',
    'game-heel-stand': '請先站穩',
    'game-heel-baseline': '腳跟著地，準備抬起',
    'game-heel-raising': '腳跟抬起中',
    'game-heel-peak': '到達頂端',
    'game-heel-hold': '頂端保持中',
    'game-heel-hold-recover': '請回到頂端並重新保持',
    'game-heel-wait-lower': '保持完成，開始控制下降',
    'game-heel-lowering': '控制下降中',
    'game-score-lbl': '總分',
    'game-prog-lbl': '進度：',
    'game-cam-status': '啟動攝影機...',
    'game-hud-light': '燈號',
    'game-hud-streak': '連續好姿勢',
    'game-move-warn': '⚠️ 偵測到移動！',
    'game-rep-fb': '起立完成！',

    // ── 9. 暫停與結算 ──
    'pause-title': '遊戲暫停',
    'pause-sub': '按 P 鍵或點擊「繼續」恢復遊戲',
    'pause-btn-resume': '▶ 繼續遊戲',
    'pause-btn-quit': '🏠 返回主選單',
    'reward-title': '金幣獎勵！',
    'reward-btn-restart': '🔄 再玩一次',
    'reward-btn-board': '🏆 排行榜',
    'reward-btn-menu': '🏠 主選單',
    'res-name-lbl': '輸入名稱（3字）：',
    'res-btn-collect': '🪙 領取金幣',
    'res-btn-share': '📸 分享成就卡',
    'res-btn-challenge': '🤝 挑戰好友',
    'res-btn-board': '🏆 排行榜',
    'res-btn-menu': '🏠 主選單',

    // ── 10. 排行榜與商城 ──
    'board-title': '🏆 <span>排行榜</span>',
    'board-tab-all': '全部',
    'board-tab-season': '🌟 本賽季',
    'board-tab-classic': '通關',
    'board-tab-infinite': '無限',
    'board-tab-timed': '限時',
    'board-btn-clear': '🗑 清空',
    'board-btn-menu': '← 返回主選單',
    'board-th-rank': '排名', 'board-th-name': '名稱', 'board-th-score': '分數', 'board-th-mode': '模式', 'board-th-diff': '難度', 'board-th-time': '時間', 'board-th-char': '角色', 'board-th-date': '日期',
    'shop-title': '🛒 <span>角色商城</span>',
    'shop-tab-chars': '角色', 'shop-tab-trails': '軌跡', 'shop-tab-hats': '頭飾',
    'shop-btn-menu': '← 返回主選單',

    // ── 11. 簽到與挑戰、法律 ──
    'signin-title': '📅 每日<span>簽到</span>',
    'signin-retro': '補簽次數: ',
    'signin-btn-close': '✖ 關閉',
    'week-sun': '日', 'week-mon': '一', 'week-tue': '二', 'week-wed': '三', 'week-thu': '四', 'week-fri': '五', 'week-sat': '六',
    'chal-title': '🤝 好友<span>挑戰</span>',
    'chal-tab-create': '建立挑戰', 'chal-tab-redeem': '接受挑戰', 'chal-tab-history': '紀錄',
    'chal-create-tip': '遊戲結束後，在結算畫面點「挑戰好友」即可產生挑戰內容；下方顯示你最近一次產生的內容，複製後貼給朋友。',
    'chal-btn-copy': '📋 複製內容', 'chal-btn-share': '📤 分享', 'chal-btn-close': '✖ 關閉',
    'chal-redeem-tip': '貼上朋友給你的挑戰碼（STS1- 開頭），按下方按鈕即可直接開始挑戰。',
    'chal-input-holder': '貼上好友的挑戰碼...', 'chal-btn-accept': '⚔️ 接受挑戰並開始',
    'share-title': '📸 分享<span>卡片</span>',
    'share-btn-do': '📤 分享', 'share-btn-dl': '💾 下載圖片', 'share-btn-close': '✖ 關閉',
    'legal-title': '🔒 隱私權與<span>安全聲明</span>',
    'legal-btn-agree': '同意並開始使用', 'legal-btn-close': '關閉',

    // ── 12. JS 動態渲染資料的 Key ──
    'char-blue-name': '藍騎士', 'char-blue-tag': '穩健型',
    'char-red-name': '紅勇士', 'char-red-tag': '攻擊型',
    'char-green-name': '綠精靈', 'char-green-tag': '速度型',
    'char-gold-name': '金武士', 'char-gold-tag': '輔助型',
    'char-violet-name': '紫幻靈', 'char-violet-tag': '神秘型',
    'char-cyan-name': '青電俠', 'char-cyan-tag': '閃電型',
    'char-pink-name': '粉花精', 'char-pink-tag': '治癒型',
    'char-orange-name': '橙焰將', 'char-orange-tag': '爆發型',
    'char-silver-name': '銀宇士', 'char-silver-tag': '宇宙型',
    'char-rainbow-name': '彩虹俠', 'char-rainbow-tag': '終極型',

    'mode-classic-name': '🎬 經典通關', 'mode-classic-desc': '達到 100% 進度即可獲勝，適合新手與基本訓練。',
    'mode-infinite-name': '♾️ 無盡模式', 'mode-infinite-desc': '沒有終點！盡你所能前進取得歷史最高分。',
    'mode-timed-name': '⏱️ 30秒鐘限時賽', 'mode-timed-desc': '在 30 秒內極速衝刺，考驗耐力與爆發力。',
    'mode-controlled-sit-name': '🪑 控制坐下', 'mode-controlled-sit-desc': '完成起立後先站立保持 3 秒，再依自訂秒數控制 Stand-to-Sit 下降；角色依控制分前進。',
    'mode-heel-control-name': '🦶 腳跟控制', 'mode-heel-control-desc': 'Heel Raise 到頂後保持 3 秒，再依自訂秒數控制腳跟下降；角色依控制分前進。',

    'diff-easy-name': '🟢 輕鬆', 'diff-easy-desc': '寬鬆的姿勢偵測與較長的綠燈時間。',
    'diff-normal-name': '🟡 標準', 'diff-normal-desc': '一般難度，適合日常核心與深蹲鍛鍊。',
    'diff-hard-name': '🔴 嚴格', 'diff-hard-desc': '極度嚴格的姿勢判定，紅燈轉化極快！',

    'trail-fire-name': '火焰軌跡', 'trail-fire-desc': '留下熾熱火焰效果',
    'trail-ice-name': '冰晶軌跡', 'trail-ice-desc': '留下冰藍光芒效果',
    'trail-star-name': '星光軌跡', 'trail-star-desc': '閃閃星光隨行效果',
    'trail-elec-name': '電光軌跡', 'trail-elec-desc': '閃電疾馳華麗特效',

    'hat-crown-name': '皇冠', 'hat-crown-desc': '高貴氣場象徵',
    'hat-glass-name': '酷炫墨鏡', 'hat-glass-desc': '潮流型男必備',
    'hat-halo-name': '神聖光環', 'hat-halo-desc': '散發天使神聖光芒',
    'hat-horn-name': '惡魔角', 'hat-horn-desc': '喚醒內心狂野本性',

    'legal-agree-text': '我已詳細閱讀並同意上述隱私權政策、攝影機使用說明與運動安全提醒',
    'shop-unlock-badge': '商城解鎖',
    'tut-hint-classic': '🏁 <strong>通關模式：</strong>走完全段距離即通關，剩餘時間轉為額外分數！',
    'tut-hint-infinite': '♾️ <strong>無盡挑戰：</strong>沒有終點！持續起立累積分數，直到被紅燈抓到為止，挑戰極限吧!',
    'tut-hint-timed': '⏱️ <strong>限時30秒：</strong>30秒倒數計時！時間內拼命衝分，時間到自動結算成績。',
    'tut-hint-score': '📊 <strong>計分：</strong>單次起立最高 +100 分（依姿勢標準度）。按 <strong>P</strong> 暫停。',
    'pause-score': '分數',
    'pause-reps': '次數',
    'prog-infinite': '分數累積中…',
    'prog-percent': '進度：',
    'cam-status-req': '請求攝影機串流...',
    'cam-status-load-mp': '載入mediapipe中...',
    'cam-status-download': '下載運算核心...',
    'cam-status-model': '載入模型...',
    'cam-status-ready': '即將啟動...',
    'game-start': '遊戲開始',
    'game-time': '遊戲時間',
    'err-red-stand': '紅燈時違規起立！必須保持坐下！',
    'err-red-move': '你在紅燈時移動了！',
    'fb-perfect': '完美起立！',
    'fb-good': '不錯喔！',
    'fb-straight': '請保持背部挺直',
    'res-caught-title': 'Game Over！',
    'res-win-title': '通關！',
    'res-win-sub': '你成功到達終點！',
    'res-timeup-title': '時間到！',
    'res-timeup-sub': '30秒挑戰結束！',
    'lbl-final-score': '最終分數',
    'lbl-completed-reps': '完成起立',
    'lbl-game-time': '遊戲時間',
    'lbl-complete-time': '完成時間',
    'lbl-total-sts': '總坐站次數',
    'lbl-time-bonus': '時間獎勵',
    'lbl-avg-score': '平均每次',
    'cr-base': '基礎（每10分=1枚）',
    'cr-diff': '難度倍率',
    'cr-mode': '模式加成',
    'cr-bonus': '特殊獎勵',
    'cr-total-held': '持有金幣',
    'chart-no-data': '資料不足',
    'chart-avg': '平均',
    'light-green-ui': '綠燈 — 自由起立',
    'light-yellow-ui': '黃燈 — 準備坐下！',
    'light-red-ui': '紅燈 — 保持坐下靜止！',
    'sts-sit': '坐下',
    'sts-forward': '前傾階段',
    'sts-rising': '起身中',
    'sts-please-sit': '請先坐下',
    'sts-stand-done': '站立完成',
    'detail-trunk': '軀幹前傾',
    'detail-knee': '膝部穩定(防內夾)',
    'detail-heel': '腳跟角度',
    'speech-calib-start': '請準備，校正開始，請先坐在椅子上',
    'speech-calib-stand': '請慢慢起立，並盡力墊腳尖',
    'speech-calib-sit-back': '很好，現在請完全坐回椅子上',
    'speech-calib-complete': '校正完成',
    'speech-body-not-found': '找不到人體，請走到鏡頭前',
    'speech-frame-incomplete': '畫面不完整，請稍微退後一點',
    'speech-hold-sit': '維持坐姿',
    // Calibration 畫面文字：動態 UI 也統一走 i18n/getText()
    'calib-ready': '請準備',
    'calib-align': '請準備，將肩膀與腰部對準鏡頭',
    'calib-body-not-found': '⚠️ 找不到人體：請確保「肩膀與腰部」在鏡頭內',
    'calib-frame-incomplete': '⚠️ 畫面不完整，請稍微退後',
    'calib-step-sit': '1/3 偵測成功！請先「坐在椅子上」保持不動',
    'calib-step-stand': '2/3 請慢慢「站起來」並盡力「墊腳尖」！',
    'calib-step-sit-back': '3/3 最後一步！請「完全坐回椅子上」',
    'calib-complete': '🟢 空間鎖定完成！',
    'calib-center-sit': '請坐下',
    'calib-center-tiptoe': '⬆️ 墊腳',
    'calib-center-sit-back': '⬇️ 坐回',
    'calib-center-complete': '✅ 完成',
    // JS 動態訊息
    'ai-thinking': 'AI 思考中…',
    'ai-no-reply': 'AI 暫時沒有回覆',
    'ai-error': 'AI 回覆失敗，請稍後再試',
    'diag-tip-label': '建議',
    'diag-analyzing': '🤖 AI 教練正在分析姿態中...（超時將切換本地診斷）',
    'privacy-consent-required': '請先閱讀並同意隱私權與安全聲明',
    'game-progress-infinite': '分數累積中…',
    'game-progress-normal': '進度：<span id="prog-txt">0%</span>',
    'cam-step-phone': '1/4 連接手機鏡頭...',
    'cam-step-webcam': '1/4 啟動電腦攝影機...',
    'cam-step-library': '2/4 下載 AI 函式庫...',
    'cam-step-wasm': '3/4 載入 WebAssembly 核心...',
    'cam-step-model': '4/4 初始化骨架模型...',
    'cam-start-failed': '攝影機啟動或模型載入失敗：',
    'board-empty': '還沒有紀錄，快去遊玩！🎮',
    'confirm-clear-board': '確定清空排行榜？',
    'shop-btn-equipped': '已裝備',
    'shop-btn-equip': '裝備',
    'shop-btn-buy': '購買',
    'shop-btn-broke': '金幣不足',
    'shop-unlocked': '已解鎖',
    'shop-equipped': '裝備中',
    'shop-owned': '已擁有',
    'shop-buy-confirm': '確定花 {cost} 🪙 購買「{name}」？',
    'ad-playing': '廣告播放中...',
    'ad-do-not-close': '請勿關閉視窗',
    'ad-reward-toast': '🪙 感謝觀看！獲得 500 金幣',

    'btn-claim': '領取',
    'btn-claimed': '已領取',
    'btn-share': '分享',
    'quest-reset-daily-lbl': '每日 00:00 重置',
    'quest-reset-weekly-lbl': '每週一重置',
    'ach-unlocked-title': '解鎖成就',
    'ach-unlocked-count': '已解鎖',
    'ach-tag-unlocked': '已解鎖',
    
    // 每日任務
    'q-d_reps10-lbl': '完成 10 次坐站',
    'q-d_gradeA-lbl': '取得 1 次 A 級以上姿勢',
    'q-d_games1-lbl': '遊玩 1 場遊戲',
    'q-d_signin-lbl': '完成今日簽到',
    
    // 每週任務
    'q-w_reps100-lbl': '累計完成 100 次坐站',
    'q-w_score2000-lbl': '累計獲得 2000 分',
    'q-w_games5-lbl': '遊玩 5 場遊戲',
    'q-w_signin5-lbl': '本週簽到 5 天',

    // 成就標題與描述 (範例)
    'ach-first_rep-name': '初次站立',
    'ach-first_rep-desc': '完成第一次坐站動作',

    'ach-rep_100-name': '站立達人',
    'ach-rep_100-desc': '累計完成100次坐站',

    'ach-rep_500-name': '站立大師',
    'ach-rep_500-desc': '累計完成500次坐站',

    'ach-perfect_pose-name': '完美姿勢',
    'ach-perfect_pose-desc': '單次姿勢分數達到滿分',

    'ach-combo_10-name': '連續達人',
    'ach-combo_10-desc': '單場內連續10次A級以上姿勢',

    'ach-classic_win-name': '通關新手',
    'ach-classic_win-desc': '完成一次通關模式',

    'ach-games_10-name': '熱身完畢',
    'ach-games_10-desc': '累計遊玩10場遊戲',

    'ach-games_50-name': '訓練狂人',
    'ach-games_50-desc': '累計遊玩50場遊戲',

    'ach-score_1000-name': '千分大關',
    'ach-score_1000-desc': '單場分數達到1000',

    'ach-signin_7-name': '簽到新星',
    'ach-signin_7-desc': '連續簽到7天',

    'ach-signin_30-name': '簽到王者',
    'ach-signin_30-desc': '連續簽到30天',

    'ach-collector_3-name': '收藏家',
    'ach-collector_3-desc': '在商城解鎖3款角色',

    'ach-challenger_1-name': '挑戰者',
    'ach-challenger_1-desc': '完成第一次好友挑戰',

    'ach-challenger_win5-name': '常勝軍',
    'ach-challenger_win5-desc': '贏得5次好友挑戰',

    'ach-season_1-name': '賽季先鋒',
    'ach-season_1-desc': '參與第一個賽季排行',

    'ach-season_champ-name': '賽季冠軍',
    'ach-season_champ-desc': '賽季結算時奪得本機排行榜第一',

    'cal-retro-fmt': '補簽: <span>{n}</span>/3 次',

    'legal-checkbox-label': '我已閱讀並同意上述條款與說明',
    'btn-agree': '同意並繼續',
    'btn-close': '關閉',

    // ── 賽季與挑戰 Toast & 提示文字 ──
    'toast-season-settle': '賽季結算！最佳分數',
    'toast-get-reward': '獲得',
    'quest-not-finished': '任務尚未完成喔！',
    'quest-completed-msg': '任務完成！獲得',
    'season-winner-fmt': '以',
    'season-score-unit': '分奪冠',
    'season-no-history': '尚無歷史賽季紀錄',
    'season-current-lbl': '本賽季',
    'season-reset-days': '距離重置還有',
    'chal-share-msg1': '我在《要拚要猛》坐站訓練拿到',
    'chal-share-msg2': '分！模式：',
    'chal-share-msg3': '你敢來超越嗎？',
    'chal-code-lbl': '挑戰碼：',
    'chal-no-code-tip': '尚未產生挑戰碼，先完成一場遊戲後在結算畫面點「挑戰好友」！',
    'toast-copied': '已複製到剪貼簿！',
    'toast-copy-failed': '複製失敗，請手動選取文字複製',
    'toast-copy-not-support': '此瀏覽器不支援自動複製，請手動選取文字',
    'chal-share-title': '要拚要猛 STS 訓練挑戰',
    'chal-parse-err': '挑戰碼無法解析，請確認貼上完整內容',
    'chal-ready-msg1': '即將挑戰「',
    'chal-ready-msg2': '」的 ',
    'chal-ready-msg3': '分！',
    'chal-no-history': '尚無挑戰紀錄',
    'chal-win-lbl': '獲勝',
    'chal-lose-lbl': '惜敗',
    'chal-my-score': '你的分數：',
    'share-card-game-title': '要拚要猛 · STS 姿勢訓練',
    'share-card-total-score': '本場總分',
    'share-card-done-reps': '完成',
    'share-card-reps-unit': '次坐站 · 用時',
    'share-card-invite': '一起來坐站訓練吧！',
    'toast-card-downloaded': '圖片已下載，快去分享到社群吧！',
    'chal-won-msg1': '你以',
    'chal-won-msg2': '分打敗了「',
    'chal-won-msg3': '」的',
    'chal-lost-msg1': '惜敗！差',
    'chal-lost-msg2': '分輸給「',
    'chal-lost-msg3': '」，再接再勵！'
  },
  'en': {
    // ── 1. Settings ──
    'set-title': '⚙️ Game<span>Settings</span>',
    'lbl-set-lang': 'Language',
    'lbl-set-mute': 'Sound Effects',
    'lbl-set-part': 'Background Particles',
    'set-back-btn': 'Confirm & Back',
    'set-mute-on': 'Playing',
    'set-mute-off': 'Muted',
    'set-part-on': 'On',
    'set-part-off': 'Off',

    // ── 2. Tooltips ──
    'title-signin': 'Daily Check-in',
    'title-quests': 'Daily/Weekly Quests',
    'title-achievements': 'Achievements',
    'title-challenge': 'Friend Challenge',
    'title-legal': 'Privacy & Safety',
    'title-shop': 'Shop',
    'title-board': 'Leaderboard',
    'title-tutorial': 'Rules',
    'title-settings': 'Settings',
    'title-ai-coach': 'Call AI Coach',

    // ── 3. AI Chat ──
    'ai-title': 'AI <span>Coach</span>',
    'ai-welcome': 'Hello! I am your AI Coach. How can I help you today?',
    'ai-preset-rules': 'Game Rules',
    'ai-preset-benefits': 'Benefits',
    'ai-preset-skills': 'High Score Tips',
    'ai-input-holder': 'Ask me anything...',
    'ai-btn-send': 'Send',

    // ── 4. Main Menu ──
    'menu-logo-title': '123<span>WoodenMan</span>',
    'menu-logo-sub': 'PRO — Posture Correction',
    'menu-btn-start': 'Start Game',
    'menu-btn-ad': 'Watch Ad for 500 🪙',
    'menu-legal-footer': '🔒 Privacy Policy ・ Camera Usage ・ Safety Warning',
    'btn-back': '← Back',
    'btn-back-menu': '← Main Menu',

    // ── 5. Screen Titles ──
    'chars-title': 'Select <span>Character</span>',
    'chars-next': 'Next: Mode →',
    'mode-title': 'Select <span>Mode</span>',
    'mode-next': 'Next: Difficulty →',
    'mode-start-control': 'Start Training ▶',
    'control-target-label': 'Target lowering time',
    'control-target-hint': 'Both control modes first use a fixed 5-second hold; this setting only controls the lowering cadence and is not a medical normal value.',
    'diff-title': 'Select <span>Difficulty</span>',
    'diff-next': 'Launch ▶',

    // ── 6. Tutorial ──
    'tut-title': 'Game <span>Rules</span>',
    'tut-cap-stand': 'Stand',
    'tut-cap-sit': 'Sit',
    'tut-cap-tiptoe': 'Tiptoe',
    'tut-cap-step': '= +1 Step!',
    'tut-head-green': 'Green Light',
    'tut-body-green': 'Complete <strong>Stand➔Sit➔Stand➔Tiptoe</strong> to move.<br>Better posture means bigger steps.',
    'tut-head-yellow': 'Yellow Light',
    'tut-body-yellow': '<strong>Triggers after standing up</strong>.<br>Get ready to <strong>SIT DOWN</strong>.',
    'tut-head-red': 'Red Light',
    'tut-body-red': 'Must remain <strong>SEATED & STILL</strong>.<br>Any movement or standing up causes<br><strong style="color:var(--red)">Game Over!</strong>',
    'tut-safety-note': '⚠️ <strong>Safety Warning:</strong> This game is for general exercise reference only, not a medical device. Consult a doctor if you have medical conditions. Stop immediately if you feel uncomfortable.',
    'tut-safety-more': 'View Full Disclaimer →',
    'tut-btn-menu': '← Back to Menu',
    'tut-btn-chars': 'Select Character ▶',

    // ── 7. Quests & Achievements ──
    'quests-title': 'Daily <span>Quests</span>',
    'quests-daily-sec': '📅 Daily Quests',
    'quests-weekly-sec': '🗓️ Weekly Quests',
    'quests-btn-menu': '← Main Menu',
    'ach-title': 'Medals & <span>Badges</span>',
    'ach-btn-menu': '← Main Menu',

    // ── 8. In-Game UI ──
    'game-light-green': '🟢 Green Light — Move Freely',
    'game-light-yellow': '🟡 Yellow Light — Prepare to Sit',
    'game-light-red': '🔴 Red Light — FREEZE!',
    'game-timer-lbl': 'Time Left',
    'game-state-body': 'Game Start',
    'game-state-lbl': 'Current State',
    'game-rep-lbl': 'Reps',
    'game-posture-lbl': 'Posture Score',
    'game-control-score-lbl': 'Control Score',
    'game-rep-remaining': 'Rep remaining',
    'game-hold-remaining': 'Hold remaining',
    'game-control-ready': 'Ready for controlled movement',
    'game-control-hold': 'Hold standing position',
    'game-control-hold-recover': 'Stand steady and restart the hold',
    'game-control-wait-descent': 'Hold complete — begin controlled sitting',
    'game-control-sit': 'Controlled descent',
    'game-heel-stand': 'Stand steadily first',
    'game-heel-baseline': 'Heel down, prepare to raise',
    'game-heel-raising': 'Raising heel',
    'game-heel-peak': 'Peak reached',
    'game-heel-hold': 'Hold at the top',
    'game-heel-hold-recover': 'Return to the top and restart the hold',
    'game-heel-wait-lower': 'Hold complete — begin controlled lowering',
    'game-heel-lowering': 'Controlled lowering',
    'game-score-lbl': 'Score',
    'game-prog-lbl': 'Progress: ',
    'game-cam-status': 'Starting Camera...',
    'game-hud-light': 'Light',
    'game-hud-streak': 'Good Streak',
    'game-move-warn': '⚠️ Movement Detected!',
    'game-rep-fb': 'Stand Up Done!',

    // ── 9. Pause & Result ──
    'pause-title': 'Paused',
    'pause-sub': 'Press P or click Resume to continue',
    'pause-btn-resume': '▶ Resume',
    'pause-btn-quit': '🏠 Main Menu',
    'reward-title': 'Coin Reward!',
    'reward-btn-restart': '🔄 Play Again',
    'reward-btn-board': '🏆 Leaderboard',
    'reward-btn-menu': '🏠 Main Menu',
    'res-name-lbl': 'Enter Name (3 chars):',
    'res-btn-collect': '🪙 Collect Coins',
    'res-btn-share': '📸 Share Card',
    'res-btn-challenge': '🤝 Challenge Friend',
    'res-btn-board': '🏆 Leaderboard',
    'res-btn-menu': '🏠 Main Menu',

    // ── 10. Board & Shop ──
    'board-title': '🏆 <span>Leaderboard</span>',
    'board-tab-all': 'All',
    'board-tab-season': '🌟 Season',
    'board-tab-classic': 'Classic',
    'board-tab-infinite': 'Infinite',
    'board-tab-timed': 'Timed',
    'board-btn-clear': '🗑 Clear',
    'board-btn-menu': '← Main Menu',
    'board-th-rank': 'Rank', 'board-th-name': 'Name', 'board-th-score': 'Score', 'board-th-mode': 'Mode', 'board-th-diff': 'Diff', 'board-th-time': 'Time', 'board-th-char': 'Char', 'board-th-date': 'Date',
    'shop-title': '🛒 <span>Skin Shop</span>',
    'shop-tab-chars': 'Character', 'shop-tab-trails': 'Trail', 'shop-tab-hats': 'Hat',
    'shop-btn-menu': '← Main Menu',

    // ── 11. Other Overlays ──
    'signin-title': '📅 Daily <span>Sign-in</span>',
    'signin-retro': 'Check-in Refills: ',
    'signin-btn-close': '✖ Close',
    'week-sun': 'Sun', 'week-mon': 'Mon', 'week-tue': 'Tue', 'week-wed': 'Wed', 'week-thu': 'Thu', 'week-fri': 'Fri', 'week-sat': 'Sat',
    'chal-title': '🤝 Friend <span>Challenge</span>',
    'chal-tab-create': 'Create', 'chal-tab-redeem': 'Accept', 'chal-tab-history': 'History',
    'chal-create-tip': 'After a game, click "Challenge Friend" on the result screen to generate a code.',
    'chal-btn-copy': '📋 Copy Content', 'chal-btn-share': '📤 Share', 'chal-btn-close': '✖ Close',
    'chal-redeem-tip': 'Paste the challenge code (starts with STS1-) below to start immediately.',
    'chal-input-holder': 'Paste challenge code here...', 'chal-btn-accept': '⚔️ Accept & Launch',
    'share-title': '📸 Share <span>Card</span>',
    'share-btn-do': '📤 Share', 'share-btn-dl': '💾 Download', 'share-btn-close': '✖ Close',
    'legal-title': '🔒 Privacy & <span>Safety</span>',
    'legal-btn-agree': 'Agree and Start', 'legal-btn-close': 'Close',

    // ── 12. Dynamic Values ──
    'char-blue-name': 'Blue Knight', 'char-blue-tag': 'Balanced',
    'char-red-name': 'Red Warrior', 'char-red-tag': 'Aggressive',
    'char-green-name': 'Green Elf', 'char-green-tag': 'Speedy',
    'char-gold-name': 'Gold Samurai', 'char-gold-tag': 'Support',
    'char-violet-name': 'Violet Spirit', 'char-violet-tag': 'Mystic',
    'char-cyan-name': 'Cyan Flash', 'char-cyan-tag': 'Electric',
    'char-pink-name': 'Pink Pixie', 'char-pink-tag': 'Healing',
    'char-orange-name': 'Orange General', 'char-orange-tag': 'Burst',
    'char-silver-name': 'Silver Space', 'char-silver-tag': 'Cosmic',
    'char-rainbow-name': 'Rainbow Man', 'char-rainbow-tag': 'Ultimate',

    'mode-classic-name': '🎬 Classic', 'mode-classic-desc': 'Reach 100% progress to win. Best for beginners.',
    'mode-infinite-name': '♾️ Infinite', 'mode-infinite-desc': 'No limits! Go as far as you can for the high score.',
    'mode-timed-name': '⏱️ 2-Min Time Attack', 'mode-timed-desc': 'Dash for 120 seconds. Tests your endurance.',
    'mode-controlled-sit-name': '🪑 Controlled Sit', 'mode-controlled-sit-desc': 'After standing, hold for 3 seconds, then sit down over your chosen time. Character movement follows control score.',
    'mode-heel-control-name': '🦶 Heel Control', 'mode-heel-control-desc': 'At the top of a heel raise, hold for 3 seconds, then lower over your chosen time. Character movement follows control score.',

    'diff-easy-name': '🟢 Easy', 'diff-easy-desc': 'Lenient detection and longer green light durations.',
    'diff-normal-name': '🟡 Normal', 'diff-normal-desc': 'Standard mode. Great for core and squats routine.',
    'diff-hard-name': '🔴 Hard', 'diff-hard-desc': 'Strict posture checking. Red light switches fast!',

    'trail-fire-name': 'Fire Trail', 'trail-fire-desc': 'Blazing fire trail effect.',
    'trail-ice-name': 'Ice Trail', 'trail-ice-desc': 'Frozen crystal blue aura.',
    'trail-star-name': 'Star Trail', 'trail-star-desc': 'Sparkling stars follow you.',
    'trail-elec-name': 'Lightning Trail', 'trail-elec-desc': 'Flashy electric speed particles.',

    'hat-crown-name': 'Crown', 'hat-crown-desc': 'Symbol of noble power.',
    'hat-glass-name': 'Sunglasses', 'hat-glass-desc': 'Cool and stylish necessity.',
    'hat-halo-name': 'Holy Halo', 'hat-halo-desc': 'Emits divine angel light.',
    'hat-horn-name': 'Devil Horns', 'hat-horn-desc': 'Awaken your inner wild power.',

    'legal-agree-text': 'I have read and agree to the Privacy Policy, Camera Usage, and Safety Warning',
    'shop-unlock-badge': 'Unlock in Shop',
    'tut-hint-classic': '🏁 <strong>Classic:</strong> Reach the finish line! Remaining time becomes bonus points.',
    'tut-hint-infinite': '♾️ <strong>Infinite:</strong> No finish line! Keep scoring until the red light catches you.',
    'tut-hint-timed': '⏱️ <strong>Timed (30s):</strong> Score as much as possible in 30 seconds!',
    'tut-hint-score': '📊 <strong>Scoring:</strong> Up to +100 pts per stand (based on posture). Press <strong>P</strong> to pause.',
    'pause-score': 'Score',
    'pause-reps': 'Reps',
    'prog-infinite': 'Accumulating Score...',
    'prog-percent': 'Progress: ',
    'cam-status-req': 'Requesting Camera...',
    'cam-status-load-mp': 'Loading MediaPipe...',
    'cam-status-download': 'Downloading Core...',
    'cam-status-model': 'Loading Model...',
    'cam-status-ready': 'Starting...',
    'game-start': 'Game Started',
    'game-time': 'Time',
    'err-red-stand': 'Illegal stand on Red Light! Must stay seated!',
    'err-red-move': 'You moved on Red Light!',
    'fb-perfect': 'Perfect Stand!',
    'fb-good': 'Good job!',
    'fb-straight': 'Keep your back straight',
    'res-caught-title': 'Game Over!',
    'res-win-title': 'Victory!',
    'res-win-sub': 'You reached the finish line!',
    'res-timeup-title': 'Time Up!',
    'res-timeup-sub': '30s challenge ended!',
    'lbl-final-score': 'Final Score',
    'lbl-completed-reps': 'Reps Completed',
    'lbl-game-time': 'Game Time',
    'lbl-complete-time': 'Clear Time',
    'lbl-total-sts': 'Total STS Reps',
    'lbl-time-bonus': 'Time Bonus',
    'lbl-avg-score': 'Avg per Rep',
    'cr-base': 'Base (1 Coin / 10 Pts)',
    'cr-diff': 'Difficulty Multiplier',
    'cr-mode': 'Mode Multiplier',
    'cr-bonus': 'Bonus Coins',
    'cr-total-held': 'Total Coins',
    'chart-no-data': 'Not enough data',
    'chart-avg': 'Avg',
    'light-green-ui': 'GREEN LIGHT — Stand Up Freely',
    'light-yellow-ui': 'YELLOW LIGHT — Get Ready to Sit!',
    'light-red-ui': 'RED LIGHT — Stay Seated & Freeze!',
    'sts-sit': 'Seated',
    'sts-forward': 'Leaning Forward',
    'sts-rising': 'Rising',
    'sts-please-sit': 'Please Sit First',
    'sts-stand-done': 'Standing Complete',
    'detail-trunk': 'Trunk Lean',
    'detail-heel': 'Heel Angle',
    'detail-knee': 'Knee Stability',
    'speech-calib-start': 'Get ready. Calibration starts now. Please sit on the chair.',
    'speech-calib-stand': 'Stand up slowly and rise onto your toes.',
    'speech-calib-sit-back': 'Good. Now sit fully back down on the chair.',
    'speech-calib-complete': 'Calibration complete.',
    'speech-body-not-found': 'I cannot detect your body. Please move into the camera view.',
    'speech-frame-incomplete': 'Your body is not fully visible. Please move slightly farther back.',
    'speech-hold-sit': 'Hold the seated position.',
    // Calibration visual text
    'calib-ready': 'Get Ready',
    'calib-align': 'Get ready. Keep your shoulders and hips inside the camera view.',
    'calib-body-not-found': '⚠️ Body not detected: keep your shoulders and hips in the camera view.',
    'calib-frame-incomplete': '⚠️ Your body is not fully visible. Please move slightly farther back.',
    'calib-step-sit': '1/3 Detected! Sit on the chair and hold still.',
    'calib-step-stand': '2/3 Stand up slowly and rise onto your toes!',
    'calib-step-sit-back': '3/3 Final step! Sit fully back down on the chair.',
    'calib-complete': '🟢 Calibration complete!',
    'calib-center-sit': 'Sit',
    'calib-center-tiptoe': '⬆️ Tiptoe',
    'calib-center-sit-back': '⬇️ Sit Back',
    'calib-center-complete': '✅ Done',
    // Dynamic JS messages
    'ai-thinking': 'AI is thinking…',
    'ai-no-reply': 'AI did not return a response.',
    'ai-error': 'AI response failed. Please try again later.',
    'diag-tip-label': 'Tip',
    'diag-analyzing': '🤖 AI coach is analyzing your posture... (local fallback will be used on timeout)',
    'privacy-consent-required': 'Please read and accept the Privacy & Safety Notice first.',
    'game-progress-infinite': 'Score accumulating…',
    'game-progress-normal': 'Progress: <span id="prog-txt">0%</span>',
    'cam-step-phone': '1/4 Connecting phone camera...',
    'cam-step-webcam': '1/4 Starting computer camera...',
    'cam-step-library': '2/4 Loading AI library...',
    'cam-step-wasm': '3/4 Loading WebAssembly core...',
    'cam-step-model': '4/4 Initializing pose model...',
    'cam-start-failed': 'Camera startup or model loading failed: ',
    'board-empty': 'No records yet. Go play! 🎮',
    'confirm-clear-board': 'Are you sure you want to clear the leaderboard?',
    'shop-btn-equipped': 'Equipped',
    'shop-btn-equip': 'Equip',
    'shop-btn-buy': 'Buy',
    'shop-btn-broke': 'Need Coins',
    'shop-unlocked': 'Unlocked',
    'shop-equipped': 'Equipped',
    'shop-owned': 'Owned',
    'shop-buy-confirm': 'Spend {cost} 🪙 to buy "{name}"?',
    'ad-playing': 'Ad playing...',
    'ad-do-not-close': 'Please do not close window',
    'ad-reward-toast': '🪙 Thanks for watching! Got 500 Coins',

    'btn-claim': 'Claim',
    'btn-claimed': 'Claimed',
    'btn-share': 'Share',
    'quest-reset-daily-lbl': 'Resets daily at 00:00',
    'quest-reset-weekly-lbl': 'Resets every Monday',
    'ach-unlocked-title': 'Achievement Unlocked',
    'ach-unlocked-count': 'Unlocked',
    'ach-tag-unlocked': 'Unlocked',
    
    // Daily Quests
    'q-d_reps10-lbl': 'Complete 10 STS reps',
    'q-d_gradeA-lbl': 'Achieve Grade A posture once',
    'q-d_games1-lbl': 'Play 1 game',
    'q-d_signin-lbl': 'Complete daily sign-in',
    
    // Weekly Quests
    'q-w_reps100-lbl': 'Complete 100 STS reps total',
    'q-w_score2000-lbl': 'Accumulate 2000 points',
    'q-w_games5-lbl': 'Play 5 games',
    'q-w_signin5-lbl': 'Sign in 5 days this week',

    // Achievements
    'ach-first_rep-name': 'First Stand',
    'ach-first_rep-desc': 'Complete your first STS repetition',

    'ach-rep_100-name': 'Stand Expert',
    'ach-rep_100-desc': 'Complete 100 STS repetitions in total',

    'ach-rep_500-name': 'Stand Master',
    'ach-rep_500-desc': 'Complete 500 STS repetitions in total',

    'ach-perfect_pose-name': 'Perfect Form',
    'ach-perfect_pose-desc': 'Achieve a perfect posture score on a single rep',

    'ach-combo_10-name': 'Combo Master',
    'ach-combo_10-desc': 'Perform 10 consecutive Grade-A postures in one game',

    'ach-classic_win-name': 'Rookie Clearance',
    'ach-classic_win-desc': 'Complete Classic Mode once',

    'ach-games_10-name': 'Warmed Up',
    'ach-games_10-desc': 'Play 10 games in total',

    'ach-games_50-name': 'Training Fanatic',
    'ach-games_50-desc': 'Play 50 games in total',

    'ach-score_1000-name': '1000 Points Club',
    'ach-score_1000-desc': 'Score 1,000 points in a single game',

    'ach-signin_7-name': 'Sign-in Rising Star',
    'ach-signin_7-desc': 'Sign in for 7 consecutive days',

    'ach-signin_30-name': 'Sign-in King',
    'ach-signin_30-desc': 'Sign in for 30 consecutive days',

    'ach-collector_3-name': 'Character Collector',
    'ach-collector_3-desc': 'Unlock 3 characters in the Shop',

    'ach-challenger_1-name': 'Challenger',
    'ach-challenger_1-desc': 'Complete your first Friend Challenge',

    'ach-challenger_win5-name': 'Streak Champion',
    'ach-challenger_win5-desc': 'Win 5 Friend Challenges',

    'ach-season_1-name': 'Season Pioneer',
    'ach-season_1-desc': 'Participate in a seasonal leaderboard',

    'ach-season_champ-name': 'Season Champion',
    'ach-season_champ-desc': 'Finish 1st on the leaderboard at season reset',

    'cal-retro-fmt': 'Make-up: <span>{n}</span>/3',

    'legal-checkbox-label': 'I have read and agree to the terms and privacy policy',
    'btn-agree': 'Agree & Continue',
    'btn-close': 'Close',

    // ── Common UI ──
    'btn-claim': 'Claim',
    'btn-claimed': 'Claimed',
    'btn-share': 'Share',
    'quest-reset-daily-lbl': 'Resets daily at 00:00',
    'quest-reset-weekly-lbl': 'Resets every Monday',
    'ach-unlocked-title': 'Achievement Unlocked',
    'ach-unlocked-count': 'Unlocked',
    'ach-tag-unlocked': 'Unlocked',
    'score-unit': 'pts',
    'day-unit': 'days',

    // ── Daily Quests ──
    'q-d_reps10-lbl': 'Complete 10 STS reps',
    'q-d_gradeA-lbl': 'Achieve Grade A posture once',
    'q-d_games1-lbl': 'Play 1 game',
    'q-d_signin-lbl': 'Complete daily sign-in',

    // ── Weekly Quests ──
    'q-w_reps100-lbl': 'Complete 100 STS reps total',
    'q-w_score2000-lbl': 'Accumulate 2,000 points',
    'q-w_games5-lbl': 'Play 5 games',
    'q-w_signin5-lbl': 'Sign in 5 days this week',

    // ── 16 Achievements (English) ──
    'ach-first_rep-name': 'First Stand',
    'ach-first_rep-desc': 'Complete your first STS repetition',

    'ach-rep_100-name': 'Stand Expert',
    'ach-rep_100-desc': 'Complete 100 STS repetitions in total',

    'ach-rep_500-name': 'Stand Master',
    'ach-rep_500-desc': 'Complete 500 STS repetitions in total',

    'ach-perfect_pose-name': 'Perfect Form',
    'ach-perfect_pose-desc': 'Achieve a perfect posture score on a single rep',

    'ach-combo_10-name': 'Combo Master',
    'ach-combo_10-desc': 'Perform 10 consecutive Grade-A postures in one game',

    'ach-classic_win-name': 'Rookie Clearance',
    'ach-classic_win-desc': 'Complete Classic Mode once',

    'ach-games_10-name': 'Warmed Up',
    'ach-games_10-desc': 'Play 10 games in total',

    'ach-games_50-name': 'Training Fanatic',
    'ach-games_50-desc': 'Play 50 games in total',

    'ach-score_1000-name': '1000 Points Club',
    'ach-score_1000-desc': 'Score 1,000 points in a single game',

    'ach-signin_7-name': 'Sign-in Rising Star',
    'ach-signin_7-desc': 'Sign in for 7 consecutive days',

    'ach-signin_30-name': 'Sign-in King',
    'ach-signin_30-desc': 'Sign in for 30 consecutive days',

    'ach-collector_3-name': 'Character Collector',
    'ach-collector_3-desc': 'Unlock 3 characters in the Shop',

    'ach-challenger_1-name': 'Challenger',
    'ach-challenger_1-desc': 'Complete your first Friend Challenge',

    'ach-challenger_win5-name': 'Streak Champion',
    'ach-challenger_win5-desc': 'Win 5 Friend Challenges',

    'ach-season_1-name': 'Season Pioneer',
    'ach-season_1-desc': 'Participate in a seasonal leaderboard',

    'ach-season_champ-name': 'Season Champion',
    'ach-season_champ-desc': 'Finish 1st on the leaderboard at season reset',

    // ── Season & Challenge Toasts & Labels ──
    'toast-season-settle': 'Season Settlement! Top Score:',
    'toast-get-reward': 'Rewarded',
    'quest-not-finished': 'Quest not finished yet!',
    'quest-completed-msg': 'Quest completed! Reward:',
    'season-winner-fmt': 'won with',
    'season-score-unit': 'pts',
    'season-no-history': 'No season history yet',
    'season-current-lbl': 'Current Season',
    'season-reset-days': 'Resets in',
    'chal-share-msg1': 'I scored',
    'chal-share-msg2': 'pts in STS Training! Mode: ',
    'chal-share-msg3': 'Dare to beat me?',
    'chal-code-lbl': 'Challenge Code: ',
    'chal-no-code-tip': 'No code generated yet! Finish a game and tap "Challenge Friend" on the result screen.',
    'toast-copied': 'Copied to clipboard!',
    'toast-copy-failed': 'Copy failed, please select and copy manually.',
    'toast-copy-not-support': 'Clipboard API not supported. Please copy manually.',
    'chal-share-title': 'STS Training Challenge',
    'chal-parse-err': 'Failed to parse code. Please make sure it is complete.',
    'chal-ready-msg1': 'Challenging "',
    'chal-ready-msg2': '" with ',
    'chal-ready-msg3': ' pts!',
    'chal-no-history': 'No challenge history yet',
    'chal-win-lbl': 'Victory',
    'chal-lose-lbl': 'Defeat',
    'chal-my-score': 'Your score: ',
    'share-card-game-title': 'STS Pose Training',
    'share-card-total-score': 'Total Score',
    'share-card-done-reps': 'Completed',
    'share-card-reps-unit': 'reps · Time:',
    'share-card-invite': 'Let\'s train together!',
    'toast-card-downloaded': 'Image downloaded! Share it on social media!',
    'chal-won-msg1': 'You beat "',
    'chal-won-msg2': '"\'s ',
    'chal-won-msg3': ' pts with ',
    'chal-lost-msg1': 'Defeated! Missed by ',
    'chal-lost-msg2': ' pts against "',
    'chal-lost-msg3': '". Try again!'
  }
};

// ── 以下為調整成翻譯 Key 結構的寫死陣列 ──
const BASE_CHARS = [
  { id: 'blue', nameKey: 'char-blue-name', tagKey: 'char-blue-tag', color: '#2080FF', acc: '#80C0FF', badge: '🔵', free: true },
  { id: 'red', nameKey: 'char-red-name', tagKey: 'char-red-tag', color: '#FF3050', acc: '#FF9090', badge: '🔴', free: true },
  { id: 'green', nameKey: 'char-green-name', tagKey: 'char-green-tag', color: '#00CC6A', acc: '#7AFFA6', badge: '🟢', free: true }
];

const SHOP_CHARS = [
  { id: 'gold', nameKey: 'char-gold-name', tagKey: 'char-gold-tag', color: '#FFD700', acc: '#FFF4B3', badge: '🟡', cost: 1200 },
  { id: 'violet', nameKey: 'char-violet-name', tagKey: 'char-violet-tag', color: '#B026FF', acc: '#E6B3FF', badge: '🟣', cost: 1500 },
  { id: 'cyan', nameKey: 'char-cyan-name', tagKey: 'char-cyan-tag', color: '#00E5FF', acc: '#B3F7FF', badge: '🌐', cost: 1800 },
  { id: 'pink', nameKey: 'char-pink-name', tagKey: 'char-pink-tag', color: '#FF66B2', acc: '#FFCCE6', badge: '🌸', cost: 2000 },
  { id: 'orange', nameKey: 'char-orange-name', tagKey: 'char-orange-tag', color: '#FF6600', acc: '#FFCCB3', badge: '🟠', cost: 2500 },
  { id: 'silver', nameKey: 'char-silver-name', tagKey: 'char-silver-tag', color: '#CCCCCC', acc: '#FFFFFF', badge: '⚪', cost: 3000 },
  { id: 'rainbow', nameKey: 'char-rainbow-name', tagKey: 'char-rainbow-tag', color: 'linear-gradient(45deg,#FF0000,#00FF00,#0000FF)', acc: '#FFFFFF', badge: '🌈', cost: 5000 }
];

const SHOP_TRAILS = [
  { id: 'trail_fire', nameKey: 'trail-fire-name', descKey: 'trail-fire-desc', cost: 400, preview: '🔥' },
  { id: 'trail_ice', nameKey: 'trail-ice-name', descKey: 'trail-ice-desc', cost: 600, preview: '❄️' },
  { id: 'trail_star', nameKey: 'trail-star-name', descKey: 'trail-star-desc', cost: 800, preview: '⭐' },
  { id: 'trail_elec', nameKey: 'trail-elec-name', descKey: 'trail-elec-desc', cost: 1200, preview: '⚡' }
];

const SHOP_HATS = [
  { id: 'hat_crown', nameKey: 'hat-crown-name', descKey: 'hat-crown-desc', cost: 500, preview: '👑' },
  { id: 'hat_glass', nameKey: 'hat-glass-name', descKey: 'hat-glass-desc', cost: 300, preview: '🕶️' },
  { id: 'hat_halo', nameKey: 'hat-halo-name', descKey: 'hat-halo-desc', cost: 1000, preview: '😇' },
  { id: 'hat_horn', nameKey: 'hat-horn-name', descKey: 'hat-horn-desc', cost: 800, preview: '😈' }
];

const MODES = {
  classic: { nameKey: 'mode-classic-name', descKey: 'mode-classic-desc', coinMul: 1.0 },
  infinite: { nameKey: 'mode-infinite-name', descKey: 'mode-infinite-desc', coinMul: 1.0 },
  timed: { nameKey: 'mode-timed-name', descKey: 'mode-timed-desc', coinMul: 1.0 },
  controlled_sit: { nameKey: 'mode-controlled-sit-name', descKey: 'mode-controlled-sit-desc', coinMul: 1.0, controlMode: true },
  heel_control: { nameKey: 'mode-heel-control-name', descKey: 'mode-heel-control-desc', coinMul: 1.0, controlMode: true }
};

const DIFFS = {
  'easy': { 
    nameKey: 'diff-easy-name', 
    descKey: 'diff-easy-desc', 
    thresh: 25, 
    gMin: 5,   // 🟢 綠燈最短秒數
    gMax: 8,   // 🟢 綠燈最長秒數
    rMin: 2,   // 🔴 紅燈最短秒數
    rMax: 3.5,   // 🔴 紅燈最長秒數
    coinMul: 1.5 // 金幣倍率 (如果有用到的話)
  },
  'normal': { 
    nameKey: 'diff-normal-name', 
    descKey: 'diff-normal-desc', 
    thresh: 18, 
    gMin: 3.5, 
    gMax: 6.5, 
    rMin: 1.5, 
    rMax: 2.5, 
    coinMul: 2.5 
  },
  'hard': { 
    nameKey: 'diff-hard-name', 
    descKey: 'diff-hard-desc', 
    thresh: 12, 
    gMin: 2.5, 
    gMax: 5.5, 
    rMin: 1, 
    rMax: 2, 
    coinMul: 3 
  }
};

// 獲取目前字典語系翻譯，若找不到則回傳 Key 自身
function getText(key) {
  const lang = gameSettings.lang || 'zh-TW';
  return (i18n[lang] && i18n[lang][key]) || (i18n['zh-TW'] && i18n['zh-TW'][key]) || key;
}

/* ── AI 聊天助手邏輯 ── */
function toggleAIChat() {
  ensureAudio();
  playSfx('click');
  const chatWindow = document.getElementById('ai-chat-window');
  if (!chatWindow) return;
  chatWindow.classList.toggle('off');
  if (!chatWindow.classList.contains('off')) {
    const input = document.getElementById('ai-chat-input');
    if (input) input.focus();
  }
}

function sendPreset(question) {
  const inputEl = document.getElementById('ai-chat-input');
  if (!inputEl) return;
  inputEl.value = question;
  sendAIMessage();
}

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[ch]));
}

async function sendAIMessage() {
  const inputEl = document.getElementById('ai-chat-input');
  const historyEl = document.getElementById('ai-chat-history');
  if (!inputEl || !historyEl) return;

  const text = inputEl.value.trim();
  if (!text) return;

  historyEl.innerHTML += `<div class="chat-msg-user">${escapeHTML(text)}</div>`;
  inputEl.value = '';
  historyEl.scrollTop = historyEl.scrollHeight;

  const loadingId = 'loading-' + Date.now();
  historyEl.innerHTML += `<div id="${loadingId}" class="chat-msg-ai"><div class="spinner" style="width:14px;height:14px;border-width:2px;display:inline-block;vertical-align:middle;margin-right:6px;"></div>${getText('ai-thinking')}</div>`;
  historyEl.scrollTop = historyEl.scrollHeight;

  const API_KEY = 'AQ.Ab8RN6K23brKRZKiiDsM9blk22_I8j-N2DkZeSEPs-V2aLznUA';
  const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=' + API_KEY.trim();
  const currentLang = (gameSettings.lang === 'en') ? 'English' : '繁體中文';
  const promptText = `
你現在是《123木頭人 PRO 姿勢矯正版》的專屬 AI 健身教練。

【回答絕對守則】
1. 必須極度精簡，不說廢話，條理分明，盡量控制在 50 字以內。
2. 只回答與「123木頭人遊戲機制、規則、操作」或「坐站訓練(STS)、姿勢矯正、運動健康」相關的問題。
3. 若玩家詢問上述範圍以外的任何內容，請直接且唯一回覆：「抱歉，我只能回答與『本遊戲規則』或『坐站訓練』相關的問題喔！請針對相關主題提問。」
4. ⚠️ 強制要求：請務必使用【${currentLang}】來回答玩家的所有問題。

【背景知識】
遊戲規則：綠燈時完成站➔坐➔站➔墊腳可前進；黃燈時要準備坐下；紅燈時必須保持坐下且靜止。
坐站訓練好處：鍛鍊大腿股四頭肌、臀大肌與核心，提升下肢肌力、預防跌倒，改善久坐。
高分技巧：動作穩定、站起時保持軀幹控制、腳跟角度良好，並在紅燈時維持坐下靜止。

玩家提問：${text}
`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API 錯誤詳情:', errText);
      throw new Error(`伺服器錯誤：${response.status}`);
    }

    const data = await response.json();
    const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || getText('ai-no-reply');
    const loadingEl = document.getElementById(loadingId);
    if (loadingEl) loadingEl.innerHTML = escapeHTML(aiReply).replace(/\n/g, '<br>');
  } catch (error) {
    const loadingEl = document.getElementById(loadingId);
    if (loadingEl) loadingEl.innerText = getText('ai-error');
    console.error('AI Error:', error);
  }

  historyEl.scrollTop = historyEl.scrollHeight;
}

/* ── 遊戲設定核心邏輯：音效、粒子 ── */
function openSettings() {
  applySettingsToUI();
  const modal = document.getElementById('ov-settings');
  if (modal) modal.classList.remove('off');
}

/* 遊戲畫面右上角設定鍵專用：先暫停遊戲，再打開跟主選單一致的設定面板 */
function openInGameSettings() {
  if (gState === 'playing') {
    pauseGame();
    settingsPausedGame = true;
  }
  openSettings();
}

function closeSettings() {
  const modal = document.getElementById('ov-settings');
  if (modal) modal.classList.add('off');
  const save = loadSave();
  save.gameSettings = gameSettings;
  writeSave(save);
  if (settingsPausedGame) {
    settingsPausedGame = false;
    resumeGame();
  }
}


// 核心：套用語言文字到 DOM 的函式
function applyLanguageUI() {
  const lang = gameSettings.lang || 'zh-TW';
  const dict = i18n[lang] || i18n['zh-TW'];

  // 1. 保留原本的邏輯：利用字典的 Key 去對應 HTML 的 ID
  Object.keys(dict).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (typeof dict[id] === 'string' && dict[id].includes('<span')) {
        el.innerHTML = dict[id];
      } else {
        el.textContent = dict[id];
      }
    }
  });

  // 2. 核心邏輯 A：掃描網頁中所有帶有 data-i18n 屬性的標籤 (換內文)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
        el.innerHTML = dict[key];
    }
  });

  // 3. 核心邏輯 B：掃描帶有 data-i18n-attr 的標籤 (換 placeholder 或 title 屬性)
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const attrConfig = el.getAttribute('data-i18n-attr');
    if (attrConfig && attrConfig.includes(':')) {
      const [attrName, key] = attrConfig.split(':');
      if (dict[key]) {
        el.setAttribute(attrName, dict[key]);
      }
    }
  });

  // 同步設定選單中的下拉選單狀態
  const select = document.getElementById('set-lang-select');
  if (select) select.value = lang;

  // 4. 自動偵測目前玩家停留的動態子面板，強制當下重繪成新語言
  // (根據你的 html 中當前哪些畫面沒有 'off' 類別來判定)
  if (document.getElementById('scr-chars') && !document.getElementById('scr-chars').classList.contains('off')) {
    if (typeof buildCharGrid === 'function') buildCharGrid(); 
    else if (typeof initCharGrid === 'function') initCharGrid();
  }
  if (document.getElementById('scr-mode') && !document.getElementById('scr-mode').classList.contains('off')) {
    buildModeGrid();
  }
  if (document.getElementById('scr-diff') && !document.getElementById('scr-diff').classList.contains('off')) {
    buildDiffGrid();
  }
  if (document.getElementById('scr-shop') && !document.getElementById('scr-shop').classList.contains('off')) {
    if (typeof renderShop === 'function') renderShop();
  }
  if (document.getElementById('scr-board') && !document.getElementById('scr-board').classList.contains('off')) {
    if (typeof renderBoard === 'function') renderBoard();
  }
}
// 當玩家切換下拉選單時觸發
function changeLanguageFromSettings(val) {
  // 1. 同步寫入所有可能的語言變數
  gameSettings.lang = val;
  window.currentLang = val;
  localStorage.setItem('app_lang', val);

  applyLanguageUI();
  applySettingsToUI();

  // 2. 廣播語言變更事件
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: val } }));

  // 3. 觸發各元件重繪
  if (typeof window.renderQuests === 'function') window.renderQuests();
  if (typeof window.renderAchievements === 'function') window.renderAchievements();
  if (typeof window.renderSeasonInfo === 'function') window.renderSeasonInfo();
  if (typeof renderCalendar === 'function') renderCalendar();
  if (typeof renderSignInCalendar === 'function') renderSignInCalendar();
  
  // 4. 刷新法律條款
  if (typeof window.renderLegalContent === 'function')window.renderLegalContent(); 
}

// 覆寫或整合你的 applySettingsToUI 函式
function applySettingsToUI() {
  // ── 設定開關：滑塊狀態同步 ──
  // 滑塊只有「開/關」兩態，狀態同時寫進 class（給 CSS）與 aria-checked（給螢幕報讀）。
  const setSwitch = (id, isOn) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle('on', !!isOn);
    el.setAttribute('aria-checked', isOn ? 'true' : 'false');
  };

  // 注意：gameSettings.mute 為 true 代表「靜音」，所以滑塊開啟＝沒有靜音。
  setSwitch('set-mute-sw', !gameSettings.mute);
  setSwitch('set-part-sw', gameSettings.particles);
  setSwitch('set-large-sw', gameSettings.largeText);
  setSwitch('set-contrast-sw', gameSettings.highContrast);

  // ── 無障礙：大字體 / 高對比 ──
  document.body.classList.toggle('large-text', !!gameSettings.largeText);
  document.body.classList.toggle('high-contrast', !!gameSettings.highContrast);
}

function toggleLargeText() {
  gameSettings.largeText = !gameSettings.largeText;
  applySettingsToUI();
}

function toggleHighContrast() {
  gameSettings.highContrast = !gameSettings.highContrast;
  applySettingsToUI();
}

// 修改你的初始化函式，確保一開網頁就載入正確語言
function initAICoachAndSettings() {
  // ── 1. 原本的 AI Chat Input 監聽邏輯 ──
  const inputEl = document.getElementById('ai-chat-input');
  if (inputEl) {
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault(); // 防止換行
        sendAIMessage();    // 執行送出訊息
      }
    });
  }

  // ── 2. 讀取存檔與設定初始化 ──
  const save = loadSave();
  if (save && save.gameSettings) {
    // 將本地存檔的設定合併到全域變數 gameSettings 中
    gameSettings = { ...gameSettings, ...save.gameSettings };
    isMuted = !!gameSettings.mute;
  }
  
  // 💡 確保語系預設值存在
  if (!gameSettings.lang) {
    gameSettings.lang = 'zh-TW'; 
  }

  // ── 3. 關鍵新增：立即套用語言與 UI 狀態 ──
  applyLanguageUI();     // 根據語系切換所有的靜態文字（如標題、標籤）
  applySettingsToUI();   // 根據語系與設定，調整音效/粒子按鈕的文字與顏色
}

function toggleMuteFromSettings() {
  gameSettings.mute = !gameSettings.mute;
  applySettingsToUI();
}

function toggleParticles() {
  gameSettings.particles = !gameSettings.particles;
  applySettingsToUI();
}



/* ── SAVE ── */
// 依目前登入的帳號 id 產生專屬的本機存檔 key，避免同一台瀏覽器切換帳號時進度互相污染。
// 尚未登入完成時退回 'guest'（正常情況下不會用到，因為 index.html 會先擋掉未登入者）。
function _uid(){ return (window.currentPlayer && window.currentPlayer.id) ? window.currentPlayer.id : 'guest'; }
function getSaveKey(){ return 'posture123_save_v2_' + _uid(); }
function getLBKey(){ return 'posture123_lb_v2_' + _uid(); }
function loadSave(){try{return JSON.parse(localStorage.getItem(getSaveKey())||'{}')}catch{return{}}}
function writeSave(d){localStorage.setItem(getSaveKey(),JSON.stringify(d))}
function getCoins(){return loadSave().coins||0}
function addCoins(n){const s=loadSave();s.coins=(s.coins||0)+n;writeSave(s);updateCoinUI();syncCoinsToServer(s.coins)}
function spendCoins(n){const s=loadSave();if((s.coins||0)<n)return false;s.coins-=n;writeSave(s);updateCoinUI();syncCoinsToServer(s.coins);return true}
function isOwned(id){return(loadSave().owned||[]).includes(id)}
function ownItem(id){const s=loadSave();s.owned=s.owned||[];if(!s.owned.includes(id))s.owned.push(id);writeSave(s)}
function getEquipped(cat){return loadSave().equipped?.[cat]||null}
function setEquipped(cat,id){const s=loadSave();s.equipped=s.equipped||{};s.equipped[cat]=id;writeSave(s)}
function updateCoinUI(){const c=getCoins();document.getElementById('coin-count').textContent=c.toLocaleString();const sc=document.getElementById('shop-coin-count');if(sc)sc.textContent=c.toLocaleString()}

// 把目前金幣數同步寫回 Supabase 的 profiles 表，讓玩家換裝置登入也能看到一樣的金幣。
// 這裡故意不 await，避免每次加減金幣都卡住畫面；失敗只在 console 留紀錄，不影響本機遊戲體驗。
function syncCoinsToServer(coins){
  if (!window.currentPlayer || !window.supabaseClient) return;
  window.supabaseClient
    .from('profiles')
    .update({ coins })
    .eq('id', window.currentPlayer.id)
    .then(({ error }) => {
      if (error) {
        console.error('金幣同步到伺服器失敗：', error.message);
      } else {
        window.currentPlayer.coins = coins;
      }
    });
}

const ALL_CHARS=[...BASE_CHARS,...SHOP_CHARS];



let selMode='classic';
let controlTargetSec = 5.0; // 使用者自訂的訓練節奏；不是臨床正常值
const CONTROL_TARGET_MIN_SEC = 0.5;
const CONTROL_TARGET_MAX_SEC = 30;

function isControlMode(mode = selMode){
  return mode === 'controlled_sit' || mode === 'heel_control';
}

let selChar=BASE_CHARS[0], selDiff=DIFFS.normal, selDiffKey='normal';

/* ── GAME STATE ── */
let gState='idle', isPaused=false;
let light='green', lightT=0, lightDur=5;
let lightStartTs=null; // 💡 燈號切換的真實時間戳，用來算出不受掉幀影響的真實經過秒數
let progress=0, score=0, streak=0, elapsed=0, timedLeft=30;
let dollRot=0, dollTgt=0;
let posture={total:0,details:[]}, movevalue=0, prevKP=null, moveHist=[];
let prevMovePointsMP = null;
let postureLog=[], lastLogT=0;
let repsCount=0, stsState='stand';
/* ── STS MediaPipe 狀態變數 ── */
let stsPhase = 9;                     // 9=尚未開始, 0=坐下, 1=前傾, 2=髖部上升, 3=站立完成
let stageMP = null;                   // down / down1 / down2 / up
let initHipY = null;                  // 坐下時的髖部 y 座標
let initTrunkVert = null;             // 坐下時的初始軀幹前傾角
let prevHipY = null;                  // 上一幀髖部 y 座標
let hipChange = 0;                    // 髖部 y 變化量
let trunkMax = 0;                     // 本次起身過程最大軀幹前傾
let heelMaxCal = 0;                   // 本次站立後最大腳跟角度
let trunkScore = 0;                   // 軀幹分數
let heelScore = 0;                    // 腳跟分數
let repQualityScore = 0;              // 單次起立品質分數
let singleScore = 0;                  // 最近一次完成的起立總分（坐下後仍持續顯示）
let repRewardedMP = false;            // 這一次起立是否已經加過分
let detecting=false;
let kneeScore = 0;                   // 膝部穩定分數
let kneeValgusMinCal = 1.0;          // 本次起立過程中的最小膝踝寬度比
let kneeScoresArray = [];            // 記錄整場遊戲的膝部陣列

/* ── CONTROLLED MOVEMENT TRAINING STATE ──
   這一層只服務 controlled_sit / heel_control，不改 Classic 的原 STS 計分。 */
let controlSessionReps = [];
let controlLastScore = 0;
let controlMoveUntil = 0;

// Controlled movement protocol parameters.
// 3 秒是本系統目前固定的訓練流程參數，不是臨床正常值。
const CONTROL_HOLD_SEC = 3.0;
// 下列數值只用於 state-machine 去抖 / 遲滯，不是人體異常門檻。
const CONTROL_ONSET_CONFIRM_MS = 150;
const CONTROL_END_CONFIRM_MS = 200;
const CONTROL_HEEL_BASELINE_MS = 500;
const CONTROL_HOLD_ENTRY_RATIO = 0.70; // 達到個人校正活動範圍 70% 後即可進入 Hold（訓練工程參數，非臨床門檻）
const CONTROL_HEEL_START_DROP_DEG = 2;

// 一個 Rep 內鎖定同一側，避免 trajectory 因 SideSelector 中途換邊而產生跳點。
let controlLockedSide = null;
let lastSpokenSecond = null;
function lockControlSide(side){
  if(side === 'left' || side === 'right') controlLockedSide = side;
  return controlLockedSide;
}
function releaseControlSide(){ controlLockedSide = null; }

let controlledSitState = {
  state: 'WAIT_STAND',      // WAIT_STAND -> HOLD -> WAIT_DESCENT -> DESCENDING -> WAIT_STAND
  standHipY: null,
  holdStartMs: null,
  startMs: null,
  lastHipY: null,
  descentCandidateMs: null,
  candidateSamples: [],
  seatCandidateMs: null,
  samples: []
};

let heelControlState = {
  state: 'WAIT_STAND',      // WAIT_STAND -> BASELINE -> RAISING -> HOLD -> WAIT_LOWER -> LOWERING -> WAIT_STAND
  baselineAngle: null,
  baselineBuf: [],
  baselineStartMs: null,
  peakAngle: null,
  holdReferenceAngle: null,
  lowerStartAngle: null,
  holdStartMs: null,
  startMs: null,
  lastAngle: null,
  lowerCandidateMs: null,
  candidateSamples: [],
  baselineCandidateMs: null,
  samples: []
};
// 全域宣告，用來記錄整場遊戲每一次的軀幹與腳跟分數
let trunkScoresArray = [];
let heelScoresArray = [];
let hipPxYBuf = [], angleHipBuf = [], angleKneeBuf = [], trunkVertBuf = [], angleHeelBuf = [];
let prevHipPxY = null;

/* ── 骨架繪製用的逐點平滑狀態 ──
   MediaPipe 的腳踝/腳跟/腳尖 (27~32) 這幾個點，可視度天生就比軀幹/髖/膝低，
   偵測雜訊也大，所以單獨用較低的 alpha（更強的平滑）處理，
   軀幹等其他點則用較高的 alpha（保留反應速度）。
   這是純前端繪圖層的濾波，不影響底層姿態模型本身。 */
const drawSmoothState = {};
const FOOT_LANDMARK_IDX = new Set([27, 28, 29, 30, 31, 32]);
const DRAW_SMOOTH_ALPHA_FOOT = 0.25;   
const DRAW_SMOOTH_ALPHA_BODY = 0.5;
const DRAW_VISIBILITY_HOLD_TH = 0.3;   

function smoothDrawPoint(idx, rawX, rawY, visibility) {
  const alpha = FOOT_LANDMARK_IDX.has(idx) ? DRAW_SMOOTH_ALPHA_FOOT : DRAW_SMOOTH_ALPHA_BODY;
  const prev = drawSmoothState[idx];

  if (visibility < DRAW_VISIBILITY_HOLD_TH && prev) {
    return prev;
  }

  if (!prev) {
    drawSmoothState[idx] = { x: rawX, y: rawY };
    return drawSmoothState[idx];
  }

  const next = {
    x: prev.x + alpha * (rawX - prev.x),
    y: prev.y + alpha * (rawY - prev.y)
  };
  drawSmoothState[idx] = next;
  return next;
}

function resetDrawSmoothState() {
  for (const k in drawSmoothState) delete drawSmoothState[k];
}
const downTh = 110, sitKneeTh = 120, standKneeTh = 160, trunkDelta = 5, hipDelta = 20, hipStopChange = 3;

function smoothValue(val, buf, maxLen = 5) {
  if (val === null || val === undefined || isNaN(val)) return buf.length ? buf[buf.length - 1] : 0;
  buf.push(val);
  if (buf.length > maxLen) buf.shift();
  return buf.reduce((a, b) => a + b, 0) / buf.length;
}

function calculateAngle(a, b, c) {
  if (!a || !b || !c) return 180;
  const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs(radians * 180.0 / Math.PI);
  if (angle > 180.0) angle = 360 - angle;
  return angle;
}

function angleRelativeHorizontal(dx, dy) {
  return Math.atan2(Math.abs(dy), Math.max(Math.abs(dx), 1)) * (180 / Math.PI);
}

let gCvs, gCtx, pCvs, pCtx, videoElement;

/* ── CAMERA RECORDING / HEAVY UPLOAD STATE (0805 verified pipeline) ── */
let mediaRecorder = null;
let recordedChunks = [];
let recordedVideoBlob = null;
let recordedVideoUrl = null;
let recordingMimeType = '';
let recordingSessionId = 0;
let activeRecordingSession = null;
let lastAnalysisResult = null;
let particles=[], caughtFx=0, tipIdx=0, tipT=0, starField=[];
let lastFrame=0;
let gameLoopId=null, detectLoopId=null;

const { PoseLandmarker, FilesetResolver } = self;
let poseLandmarker = null;
let lastVideoTime = -1;
let startTs=0;
let pausedAccum=0, pauseStartTs=0;
let settingsPausedGame=false;
const TIPS=['💡 頭部直立，眼睛平視螢幕','💡 肩膀向後放鬆，不要聳肩','💡 下巴微收，避免頸部前傾','💡 腰背挺直，保持自然弧度','💡 兩肩保持水平，不要歪斜','💡 深呼吸，放鬆全身肌肉'];

/* ── GAME SETTINGS ── */
let gameSettings = { mute: false, particles: true, largeText: false, highContrast: false };

/* ── AUDIO ── */
let actx=null, bgmId=null, isMuted=false, bgmBeat=0;
const BGM=[261,0,329,0,392,0,329,261,0,392,0,523,392,0,329,0];
function ensureAudio(){if(!actx)actx=new(window.AudioContext||window.webkitAudioContext)();if(actx.state==='suspended')actx.resume()}
function tone(f,dur,type='sine',vol=0.28,delay=0){if(!actx||isMuted||f===0)return;const t=actx.currentTime+delay;const o=actx.createOscillator();const g=actx.createGain();o.connect(g);g.connect(actx.destination);o.type=type;o.frequency.value=f;g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(0.001,t+dur);o.start(t);o.stop(t+dur+.01)}
const SFX_MAP={
  click:[[660,.06,'sine',.2,0]],
  green:[[523,.12,'sine',.28,0],[659,.12,'sine',.28,.09],[784,.12,'sine',.28,.18]],
  yellow:[[600,.15,'square',.2,0],[600,.15,'square',.2,.2]],
  red:[[440,.1,'square',.18,0],[330,.1,'square',.18,.09],[220,.1,'square',.18,.18]],
  caught:[[200,.1,'sawtooth',.25,0],[182,.1,'sawtooth',.25,.07],[164,.1,'sawtooth',.25,.14],[146,.1,'sawtooth',.25,.21],[128,.1,'sawtooth',.25,.28],[110,.1,'sawtooth',.25,.35]],
  win:[[523,.22,'sine',.3,0],[659,.22,'sine',.3,.12],[784,.22,'sine',.3,.24],[1047,.22,'sine',.3,.36],[784,.22,'sine',.3,.48],[1047,.22,'sine',.3,.6],[1319,.22,'sine',.3,.72]],
  coin:[[880,.12,'sine',.25,0],[1108,.12,'sine',.25,.07],[1320,.12,'sine',.25,.14]],
  count:[[440,.12,'triangle',.3,0]],
  go:[[880,.08,'sine',.4,0],[1108,.18,'sine',.4,.07]]
};
function playSfx(type){
  if(gameSettings?.mute || isMuted)return;
  ensureAudio();
  (SFX_MAP[type]||[]).forEach(([f,dur,wave,vol,delay])=>tone(f,dur,wave,vol,delay));
}
function startBGM(){stopBGM();if(isMuted)return;bgmId=setInterval(()=>{if(!isMuted)tone(BGM[bgmBeat++%BGM.length],.3,'triangle',.035)},340)}
function stopBGM(){if(bgmId){clearInterval(bgmId);bgmId=null}}
function toggleMute(){ensureAudio();toggleMuteFromSettings();const save=loadSave();save.gameSettings=gameSettings;writeSave(save)}

function speak(text, rate = 1.2, pitch = 1.1) {
  
  if ((gameSettings && gameSettings.mute) || isMuted || !('speechSynthesis' in window)) return;  

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = (gameSettings?.lang === 'en') ? 'en-US' : 'zh-TW';
  utterance.rate = rate;    
  utterance.pitch = pitch;   
  
  window.speechSynthesis.speak(utterance);
}
/* ── SCREENS & TOAST ── */
function goTo(id){
  document.querySelectorAll('.scr').forEach(s=>s.id===id?s.classList.remove('off'):s.classList.add('off'));
  const isMenu = (id === 'scr-menu');
  // 1. 只要離開主選單（點擊「開始遊戲」或進入任何子頁面），右上角商城、簽到、排行榜等圖示全數隱藏
  document.querySelectorAll('.menu-only-icon').forEach(el => {
     el.style.display = isMenu ? 'flex' : 'none';
  });
  
  // 2. 將整個右上角按鈕容器區塊也乾淨隱藏
  const sysTopRight = document.getElementById('sys-top-right');
  if (sysTopRight) {
     sysTopRight.style.display = isMenu ? 'flex' : 'none';
  }

  // 2-1. 左下角（歷史紀錄／改善建議）同樣只在主選單顯示
  const sysBottomLeft = document.getElementById('sys-bottom-left');
  if (sysBottomLeft) {
     sysBottomLeft.style.display = isMenu ? 'flex' : 'none';
  }
  
  // 3. 左上角金幣顯示：僅在首頁主選單顯示，進入選角或遊戲後一併隱藏，避免遮擋畫面
  const coinDisp = document.getElementById('coin-display');
  if (coinDisp) {
     coinDisp.style.display = isMenu ? 'block' : 'none';
  }

  // 4. 冒險模式戰鬥 HUD：只在遊戲畫面、且目前有選定關卡時顯示
  if (typeof updateStoryBattleHUD === 'function') updateStoryBattleHUD();
  const battleHud = document.getElementById('story-battle-hud');
  if (battleHud && id !== 'scr-game') {
     battleHud.classList.remove('on');
  }

  // 5. 節奏音樂模式 HUD：只在遊戲畫面顯示，離開就收起來
  const rhythmHud = document.getElementById('rhythm-hud');
  if (rhythmHud && id !== 'scr-game') {
     rhythmHud.classList.remove('on');
  }
}


function showToast(msg, color='var(--blue2)') {
  const toast = document.createElement('div');
  let txtColor = (color === 'var(--gold)' || color === 'var(--green)') ? '#002010' : '#fff';
  toast.style.cssText = `position:fixed;top:80px;left:50%;transform:translateX(-50%);background:${color};color:${txtColor};padding:12px 24px;border-radius:30px;font-weight:800;font-size:1.1em;z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,.4);animation:toastFade 2.5s forwards;pointer-events:none;`;
  toast.innerHTML = msg;
  document.body.appendChild(toast);
  setTimeout(() => document.body.removeChild(toast), 2500);
}
/* 控制右上角按鈕列與金幣顯示的通用開關 */
function toggleSysBtnBar(show) {
  const sysBar = document.getElementById('sys-top-right');
  const coinDisp = document.getElementById('coin-display');
  if (sysBar) sysBar.style.display = show ? 'flex' : 'none';
  if (coinDisp) coinDisp.style.display = show ? 'block' : 'none';
}

/* ── CALENDAR SIGN IN SYSTEM ── */
function getTodayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function getDailyReward(dayNum) {
  // 每隔 4 天給 500 金幣（即 4, 8, 12, 16...）
  return (dayNum % 4 === 0) ? 500 : 100;
}

function checkSignInStatus() {
  const s = loadSave();
  const today = getTodayStr();
  const history = s.signInHistory || [];
  document.getElementById('sign-in-dot').style.display = history.includes(today) ? 'none' : 'block';
}

function showSignIn() {
  ensureAudio(); playSfx('click');
  renderCalendar();
  goTo('scr-signin');
}

function closeSignIn() {
  playSfx('click');
  document.getElementById('ov-signin').classList.remove('on');
}

function renderCalendar() {
  const s = loadSave();
  const history = s.signInHistory || [];
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth(); // 0-11
  const todayNum = d.getDate();
  const monthStr = `${year}-${String(month+1).padStart(2,'0')}`;

  if (!s.retroMonth || s.retroMonth.month !== monthStr) {
    s.retroMonth = { month: monthStr, used: 0 };
    writeSave(s);
  }
  const retroUsed = s.retroMonth.used;
  const retroRemain = 3 - retroUsed;

  document.getElementById('cal-month-title').textContent = `${year} 年 ${month+1} 月`;
  document.getElementById('cal-retro-text').innerHTML = `補簽: <span>${retroRemain}</span>/3 次`;

 
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  let earliestMissedDateStr = null;
  for (let past = 1; past < todayNum; past++) {
    const checkStr = `${monthStr}-${String(past).padStart(2, '0')}`;
    if (!history.includes(checkStr)) {
      earliestMissedDateStr = checkStr; 
      break; 
    }
  }

  const grid = document.getElementById('cal-grid');
  grid.innerHTML = '';

  for(let i = 0; i < firstDay; i++) {
    const empty = document.createElement('div');
    empty.className = 'cal-day empty';
    grid.appendChild(empty);
  }

  for(let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement('div');
    const dateStr = `${monthStr}-${String(day).padStart(2,'0')}`;
    const isSigned = history.includes(dateStr);
    
    const rewardAmt = getDailyReward(day);
    const rewardDisp = (rewardAmt === 500) ? '🪙 500' : '🪙 100';
    const isHighReward = (rewardAmt === 500);

    let html = `<div class="cal-day-num" style="${(isHighReward && !isSigned) ? 'color:var(--gold)' : ''}">${day}</div>`;

    if (day > todayNum) {
      cell.className = 'cal-day future';
      html += `<div class="cal-day-reward">${rewardDisp}</div>`;
    } else if (day === todayNum) {
      if (isSigned) {
        cell.className = 'cal-day signed';
        html += `<div class="cal-day-icon" style="color:var(--green)">✔️</div>`;
      } else {
        cell.className = 'cal-day today-not-signed';
        html += `<div class="cal-day-reward" style="${isHighReward ? 'color:var(--gold); font-size:0.7em;' : 'color:var(--white)'}">${rewardDisp}</div>`;
        cell.onclick = () => doSignIn(dateStr, true, rewardAmt);
      }
    } else {
      if (isSigned) {
        cell.className = 'cal-day signed';
        html += `<div class="cal-day-icon" style="color:var(--green)">✔️</div>`;
      } else {
        if (dateStr === earliestMissedDateStr) {
          cell.className = 'cal-day missed retro-active'; 
          html += `<div class="missed-badge">補</div>`;
          html += `<div class="cal-day-reward" style="${isHighReward ? 'color:var(--gold)' : 'color:var(--text)'}">${rewardDisp}</div>`;
          cell.onclick = () => doRetroSignIn(dateStr, retroRemain, rewardAmt);
        } else {
          cell.className = 'cal-day missed retro-locked';
          html += `<div class="missed-badge" style="background:#4868A0;">🔒</div>`; 
          html += `<div class="cal-day-reward" style="color:var(--dim)">${rewardDisp}</div>`;
          cell.onclick = () => showToast('🔒 請依照時間順序，先補簽更早之前的日期喔！', 'var(--yellow)');
        }
      }
    }
    
    cell.innerHTML = html;
    grid.appendChild(cell);
  }
}

function doSignIn(dateStr, isToday, rewardAmt) {
  playSfx('coin');
  const s = loadSave();
  s.signInHistory = s.signInHistory || [];
  if(!s.signInHistory.includes(dateStr)) s.signInHistory.push(dateStr);
  writeSave(s);
  
  addCoins(rewardAmt);
  if (isToday) {
     showToast(`📅 今日簽到成功！獲得 ${rewardAmt} 金幣 🪙`, (rewardAmt === 500) ? 'var(--gold)' : 'var(--blue2)');
  } else {
     showToast(`🎬 補簽成功！獲得 ${rewardAmt} 金幣 🪙`, 'var(--green)');
  }
  
  checkSignInStatus();
  renderCalendar();
  if(typeof onSignIn==='function')onSignIn(dateStr);
}

function doRetroSignIn(dateStr, retroRemain, rewardAmt) {
  if (retroRemain <= 0) {
     showToast('🚫 本月補簽次數已用盡！', 'var(--red)');
     return;
  }
  ensureAudio(); playSfx('click');
  if(confirm(`確定要觀看廣告來補簽 ${dateStr}，領取 ${rewardAmt} 金幣嗎？\n(本月剩餘免費補簽: ${retroRemain} 次)`)){
     watchAdMock(() => {
         const s = loadSave();
         s.retroMonth.used += 1;
         writeSave(s);
         doSignIn(dateStr, false, rewardAmt);
     }, '補簽準備中...');
  }
}

/* ── PARTICLES BACKGROUND ── */
function initParticles(){
  if(typeof particlesJS === 'undefined') return;
  particlesJS('particles-js', {
    "particles": {
      "number": { "value": 70, "density": { "enable": true, "value_area": 800 } },
      "color": { "value": ["#ffffff", "#4090FF", "#00CC6A"] },
      "shape": { "type": "circle" },
      "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
      "size": { "value": 3, "random": true, "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false } },
      "line_linked": { "enable": true, "distance": 150, "color": "#4090FF", "opacity": 0.2, "width": 1 },
      "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
    },
    "interactivity": {
      "detect_on": "window",
      "events": {
        "onhover": { "enable": true, "mode": "grab" },
        "onclick": { "enable": true, "mode": "push" },
        "resize": true
      },
      "modes": {
        "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } },
        "push": { "particles_nb": 3 }
      }
    },
    "retina_detect": true
  });
}

/* ── CHAR GRID ── */
function buildCharGrid(){
  const grid=document.getElementById('char-grid');grid.innerHTML='';
  ALL_CHARS.forEach((ch,i)=>{
    // 移入迴圈內部，並將 char 正確改為 ch
    const name = getText(ch.nameKey) || ch.name;
    const tag = getText(ch.tagKey) || ch.tag;

    const unlocked=ch.free||isOwned(ch.id);
    const card=document.createElement('div');
    card.className='char-card'+(selChar.id===ch.id?' selected':'');
    // 將原本的 ${ch.name} 和 ${ch.tag} 替換成國際化翻譯後的 ${name} 和 ${tag}
    card.innerHTML=`<canvas class="char-canvas" width="72" height="88" id="cc-${ch.id}"></canvas>
      <div class="char-name">${name}</div><div class="char-tag">${ch.badge} ${tag}</div>
      ${!unlocked?`<div class="char-lock"><div class="char-lock-icon">🔒</div><div class="char-lock-cost">🪙${ch.cost}</div><div style="font-size:.62em;color:var(--dim)">${getText('shop-unlock-badge')}</div></div>`:''}`;
    card.onclick=()=>{
      ensureAudio();playSfx('click');
      if(!unlocked){goTo('scr-shop');renderShop();return}
      document.querySelectorAll('.char-card').forEach(c=>c.classList.remove('selected'));
      card.classList.add('selected');selChar=ch;
    };
    grid.appendChild(card);
    setTimeout(()=>drawCharPreview(document.getElementById(`cc-${ch.id}`),ch),10);
  });
}
function drawCharPreview(cvs,ch){if(!cvs)return;const ctx=cvs.getContext('2d');ctx.clearRect(0,0,cvs.width,cvs.height);drawStickFigure(ctx,cvs.width/2,cvs.height/2+6,28,ch,false)}

/* ── MODE GRID ── */
function buildModeGrid() {
  const grid = document.getElementById('mode-grid');
  if(!grid) return;
  grid.innerHTML = '';
  Object.keys(MODES).forEach(mId => {
    const m = MODES[mId];
    const card = document.createElement('div');
    
    // 💡 修正：將 ' active' 改回 ' selected'，才能對應 style.css 的光暈效果
    card.className = 'mode-card' + (selMode === mId ? ' selected' : '');
    
    card.onclick = () => { 
      ensureAudio();
      if (typeof playSfx === 'function') playSfx('click');
      selMode = mId; 
      buildModeGrid(); 
    };
    
    card.innerHTML = `
      <div class="mode-name">${getText(m.nameKey)}</div>
      <div class="mode-desc">${getText(m.descKey)}</div>
    `;
    grid.appendChild(card);
  });
  updateControlTargetPanel();
}

function updateControlTargetPanel(){
  const panel = document.getElementById('control-time-panel');
  const input = document.getElementById('control-target-sec');
  const nextBtn = document.getElementById('mode-next-btn');
  const control = isControlMode();
  if(panel) panel.style.display = control ? 'flex' : 'none';
  if(input) input.value = controlTargetSec.toFixed(1);
  if(nextBtn) nextBtn.textContent = control ? getText('mode-start-control') : getText('mode-next');
}

function setControlTargetSec(value){
  let v = Number(value);
  if(!Number.isFinite(v)) v = 5;
  v = Math.max(CONTROL_TARGET_MIN_SEC, Math.min(CONTROL_TARGET_MAX_SEC, v));
  controlTargetSec = Math.round(v * 10) / 10;
  const input = document.getElementById('control-target-sec');
  if(input && Number(input.value) !== controlTargetSec) input.value = controlTargetSec.toFixed(1);
}

function continueFromModeSelection(){
  ensureAudio();
  if(typeof playSfx === 'function') playSfx('click');
  if(isControlMode()){
    const input = document.getElementById('control-target-sec');
    if(input) setControlTargetSec(input.value);
    launchGame();
  }else{
    goTo('scr-diff');
    buildDiffGrid();
  }
}

/* ── DIFF GRID ── */
function buildDiffGrid() {
  const grid = document.getElementById('diff-grid');
  if(!grid) return;
  grid.innerHTML = '';
  Object.keys(DIFFS).forEach(dId => {
    const d = DIFFS[dId];
    const card = document.createElement('div');
    
    // 💡 修正：將 ' active' 改回 ' selected'，才能對應 style.css 的光暈效果
    card.className = 'diff-card' + (selDiffKey === dId ? ' selected' : '');
    
    card.onclick = () => { 
      ensureAudio();
      if (typeof playSfx === 'function') playSfx('click');
      
      selDiffKey = dId; 
      selDiff = DIFFS[dId]; 
      buildDiffGrid(); 
    };
    
    card.innerHTML = `
      <div class="diff-name">${getText(d.nameKey)}</div>
      <div class="diff-desc">${getText(d.descKey)}</div>
    `;
    grid.appendChild(card);
  });
}

/* ── TUTORIAL ── */
function drawTutStick(id, pose) {
  const cvs = document.getElementById(id);
  if (!cvs) return;
  const ctx = cvs.getContext('2d');
  
  const cx = cvs.width / 2, sz = 21; 
  let cy = (pose === 'sit') ? 72 : 49;

  ctx.clearRect(0, 0, cvs.width, cvs.height);
  
  // 顏色死守科技藍，不搞搞怪！
  ctx.strokeStyle = '#4090FF';
  ctx.fillStyle = '#4090FF';
  ctx.lineWidth = 4.5;
  ctx.lineCap = 'round';

  if (pose === 'tiptoe') {
    cy = 38; // 維持抽高
  }

  // 1. 畫頭
  ctx.beginPath();
  ctx.arc(cx, cy - sz * 1.2, sz * 0.4, 0, Math.PI * 2);
  ctx.fill();

  // 2. 畫軀幹與雙腿
  ctx.beginPath();
  ctx.moveTo(cx, cy - sz * .6);

  if (pose === 'sit') {
    ctx.lineTo(cx + sz * .5, cy + sz * .5);
    ctx.lineTo(cx - sz * .7, cy + sz * .5);
    ctx.lineTo(cx - sz * .7, cy + sz * 1.8);
  } else if (pose === 'tiptoe') {
    ctx.lineTo(cx, cy + sz * 1.1); 
    ctx.lineTo(cx - sz * .25, cy + sz * 2.7); 
    ctx.moveTo(cx, cy + sz * 1.1);
    ctx.lineTo(cx + sz * .25, cy + sz * 2.7);
    
    // 雙手高舉維持，但套用標準藍色
    ctx.moveTo(cx, cy - sz * .2);
    ctx.lineTo(cx - sz * .75, cy - sz * .85);
    ctx.moveTo(cx, cy - sz * .2);
    ctx.lineTo(cx + sz * .75, cy - sz * .85);
  } else {
    ctx.lineTo(cx, cy + sz * 1.0);
    ctx.lineTo(cx - sz * .3, cy + sz * 2.2);
    ctx.moveTo(cx, cy + sz * 1.0);
    ctx.lineTo(cx + sz * .3, cy + sz * 2.2);
  }
  ctx.stroke();
}
function goTutorial(){
  ensureAudio();playSfx('click');goTo('scr-tutorial');
  drawTutStick('tut-stand','stand');drawTutStick('tut-sit','sit');drawTutStick('tut-stand2','stand');drawTutStick('tut-tiptoe', 'tiptoe');
  const hints = {
    classic: getText('tut-hint-classic'),
    infinite: getText('tut-hint-infinite'),
    timed: getText('tut-hint-timed')
  };
  document.getElementById('tut-mode-hint').innerHTML=`<div style="width=1000px;font-size:1.35em;color:var(--dim);line-height:1.8;">${hints[selMode]}<br>${getText('tut-hint-score')}</div>`;
}

/* ── PAUSE ── */
function pauseGame(){
  if(gState!=='playing')return;
  isPaused=true;gState='paused';
  pauseStartTs=performance.now();
  document.getElementById('ov-pause').classList.add('on');
  
  // 💡 修正點：「分數」、「次數」改用字典對應
  document.getElementById('pause-stats').innerHTML=`<div class="sbox"><div class="sv">${Math.round(score)}</div><div class="sl">${getText('pause-score')}</div></div><div class="sbox"><div class="sv">${repsCount}</div><div class="sl">${getText('pause-reps')}</div></div>`;
  
  // 暫停時連姿勢偵測迴圈也一併停掉：鏡頭畫面照樣顯示最後一格，但不再跑 AI 推論，省效能也避免暫停中誤判動作
  if(detectLoopId){cancelAnimationFrame(detectLoopId);detectLoopId=null;}
  stopBGM();
  // 節奏音樂模式的節拍器是獨立的計時器，暫停遊戲時也要跟著停，不然背景會一直嗶嗶叫
  if(typeof onRhythmGamePause==='function') onRhythmGamePause();
}
function resumeGame(){
  if(gState!=='paused')return;
  isPaused=false;gState='playing';
  document.getElementById('ov-pause').classList.remove('on');
  if(pauseStartTs){
    const pausedMs=performance.now()-pauseStartTs;
    pausedAccum+=pausedMs;
    // 💡 燈號改用真實時間戳判斷後，暫停期間也要一併往後平移，
    //    不然恢復遊戲那一刻，暫停掉的時間會被誤算進燈號已經過的秒數，導致燈號秒切換。
    if(lightStartTs!==null)lightStartTs+=pausedMs;
  }
  pauseStartTs=0;
  lastFrame=performance.now();
  if(detecting&&poseLandmarker&&!detectLoopId)detectLoopId=requestAnimationFrame(detectLoopMP);
  startBGM();
  // 節拍器從「現在」重新算起，讓玩家恢復遊戲後有完整一小節可以抓拍子，不會被暫停時間打亂節奏
  if(typeof onRhythmGameResume==='function') onRhythmGameResume();
  requestAnimationFrame(gameLoop);
}
function pauseAndQuit(){isPaused=false;document.getElementById('ov-pause').classList.remove('on');if(typeof clearActiveChallenge==='function')clearActiveChallenge();if(typeof onRhythmGameEnd==='function')onRhythmGameEnd();cleanupGame();goTo('scr-menu')}
// 暫停入口已接上遊戲畫面右上角的設定鍵（見 openInGameSettings）；
// 計時器改用 performance.now() 牆鐘時間扣除 pausedAccum，偵測迴圈也會在暫停時一併停止，兩者都不會跟真實時間脫節。

/* ── RESET GAME STATE ── */
function resetGameState(){
  progress=0;score=0;streak=0;elapsed=0;timedLeft=30;
  light='green';lightT=0;lightDur=gDur();lightStartTs=performance.now();
  dollRot=0;dollTgt=0;particles=[];moveHist=[];postureLog=[];lastLogT=0;
  startTs=performance.now();pausedAccum=0;pauseStartTs=0;repsCount=0;stsState='stand';

  stsPhase=9;stageMP=null;initHipY=null;initTrunkVert=null;prevHipY=null;hipChange=0;
  trunkMax=0;heelMaxCal=0;trunkScore=0;heelScore=0;repQualityScore=0;singleScore=0;repRewardedMP=false;
  trunkScoresArray = []; heelScoresArray = [];
  kneeScore = 0;
  kneeValgusMinCal = 1.0;
  kneeScoresArray = [];
  controlSessionReps = [];
  controlLastScore = 0;
  controlMoveUntil = 0;
  lastSpokenSecond = null;
  releaseControlSide();
  controlledSitState = {state:'WAIT_STAND',standHipY:null,holdStartMs:null,startMs:null,lastHipY:null,descentCandidateMs:null,candidateSamples:[],seatCandidateMs:null,samples:[]};
  heelControlState = {state:'WAIT_STAND',baselineAngle:null,baselineBuf:[],baselineStartMs:null,peakAngle:null,holdReferenceAngle:null,lowerStartAngle:null,holdStartMs:null,startMs:null,lastAngle:null,lowerCandidateMs:null,candidateSamples:[],baselineCandidateMs:null,samples:[]};
  hipPxYBuf = []; angleHipBuf = []; angleKneeBuf = []; trunkVertBuf = []; angleHeelBuf = [];
  resetDrawSmoothState();
  resetMPSideSelector();
  prevHipPxY = null;
  prevMovePointsMP=null;movevalue=0;prevKP=null;lastVideoTime=-1;
  posture={total:0,details:[{name:getText('detail-trunk'),score:0,w:1},{name:getText('detail-heel'),score:0,w:1},{name:getText('detail-knee'),score:0,w:1}]};

  const repEl=document.getElementById('ss-rep-num');if(repEl)repEl.textContent='0';
  const stateEl=document.getElementById('ss-body-state');
  if(stateEl){stateEl.textContent=getText('game-start');stateEl.style.color='var(--blue2)';}
  const trunkEl=document.getElementById('angle-trunk-now');if(trunkEl)trunkEl.textContent='--°';
  const heelEl=document.getElementById('angle-heel-now');if(heelEl)heelEl.textContent='--°';
  const timerEl=document.getElementById('h-timer');if(timerEl)timerEl.textContent='0:00';
  const timerLbl=document.getElementById('h-timer-lbl');if(timerLbl)timerLbl.textContent=getText('game-time');
  const timerBar=document.getElementById('timer-bar');if(timerBar)timerBar.style.width='100%';
  setLightUI('green');
  configureGameUIForMode();
  updateControlRemaining(null);
  updateHUD();
  updateLeftPanel();
}

/* ── BEGIN PLAY ── */
function beginPlay(){
  if(typeof onGameStart==='function')onGameStart();
  resetGameState();
  gState='playing';
  startTs=performance.now();
  lastFrame=performance.now();
  document.getElementById('ov-result').classList.remove('on');
  document.getElementById('coin-reward').classList.remove('on');
  startVideoRecording();
  startBGM();
}

/* ── MAIN LOOP ── */
function gameLoop(ts){
  if(!lastFrame)lastFrame=ts;
  const rawGapSec=(ts-lastFrame)/1000;
  const dt=Math.min(rawGapSec,.05);
  lastFrame=ts;
  // 💡 分頁切到背景時瀏覽器會節流/暫停 rAF，切回來那一幀 rawGapSec 可能長達數秒甚至數十秒。
  //    燈號現在是用真實時間戳 (lightStartTs) 判斷，這段「看不見的時間」要補償掉，
  //    不然切回分頁那一刻會瞬間連跳好幾輪紅綠燈。門檻抓 1 秒，一般掉幀不會到這麼大。
  if(rawGapSec>1&&lightStartTs!==null){
    lightStartTs+=(rawGapSec-dt)*1000;
  }
  if(gState==='playing')update(dt);
  if(gState==='ready'||gState==='playing'){render();gameLoopId=requestAnimationFrame(gameLoop)}
}

function update(dt){
  elapsed=Math.max(0,(performance.now()-startTs-pausedAccum)/1000);
  let d=dollTgt-dollRot;if(Math.abs(d)>180)d-=Math.sign(d)*360;
  dollRot+=d*Math.min(dt*6,1);
  lightT+=dt;
  // 💡 燈號切換改用「真實經過時間」判斷，不用累加的 lightT。
  //    因為 gameLoop 的 dt 有 clamp 在 0.05 秒（避免掉幀時物理運算爆走），
  //    但這支 App 每一幀還要跑姿態偵測(MediaPipe)，運算量大時容易掉幀，
  //    真實間隔可能遠超過 0.05 秒，導致 lightT 累加得比真實時間慢，
  //    紅綠黃燈就會「卡在同一個顏色比設定秒數還久」。
  //    改成直接比對 performance.now() 差值，就不會受掉幀影響。
  const lightElapsed = lightStartTs !== null ? (performance.now() - lightStartTs) / 1000 : lightT;

  // 遊戲時間只代表正式遊玩後累積的 elapsed，不顯示紅綠燈倒數。
  const gameTimerEl=document.getElementById('h-timer'); if(gameTimerEl) gameTimerEl.textContent=fmtT(elapsed);
  const timerLbl=document.getElementById('h-timer-lbl'); if(timerLbl)timerLbl.textContent=getText('game-time');

  if(selMode==='timed'){
    timedLeft=Math.max(0,30-elapsed);
    document.getElementById('timer-bar').style.width=(timedLeft/30*100)+'%';
    if(timedLeft<=0){triggerTimedEnd();return}
  }

 if(isControlMode()){
  // 控制訓練不使用 123 木頭人的紅黃綠燈機制。
  document.documentElement.style.setProperty('--current-light-bg', 'rgba(30,111,255,0.10)');
  light='green'; lightT=0; dollTgt=0;
  streak = 0;
  const spawnRate = performance.now() < controlMoveUntil ? 0.55 : 0.03;
  if(Math.random() < spawnRate) spawnParticle();
}else if(selMode==='timed'){
  document.documentElement.style.setProperty('--current-light-bg', 'rgba(43, 255, 0, 0.34)');
  streak=posture.total>72?Math.min(streak+dt*2,999):Math.max(0,streak-dt*4);
  const spawnRate=getEquipped('trails')?0.75:Math.max(0.1,(posture.total/100)*.45);
  if(Math.random()<spawnRate)spawnParticle();
}else if(light==='green'){
  document.documentElement.style.setProperty('--current-light-bg', 'rgba(43, 255, 0, 0.34)');
  if(lightElapsed>=lightDur){switchLight('yellow');return}
  streak=posture.total>72?Math.min(streak+dt*2,999):Math.max(0,streak-dt*4);
  const spawnRate=getEquipped('trails')?0.75:Math.max(0.1,(posture.total/100)*.45);
  if(Math.random()<spawnRate)spawnParticle();
}else if(light==='yellow'){
  document.documentElement.style.setProperty('--current-light-bg', 'rgba(217, 255, 0, 0.46)');
  if(lightElapsed>=lightDur){switchLight('red');return}
}else if(light==='red'){
  document.documentElement.style.setProperty('--current-light-bg', 'rgba(255, 30, 60, 0.15)');
  if(lightElapsed>=lightDur){switchLight('green');return}
  if(stsState!=='sit'){triggerCaught(getText('err-red-stand'));return}
  if(movevalue>selDiff.thresh){triggerCaught(getText('err-red-move'));return}
}

  if(elapsed-lastLogT>0.45){lastLogT=elapsed;postureLog.push({t:elapsed,s:posture.total})}
  tipT+=dt;if(tipT>7){tipT=0;tipIdx=(tipIdx+1)%TIPS.length;showTip(TIPS[tipIdx])}
  for(let i=particles.length-1;i>=0;i--){const p=particles[i];p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=110*dt;p.life-=dt*(getEquipped('trails')?1.1:1.8);if(p.life<=0)particles.splice(i,1)}
  if(caughtFx>0)caughtFx=Math.max(0,caughtFx-dt*3.5);
  updateHUD();updateLeftPanel();
}

function switchLight(to){
  light=to;lightT=0;lightStartTs=performance.now();
  if(to==='green'){
    lightDur=gDur();dollTgt=0;ensureAudio();playSfx('green');
    speak(getText('light-green-ui')); 
  }
  else if(to==='yellow'){
    lightDur=1.5;dollTgt=90;ensureAudio();playSfx('yellow');
    speak(getText('light-yellow-ui'), 1.3); 
  }
  else{
    lightDur=rDur();dollTgt=180;ensureAudio();playSfx('red');
    speak(getText('light-red-ui'), 1.4, 0.9); 
  }
    setLightUI(to);
}

/* ── RENDER ── */
function buildStarField(){starField=[];const W=gCvs?gCvs.width:800,H=gCvs?gCvs.height:600;for(let i=0;i<80;i++)starField.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.4+.3,a:Math.random(),da:(Math.random()-.5)*.4})}

function render(){
  const W=gCvs.width,H=gCvs.height,ctx=gCtx;
  ctx.clearRect(0,0,W,H);drawBg(ctx,W,H);
  if(selMode==='infinite')drawInfiniteTrack(ctx,W,H);else drawTrack(ctx,W,H);
  drawParticles(ctx);drawPlayer(ctx,W,H);if(!isControlMode())drawDoll(ctx,W,H);
  if(selMode==='timed')drawTimedBorder(ctx,W,H);
  if(caughtFx>0){ctx.fillStyle=`rgba(255,48,80,${caughtFx*.4})`;ctx.fillRect(0,0,W,H)}
  starField.forEach(s=>{s.a+=s.da*.016;if(s.a<0||s.a>1)s.da*=-1});
}

function drawBg(ctx,W,H){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#05091A');g.addColorStop(1,'#0A1428');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);starField.forEach(s=>{ctx.globalAlpha=Math.max(.05,s.a*.7);ctx.fillStyle='#80B8FF';ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill()});ctx.globalAlpha=1}

function drawTrack(ctx,W,H){
  const ty=H*.62,th=H*.13,sx=70,ex=W-70;
  ctx.fillStyle='rgba(0,0,0,.35)';ctx.fillRect(sx,ty+5,ex-sx,th);
  const g=ctx.createLinearGradient(0,ty,0,ty+th);g.addColorStop(0,'#111D35');g.addColorStop(1,'#0C1628');ctx.fillStyle=g;ctx.fillRect(sx,ty,ex-sx,th);
  ctx.strokeStyle='rgba(64,144,255,.22)';ctx.lineWidth=1.5;ctx.strokeRect(sx,ty,ex-sx,th);
  ctx.fillStyle='rgba(30,111,255,.10)';ctx.fillRect(sx,ty,(ex-sx)*Math.min(progress,1),th);
  ctx.strokeStyle='rgba(255,255,255,.06)';ctx.lineWidth=1;ctx.setLineDash([16,16]);
  ctx.beginPath();ctx.moveTo(sx,ty+th/2);ctx.lineTo(ex,ty+th/2);ctx.stroke();ctx.setLineDash([]);
  ctx.strokeStyle='rgba(255,255,255,.15)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(sx+14,ty-12);ctx.lineTo(sx+14,ty+th+12);ctx.stroke();
  ctx.fillStyle='rgba(255,255,255,.25)';ctx.font='bold 10px system-ui';ctx.textAlign='center';ctx.fillText('START',sx+14,ty-19);
  ctx.strokeStyle='rgba(0,204,106,.6)';ctx.lineWidth=2.5;ctx.setLineDash([7,4]);
  ctx.beginPath();ctx.moveTo(ex-14,ty-18);ctx.lineTo(ex-14,ty+th+18);ctx.stroke();ctx.setLineDash([]);
  ctx.fillStyle='rgba(0,204,106,.8)';ctx.fillText('FINISH',ex-14,ty-26);
}

function drawInfiniteTrack(ctx,W,H){
  const ty=H*.62,th=H*.13,sx=70,ex=W-70;
  ctx.fillStyle='rgba(0,0,0,.35)';ctx.fillRect(sx,ty+5,ex-sx,th);
  const g=ctx.createLinearGradient(0,ty,0,ty+th);g.addColorStop(0,'#0D1A32');g.addColorStop(1,'#071220');ctx.fillStyle=g;ctx.fillRect(sx,ty,ex-sx,th);
  ctx.strokeStyle='rgba(0,204,106,.25)';ctx.lineWidth=1.5;ctx.strokeRect(sx,ty,ex-sx,th);
  const offset=(elapsed*40)%32;ctx.strokeStyle='rgba(0,204,106,.15)';ctx.lineWidth=1;ctx.setLineDash([16,16]);ctx.lineDashOffset=-offset;
  ctx.beginPath();ctx.moveTo(sx,ty+th/2);ctx.lineTo(ex,ty+th/2);ctx.stroke();ctx.setLineDash([]);ctx.lineDashOffset=0;
  ctx.fillStyle='rgba(0,204,106,.7)';ctx.font='bold 14px system-ui';ctx.textAlign='right';ctx.fillText('♾️ 無限距離',ex-8,ty-12);
}

function drawTimedBorder(ctx,W,H){
  if(timedLeft<10){const alpha=(.5+Math.sin(elapsed*8)*.3)*(1-timedLeft/10)*.6;ctx.strokeStyle=`rgba(255,48,80,${alpha})`;ctx.lineWidth=6;ctx.strokeRect(0,0,W,H)}
}

function drawPlayer(ctx,W,H){
  const ty=H*.62,th=H*.13,sx=70,ex=W-70;
  let px;
  if(selMode==='infinite'){px=sx+30+(ex-sx-60)*(.15+((repsCount%10)/10)*.7)}
  else{px=sx+10+(ex-sx-20)*Math.min(progress,1)}
  const py=ty+th/2;
  ctx.save();ctx.shadowColor=selChar.color;ctx.shadowBlur=14+(posture.total/100)*12;
  const controlMoving = isControlMode() && performance.now() < controlMoveUntil;
  drawStickFigure(ctx,px,py,25,selChar,controlMoving || (!isControlMode() && light==='green'&&stsState==='sit'));ctx.restore();
  if(posture.total>0&&gState==='playing'){
    const s=Math.round(posture.total),sc=s>=80?'#00CC6A':s>=60?'#FFAA00':'#FF3050';
    ctx.fillStyle=sc;ctx.font='bold 11px system-ui';ctx.textAlign='center';ctx.fillText(s,px,py-46);
  }
}

function drawStickFigure(ctx,cx,cy,sz,ch,moving){
  const t=performance.now()/1000;
  const lg=moving?Math.sin(t*7)*.32:0,ag=moving?Math.sin(t*7+1)*.38:0;
  if(ch.rainbow){const hue=(t*60)%360;ctx.strokeStyle=`hsl(${hue},90%,60%)`;ctx.fillStyle=`hsl(${hue},90%,60%)`}
  else{ctx.strokeStyle=ch.color;ctx.fillStyle=ch.color}
  ctx.lineWidth=2.5;ctx.lineCap='round';
  ctx.beginPath();ctx.arc(cx,cy-sz*.85,sz*.22,0,Math.PI*2);ctx.fill();
  // Hat
  const eqHat=getEquipped('hats');
  if(eqHat){ctx.save();ctx.font=`${sz*.55}px system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText({'hat_crown':'👑','hat_glass':'😎','hat_halo':'😇','hat_horn':'😈'}[eqHat]||'',cx,cy-sz*1.3);ctx.restore()}
  else if(ch.id==='gold'){ctx.fillStyle='#FFD700';ctx.beginPath();ctx.moveTo(cx,cy-sz*1.18);ctx.lineTo(cx-sz*.16,cy-sz*1.0);ctx.lineTo(cx+sz*.16,cy-sz*1.0);ctx.closePath();ctx.fill()}
  else if(ch.id==='red'){for(let k=-1;k<=1;k++){ctx.fillStyle=ch.color;ctx.beginPath();ctx.moveTo(cx+k*sz*.13,cy-sz*1.08);ctx.lineTo(cx+k*sz*.13-sz*.06,cy-sz*.92);ctx.lineTo(cx+k*sz*.13+sz*.06,cy-sz*.92);ctx.closePath();ctx.fill()}}
  if(ch.rainbow)ctx.fillStyle=`hsl(${(t*60+120)%360},90%,60%)`;else ctx.fillStyle=ch.color;
  ctx.fillRect(cx-2,cy-sz*.58,4,sz*.52);
  if(ch.rainbow)ctx.strokeStyle=`hsl(${(t*60+60)%360},90%,60%)`;else ctx.strokeStyle=ch.color;
  ctx.beginPath();ctx.moveTo(cx,cy-sz*.06);ctx.lineTo(cx-sz*.28*Math.sin(lg+.28),cy+sz*.55);ctx.stroke();
  ctx.beginPath();ctx.moveTo(cx,cy-sz*.06);ctx.lineTo(cx+sz*.28*Math.sin(lg+.28),cy+sz*.55);ctx.stroke();
  ctx.beginPath();ctx.moveTo(cx,cy-sz*.4);ctx.lineTo(cx-sz*.38,cy-sz*.08+ag*sz*.18);ctx.stroke();
  ctx.beginPath();ctx.moveTo(cx,cy-sz*.4);ctx.lineTo(cx+sz*.38,cy-sz*.08-ag*sz*.18);ctx.stroke();
  if(ch.id==='blue'&&!ch.rainbow){ctx.fillStyle=ch.acc;ctx.beginPath();ctx.arc(cx,cy-sz*.35,sz*.07,0,Math.PI*2);ctx.fill()}
  if(ch.id==='green'){ctx.fillStyle=ch.acc;ctx.font=`bold ${sz*.2}px system-ui`;ctx.textAlign='center';ctx.fillText('★',cx,cy-sz*.28)}
}

function drawDoll(ctx,W,H){
  const ty=H*.62,dx=W-64,dy=ty-12,sz=38;
  const fp=((dollRot%360)+360)%360>90;
  ctx.save();ctx.translate(dx,dy);
  ctx.shadowColor=fp?'rgba(255,48,80,.7)':light==='yellow'?'rgba(255,170,0,.7)':'rgba(30,111,255,.25)';ctx.shadowBlur=fp?26:8;
  const dc=fp?'#FF3050':'#2A4878',hc=fp?'#FFCCCC':'#A0C8FF';
  ctx.fillStyle=dc;ctx.beginPath();ctx.moveTo(-sz*.28,-sz*.28);ctx.lineTo(sz*.28,-sz*.28);ctx.lineTo(sz*.38,sz*.5);ctx.lineTo(-sz*.38,sz*.5);ctx.closePath();ctx.fill();
  ctx.fillStyle=hc;ctx.beginPath();ctx.arc(0,-sz*.54,sz*.27,0,Math.PI*2);ctx.fill();
  if(fp){ctx.fillStyle='#CC0030';[-sz*.1,sz*.1].forEach(ex=>{ctx.beginPath();ctx.arc(ex,-sz*.57,2.5,0,Math.PI*2);ctx.fill()});const t2=performance.now()/1000;ctx.fillStyle=`rgba(255,48,80,${.16+Math.sin(t2*3)*.08})`;ctx.save();ctx.translate(0,-sz*.54);ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,W*3,Math.PI+.38,Math.PI*2-.38);ctx.closePath();ctx.fill();ctx.restore()}
  ctx.shadowBlur=0;ctx.restore();
  ctx.fillStyle=fp?'rgba(255,48,80,.9)':'rgba(80,130,200,.6)';ctx.font='bold 10px system-ui';ctx.textAlign='center';ctx.fillText(fp?'👁 偵測中':'⬅ 背對',dx,ty-62);
}

function getPlayerX(){
  if(!gCvs)return 200;
  const sx=70,ex=gCvs.width-70;
  if(selMode==='infinite')return sx+30+(ex-sx-60)*(.15+(repsCount%10)/10*.7);
  return sx+10+(ex-sx-20)*Math.min(Math.max(progress,0.05),1);
}
function spawnParticle(){
  if(!gCvs)return;
  const px=getPlayerX();
  const py=gCvs.height*.62+gCvs.height*.065;
  const eqTrail=getEquipped('trails');
  const trailColor={'trail_fire':`hsl(${10+Math.random()*40},100%,${50+Math.random()*20}%)`,'trail_ice':`hsl(${190+Math.random()*30},95%,${65+Math.random()*15}%)`,'trail_star':`hsl(${40+Math.random()*40},100%,${60+Math.random()*20}%)`,'trail_elec':`hsl(${260+Math.random()*60},100%,${65+Math.random()*20}%)`}[eqTrail]||`hsl(${210+Math.random()*40},90%,65%)`;
  const size=eqTrail?5+Math.random()*5:2+Math.random()*2;
  const speed=eqTrail?1.3:1.0;
  particles.push({x:px+(Math.random()-.5)*20,y:py+(Math.random()-.5)*20,vx:(Math.random()-.5)*50*speed,vy:(-Math.random()*60-15)*speed,life:eqTrail?1.4:1,color:trailColor,size});
}

function drawParticles(ctx){particles.forEach(p=>{ctx.globalAlpha=Math.max(0,p.life*.9);ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,p.size||2.8,0,Math.PI*2);ctx.fill()});ctx.globalAlpha=1}

/* ── POSE DETECT ── */
// 新增一個獨立的變數來追蹤影片時間，避免跟 WASM 的時間戳衝突
let lastProcessedVideoTime = -1;

/* ── MEDIAPIPE 新世代視訊偵測迴圈 (整合平滑化防抖) ── */
async function detectLoopMP() {
  if (!detecting || !poseLandmarker) return;

  try {
    if (videoElement.readyState >= 2 && videoElement.videoWidth > 0 && videoElement.currentTime !== lastProcessedVideoTime) {
      lastProcessedVideoTime = videoElement.currentTime;

      if (pCvs.width !== videoElement.videoWidth) {
        pCvs.width = videoElement.videoWidth;
        pCvs.height = videoElement.videoHeight;
      }

      const W = pCvs.width;
      const H = pCvs.height;

      // 繪製畫面給玩家看 (水平翻轉)
      pCtx.clearRect(0, 0, W, H);
      pCtx.save();
      pCtx.scale(-1, 1);
      pCtx.drawImage(videoElement, -W, 0, W, H);
      pCtx.restore();

      let nowMs = performance.now();
      if (nowMs <= mpLastWasmTime) nowMs = mpLastWasmTime + 1;
      mpLastWasmTime = nowMs;

      // 執行 AI 推理
      const results = poseLandmarker.detectForVideo(videoElement, nowMs);

      if (results.landmarks && results.landmarks.length > 0) {
        const mpLandmarks = results.landmarks[0];
        prevKP = mpLandmarks;

        if (typeof drawSkeletonLinesMP === 'function') {
          drawSkeletonLinesMP(mpLandmarks, W, H);
        }

        // --- 狀態機分流 ---
        if (phase === "READY") {
          checkCalibrationPosition(mpLandmarks);
        } else if (phase === "GAME" && !isTimeUp) {
          
          if (typeof calcSTSMetricMP === 'function') {
            let metrics = calcSTSMetricMP(mpLandmarks, W, H);
            if (metrics) {
            // 💡 整合區：加入數據平滑化 (Smooth Value)，防止數值突跳與關節抖動
            if (metrics.points.hip) {
                let hipYRaw = metrics.points.hip.y;
                metrics.points.hip.y = smoothValue(hipYRaw, hipPxYBuf);
            }
            if (metrics.angles.hip !== null) metrics.angles.hip = smoothValue(metrics.angles.hip, angleHipBuf);
            if (metrics.angles.knee !== null) metrics.angles.knee = smoothValue(metrics.angles.knee, angleKneeBuf);
            if (metrics.angles.trunk_vert !== null) metrics.angles.trunk_vert = smoothValue(metrics.angles.trunk_vert, trunkVertBuf);
            if (metrics.angles.heel !== null) metrics.angles.heel = smoothValue(metrics.angles.heel, angleHeelBuf);

            // 更新 UI 顯示
            const trunkEl = document.getElementById('angle-trunk-now');
            const heelEl = document.getElementById('angle-heel-now');
            if (trunkEl) trunkEl.textContent = metrics.angles.trunk_vert != null ? metrics.angles.trunk_vert.toFixed(1) + '°' : '--°';
            if (heelEl) heelEl.textContent = metrics.angles.heel != null ? metrics.angles.heel.toFixed(1) + '°' : '--°';

            // 執行模式對應的動作判定。
            if (typeof calcMoveMP === 'function') movevalue = calcMoveMP(metrics);
            if (selMode === 'controlled_sit') {
              updateControlledSitMode(metrics, nowMs);
              if (typeof checkSTSMP === 'function') checkSTSMP(metrics); // 保留原 STS 四階段提示，但不在站起時結算。
            } else if (selMode === 'heel_control') {
              updateHeelControlMode(metrics, nowMs);
            } else if (typeof checkSTSMP === 'function') {
              checkSTSMP(metrics);
            }
            }
          }
        }
      } else {
        if (phase === "READY") checkCalibrationPosition(null);
      }
    }
  } catch (err) {
    console.error("⚠️ 辨識迴圈發生異常:", err);
  }

  if (detecting) {
    detectLoopId = requestAnimationFrame(detectLoopMP);
  }
}

/* ── 獨立繪製骨架連線與關節點 (解除二次鏡像版) ── */
function drawSkeletonLinesMP(mpLandmarks, W, H) {
  if (!pCtx || !mpLandmarks) return;

  function getPt(idx) {
    const lm = mpLandmarks[idx];
    // 門檻降至 0.1，幾乎只要有人影就會畫出來
    if (!lm) return null;

    const visibility = lm.visibility ?? 1;
    // 💡 關鍵：拿掉 (1 - lm.x)，直接用 lm.x！
    // 因為 MediaPipe 已經把前鏡頭的數據處理成鏡像了，直接乘上畫布寬度即可。
    const rawX = (1 - lm.x) * W;
    const rawY = lm.y * H;

    // 💡 繪圖層平滑化：腳踝/腳跟/腳尖（27~32）用較強的平滑，減少抖動
    const smoothed = smoothDrawPoint(idx, rawX, rawY, visibility);

    return {
      x: smoothed.x,
      y: smoothed.y,
      visibility
    };
  }

  function drawLine(i, j) {
    const a = getPt(i);
    const b = getPt(j);
    if (!a || !b) return;
    pCtx.beginPath();
    pCtx.moveTo(a.x, a.y);
    pCtx.lineTo(b.x, b.y);
    pCtx.strokeStyle = "#00ffaa";
    pCtx.lineWidth = 3.5;
    pCtx.lineCap = 'round';
    pCtx.stroke();
  }

  function drawPoint(i, color = "#00ffaa", r = 5) {
    const p = getPt(i);
    if (!p) return;
    pCtx.beginPath();
    pCtx.arc(p.x, p.y, r, 0, Math.PI * 2);
    pCtx.fillStyle = color;
    pCtx.fill();
  }

  const lines = [
    [11, 12], [11, 23], [12, 24], [23, 24],
    [11, 13], [13, 15], [12, 14], [14, 16],
    [23, 25], [25, 27], [27, 29], [29, 31],
    [24, 26], [26, 28], [28, 30], [30, 32]
  ];
  lines.forEach(([a, b]) => drawLine(a, b));
  [11, 12, 23, 24, 25, 26, 27, 28].forEach(i => drawPoint(i, "#00ffaa", 5));
  [29, 30].forEach(i => drawPoint(i, '#FFAA00', 6));
  [31, 32].forEach(i => drawPoint(i, '#00CC6A', 6));
}

/* ── CONTROLLED MOVEMENT TRAINING ENGINE ── */
function clamp01(v){ return Math.max(0, Math.min(1, v)); }

function setControlBodyState(text, color='var(--blue2)'){
  const el = document.getElementById('ss-body-state');
  if(el){ el.textContent = text; el.style.color = color; }
}

function updateControlRemaining(remainingSec, labelKey='game-rep-remaining'){
  const card = document.getElementById('rep-time-card');
  const label = document.getElementById('rep-time-label');
  const val = document.getElementById('rep-time-value');
  if(card) card.style.display = isControlMode() ? 'flex' : 'none';
  if(label) label.textContent = getText(labelKey);
  if(!val) return;
  if(remainingSec === null || remainingSec === undefined || !Number.isFinite(remainingSec)){
    val.textContent = '--';
  }else if(remainingSec >= 0){
    val.textContent = remainingSec.toFixed(1) + ' s';
  }else{
    val.textContent = '+' + Math.abs(remainingSec).toFixed(1) + ' s';
  }
}

function getControlScore(actualSec, targetSec=controlTargetSec){
  if(!Number.isFinite(actualSec) || actualSec <= 0 || !Number.isFinite(targetSec) || targetSec <= 0) return 0;
  const error = Math.abs(actualSec - targetSec) / targetSec;
  return Math.round(clamp01(1 - error) * 100);
}

function finalizeControlRep(rep){
  rep.targetSec = controlTargetSec;
  rep.holdSec = CONTROL_HOLD_SEC;
  rep.side = rep.side || controlLockedSide || null;
  rep.controlScore = getControlScore(rep.actualSec, controlTargetSec);
  rep.complete = true;
  controlSessionReps.push(rep);
  controlLastScore = rep.controlScore;
  posture = { total: rep.controlScore, details: [], angles: {} };

  score += rep.controlScore;
  repsCount += 1;
  const p = rep.controlScore / 100;
  const step = 0.05 + 0.15 * Math.pow(p, 1.5);
  progress = Math.min(1, progress + step);
  controlMoveUntil = performance.now() + 900;

  const repEl = document.getElementById('ss-rep-num');
  if(repEl) repEl.textContent = repsCount;
  showControlRepFeedback(rep.controlScore, rep.actualSec);
  if(typeof onRepCompleted === 'function') onRepCompleted(rep.controlScore);
  updateControlRemaining(null);
  releaseControlSide();

  if(progress >= 1){
    triggerControlTrainingEnd();
  }
}

function showControlRepFeedback(repScore, actualSec){
  const fb=document.getElementById('rep-feedback'), sc=document.getElementById('rep-fb-score'), lbl=document.getElementById('rep-fb-label');
  if(!fb || !sc || !lbl) return;
  sc.textContent='+'+repScore;
  sc.style.color=repScore>=90?'var(--green)':repScore>=75?'var(--yellow)':'var(--red)';
  lbl.textContent = `下降 ${actualSec.toFixed(1)} 秒｜目標 ${controlTargetSec.toFixed(1)} 秒`;
  fb.classList.add('show');
  setTimeout(()=>fb.classList.remove('show'),1400);
}

function normalizedSitPosition(hipY, standHipY){
  if(!Number.isFinite(hipY) || !Number.isFinite(standHipY) || !Number.isFinite(calibMaxHipY)) return null;
  const range = calibMaxHipY - standHipY;
  if(Math.abs(range) < 20) return null;
  return clamp01((hipY - standHipY) / range);
}

function updateControlledSitMode(metrics, nowMs){
  if(gState !== 'playing' || !metrics?.points?.hip || !metrics?.angles) return;
  const hipY = metrics.points.hip.y;
  const hipAngle = metrics.angles.hip;
  const kneeAngle = metrics.angles.knee;
  const trunkAngle = metrics.angles.trunk_vert;
  if(!Number.isFinite(hipY) || !Number.isFinite(hipAngle) || !Number.isFinite(kneeAngle)) return;

  const st = controlledSitState;

  // 一次完整 Controlled Sit 從坐姿準備開始就鎖定同一側；下一 Rep 才重新選側。
  if(st.state === 'WAIT_STAND' && stsPhase === 0 && !controlLockedSide){
    lockControlSide(metrics.selected_side);
  }

  // 原 STS 四階段抵達 3 後，再確認已回到個人校正站姿範圍的 70% 以上，才進入固定 3 秒 Hold。
  // standProgress = 1 - Pcalib，其中 Pcalib=0 為校正站姿、1 為校正坐姿。
  const sitProgress = normalizedSitPosition(hipY, userStandHipBaseline);
  const standProgress = sitProgress === null ? null : (1 - sitProgress);
  if(stsPhase === 3 && st.state === 'WAIT_STAND' && Number.isFinite(standProgress) && standProgress >= CONTROL_HOLD_ENTRY_RATIO){
    lockControlSide(metrics.selected_side);
    st.state = 'HOLD';
    st.standHipY = hipY;
    st.holdStartMs = nowMs;
    st.startMs = null;
    st.lastHipY = hipY;
    st.descentCandidateMs = null;
    st.candidateSamples = [];
    st.seatCandidateMs = null;
    st.samples = [];
    setControlBodyState(getText('game-control-hold'), 'var(--green)');
    updateControlRemaining(CONTROL_HOLD_SEC, 'game-hold-remaining');
    return;
  }

  if(st.state === 'HOLD'){
    const holdSitProgress = normalizedSitPosition(hipY, userStandHipBaseline);
    const holdStandProgress = holdSitProgress === null ? null : (1 - holdSitProgress);
    // Hold 期間只要求仍維持在個人校正站姿範圍的 85% 以上；不再用固定 5% / knee 155° 追頂端。
    const stillStanding = Number.isFinite(holdStandProgress) && holdStandProgress >= CONTROL_HOLD_ENTRY_RATIO;

    if(!stillStanding){
      st.holdStartMs = null;
      setControlBodyState(getText('game-control-hold-recover'), 'var(--yellow)');
      updateControlRemaining(CONTROL_HOLD_SEC, 'game-hold-remaining');
      return;
    }

    // 正式 3 秒 Hold 使用固定的 standHipY，不跟著人體慢慢往下漂移。
    if(st.holdStartMs === null) st.holdStartMs = nowMs;
    const holdElapsed = (nowMs - st.holdStartMs) / 1000;
    updateControlRemaining(Math.max(0, CONTROL_HOLD_SEC - holdElapsed), 'game-hold-remaining');

    if(holdElapsed >= CONTROL_HOLD_SEC){
      st.state = 'WAIT_DESCENT';
      // 下降 trajectory 以 Hold 完成當下的實際站姿作為 P=0，避免把校正時與本 Rep 的小差異算進下降。
      st.standHipY = hipY;
      st.lastHipY = hipY;
      st.descentCandidateMs = null;
      st.candidateSamples = [];
      setControlBodyState(getText('game-control-wait-descent'), 'var(--green)');
      updateControlRemaining(controlTargetSec, 'game-rep-remaining');
    }
    return;
  }

  if(st.state === 'WAIT_DESCENT'){
    const pos = normalizedSitPosition(hipY, st.standHipY);
    if(pos === null) return;
    const deltaY = st.lastHipY === null ? 0 : hipY - st.lastHipY;
    st.lastHipY = hipY;
    
    const descentLike = hipAngle < 170 && deltaY > 0;
    if(descentLike){
      if(st.descentCandidateMs === null){
        st.descentCandidateMs = nowMs;
        st.candidateSamples = [];
      }
      const ct = Math.max(0, (nowMs - st.descentCandidateMs) / 1000);
      st.candidateSamples.push({
        t: ct,
        position: pos,
        hipY,
        trunkAngle: Number.isFinite(trunkAngle) ? trunkAngle : null,
        hipAngle,
        kneeAngle
      });
      if(nowMs - st.descentCandidateMs >= CONTROL_ONSET_CONFIRM_MS){
        st.state = 'DESCENDING';
        st.startMs = st.descentCandidateMs; 
        st.samples = st.candidateSamples.slice();
        st.seatCandidateMs = null;
        lastSpokenSecond = null;
        setControlBodyState(getText('game-control-sit'), 'var(--yellow)');
      }
    }else{
      st.descentCandidateMs = null;
      st.candidateSamples = [];
    }
    return;
  }

  if(st.state === 'DESCENDING'){
    const pos = normalizedSitPosition(hipY, st.standHipY);
    if(pos === null) return;
    const t = Math.max(0, (nowMs - st.startMs) / 1000);
    st.samples.push({
      t,
      position: pos,
      hipY,
      trunkAngle: Number.isFinite(trunkAngle) ? trunkAngle : null,
      hipAngle,
      kneeAngle
    });
    const remaining = controlTargetSec - t;
    updateControlRemaining(remaining, 'game-rep-remaining');
    const sec = Math.ceil(remaining);
    if(sec > 0 && sec !== lastSpokenSecond){
      lastSpokenSecond = sec;
      speak(String(sec));
    }

    const seated = hipAngle < 110 && kneeAngle < 120 && pos > 0.88;
    if(seated){
      if(st.seatCandidateMs === null) st.seatCandidateMs = nowMs;
    }else{
      st.seatCandidateMs = null;
    }

    if(st.seatCandidateMs !== null && nowMs - st.seatCandidateMs >= CONTROL_END_CONFIRM_MS){ //怪怪的
      const actualSec = Math.max(0, (st.seatCandidateMs - st.startMs) / 1000);
      let repSamples = st.samples.filter(s => s.t <= actualSec + 1e-6);
      const finalSample = interpolateSample(st.samples, actualSec);
      if(finalSample && (!repSamples.length || Math.abs(repSamples[repSamples.length-1].t - actualSec) > 1e-3)) repSamples.push(finalSample);
      const rep = {
        type: 'controlled_sit',
        actualSec,
        holdSec: CONTROL_HOLD_SEC,
        side: controlLockedSide,
        samples: repSamples
      };
      st.state = 'WAIT_STAND';
      st.standHipY = null;
      st.holdStartMs = null;
      st.startMs = null;
      st.lastHipY = hipY;
      st.descentCandidateMs = null;
      st.candidateSamples = [];
      st.seatCandidateMs = null;
      st.samples = [];
      finalizeControlRep(rep);
    }
  }
}

function mean(values){
  const v = values.filter(Number.isFinite);
  return v.length ? v.reduce((a,b)=>a+b,0)/v.length : null;
}

function updateHeelControlMode(metrics, nowMs){
  if(gState !== 'playing' || !metrics?.angles) return;
  const angle = metrics.angles.heel;
  const kneeAngle = metrics.angles.knee;
  if(!Number.isFinite(angle)) return;
  const st = heelControlState;

  // 每個 Heel Rep 先用下肢＋足部 SideSelector 選側，進入 Baseline 後就鎖住到 Rep 結束。
  if(st.state === 'WAIT_STAND'){
    setControlBodyState(getText('game-heel-stand'), 'var(--yellow)');
    if(Number.isFinite(kneeAngle) && kneeAngle > 160){
      lockControlSide(metrics.selected_side);
      st.state = 'BASELINE';
      st.baselineBuf = [];
      st.baselineAngle = null;
      st.baselineStartMs = nowMs;
      st.peakAngle = null;
      st.holdReferenceAngle = null;
      st.lowerStartAngle = null;
      st.holdStartMs = null;
      st.lastAngle = angle;
      updateControlRemaining(null);
    }
    return;
  }

  if(st.state === 'BASELINE'){
    st.baselineBuf.push(angle);
    if(st.baselineBuf.length > 30) st.baselineBuf.shift();
    const base = mean(st.baselineBuf);
    if(Number.isFinite(base)) st.baselineAngle = base;
    setControlBodyState(getText('game-heel-baseline'), 'var(--blue2)');

    // 先用真實時間建立約 0.5 秒 baseline；不是「數滿幾幀」才開始。
    const baselineReady = Number.isFinite(st.baselineStartMs) && (nowMs - st.baselineStartMs >= CONTROL_HEEL_BASELINE_MS);
    if(baselineReady && Number.isFinite(st.baselineAngle) && angle > st.baselineAngle + 4){
      st.state = 'RAISING';
      st.peakAngle = angle;
      st.lastAngle = angle;
      setControlBodyState(getText('game-heel-raising'), 'var(--green)');
    }
    return;
  }

  if(st.state === 'RAISING'){
    st.peakAngle = Math.max(st.peakAngle ?? angle, angle);
    st.lastAngle = angle;

    // 校正 Stage 1 已取得個人的最大 Heel–Toe angle；
    // Hold 門檻以「本 Rep baseline → 個人校正最大值」的活動範圍比例計算。
    const holdThreshold = Number.isFinite(calibratedHeelMaxAngle) && Number.isFinite(st.baselineAngle)
      ? st.baselineAngle + (calibratedHeelMaxAngle - st.baselineAngle) * CONTROL_HOLD_ENTRY_RATIO
      : null;
    if(Number.isFinite(holdThreshold) && angle >= holdThreshold){
      st.state = 'HOLD';
      st.holdReferenceAngle = holdThreshold; // 只保存進入門檻；Hold 計時不再因抬得更高而重設。
      st.holdStartMs = nowMs;
      setControlBodyState(getText('game-heel-hold'), 'var(--green)');
      updateControlRemaining(CONTROL_HOLD_SEC, 'game-hold-remaining');
    }
    return;
  }

  if(st.state === 'HOLD'){
    const withinHoldZone = Number.isFinite(st.holdReferenceAngle) && angle >= st.holdReferenceAngle;

    // 只要仍高於本 Rep 進入 Hold 時固定下來的 reference，3 秒持續累積；抬得更高不會重設倒數。
    if(!withinHoldZone){
      st.holdStartMs = null;
      setControlBodyState(getText('game-heel-hold-recover'), 'var(--yellow)');
      updateControlRemaining(CONTROL_HOLD_SEC, 'game-hold-remaining');
      st.lastAngle = angle;
      return;
    }

    if(st.holdStartMs === null) st.holdStartMs = nowMs;
    const holdElapsed = (nowMs - st.holdStartMs) / 1000;
    updateControlRemaining(Math.max(0, CONTROL_HOLD_SEC - holdElapsed), 'game-hold-remaining');
    st.lastAngle = angle;

    if(holdElapsed >= CONTROL_HOLD_SEC){
      st.state = 'WAIT_LOWER';
      // 下降分析從 Hold 完成當下的實際角度開始，而不是從校正最大值或歷史 peak 開始。
      st.lowerStartAngle = angle;
      st.lowerCandidateMs = null;
      st.candidateSamples = [];
      setControlBodyState(getText('game-heel-wait-lower'), 'var(--green)');
      updateControlRemaining(controlTargetSec, 'game-rep-remaining');
    }
    return;
  }

  if(st.state === 'WAIT_LOWER'){
    const lowerStart = Number.isFinite(st.lowerStartAngle) ? st.lowerStartAngle : st.peakAngle;
    const range = lowerStart - st.baselineAngle;
    if(range <= 1) return;
    const pos = clamp01((lowerStart - angle) / range);
    const delta = st.lastAngle === null ? 0 : angle - st.lastAngle;
    st.lastAngle = angle;
    const loweringLike = angle <= lowerStart - CONTROL_HEEL_START_DROP_DEG && delta <= 0;

    if(loweringLike){
      if(st.lowerCandidateMs === null){
        st.lowerCandidateMs = nowMs;
        st.candidateSamples = [];
      }
      const ct = Math.max(0, (nowMs - st.lowerCandidateMs) / 1000);
      st.candidateSamples.push({t: ct, position: pos, heelAngle: angle});
      if(nowMs - st.lowerCandidateMs >= CONTROL_ONSET_CONFIRM_MS){
        st.state = 'LOWERING';
        st.startMs = st.lowerCandidateMs; // 回推到下降真正開始點。
        st.samples = st.candidateSamples.slice();
        st.baselineCandidateMs = null;
        lastSpokenSecond = null;
        setControlBodyState(getText('game-heel-lowering'), 'var(--yellow)');
      }
    }else{
      st.lowerCandidateMs = null;
      st.candidateSamples = [];
    }
    return;
  }

  if(st.state === 'LOWERING'){
    const lowerStart = Number.isFinite(st.lowerStartAngle) ? st.lowerStartAngle : st.peakAngle;
    const range = lowerStart - st.baselineAngle;
    if(range <= 1) return;
    const pos = clamp01((lowerStart - angle) / range);
    const t = Math.max(0, (nowMs - st.startMs) / 1000);
    st.samples.push({t, position: pos, heelAngle: angle});
    const remaining = controlTargetSec - t;
    updateControlRemaining(remaining, 'game-rep-remaining');
    const sec = Math.ceil(remaining);
    if(sec > 0 && sec !== lastSpokenSecond){
      lastSpokenSecond = sec;
      speak(String(sec));
    }

    const atBaseline = pos >= 0.88 && angle <= st.baselineAngle + 2;
    if(atBaseline){
      if(st.baselineCandidateMs === null) st.baselineCandidateMs = nowMs;
    }else{
      st.baselineCandidateMs = null;
    }

    if(st.baselineCandidateMs !== null && nowMs - st.baselineCandidateMs >= CONTROL_END_CONFIRM_MS){
      const actualSec = Math.max(0, (st.baselineCandidateMs - st.startMs) / 1000);
      let repSamples = st.samples.filter(s => s.t <= actualSec + 1e-6);
      const finalSample = interpolateSample(st.samples, actualSec);
      if(finalSample && (!repSamples.length || Math.abs(repSamples[repSamples.length-1].t - actualSec) > 1e-3)) repSamples.push(finalSample);
      const rep = {
        type: 'heel_control',
        actualSec,
        holdSec: CONTROL_HOLD_SEC,
        side: controlLockedSide,
        peakAngle: st.peakAngle,
        baselineAngle: st.baselineAngle,
        samples: repSamples
      };
      st.state = 'WAIT_STAND';
      st.baselineAngle = null;
      st.baselineBuf = [];
      st.baselineStartMs = null;
      st.peakAngle = null;
      st.holdReferenceAngle = null;
      st.lowerStartAngle = null;
      st.holdStartMs = null;
      st.startMs = null;
      st.lastAngle = null;
      st.lowerCandidateMs = null;
      st.candidateSamples = [];
      st.baselineCandidateMs = null;
      st.samples = [];
      finalizeControlRep(rep);
    }
  }
}

function interpolateSample(samples, t){
  if(!samples?.length) return null;
  if(t <= samples[0].t) return {...samples[0], t};
  const last = samples[samples.length - 1];
  if(t >= last.t) return {...last, t};
  for(let i=1;i<samples.length;i++){
    const b = samples[i], a = samples[i-1];
    if(b.t >= t){
      const span = b.t - a.t;
      const r = span > 1e-6 ? (t - a.t) / span : 0;
      const out = {t};
      const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
      keys.forEach(k=>{
        if(k === 't') return;
        const av = a[k], bv = b[k];
        out[k] = Number.isFinite(av) && Number.isFinite(bv) ? av + (bv-av)*r : (Number.isFinite(av)?av:bv);
      });
      return out;
    }
  }
  return {...last, t};
}

function buildHalfSecondRows(rep){
  const rows=[];
  const end = rep.actualSec || rep.samples?.[rep.samples.length-1]?.t || 0;
  for(let t=0; t<=end+1e-6; t+=0.5){
    rows.push(interpolateSample(rep.samples, Math.min(t,end)));
  }
  if(rows.length && end > 0 && Math.abs(rows[rows.length-1].t - end) > 0.05){
    rows.push(interpolateSample(rep.samples,end));
  }
  return rows.filter(Boolean);
}

function drawControlRepChart(canvas, rep){
  if(!canvas || !rep?.samples?.length) return;
  const ctx=canvas.getContext('2d'), W=canvas.width, H=canvas.height;
  ctx.clearRect(0,0,W,H);
  const pad={l:44,r:16,t:18,b:32};
  const pw=W-pad.l-pad.r, ph=H-pad.t-pad.b;
  const maxT=Math.max(controlTargetSec, rep.actualSec, 0.5);

  ctx.strokeStyle='rgba(120,170,255,.18)'; ctx.lineWidth=1;
  for(let i=0;i<=4;i++){
    const y=pad.t+ph*i/4;
    ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(W-pad.r,y);ctx.stroke();
    ctx.fillStyle='rgba(190,215,255,.65)';ctx.font='11px system-ui';ctx.textAlign='right';
    ctx.fillText(String(100-i*25)+'%',pad.l-7,y+4);
  }
  for(let t=0;t<=maxT+1e-6;t+=1){
    const x=pad.l+(t/maxT)*pw;
    ctx.strokeStyle='rgba(120,170,255,.10)';ctx.beginPath();ctx.moveTo(x,pad.t);ctx.lineTo(x,H-pad.b);ctx.stroke();
    ctx.fillStyle='rgba(190,215,255,.55)';ctx.textAlign='center';ctx.fillText(t.toFixed(0),x,H-10);
  }

  // 目標線：此模式目前定義為「在指定時間內完成 0→100% 的均勻節奏」。
  ctx.save();ctx.setLineDash([7,5]);ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(pad.l,H-pad.b);ctx.lineTo(pad.l+(controlTargetSec/maxT)*pw,pad.t);ctx.stroke();ctx.restore();

  ctx.strokeStyle='#4090FF';ctx.lineWidth=3;ctx.lineJoin='round';ctx.beginPath();
  rep.samples.forEach((p,i)=>{
    const x=pad.l+(p.t/maxT)*pw;
    const y=pad.t+(1-clamp01(p.position))*ph;
    i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
  });ctx.stroke();

  ctx.fillStyle='rgba(200,220,255,.8)';ctx.font='12px system-ui';ctx.textAlign='center';ctx.fillText('時間 (s)',pad.l+pw/2,H-2);
}

function renderControlTrainingReport(){
  const wrap=document.getElementById('control-report-wrap');
  if(!wrap) return;
  if(!isControlMode()) { wrap.style.display='none'; wrap.innerHTML=''; return; }
  wrap.style.display='block';
  const reps=controlSessionReps;
  const avgActual=reps.length?reps.reduce((a,r)=>a+r.actualSec,0)/reps.length:0;
  const avgScore=reps.length?reps.reduce((a,r)=>a+r.controlScore,0)/reps.length:0;
  const title=selMode==='controlled_sit'?'控制坐下訓練分析':'腳跟控制訓練分析';
  const angleHeaders=selMode==='controlled_sit'
    ? '<th>時間</th><th>進度</th><th>軀幹</th><th>髖</th><th>膝</th>'
    : '<th>時間</th><th>進度</th><th>Heel–Toe Angle</th>';

  let html=`<div class="control-report-head"><h3>${title}</h3>
    <div class="control-report-protocol-note">固定保持 ${CONTROL_HOLD_SEC.toFixed(1)} 秒 → 再進入使用者設定的下降控制時間</div>
    <div class="control-summary-grid">
    <div><b>${controlTargetSec.toFixed(1)} s</b><span>目標下降時間</span></div>
    <div><b>${reps.length}</b><span>完整 Rep</span></div>
    <div><b>${avgActual.toFixed(2)} s</b><span>平均下降時間</span></div>
    <div><b>${Math.round(avgScore)}</b><span>平均控制分</span></div>
  </div></div>`;
  reps.forEach((rep,idx)=>{
    const rows=buildHalfSecondRows(rep);
    const body=rows.map(r=>{
      const p=(clamp01(r.position??0)*100).toFixed(0)+'%';
      if(rep.type==='controlled_sit'){
        const f=v=>Number.isFinite(v)?v.toFixed(1)+'°':'--';
        return `<tr><td>${r.t.toFixed(2)} s</td><td>${p}</td><td>${f(r.trunkAngle)}</td><td>${f(r.hipAngle)}</td><td>${f(r.kneeAngle)}</td></tr>`;
      }
      const hv=Number.isFinite(r.heelAngle)?r.heelAngle.toFixed(1)+'°':'--';
      return `<tr><td>${r.t.toFixed(2)} s</td><td>${p}</td><td>${hv}</td></tr>`;
    }).join('');
    html+=`<details class="control-rep-card" ${idx===0?'open':''}>
      <summary>Rep ${idx+1}｜保持 ${Number(rep.holdSec ?? CONTROL_HOLD_SEC).toFixed(1)} s ✓｜下降 ${rep.actualSec.toFixed(2)} s｜控制分 ${rep.controlScore}${rep.side?`｜${rep.side==='left'?'左側':'右側'}`:''}</summary>
      <div class="control-rep-content">
        <canvas class="control-rep-chart" id="control-rep-chart-${idx}" width="720" height="250"></canvas>
        <div class="control-chart-note">虛線＝依設定秒數建立的目標節奏；實線＝本次實際下降進度。</div>
        <div class="control-table-wrap"><table class="control-angle-table"><thead><tr>${angleHeaders}</tr></thead><tbody>${body}</tbody></table></div>
      </div>
    </details>`;
  });
  wrap.innerHTML=html;
  requestAnimationFrame(()=>reps.forEach((rep,i)=>drawControlRepChart(document.getElementById(`control-rep-chart-${i}`),rep)));
}

function triggerControlTrainingEnd(){
  if(gState==='win'||gState==='over') return;
  gState='win'; detecting=false;
  stopVideoRecording(null); // 第一版控制訓練只產生前端報告，不啟動 Heavy。
  stopBGM();ensureAudio();playSfx('win');
  const avgScore=controlSessionReps.length?Math.round(controlSessionReps.reduce((a,r)=>a+r.controlScore,0)/controlSessionReps.length):0;
  showOverlay('✅', selMode==='controlled_sit'?'控制坐下完成':'腳跟控制完成', '本次分析由前端 MediaPipe Full 即時資料產生。', true, [
    {v:repsCount,l:'完整 Rep'},
    {v:avgScore,l:'平均控制分'},
    {v:controlTargetSec.toFixed(1)+' s',l:'下降目標'},
    {v:fmtT(elapsed),l:'訓練時間'}
  ]);
  const ai=document.getElementById('ai-diag-box'); if(ai) ai.style.display='none';
  const oldChart=document.getElementById('chart-wrap'); if(oldChart) oldChart.style.display='none';
  const analysisStatus=document.getElementById('analysis-status'); if(analysisStatus) analysisStatus.textContent='本模式目前先使用前端分析報告；Heavy 暫不執行。';
  renderControlTrainingReport();
}

function configureGameUIForMode(){
  const control=isControlMode();
  const badge=document.getElementById('light-badge');
  const hud=document.getElementById('hud');
  const warn=document.getElementById('move-warn');
  const repCard=document.getElementById('rep-time-card');
  const postureLbl=document.getElementById('posture-card-label');
  const grade=document.getElementById('p-grade');
  const report=document.getElementById('control-report-wrap');
  const ai=document.getElementById('ai-diag-box');
  const oldChart=document.getElementById('chart-wrap');

  if(control){
    if(badge){
      badge.className='lb-control';
      badge.textContent=(selMode==='controlled_sit'?'🪑 控制坐下':'🦶 腳跟控制')+` — 保持 ${CONTROL_HOLD_SEC.toFixed(0)} 秒｜下降目標 ${controlTargetSec.toFixed(1)} 秒`;
    }
    if(hud) hud.style.display='none';
    if(warn) warn.style.display='none';
    if(repCard) repCard.style.display='flex';
    if(postureLbl) postureLbl.textContent=getText('game-control-score-lbl');
    if(grade) grade.style.display='none';
    if(ai) ai.style.display='none';
    if(oldChart) oldChart.style.display='none';
  }else{
    if(hud) hud.style.display='flex';
    if(warn) warn.style.display='';
    if(repCard) repCard.style.display='none';
    if(postureLbl) postureLbl.textContent=getText('game-posture-lbl');
    if(grade) grade.style.display='inline-block';
    if(ai) ai.style.display='block';
    if(oldChart) oldChart.style.display='block';
    if(report){report.style.display='none';report.innerHTML='';}
    setLightUI(light);
  }
}

function handleRepCompleted(){
  if(gState!=='playing')return;
  if(selMode!=='timed'&&light==='red'){triggerCaught(getText('err-red-stand'));return}
  const p=Math.max(0,posture.total/100);
  const step=0.05+0.15*Math.pow(p,1.5);
  const repScore=Math.round(100*p);
  score+=repScore;
  repsCount++;
  singleScore=repScore;
  trunkScoresArray.push(trunkScore || 0);
  heelScoresArray.push(heelScore || 0);
  kneeScoresArray.push(kneeScore || 0);
  if(selMode!=='infinite')progress+=step;
  document.getElementById('ss-rep-num').textContent=repsCount;
  showRepFeedback(repScore);
  if(typeof onRepCompleted==='function')onRepCompleted(repScore);
  if(selMode==='classic'&&progress>=1){triggerWin();return}
  // 💡 限時模式不切換燈號，永遠保持自由起立坐下
  if(selMode!=='timed'&&light==='green')switchLight('yellow');
}

function showRepFeedback(repScore){
  const fb=document.getElementById('rep-feedback'),sc=document.getElementById('rep-fb-score'),lbl=document.getElementById('rep-fb-label');
  sc.textContent='+'+repScore;sc.style.color=repScore>=80?'var(--green)':repScore>=50?'var(--yellow)':'var(--red)';
  let fbText = '';
  if(repScore>=80) fbText = getText('fb-perfect');
  else if(repScore>=50) fbText = getText('fb-good');
  else fbText = getText('fb-straight');
  
  lbl.textContent=fbText;
  speak(fbText, 1.3); // 加入語音回饋
  fb.classList.add('show');setTimeout(()=>fb.classList.remove('show'),1200);
}

// 打開聯絡我們面板
function openContact() {
  goTo('ov-contact');
}

// 關閉聯絡我們面板
function closeContact() {
  goTo('scr-menu');;
}


/* ── 手機鏡頭連線（PeerJS，測試版）──
   概念：手機瀏覽器開啟 phone.html，透過 WebRTC 把鏡頭串流直接傳給這台電腦，
   接電腦既有的 videoElement，後續姿勢偵測、校正、計分完全沿用原本邏輯。
   注意：手機和電腦要在同一個區域網路，且電腦端網頁需要用 https 或 localhost 開啟，
   否則手機瀏覽器會擋掉鏡頭權限。 */
let phonePeer = null;
let phoneCamStream = null;
let phoneCamCode = null;

// STUN 負責同網路/簡單 NAT 下的直連；TURN 是兩邊網路不同（例如手機用行動網路）時的中繼備援。
// 用的是 Open Relay Project 公開提供、免註冊的免費 TURN（openrelay.metered.ca），流量有限但個人測試/展示用途足夠。
const PHONECAM_ICE_CONFIG = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:openrelay.metered.ca:80' },
    { urls: 'turn:openrelay.metered.ca:80', username: 'openrelayproject', credential: 'openrelayproject' },
    { urls: 'turn:openrelay.metered.ca:443', username: 'openrelayproject', credential: 'openrelayproject' },
    { urls: 'turn:openrelay.metered.ca:443?transport=tcp', username: 'openrelayproject', credential: 'openrelayproject' },
  ]
};

function generatePhoneCamCode(){
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // 排除易混淆的 0/O、1/I
  let code = '';
  for (let i = 0; i < 6; i++) code += alphabet[Math.floor(Math.random() * alphabet.length)];
  return 'STS-' + code;
}

function updatePhoneCamButtonState(connected){
  const dot = document.getElementById('phonecam-dot');
  if (!dot) return;
  if (connected) {
    dot.style.display = 'block';
    dot.style.background = 'var(--green)';
  } else {
    dot.style.display = 'none';
  }
}

function setPhoneCamStatus(text, color){
  const el = document.getElementById('phonecam-status');
  if (!el) return;
  el.textContent = text;
  el.style.color = color || 'var(--yellow)';
}

function renderPhoneCamQR(url){
  const canvas = document.getElementById('phonecam-qr-canvas');
  if (!canvas || typeof QRCode === 'undefined') return;
  QRCode.toCanvas(canvas, url, { width: 160, margin: 1 }, function(err){
    if (err) console.error('QR code 產生失敗:', err);
  });
}

function initPhoneCamPeer(){
  if (typeof Peer === 'undefined') {
    setPhoneCamStatus('⚠️ 連線元件載入失敗，請檢查網路連線並重新整理頁面', 'var(--red)');
    return;
  }

  phoneCamCode = generatePhoneCamCode();
  const codeEl = document.getElementById('phonecam-code');
  if (codeEl) codeEl.textContent = phoneCamCode;

  const phoneUrl = new URL('phone.html', location.href).href + '?room=' + encodeURIComponent(phoneCamCode);
  const linkEl = document.getElementById('phonecam-link');
  if (linkEl) linkEl.value = phoneUrl;
  renderPhoneCamQR(phoneUrl);

  setPhoneCamStatus('🕐 正在建立連線服務...', 'var(--yellow)');

  if (phonePeer) { try { phonePeer.destroy(); } catch(e){} }
  phonePeer = new Peer(phoneCamCode, { config: PHONECAM_ICE_CONFIG });

  phonePeer.on('open', () => {
    setPhoneCamStatus('🕐 等待手機連接中...', 'var(--yellow)');
  });

  phonePeer.on('call', (call) => {
    call.answer();
    call.on('stream', (remoteStream) => {
      phoneCamStream = remoteStream;
      setPhoneCamStatus('✅ 手機鏡頭已連接！可以直接開始遊戲', 'var(--green)');
      updatePhoneCamButtonState(true);
      const disBtn = document.getElementById('phonecam-disconnect-btn');
      if (disBtn) disBtn.style.display = 'inline-block';
      showToast('📱 手機鏡頭連線成功！', 'var(--green)');

      remoteStream.getVideoTracks().forEach(track => {
        track.addEventListener('ended', () => {
          if (phoneCamStream === remoteStream) {
            phoneCamStream = null;
            updatePhoneCamButtonState(false);
            showToast('📱 手機鏡頭已離線，已切換回電腦鏡頭', 'var(--yellow)');
          }
        });
      });
    });
  });

  phonePeer.on('error', (err) => {
    console.error('PeerJS 錯誤:', err);
    if (err && err.type === 'unavailable-id') {
      initPhoneCamPeer(); // 配對碼剛好撞號，重新產生一組再試一次
      return;
    }
    setPhoneCamStatus('⚠️ 連線發生錯誤（' + (err && (err.type || err.message)) + '），請重新開啟此視窗再試', 'var(--red)');
  });
}

function openPhoneCamPairing(){
  const ov = document.getElementById('ov-phonecam');
  if (ov) ov.classList.add('on');

  if (phoneCamStream && phoneCamStream.active) {
    setPhoneCamStatus('✅ 手機鏡頭已連接！可以直接開始遊戲', 'var(--green)');
    const disBtn = document.getElementById('phonecam-disconnect-btn');
    if (disBtn) disBtn.style.display = 'inline-block';
    const codeEl = document.getElementById('phonecam-code');
    if (codeEl && phoneCamCode) codeEl.textContent = phoneCamCode;
  } else if (!phonePeer) {
    initPhoneCamPeer();
  }
}

function closePhoneCamPairing(){
  const ov = document.getElementById('ov-phonecam');
  if (ov) ov.classList.remove('on');
}

function copyPhoneCamLink(){
  const linkEl = document.getElementById('phonecam-link');
  if (!linkEl || !linkEl.value) return;
  linkEl.select();
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(linkEl.value)
      .then(() => showToast('已複製連結', 'var(--blue2)'))
      .catch(() => { document.execCommand('copy'); showToast('已複製連結', 'var(--blue2)'); });
  } else {
    document.execCommand('copy');
    showToast('已複製連結', 'var(--blue2)');
  }
}

function disconnectPhoneCam(){
  if (phoneCamStream) {
    phoneCamStream.getTracks().forEach(t => t.stop());
    phoneCamStream = null;
  }
  if (phonePeer) {
    try { phonePeer.destroy(); } catch(e){}
    phonePeer = null;
  }
  phoneCamCode = null;
  updatePhoneCamButtonState(false);

  const disBtn = document.getElementById('phonecam-disconnect-btn');
  if (disBtn) disBtn.style.display = 'none';
  const codeEl = document.getElementById('phonecam-code');
  if (codeEl) codeEl.textContent = '------';
  const linkEl = document.getElementById('phonecam-link');
  if (linkEl) linkEl.value = '';
  const canvas = document.getElementById('phonecam-qr-canvas');
  if (canvas) { const ctx = canvas.getContext('2d'); if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height); }

  setPhoneCamStatus('已中斷連線，遊戲將使用電腦鏡頭', 'var(--dim)');
  showToast('已改回使用電腦鏡頭', 'var(--blue2)');
}


/* ── GAME EVENTS ── */
function triggerCaught(msg){
  if(gState==='over')return;
  gState='over';
  detecting=false;
  stopVideoRecording({
      result:'caught',
      gameScore:Math.round(score),
      gameReps:repsCount,
      gameTime:elapsed,
      mode:selMode,
      difficulty:selDiffKey
    });
  stopBGM();
  ensureAudio();
  playSfx('caught');
  caughtFx=1;

  speak(getText('res-caught-title') + ' ' + msg, 1.1, 0.8); 

  if(typeof onGameEnd==='function')onGameEnd({result:'caught',score:Math.round(score),repsCount,elapsed,mode:selMode,diff:selDiffKey});

  const rf=document.getElementById('rf');
  if(rf){
    rf.style.opacity='.45';
    setTimeout(()=>{rf.style.transition='opacity .4s';rf.style.opacity='0'},60);
    setTimeout(()=>{rf.style.transition=''},600);
  }

  setTimeout(()=>{showOverlay('🚫',getText('res-caught-title'),msg,true,[{v:Math.round(score).toLocaleString(),l:getText('lbl-final-score')},{v:repsCount,l:getText('lbl-completed-reps')},{v:fmtT(elapsed),l:getText('lbl-game-time')}]);if(typeof drawChart==='function')drawChart()},400);
  triggerGameDiagnosis();
}

function triggerWin(){
  if(isControlMode()){triggerControlTrainingEnd();return;}
  gState='win';detecting=false;
  const bonus=Math.max(0,300-elapsed)*8;score+=bonus;
  stopVideoRecording({
      result:'win',
      gameScore:Math.round(score),
      gameReps:repsCount,
      gameTime:elapsed,
      mode:selMode,
      difficulty:selDiffKey
    });
  stopBGM();ensureAudio();playSfx('win');
  if(typeof onGameEnd==='function')onGameEnd({result:'win',score:Math.round(score),repsCount,elapsed,mode:selMode,diff:selDiffKey});
  setTimeout(()=>{showOverlay('🏆',getText('res-win-title'),getText('res-win-sub'),true,[{v:Math.round(score).toLocaleString(),l:getText('lbl-final-score')},{v:fmtT(elapsed),l:getText('lbl-complete-time')},{v:repsCount,l:getText('lbl-total-sts')},{v:Math.round(bonus),l:getText('lbl-time-bonus')}]);if(typeof drawChart==='function')drawChart()},300);
  triggerGameDiagnosis();
}

/* 冒險模式關卡過關：跟 triggerWin() 一樣要停止偵測/錄影/BGM、照常記錄戰績，
   但不顯示一般成績結算畫面（不看分數），改顯示故事劇情的 ov-story-victory。 */
function triggerStoryLevelClear(title, storyText){
  if(gState==='win'||gState==='over') return;
  gState='over'; detecting=false;
  try{ stopVideoRecording(null); }catch(e){}
  stopBGM(); ensureAudio(); playSfx('win');
  if(typeof onGameEnd==='function')onGameEnd({result:'win',score:Math.round(score),repsCount,elapsed,mode:selMode,diff:selDiffKey});

  const ov = document.getElementById('ov-story-victory');
  const titleEl = document.getElementById('story-victory-title');
  const textEl = document.getElementById('story-victory-text');
  if(titleEl) titleEl.textContent = title;
  if(textEl) textEl.textContent = storyText;
  if(ov) ov.classList.add('on');
}
window.triggerStoryLevelClear = triggerStoryLevelClear;

/* 節奏音樂模式結束：跟 triggerStoryLevelClear() 一樣要停止偵測/錄影/BGM、
   照常記錄戰績，但不顯示一般成績結算畫面（不看分數看準度），
   改顯示節奏模式自己的結算畫面 ov-rhythm-result。 */
function triggerRhythmEnd(stats){
  if(gState==='win'||gState==='over') return;
  gState='over'; detecting=false;
  try{ stopVideoRecording(null); }catch(e){}
  stopBGM(); ensureAudio(); playSfx('win');
  if(typeof onGameEnd==='function')onGameEnd({result:'win',score:Math.round(score),repsCount,elapsed,mode:selMode,diff:selDiffKey});

  const ov = document.getElementById('ov-rhythm-result');
  const gradeEl = document.getElementById('rhythm-result-grade');
  const subEl = document.getElementById('rhythm-result-sub');
  const perfectEl = document.getElementById('rr-perfect');
  const greatEl = document.getElementById('rr-great');
  const goodEl = document.getElementById('rr-good');
  const missEl = document.getElementById('rr-miss');
  const comboEl = document.getElementById('rr-combo');
  if(gradeEl) gradeEl.textContent = `評級：${stats.grade}`;
  if(subEl) subEl.textContent = `${stats.tempoName}｜準度 ${Math.round(stats.pct*100)}%`;
  if(perfectEl) perfectEl.textContent = stats.perfect;
  if(greatEl) greatEl.textContent = stats.great;
  if(goodEl) goodEl.textContent = stats.good;
  if(missEl) missEl.textContent = stats.miss;
  if(comboEl) comboEl.textContent = stats.bestCombo;
  if(ov) ov.classList.add('on');
}
window.triggerRhythmEnd = triggerRhythmEnd;

function triggerTimedEnd(){
  gState='over';detecting=false;
  stopVideoRecording({
      result:'timeup',
      gameScore:Math.round(score),
      gameReps:repsCount,
      gameTime:elapsed,
      mode:selMode,
      difficulty:selDiffKey
    });
  stopBGM();ensureAudio();playSfx('win');
  if(typeof onGameEnd==='function')onGameEnd({result:'timeup',score:Math.round(score),repsCount,elapsed,mode:selMode,diff:selDiffKey});
  setTimeout(()=>{showOverlay('⏱️',getText('res-timeup-title'),getText('res-timeup-sub'),true,[{v:Math.round(score).toLocaleString(),l:getText('lbl-final-score')},{v:repsCount,l:getText('lbl-completed-reps')},{v:Math.round(score/Math.max(repsCount,1)),l:getText('lbl-avg-score')}]);if(typeof drawChart==='function')drawChart()},300);
  triggerGameDiagnosis();
}

/* ── COINS ── */
function calcCoins(){
  const base=Math.floor(score/100);
  const diffMul=selDiff.coinMul;
  const modeMul=MODES[selMode].coinMul;
  const bonus=(score>=1000?30:score>=500?10:0)+(gState==='win'&&selMode==='classic'?50:0);
  return{base,diffMul,modeMul,bonus,total:Math.max(0,Math.round(base*diffMul*modeMul)+bonus)};
}

function collectCoinsAndContinue(){
  playSfx('coin');
  if(typeof buildScoreEntry==='function' && typeof saveScore==='function') saveScore(buildScoreEntry());
  const input = document.getElementById('name-input');
  if(input) input.value='';
  
  const {base,diffMul,modeMul,bonus,total}=calcCoins();
  document.getElementById('ov-result').classList.remove('on');
  document.getElementById('cr-amount').textContent='+'+total+'🪙';
  
  // 💡 修正：將 .label 替換為 getText(...nameKey) 避免 undefined 錯誤
  const diffName = DIFFS[selDiffKey] ? getText(DIFFS[selDiffKey].nameKey) : selDiffKey;
  const modeName = MODES[selMode] ? getText(MODES[selMode].nameKey) : selMode;

  document.getElementById('cr-breakdown').innerHTML=`
    <div class="cr-row">${getText('cr-base')}：<span>+${base}🪙</span></div>
    <div class="cr-row">${getText('cr-diff')}（${diffName}）：<span>×${diffMul}</span></div>
    <div class="cr-row">${getText('cr-mode')}（${modeName}）：<span>×${modeMul.toFixed(1)}</span></div>
    ${bonus>0?`<div class="cr-row">${getText('cr-bonus')}：<span>+${bonus}🪙</span></div>`:''}
    <div class="cr-row" style="color:var(--gold);font-weight:800;">${getText('cr-total-held')}：<span>${(getCoins()+total).toLocaleString()}🪙</span></div>`;
  document.getElementById('coin-reward').classList.add('on');
  addCoins(total);spawnCoinParticles();
}

function spawnCoinParticles(){
  const c=document.getElementById('cr-particles');c.innerHTML='';
  for(let i=0;i<24;i++){const p=document.createElement('div');const x=Math.random()*100,delay=Math.random()*1.2,size=12+Math.random()*16;p.style.cssText=`position:absolute;left:${x}%;top:-30px;font-size:${size}px;animation:fallCoin ${1.2+Math.random()*.8}s ${delay}s linear forwards;opacity:0;`;p.textContent='🪙';c.appendChild(p)}
  if(!document.getElementById('coinAnim')){const s=document.createElement('style');s.id='coinAnim';s.textContent='@keyframes fallCoin{0%{transform:translateY(0) rotate(0);opacity:1;}100%{transform:translateY(120vh) rotate(720deg);opacity:0;}}';document.head.appendChild(s)}
}

function afterCoinCollect(action){
  document.getElementById('coin-reward').classList.remove('on');
  if(action==='restart'){
    const liveStream=videoElement?.srcObject&&videoElement.srcObject.getVideoTracks().some(t=>t.readyState==='live');
    if(!liveStream||!poseLandmarker){launchGame();return}
    resetGameState();
    gState='ready';
    detecting=true;
    lastFrame=performance.now();
    if(detectLoopId)cancelAnimationFrame(detectLoopId);
    if(gameLoopId)cancelAnimationFrame(gameLoopId);
    detectLoopId=requestAnimationFrame(detectLoopMP);
    gameLoopId=requestAnimationFrame(gameLoop);
    countdownStart(beginPlay);
  }
  else if(action==='board'){cleanupGame();goTo('scr-board');renderBoard()}
  else{cleanupGame();goTo('scr-menu')}
}

/* ── CHART ── */
function drawChart(){
  const cvs=document.getElementById('chart-cvs'),ctx=cvs.getContext('2d'),W=cvs.width,H=cvs.height;
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle='rgba(255,48,80,.08)';ctx.fillRect(0,H*.5,W,H*.5);
  ctx.fillStyle='rgba(255,170,0,.08)';ctx.fillRect(0,H*.3,W,H*.2);
  ctx.fillStyle='rgba(0,204,106,.08)';ctx.fillRect(0,0,W,H*.3);
  [25,50,75,100].forEach(y=>{const cy=H-(y/100)*H;ctx.strokeStyle='rgba(64,144,255,.12)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,cy);ctx.lineTo(W,cy);ctx.stroke();ctx.fillStyle='rgba(160,200,255,.5)';ctx.font='9px system-ui';ctx.textAlign='left';ctx.fillText(y,3,cy-3)});
  
  // 💡 修正：折線圖資料不足提示
  if(postureLog.length<2){ctx.fillStyle='rgba(160,200,255,.4)';ctx.font='12px system-ui';ctx.textAlign='center';ctx.fillText(getText('chart-no-data'),W/2,H/2);return}
  
  const maxT=postureLog[postureLog.length-1].t||1;
  const grad=ctx.createLinearGradient(0,0,W,0);postureLog.forEach(p=>{const pos=Math.min(1,p.t/maxT),c=p.s>=70?'#00CC6A':p.s>=50?'#FFAA00':'#FF3050';grad.addColorStop(pos,c)});
  ctx.strokeStyle=grad;ctx.lineWidth=2.5;ctx.lineJoin='round';ctx.beginPath();
  postureLog.forEach((p,i)=>{const x=(p.t/maxT)*W,y=H-(p.s/100)*H;i===0?ctx.moveTo(x,y):ctx.lineTo(x,y)});ctx.stroke();
  const avg=postureLog.reduce((s,p)=>s+p.s,0)/postureLog.length;
  ctx.strokeStyle='rgba(64,144,255,.6)';ctx.lineWidth=1;ctx.setLineDash([5,5]);
  const avgY=H-(avg/100)*H;ctx.beginPath();ctx.moveTo(0,avgY);ctx.lineTo(W,avgY);ctx.stroke();ctx.setLineDash([]);
  
  // 💡 修正：平均標籤
  ctx.fillStyle='rgba(100,170,255,.8)';ctx.font='bold 9px system-ui';ctx.textAlign='right';ctx.fillText(`${getText('chart-avg')} ${Math.round(avg)}`,W-4,avgY-3);
}

/* -- HUD / UI -- */
function updateHUD(){
  if(isControlMode()) return;
  const lightEl=document.getElementById('h-light');
  if(lightEl)lightEl.textContent=light==='green'?'🟢':light==='yellow'?'🟡':'🔴';
  const streakEl=document.getElementById('h-streak');
  if(streakEl)streakEl.textContent=Math.floor(streak);
  const mw=document.getElementById('move-warn');
  if(mw)(light==='red'&&movevalue>selDiff.thresh*.6)?mw.classList.add('on'):mw.classList.remove('on');
}

function updateLeftPanel(){
  const s=Math.round(posture.total);let gr,gc;
  if(s>=90){gr='A+';gc='#00CC6A'}else if(s>=80){gr='A';gc='#22BB66'}else if(s>=70){gr='B';gc='#4090FF'}else if(s>=60){gr='C';gc='#FFAA00'}else if(s>=50){gr='D';gc='#FF8020'}else{gr='F';gc='#FF3050'}
  const pBig=document.getElementById('p-big');
  if(pBig){
    pBig.textContent=(isControlMode()&&repsCount===0)?'--':s;
    pBig.style.color=gc;
  }
  const gradeEl=document.getElementById('p-grade');
  if(gradeEl && !isControlMode()){gradeEl.textContent=gr;gradeEl.style.background=gc+'22';gradeEl.style.color=gc;}
  document.getElementById('detail-list').innerHTML=posture.details.map(d=>{const ds=Math.round(d.score),dc=ds>=80?'#00CC6A':ds>=60?'#FFAA00':'#FF3050';return`<div class="drow"><span class="dname">${d.name}</span><div class="dbar-bg"><div class="dbar" style="width:${ds}%;background:${dc}"></div></div><span class="dval" style="color:${dc}">${ds}</span></div>`}).join('');
  document.getElementById('score-big').textContent=Math.round(score).toLocaleString();
  if(selMode!=='infinite'){const el=document.getElementById('prog-txt');if(el)el.textContent=Math.round(progress*100)+'%';document.getElementById('pbar').style.width=(progress*100)+'%'}
  else{document.getElementById('pbar').style.width=((repsCount%10)/10*100)+'%'}
}

function setLightUI(l){
  const el=document.getElementById('light-badge');
  if(!el) return;
  // 💡 修正：紅綠燈狀態提示語
  if(l==='green'){el.className='lb-green';el.textContent=`🟢 ${getText('light-green-ui')}`;}
  else if(l==='yellow'){el.className='lb-yellow';el.textContent=`🟡 ${getText('light-yellow-ui')}`;}
  else{el.className='lb-red';el.textContent=`🔴 ${getText('light-red-ui')}`;}
}

function showOverlay(icon,title,sub,buttons,stats=[]){
  const ov=document.getElementById('ov-result');
  document.getElementById('ov-icon').textContent=icon;document.getElementById('ov-title').textContent=title;document.getElementById('ov-sub').textContent=sub;
  document.getElementById('ov-stats').innerHTML=stats.map(s=>`<div class="sbox"><div class="sv">${s.v}</div><div class="sl">${s.l}</div></div>`).join('');
  ov.querySelectorAll('.ov-btns .btn').forEach(b=>b.style.display=buttons?'':'none');
  document.getElementById('name-wrap').style.display=buttons?'flex':'none';
  ov.classList.add('on');
}

function showTip(msg){if(gState!=='playing')return;const el=document.getElementById('tip-box');el.textContent=msg;el.classList.add('on');setTimeout(()=>el.classList.remove('on'),3500)}

/* -- LEADERBOARD -- */
let boardFilter='all';
function getScores(){try{return JSON.parse(localStorage.getItem(getLBKey())||'[]')}catch{return[]}}
function saveScore(entry){let arr=getScores();arr.push(entry);arr.sort((a,b)=>b.score-a.score);arr=arr.slice(0,20);localStorage.setItem(getLBKey(),JSON.stringify(arr))}
function buildScoreEntry(){
  return{score:Math.round(score),diff:selDiffKey,mode:selMode,time:elapsed,char:selChar.badge,date:new Date().toLocaleDateString('zh-TW',{month:'2-digit',day:'2-digit'}),season:(typeof currentSeasonId==='function'?currentSeasonId():'')}
}
function saveAndBoard(){playSfx('click');saveScore(buildScoreEntry());cleanupGame();goTo('scr-board');renderBoard()}
function saveAndMenu(){playSfx('click');saveScore(buildScoreEntry());cleanupGame();goTo('scr-menu')}
/* ── 遊戲狀態清理 (釋放視訊資源) ── */
function cleanupGame() {
  detecting = false;
  stopVideoRecording();
  stopBGM();
  gState = 'idle';
  
  if (gameLoopId) { cancelAnimationFrame(gameLoopId); gameLoopId = null; }
  if (detectLoopId) { cancelAnimationFrame(detectLoopId); detectLoopId = null; }
  
  if (videoElement && videoElement.srcObject) {
    videoElement.srcObject.getTracks().forEach(t => t.stop());
    videoElement.srcObject = null;
  }
  
  document.getElementById('ov-result').classList.remove('on');
  const camMsg = document.getElementById('cam-msg');
  if (camMsg) camMsg.style.display = '';
}
function filterBoard(mode,el){boardFilter=mode;document.querySelectorAll('.diff-tab').forEach(t=>t.classList.remove('active'));el.classList.add('active');renderBoard()}
function renderBoard(){
  if(typeof ensureSocialState==='function')ensureSocialState();
  const all=getScores();
  let rows;
  if(boardFilter==='all')rows=all;
  else if(boardFilter==='season'&&typeof currentSeasonId==='function')rows=all.filter(e=>e.season===currentSeasonId());
  else rows=all.filter(e=>e.mode===boardFilter);
  const tbody=document.getElementById('board-body');
  
  if(!rows.length){
    tbody.innerHTML=`<tr><td colspan="8" class="empty-board">${getText('board-empty')}</td></tr>`;
  }else{
    const medals=['🥇','🥈','🥉'];
    tbody.innerHTML=rows.map((e,i)=>{
      // 💡 修正：難度名稱讀取 nameKey，模式標籤讀取 i18n
      const modeText = MODES[e.mode||'classic'] ? getText(MODES[e.mode||'classic'].nameKey) : (e.mode||'classic');
      const diffObj = DIFFS[e.diff||'normal'];
      const diffText = diffObj ? getText(diffObj.nameKey) : (e.diff||'normal');
      const MC={'classic':'mb-classic','infinite':'mb-infinite','timed':'mb-timed'};

      return `<tr>
        <td><span class="rank-badge">${medals[i]||i+1}</span></td>
        <td style="font-weight:800">${e.name}</td>
        <td style="font-weight:800;color:var(--blue2)">${e.score.toLocaleString()}</td>
        <td><span class="mode-badge-sm ${MC[e.mode||'classic']}">${modeText}</span></td>
        <td><span class="diff-badge db-${e.diff||'normal'}">${diffText}</span></td>
        <td>${fmtT(e.time||0)}</td>
        <td>${e.char||'🔵'}</td>
        <td style="color:var(--dim)">${e.date||''}</td>
      </tr>`;
    }).join('');
  }
  if(typeof renderSeasonInfo==='function')renderSeasonInfo();
}
function clearBoard(){
  if(confirm(getText('confirm-clear-board'))){
    playSfx('click');
    localStorage.removeItem(getLBKey());
    renderBoard();
  }
}

/* -- SHOP -- */
let shopFilter='chars';
function filterShop(cat,el){shopFilter=cat;document.querySelectorAll('.shop-tab').forEach(t=>t.classList.remove('active'));el.classList.add('active');renderShop()}

function renderShop(){
  updateCoinUI();const grid=document.getElementById('shop-grid');grid.innerHTML='';const coins=getCoins();
  
  // 💡 修正：按鈕與文字標籤改用 getText(...)
  const makeBtn=(owned,equipped,cost,onBuy,onEquip)=>{
    const btn=document.createElement('button');btn.className='shop-item-btn';
    if(equipped){btn.className+=' shop-btn-equipped';btn.textContent=`✓ ${getText('shop-btn-equipped')}`;}
    else if(owned){btn.className+=' shop-btn-equip';btn.textContent=getText('shop-btn-equip');btn.onclick=onEquip;}
    else if(coins>=cost){btn.className+=' shop-btn-buy';btn.textContent=`${getText('shop-btn-buy')} 🪙${cost}`;btn.onclick=onBuy;}
    else{btn.className+=' shop-btn-broke';btn.textContent=getText('shop-btn-broke');}
    return btn;
  };
  
  if(shopFilter==='chars'){
    SHOP_CHARS.forEach(ch=>{
      const name = getText(ch.nameKey) || ch.name;
      const tag = getText(ch.tagKey) || ch.tag;

      const owned=isOwned(ch.id),equipped=getEquipped('chars')===ch.id;
      const item=document.createElement('div');item.className='shop-item'+(equipped?' equipped':owned?' owned':'');
      const cvs=document.createElement('canvas');cvs.width=72;cvs.height=72;
      
      item.innerHTML=`<div class="shop-item-preview"></div>
        <div class="shop-item-name">${ch.badge} ${name}</div>
        <div class="shop-item-desc">${tag}</div>
        ${owned?`<div class="shop-item-cost" style="color:var(--green)">${getText('shop-unlocked')}</div>`:`<div class="shop-item-cost">🪙 ${ch.cost}</div>`}
        ${equipped?`<div class="equipped-tag">${getText('shop-equipped')}</div>`:''}
        ${owned&&!equipped?`<div class="owned-tag">${getText('shop-owned')}</div>`:''}`;
        
      item.querySelector('.shop-item-preview').appendChild(cvs);setTimeout(()=>drawCharPreview(cvs,ch),10);
      
      const confirmMsg = getText('shop-buy-confirm').replace('{cost}', ch.cost).replace('{name}', name);
      item.appendChild(makeBtn(owned,equipped,ch.cost,()=>{
        if(confirm(confirmMsg)){
          playSfx('coin');spendCoins(ch.cost);ownItem(ch.id);
          if(typeof checkAchievements==='function')checkAchievements();
          renderShop();buildCharGrid();
        }
      },()=>{playSfx('click');setEquipped('chars',ch.id);renderShop();buildCharGrid();selChar=ch}));
      
      grid.appendChild(item);
    });
  }else{
    const items=shopFilter==='trails'?SHOP_TRAILS:SHOP_HATS;
    const cat=shopFilter==='trails'?'trails':'hats';
    items.forEach(it=>{
      const name = getText(it.nameKey) || it.name;
      const desc = getText(it.descKey) || it.desc;

      const owned=isOwned(it.id),equipped=getEquipped(cat)===it.id;
      const item=document.createElement('div');item.className='shop-item'+(equipped?' equipped':owned?' owned':'');
      
      item.innerHTML=`<div class="shop-item-preview" style="font-size:2.8em;line-height:72px;text-align:center;">${it.preview}</div>
        <div class="shop-item-name">${name}</div>
        <div class="shop-item-desc">${desc}</div>
        ${owned?`<div class="shop-item-cost" style="color:var(--green)">${getText('shop-unlocked')}</div>`:`<div class="shop-item-cost">🪙 ${it.cost}</div>`}
        ${equipped?`<div class="equipped-tag">${getText('shop-equipped')}</div>`:''}
        ${owned&&!equipped?`<div class="owned-tag">${getText('shop-owned')}</div>`:''}`;
        
      const confirmMsg = getText('shop-buy-confirm').replace('{cost}', it.cost).replace('{name}', name);
      item.appendChild(makeBtn(owned,equipped,it.cost,()=>{
        if(confirm(confirmMsg)){
          playSfx('coin');spendCoins(it.cost);ownItem(it.id);
          if(typeof checkAchievements==='function')checkAchievements();
          renderShop();
        }
      },()=>{playSfx('click');setEquipped(cat,it.id);renderShop()}));
      
      grid.appendChild(item);
    });
  }
}

/* ── MOCK AD (支援 Callback 回呼) ── */
function watchAdMock(callback, customMsg) {
  ensureAudio();
  playSfx('click');
  const ov = document.createElement('div');
  ov.style.cssText = 'position:fixed;inset:0;background:rgba(6,14,28,.98);z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;backdrop-filter:blur(10px);';
  
  // 💡 修正：廣告文字
  const msgText = customMsg || getText('ad-playing');
  
  ov.innerHTML = `
    <div style="font-size:5em;margin-bottom:15px;animation:twinkle 1s infinite alternate;">📺</div>
    <div id="ad-timer" style="font-size:1.8em;font-weight:900;color:var(--blue2);">${msgText} 3</div>
    <div style="font-size:0.8em;color:var(--dim);margin-top:10px;">${getText('ad-do-not-close')}</div>
  `;
  document.body.appendChild(ov);

  let t = 3;
  const intv = setInterval(() => {
    t--;
    if (t > 0) {
      document.getElementById('ad-timer').textContent = `${msgText} ${t}`;
      playSfx('click');
    } else {
      clearInterval(intv);
      document.body.removeChild(ov);
      
      if (typeof callback === 'function') {
        callback();
      } else {
        addCoins(500);
        playSfx('coin');
        showToast(getText('ad-reward-toast'), 'var(--green)');
      }
    }
  }, 1000);
}
/* ── MEDIAPIPE 新世代視訊偵測迴圈 ── */
/* ── 轉譯蒟蒻：將 MediaPipe 33點 格式轉為 MoveNet 17點 ── */
/* ── MEDIAPIPE DIRECT HELPERS ── */

// MediaPipe landmarks 編號表
const MP = {
  nose: 0,
  left_shoulder: 11,
  right_shoulder: 12,
  
  left_hip: 23,
  right_hip: 24,
  
  left_knee: 25,
  right_knee: 26,
  
  left_ankle: 27,
  right_ankle: 28,
  
  left_heel: 29,
  right_heel: 30,

  left_toes_index: 31,
  right_toes_index: 32
};

// 把 MediaPipe 的比例座標轉成 pixel 座標
function mpPoint(mpLandmarks, name, videoW, videoH) {
  const idx = MP[name];
  const pt = mpLandmarks[idx];
  if (!pt) return null;
  return {
    name: name,
    x: pt.x * videoW,
    y: pt.y * videoH,
    z: pt.z * videoW,
    visibility: pt.visibility ?? 1
  };
}
// 前端 SideSelector 與 Heavy 後端使用相同的可見度與切換門檻。
const MP_VISIBILITY_THRESHOLD = 0.25;
const MP_SIDE_SWITCH_MARGIN = 0.10;

class MPSideSelector {
  constructor() {
    this.currentSide = null;
  }

  reset() {
    this.currentSide = null;
  }

  choose(leftScore, rightScore) {
    const leftOk = leftScore >= MP_VISIBILITY_THRESHOLD;
    const rightOk = rightScore >= MP_VISIBILITY_THRESHOLD;

    if (!leftOk && !rightOk) return null;
    if (leftOk && !rightOk) {
      this.currentSide = 'left';
      return this.currentSide;
    }
    if (rightOk && !leftOk) {
      this.currentSide = 'right';
      return this.currentSide;
    }

    // 兩側都可用時，除非另一側明顯高出 0.10，否則維持原側，避免每幀跳邊。
    if (this.currentSide === 'left' && leftScore + MP_SIDE_SWITCH_MARGIN >= rightScore) {
      return 'left';
    }
    if (this.currentSide === 'right' && rightScore + MP_SIDE_SWITCH_MARGIN >= leftScore) {
      return 'right';
    }

    this.currentSide = leftScore >= rightScore ? 'left' : 'right';
    return this.currentSide;
  }
}

const mpSideSelector = new MPSideSelector();
const heelSideSelector = new MPSideSelector();

function resetMPSideSelector() {
  mpSideSelector.reset();
  heelSideSelector.reset();
}

// 判斷某個點是否可信
function mpVisible(p, th = MP_VISIBILITY_THRESHOLD) {
  return !!p && Number.isFinite(p.visibility) && p.visibility >= th;
}

function mpSideMinVisibility(...points) {
  if (!points.length || points.some(p => !p || !Number.isFinite(p.visibility))) return 0;
  return Math.min(...points.map(p => p.visibility));
}

// 算兩個點的中點（其他功能仍可使用；STS 主角度已改由 SideSelector 取單側）
function mpMid(p1, p2) {
  if (mpVisible(p1) && mpVisible(p2)) {
    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
      z: ((p1.z || 0) + (p2.z || 0)) / 2,
      visibility: Math.min(p1.visibility, p2.visibility)
    };
  }
  if (mpVisible(p1)) return p1;
  if (mpVisible(p2)) return p2;

  return null;
}

// 計算三點角度：a-b-c，b 是角度中心
function mpAngle(a, b, c) {
  if (!mpVisible(a) || !mpVisible(b) || !mpVisible(c)) return null;
  const abx = a.x - b.x;
  const aby = a.y - b.y;
  const cbx = c.x - b.x;
  const cby = c.y - b.y;
  const dot = abx * cbx + aby * cby;
  /*Math.hypot(x, y) calculates the square root of the sum of squares of its arguments: \(\sqrt{x^{2}+y^{2}}\)*/
  const magAB = Math.hypot(abx, aby);
  const magCB = Math.hypot(cbx, cby);
  if (magAB === 0 || magCB === 0) return null;
  let cos = dot / (magAB * magCB);
  cos = Math.max(-1, Math.min(1, cos));  /*range：-1~1*/
  return Math.acos(cos) * 180 / Math.PI; /*把弧度轉成角度*/
}

/* ── MEDIAPIPE POSTURE SCORE ── */

function clampScore(v) {
  return Math.max(0, Math.min(100, v));
}

/* ── MEDIAPIPE STS METRICS ── */

function calcSTSMetricMP(mpLandmarks, videoW, videoH) {
  const leftShoulder = mpPoint(mpLandmarks, 'left_shoulder', videoW, videoH);
  const rightShoulder = mpPoint(mpLandmarks, 'right_shoulder', videoW, videoH);
  const leftHip = mpPoint(mpLandmarks, 'left_hip', videoW, videoH);
  const rightHip = mpPoint(mpLandmarks, 'right_hip', videoW, videoH);
  const leftKnee = mpPoint(mpLandmarks, 'left_knee', videoW, videoH);
  const rightKnee = mpPoint(mpLandmarks, 'right_knee', videoW, videoH);
  const leftAnkle = mpPoint(mpLandmarks, 'left_ankle', videoW, videoH);
  const rightAnkle = mpPoint(mpLandmarks, 'right_ankle', videoW, videoH);
  const leftHeel = mpPoint(mpLandmarks, 'left_heel', videoW, videoH);
  const rightHeel = mpPoint(mpLandmarks, 'right_heel', videoW, videoH);
  const leftFoot = mpPoint(mpLandmarks, 'left_toes_index', videoW, videoH);
  const rightFoot = mpPoint(mpLandmarks, 'right_toes_index', videoW, videoH);

  // STS / Controlled Sit：沿用 shoulder / hip / knee / ankle 的 SideSelector。
  const leftScore = mpSideMinVisibility(leftShoulder, leftHip, leftKnee, leftAnkle);
  const rightScore = mpSideMinVisibility(rightShoulder, rightHip, rightKnee, rightAnkle);
  // Heel Control 改以下肢＋足部關鍵點品質選側：hip / knee / ankle 用於站姿與膝角，heel / toe 用於 Heel–Toe angle。
  // 不再讓 shoulder visibility 主導 Heel mode 的選腳。
  const leftHeelScore = mpSideMinVisibility(leftHip, leftKnee, leftAnkle, leftHeel, leftFoot);
  const rightHeelScore = mpSideMinVisibility(rightHip, rightKnee, rightAnkle, rightHeel, rightFoot);

  let selectedSide = null;
  if (isControlMode() && controlLockedSide) {
    selectedSide = controlLockedSide;
  } else if (selMode === 'heel_control') {
    selectedSide = heelSideSelector.choose(leftHeelScore, rightHeelScore);
  } else {
    selectedSide = mpSideSelector.choose(leftScore, rightScore);
  }
  if (!selectedSide) return null;

  const useLeft = selectedSide === 'left';
  const shoulder = useLeft ? leftShoulder : rightShoulder;
  const hip = useLeft ? leftHip : rightHip;
  const knee = useLeft ? leftKnee : rightKnee;
  const ankle = useLeft ? leftAnkle : rightAnkle;
  const selectedHeel = useLeft ? leftHeel : rightHeel;
  const selectedFoot = useLeft ? leftFoot : rightFoot;
  const heel = mpVisible(selectedHeel) ? selectedHeel : null;
  const toes = mpVisible(selectedFoot) ? selectedFoot : null;

  const hipAngle = mpAngle(shoulder, hip, knee);
  const kneeAngle = mpAngle(hip, knee, ankle);

  let trunkVert = null;
  if (mpVisible(shoulder) && mpVisible(hip)) {
    trunkVert = 90-(Math.atan2(
      Math.abs(shoulder.y - hip.y),
      Math.max(Math.abs(shoulder.x - hip.x), 1)
    ) * 180 / Math.PI);
  }

  // Knee valgus 是雙側比較指標，因此刻意不套 SideSelector。
  let kneeValgusRatio = 1.0;
  if (
    mpVisible(leftKnee) && mpVisible(rightKnee) &&
    mpVisible(leftAnkle) && mpVisible(rightAnkle)
  ) {
    const kw = Math.hypot(leftKnee.x - rightKnee.x, leftKnee.y - rightKnee.y, leftKnee.z - rightKnee.z);
    const aw = Math.hypot(leftAnkle.x - rightAnkle.x, leftAnkle.y - rightAnkle.y, leftAnkle.z - rightAnkle.z);
    if (aw > 0.01) {
      kneeValgusRatio = kw / aw;
    }
  }

  let heelAngle = null;
  if (toes && heel) {
    heelAngle = Math.atan2(
      Math.abs(heel.y - toes.y),
      Math.max(Math.abs(heel.x - toes.x), 1)
    ) * 180 / Math.PI;
  }

  return {
    selected_side: selectedSide,
    visibility: {
      left: leftScore,
      right: rightScore,
      heel_left: leftHeelScore,
      heel_right: rightHeelScore
    },
    points: {
      shoulder, hip, knee, ankle, heel, toes,
      leftHeel, rightHeel, leftFoot, rightFoot
    },
    angles: {
      hip: hipAngle, knee: kneeAngle,
      trunk_vert: trunkVert,
      heel: heelAngle,
      knee_valgus: kneeValgusRatio
    }
  };
}
/* ── MEDIAPIPE STS STATE CHECK ── */

function trunkScoreCalculate(trunkMax) {
  if (trunkMax <= 15) {
    return 100;
  } else if (trunkMax >= 35) {
    return 30;
  } else {
    return 30 + (35 - trunkMax) * (69 / 19);
  }
}

function heelScoreCalculate(heelMax) {
  if (heelMax >= 35) {
    return 100;
  } else if (heelMax > 15 && heelMax < 35) {
    return 30 + Math.abs((heelMax - 15) * (68 / 19));
  } else {
    return 30;
  }
}
function kneeScoreCalculate(ratio) {
  if (ratio >= 0.8) return 100;
  if (ratio <= 0.5) return 30;
  return 30 + (ratio - 0.5) * (70 / 0.3);
}

function checkSTSMP(metrics) {
  if (!metrics || !metrics.angles || !metrics.points) return;

  const hipPoint = metrics.points.hip;
  if (!hipPoint) return;

  if (calibMaxHipY !== null) {
    const noiseTolerance = 30; // 容錯空間
    if (hipPoint.y > (calibMaxHipY + noiseTolerance)) return;
  }

  let dynHipDelta = 20;
  if (userHipRange > 10) {
    dynHipDelta = Math.max(12, userHipRange * 0.20);
  }

  const angleHip = metrics.angles.hip;
  const angleKnee = metrics.angles.knee;
  const trunkVert = metrics.angles.trunk_vert;
  const angleHeel = metrics.angles.heel;
  const kneeValgus = metrics.angles.knee_valgus;
  const hipY = hipPoint.y;

  // 第一次進來先建立上一幀 hipY
  if (prevHipY === null) {
    prevHipY = hipY;
    return;
  }

  hipChange = hipY - prevHipY;
  prevHipY = hipY;

  // 缺少必要角度就不要判斷
  if (angleHip === null || angleKnee === null || trunkVert === null) return;

  const downTh = 110;
  const sitKneeTh = 120;
  const standKneeTh = 160;
  const trunkDelta = 5;
  const hipDelta = 20;
  const hipStopChange = 3;

  // 膝內夾要追蹤完整起身過程，而不是只在「仍符合坐姿」的幀更新。
  if ((stsPhase === 0 || stsPhase === 1 || stsPhase === 2) && Number.isFinite(kneeValgus)) {
    kneeValgusMinCal = Math.min(kneeValgusMinCal, kneeValgus);
  }

  // 狀態 0：偵測到坐下穩定
  if (
    angleHip < downTh &&
    angleKnee < sitKneeTh &&
    Math.abs(hipChange) < hipStopChange
  ) {
    if (stsPhase === 3 || stsPhase === 9) {
      stsPhase = 0;
      stageMP = 'down';
      stsState = 'sit';
      const bodyStateEl = document.getElementById('ss-body-state');
      if(bodyStateEl){
        bodyStateEl.textContent = getText('sts-sit');
        bodyStateEl.style.color = 'var(--yellow)';
      }

      initHipY = hipY;
      initTrunkVert = trunkVert;

      trunkMax = 0;
      trunkScore = 0;
      heelScore = 0;
      heelMaxCal = 0;
      kneeValgusMinCal = 2.0;
      kneeScore = 0;
      repQualityScore = 0;
      repRewardedMP = false;

      posture = {
        total: singleScore,
        details: [
          { name: getText('detail-trunk'), score: trunkScore, w: 1 },
          { name: getText('detail-heel'), score: heelScore, w: 1 },
          { name: getText('detail-knee'), score: kneeScore, w: 1 }
        ],
        angles: {
          hip: angleHip,
          knee: angleKnee,
          trunk_vert: trunkVert,
          heel: angleHeel
        }
      };
    }
    // 坐下後持續記錄最大軀幹前傾
    if (initTrunkVert !== null) {
      trunkMax = Math.max(trunkMax, trunkVert);
      trunkScore = trunkScoreCalculate(trunkMax);

      // 狀態 0 → 狀態 1：軀幹開始前傾
      if (stsPhase === 0 && (trunkVert - initTrunkVert) > trunkDelta) {
        stsPhase = 1;
        stageMP = 'down1';

        const bodyStateEl = document.getElementById('ss-body-state');
        if(bodyStateEl){
          bodyStateEl.textContent = getText('sts-forward');
          bodyStateEl.style.color = 'var(--blue2)';
        }
      }
    }
  }

  // 狀態 1 → 狀態 2：髖部上升，代表起身中
  if (stsPhase === 0 || stsPhase === 1) {
    if (initHipY !== null && (initHipY - hipY) > dynHipDelta) {
      stsPhase = 2;
      stageMP = 'down2';

      const bodyStateEl = document.getElementById('ss-body-state');
      if(bodyStateEl){
        bodyStateEl.textContent = getText('sts-rising');
        bodyStateEl.style.color = 'var(--blue2)';
      }
    }
  }

  // 判斷是否站直
  let isHipReturnedToStand = true;
  if (userStandHipBaseline !== null && userHipRange > 10) {
    isHipReturnedToStand = hipPoint.y < (userStandHipBaseline + userHipRange * 0.30);
  }

  // 狀態 2 → 狀態 3：站立完成
  if (
    angleKnee > standKneeTh &&
    Math.abs(hipChange) < hipStopChange
  ) {
    const bodyStateEl = document.getElementById('ss-body-state');
    if (stsPhase === 9) {
      if(bodyStateEl){
        bodyStateEl.textContent = getText('sts-please-sit');
        bodyStateEl.style.color = 'var(--yellow)';
      }
    } else if (stsPhase === 0 || stsPhase === 1 || stsPhase === 2) {
      stsPhase = 3;
      stageMP = 'up';

      stsState = 'stand';
      if(bodyStateEl){
        bodyStateEl.textContent = getText('sts-stand-done');
        bodyStateEl.style.color = 'var(--green)';
      }
    }
  }

  // Controlled Sit 保留原本四階段提示，但「站立完成」不是 Rep 結束；真正結束點是之後完整坐下。
  if (stsPhase === 3 && selMode === 'controlled_sit') {
    posture = {
      total: controlLastScore,
      details: [],
      angles: { hip: angleHip, knee: angleKnee, trunk_vert: trunkVert, heel: angleHeel }
    };
    return;
  }

  // Classic 類模式：站立完成後，更新腳跟最大角度與單次分數
  if (stsPhase === 3) {
    if (angleHeel !== null) {
      heelMaxCal = Math.max(heelMaxCal, angleHeel);
      heelScore = heelScoreCalculate(heelMaxCal);
    }
    kneeScore = kneeScoreCalculate(kneeValgusMinCal);
    repQualityScore = Math.round((trunkScore + heelScore + kneeScore) / 3);

    posture = {
      total: repQualityScore,
      details: [
        { name: getText('detail-trunk'), score: trunkScore, w: 1 },
        { name: getText('detail-heel'), score: heelScore, w: 1 },
        { name: getText('detail-knee'), score: kneeScore, w: 1 }
      ],
      angles: {
        hip: angleHip,
        knee: angleKnee,
        trunk_vert: trunkVert,
        heel: angleHeel
      }
    };

    if (!repRewardedMP) {
      handleRepCompleted();
      repRewardedMP = true;
    }
  }
}

/* ── MEDIAPIPE SKELETON DRAW ── */

function calcMoveMP(metrics) {
  if (!metrics || !metrics.points) return 0;
  const current = {
    shoulder: metrics.points.shoulder,
    hip: metrics.points.hip,
    knee: metrics.points.knee,
    ankle: metrics.points.ankle
  };
  if (!prevMovePointsMP) {
    prevMovePointsMP = current;
    return 0;
  }
  let total = 0;
  let count = 0;
  Object.keys(current).forEach(name => {
    const c = current[name];
    const p = prevMovePointsMP[name];
    if (c && p) {
      total += Math.hypot(c.x - p.x, c.y - p.y);
      count++;
    }
  });
  prevMovePointsMP = current;
  const avg = count ? total / count : 0;
  moveHist.push(avg);
  if (moveHist.length > 6) moveHist.shift();
  return moveHist.reduce((a, b) => a + b, 0) / moveHist.length;
}

/* ── MEDIAPIPE SKELETON DRAW ── */
/* ── MEDIAPIPE SKELETON DRAW (終極鏡像修正版) ── */
function drawSkeletonMP(mpLandmarks, videoW, videoH) {
  if (!pCtx || !pCvs || !videoElement || !mpLandmarks) return;

  const W = pCvs.width;
  const H = pCvs.height;

  pCtx.clearRect(0, 0, W, H);

  // ==========================================
  // 1. 繪製鏡像的攝影機畫面
  // ==========================================
  if (videoElement.readyState >= 2) {
    pCtx.save();
    // 把原點移到右邊，再水平翻轉 X 軸
    pCtx.translate(W, 0);
    pCtx.scale(-1, 1);
    pCtx.drawImage(videoElement, 0, 0, W, H);
    // 畫完影片後，立刻把畫布狀態還原為正常！
    pCtx.restore();
  }

  // ==========================================
  // 2. 獲取骨架座標 (使用純數學進行鏡像反轉)
  // ==========================================
  function getPt(idx) {
    const lm = mpLandmarks[idx];
    if (!lm) return null;

    return {
      // 💡 終極解法：無視畫布狀態，直接在數學上把 X 座標左右對調
      x: (1 - lm.x) * W, 
      y: lm.y * H,
      visibility: lm.visibility ?? 1
    };
  }

  function canDraw(p, th = 0.5) {
    return p && p.visibility >= th;
  }

  function drawLine(i, j) {
    const a = getPt(i);
    const b = getPt(j);

    if (!canDraw(a) || !canDraw(b)) return;

    pCtx.beginPath();
    pCtx.moveTo(a.x, a.y);
    pCtx.lineTo(b.x, b.y);

    // 加上防呆，避免 posture 未定義時報錯
    const ratio = (typeof posture !== 'undefined' && posture.total) ? Math.max(0.01, posture.total / 100) : 1;
    pCtx.strokeStyle = `hsl(${ratio * 120},85%,62%)`;
    pCtx.lineWidth = 3;
    pCtx.lineCap = 'round';
    pCtx.stroke();
  }

  function drawPoint(i, color = null, r = 4.5) {
    const p = getPt(i);
    if (!canDraw(p)) return;

    const ratio = (typeof posture !== 'undefined' && posture.total) ? Math.max(0.01, posture.total / 100) : 1;
    pCtx.beginPath();
    pCtx.arc(p.x, p.y, r, 0, Math.PI * 2);
    pCtx.fillStyle = color || `hsl(${ratio * 120},85%,62%)`;
    pCtx.fill();
  }

  // ==========================================
  // 3. 開始畫線與點
  // ==========================================
  const lines = [
    [11, 12], [11, 23], [12, 24], [23, 24],
    [11, 13], [13, 15], [12, 14], [14, 16],
    [23, 25], [25, 27], [27, 29], [29, 31],
    [24, 26], [26, 28], [28, 30], [30, 32]
  ];

  lines.forEach(([a, b]) => drawLine(a, b));

  [
    11, 12,
    23, 24,
    25, 26,
    27, 28
  ].forEach(i => drawPoint(i));

  // 腳跟：黃色
  [29, 30].forEach(i => drawPoint(i, '#FFAA00', 5.5));

  // 腳尖：綠色
  [31, 32].forEach(i => drawPoint(i, '#00CC6A', 5.5));

  // ==========================================
  // 4. 紅燈移動警示覆蓋 (畫在最上層)
  // ==========================================
  if (typeof light !== 'undefined' && light === 'red' && typeof movevalue !== 'undefined' && typeof selDiff !== 'undefined' && movevalue > selDiff.thresh * 0.6) {
    pCtx.fillStyle = `rgba(255,48,80,${Math.min(0.45, (movevalue / selDiff.thresh) * 0.35)})`;
    pCtx.fillRect(0, 0, W, H);
  }
}

/* -- UTILS -- */
// 綠燈時間：依目前難度範圍隨機產生，例如普通模式 4～7 秒。
// 綠燈秒數仍保留隨機：每次切到綠燈時，依目前難度的 gMin～gMax 重新抽一次。
function gDur(){return selDiff.gMin+Math.random()*(selDiff.gMax-selDiff.gMin)}
// 紅燈時間：依目前難度範圍隨機產生，例如普通模式 2.5～5 秒。
// 紅燈秒數仍保留隨機：每次切到紅燈時，依目前難度的 rMin～rMax 重新抽一次。
function rDur(){return selDiff.rMin+Math.random()*(selDiff.rMax-selDiff.rMin)}
function fmtT(s){return`${Math.floor(s/60).toString().padStart(2,'0')}:${Math.floor(s%60).toString().padStart(2,'0')}`}


/* -- INIT -- */
window.addEventListener('DOMContentLoaded', async () => {
  // 等待 index.html 裡的登入檢查與玩家資料抓取完成（見 window.playerReady）
  const player = window.playerReady ? await window.playerReady : null;

  const s = loadSave();
  if (player) {
    if (!player.starter_given) {
      // 這個帳號從沒領過新手金幣：發 1000 並寫回資料庫記錄「已領過」
      s.coins = (player.coins || 0) + 1000;
      s.starterGiven = true;
      writeSave(s);
      const { error } = await window.supabaseClient
        .from('profiles')
        .update({ coins: s.coins, starter_given: true })
        .eq('id', player.id);
      if (!error) {
        player.coins = s.coins;
        player.starter_given = true;
      }
    } else {
      // 已經領過：用資料庫存的金幣覆蓋本機，確保跨裝置看到一致的數字
      s.coins = player.coins || 0;
      s.starterGiven = true;
      writeSave(s);
    }
  } else if (!s.starterGiven) {
    // 沒有登入系統（理論上不會發生，因為 index.html 會擋掉未登入者），保留原本本機邏輯
    s.coins = (s.coins || 0) + 1000;
    s.starterGiven = true;
    writeSave(s);
  }

  initParticles();
  initAICoachAndSettings();
  buildCharGrid();
  updateCoinUI();
  checkSignInStatus(); // 初始化檢查右上角小紅點
  
});

// 確保網頁元素都載入完成後，再執行綁定
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  
  // 確認有找到表單才綁定事件
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      // 1. 阻止表單預設的跳轉行為 (這步非常重要，可以防止畫面跑掉)
      event.preventDefault(); 
      const form = event.target;
      const data = new FormData(form);
      const submitBtn = form.querySelector('button[type="submit"]');
      
      // 改變按鈕文字，讓玩家知道正在傳送中
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = "⏳ 傳送中...";
      submitBtn.disabled = true;
      // 2. 使用 fetch API 在背景發送 POST 請求給 Formspree
      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json' 
        }
      })
      .then(response => {
        if (response.ok) {
          alert("✅ 訊息已成功送出！謝謝您的聯絡。");
          form.reset(); 
          closeContact(); 
        } else {
          alert("❌ 糟糕，發生了一點錯誤，請稍後再試。");
        }
      })
      .catch(error => {
        console.error("發送失敗:", error);
        alert("⚠️ 網路錯誤，請檢查您的連線狀態。");
      })
      .finally(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      });
    });
  }
});

function getLocalDiagnosis(data, lang = 'zh') {
  const isEn = lang === 'en';
  const trunkBad = data.trunkPerformance < 50;
  const heelBad = data.heelPerformance < 50;
  const kneeBad = data.kneePerformance < 50;
  if (kneeBad && trunkBad) {
    return {
      title: "Bad",
      analysis: isEn 
        ? "Excessive trunk flexion and knee valgus detected. High risk of joint stress." 
        : "軀幹過度彎曲且伴隨明顯的膝內夾，對腰椎與膝關節壓力極大。",
      tip: isEn 
        ? "Keep chest up and actively push your knees outward when standing." 
        : "請挺胸收腹，站起時大腿與臀部發力將雙膝向外推，使其與腳尖方向一致。"
    };
  }
  else if (kneeBad) {
    return {
      title: "Warning",
      analysis: isEn 
        ? "Knees are caving in (valgus) during the movement." 
        : "動作過程中發生膝內夾（雙膝向內靠攏），長期下來容易造成膝關節損傷。",
      tip: isEn 
        ? "Engage your glutes and keep your knees pushed outward." 
        : "請將意識集中在臀部，保持雙膝微微向外撐開，避免兩邊膝蓋碰在一起。"
    };
  }
  if (trunkBad && heelBad) {
    return {
      title: "Bad",
      analysis: isEn 
        ? "Excessive trunk flexion and insufficient heel raise." 
        : "軀幹彎曲角度過大（可能腰部代償），且墊腳尖伸展不足。",
      tip: isEn 
        ? "Keep your core tight and fully lift your heels upon standing." 
        : "保持收腹，想像頭頂有線向上拉起。站立完成時試著將腳跟完全抬起，訓練小腿肌群。"
    };
  } else if (trunkBad && !heelBad) {
    return {
      title: "Normal",
      analysis: isEn 
        ? "Excessive trunk flexion when standing up, possibly relying on lower back." 
        : "起立時軀幹彎曲角度過大，可能過度依賴腰部代償。",
      tip: isEn 
        ? "Keep your core engaged and pull your chest up." 
        : "保持收腹，想像頭頂有線向上拉起，盡量靠臀腿發力。"
    };
  } else if (!trunkBad && heelBad) {
    return {
      title: "Normal",
      analysis: isEn
        ? "Good sit-to-stand motion, but heel extension was insufficient." 
        : "軀幹控制與膝部穩定皆良好，但墊腳尖伸展不足。",
      tip: isEn 
        ? "Try to fully raise your heels at the top of the extension." 
        : "站立完成時試著將腳跟完全抬起，訓練小腿肌群。"
    };
  } else {
    return {
      title: "Great",
      analysis: isEn 
        ? "Excellent posture control, knee stability, and ankle extension!" 
        : "軀幹角度、膝部穩定與下肢伸展皆非常標準，核心與平衡感絕佳！",
      tip: isEn 
        ? "Try a higher difficulty mode to keep challenging yourself!" 
        : "動作非常棒！請嘗試更高難度或挑戰模式，維持良好的運動習慣。"
    };
  }
}

function renderDiagnosisCard(diagData, isAI = false) {
  const boxEl = document.getElementById('ai-diag-box');
  if (!boxEl) return;

  const badgeText = isAI ? '🤖' : '⚡';
  const headerColor = isAI ? '#1e6fff' : '#ffd700';
  const safeText = (str) => typeof escapeHTML === 'function' ? escapeHTML(str) : str;
  const title = safeText(diagData.title || 'Normal');
  const analysis = safeText(diagData.analysis || '');
  const tip = safeText(diagData.tip || '');

  boxEl.innerHTML = `
    <div style="font-weight: bold; color: ${headerColor}; font-size: 1.05em; margin-bottom: 6px;">
      ${badgeText} <span style="font-size:0.9em; opacity:0.9;">${title}</span>
    </div>

    <div style="font-size: 0.9em; color: #ffffff; margin-bottom: 6px; line-height: 1.4;">
      ${analysis.replace(/\n/g, '<br>')}
    </div>

    ${tip ? `
      <div style="color: #4caf50; font-size: 0.85em; line-height: 1.3;">
        💡 ${getText('diag-tip-label')}：${tip.replace(/\n/g, '<br>')}
      </div>
    ` : ''}
  `;
}

async function triggerGameDiagnosis() {
  const boxEl = document.getElementById('ai-diag-box');
  if (!boxEl) return;

  const calculateAverage = (arr) => {
    if (!arr || arr.length === 0) return 0; 
    const sum = arr.reduce((total, num) => total + num, 0);
    return sum / arr.length;
  };

  const gameStats = {
    mode: typeof selMode !== 'undefined' ? selMode : 'classic',
    score: Math.round(score || 0),
    reps: repsCount || 0,
    time: Math.round(elapsed || 0),
    trunkPerformance: Math.round(calculateAverage(trunkScoresArray)),
    heelPerformance: Math.round(calculateAverage(heelScoresArray)),
    kneePerformance: Math.round(calculateAverage(kneeScoresArray))
  };

  const langKey = gameSettings?.lang === 'en' ? 'en' : 'zh';
  const currentLang = langKey === 'en' ? 'English' : '繁體中文';

  boxEl.innerHTML = `
    <div style="color: #aaa; font-size: 0.9em;">
      ${getText('diag-analyzing')}
    </div>
  `;

  let isRendered = false;

  const applyLocalFallback = (reason) => {
    if (isRendered) return;
    isRendered = true;
    console.warn(`⚡ 啟用本地規則引擎：${reason}`);
    const localDiag = getLocalDiagnosis(gameStats, langKey);
    renderDiagnosisCard(localDiag, false);
  };

  const timeoutId = setTimeout(() => {
    applyLocalFallback('超過 10 秒未回應');
  }, 10000);

  const API_KEY = 'AQ.Ab8RN6K23brKRZKiiDsM9blk22_I8j-N2DkZeSEPs-V2aLznUA';
  const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=' + API_KEY.trim();

  const promptText = `
你現在是《123木頭人 PRO》專屬 AI 健身教練。
請根據玩家賽後數據進行評估，並【只輸出合法 JSON 格式】，包含 title, analysis, tip 三個欄位。

【玩家數據】
- 完成次數：${gameStats.reps} 次
- 軀幹穩定度：${gameStats.trunkPerformance} 分 (低於50代表腰部前傾彎曲太多)
- 腳跟/抬腳分數：${gameStats.heelPerformance} 分 (低於50代表墊腳/伸展不足)
- 膝部穩定度：${gameStats.kneePerformance} 分 (低於50代表發生膝內夾/雙膝過度向內靠攏)

【輸出 JSON 欄位要求】
1. title: 可填入 "Great", "Good", "Normal", "Bad" 。
2. analysis: 姿勢分析（控制在 20~40 字以內）。
3. tip: 1 句具體改善建議（控制在 20~40 字以內）。
4. 語言要求：請務必使用【${currentLang}】填寫欄位內容。

【JSON 範例】
{
  "title": "Great",
  "analysis": "軀幹控制良好，起身姿態非常標準！",
  "tip": "繼續保持收腹，試著挑戰更高難度模式。"
}
`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    const rawJsonText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawJsonText) throw new Error('AI 回傳內容空白');

    const aiDiagData = JSON.parse(rawJsonText);

    clearTimeout(timeoutId);
    if (!isRendered) {
      isRendered = true;
      renderDiagnosisCard(aiDiagData, true); 
    }

  } catch (error) {
    clearTimeout(timeoutId);
    applyLocalFallback(`API 或 JSON 解析異常 (${error.message})`);
  }
}

let mpLastWasmTime = 0;
let mpLastVideoTime = -1;

/* ── Calibration/game phase state (explicit globals; 0811 originally created these implicitly) ── */
let phase = 'IDLE';
let isTimeUp = false;
let counter = 0;
let calibTimerId = null;
let userStandHipBaseline = null;
let calibStage = 0;             // 0: 定位, 1: 站起+墊腳尖, 2: 坐下, 3: 完成
let calibHoldTime = 0;          // 動作維持時間計時器
let calibMaxHipY = null;        // 坐下時的骨盆高度 (數值最大 = 螢幕最低點 = 椅面位置)
let calibMinHipY = null;        // 墊腳尖時的骨盆高度 (數值最小 = 螢幕最高點)
let calibratedHeelMaxAngle = null; // 校正 Stage 1 墊腳尖時取得的最大 Heel–Toe angle
let userHipRange = 20;          // 玩家骨盆運動總行程 (預設 20px)
let calibTopShoulderY = null;   // 墊腳尖時的肩膀高度 (過濾背景雜訊用)

/* ── LAUNCH (純淨設定 + 極限靈敏度版) ── */
async function launchGame() {
  if (typeof hasAgreedToLegal === 'function' && !hasAgreedToLegal()) {
    if (typeof openLegalOverlay === 'function') openLegalOverlay('onboarding');
    showToast(getText('privacy-consent-required'), 'var(--yellow)');
    return;
  }
  ensureAudio(); playSfx('click'); goTo('scr-game');
  gCvs = document.getElementById('game-canvas'); gCtx = gCvs.getContext('2d');
  pCvs = document.getElementById('pose-canvas'); pCtx = pCvs.getContext('2d');
  
  // 恢復最純淨的設定，不亂改 CSS
  videoElement = document.getElementById('video');
  videoElement.style.display = 'none';

  resizeCvs(); window.addEventListener('resize', resizeCvs);
  buildStarField();
  document.getElementById('timer-bar-wrap').style.display = selMode === 'timed' ? 'block' : 'none';
  configureGameUIForMode();
  document.getElementById('prog-line').innerHTML = selMode === 'infinite' ? getText('game-progress-infinite') : getText('game-progress-normal');
  const camMsg = document.getElementById('cam-msg'); camMsg.style.display = 'flex';
  document.getElementById('ov-result').classList.remove('on');
  document.getElementById('coin-reward').classList.remove('on');

  try {
    if (phoneCamStream && phoneCamStream.active) {
      document.getElementById('cam-status-text').textContent = getText('cam-step-phone');
      videoElement.srcObject = phoneCamStream;
    } else {
      document.getElementById('cam-status-text').textContent = getText('cam-step-webcam');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' }
      });
      videoElement.srcObject = stream;
    }
    await videoElement.play();

    if (!poseLandmarker) {
      document.getElementById('cam-status-text').textContent = getText('cam-step-library');
      const { PoseLandmarker, FilesetResolver } = await import(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.12/+esm"
      );

      document.getElementById('cam-status-text').textContent = getText('cam-step-wasm');
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.12/wasm"
      );

      document.getElementById('cam-status-text').textContent = getText('cam-step-model');
      poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/1/pose_landmarker_full.task",
          delegate: "GPU"
        },
        runningMode: "VIDEO",
        numPoses: 1,
        minPoseDetectionConfidence: 0.5,
        minPosePresenceConfidence: 0.5,
        minTrackingConfidence: 0.5
      });
    }

    camMsg.style.display = 'none';
    gState = 'ready';
    resetGameState();
    lastFrame = performance.now();
    
    detecting = true;
    prevKP = null;
    if (detectLoopId) cancelAnimationFrame(detectLoopId);
    detectLoopId = requestAnimationFrame(detectLoopMP);
    
    launchGameWithCalibration();

  } catch (e) {
    camMsg.style.display = 'none';
    if (typeof clearActiveChallenge === 'function') clearActiveChallenge();
    console.error("啟動失敗詳細原因:", e);
    showToast(getText('cam-start-failed') + e.message, 'var(--red)');
    goTo('scr-menu');
  }
}

function launchGameWithCalibration() {
  counter = 0;
  stsState = 9;
  phase = "INIT_DELAY";
  isTimeUp = false;
  
  // 初始化校正變數
  calibStage = 0;
  calibHoldTime = 0;
  calibMaxHipY = null;
  calibMinHipY = null;
  calibratedHeelMaxAngle = null;
  userStandHipBaseline = null;
  resetMPSideSelector();
  
  const calibOverlay = document.getElementById('calib-overlay');
  const timerText = document.getElementById('calib-timer');
  const boxText = document.getElementById('calib-text');
  const calibBox = document.getElementById('calib-box');
  
  if (calibOverlay) calibOverlay.classList.remove('calib-off');
  if (timerText) { timerText.innerText = getText('calib-ready'); timerText.style.color = '#ffea00'; }
  if (calibBox) calibBox.style.borderColor = "rgba(255, 170, 0, 0.8)";
  if (boxText) {
      boxText.innerText = getText('calib-align');
  }
  speak(getText('speech-calib-start'), 1.1);
  setTimeout(() => {
      phase = "READY";
  }, 2000);

  if (calibTimerId) clearInterval(calibTimerId);
  
  // 啟動每秒 UI 檢查迴圈（實際骨架判定與狀態轉換在 checkCalibrationPosition 進行）
  calibTimerId = setInterval(() => {
    if (phase !== "READY" && phase !== "INIT_DELAY") {
      clearInterval(calibTimerId);
      return;
    }
  }, 1000);
}
function checkCalibrationPosition(landmarks) {
  const boxText = document.getElementById('calib-text');
  const calibBox = document.getElementById('calib-box');
  const timerText = document.getElementById('calib-timer');
  
  // 強制隱藏原本會擋住畫面的巨大計時文字
  if (timerText) timerText.style.display = 'none';

  // 負責更新畫面上方原本的小提示文字與播放語音
  const updateTextAndSpeak = (text, speech) => {
    if (boxText && boxText.innerText !== text) {
      boxText.innerText = text;
      if (speech && typeof speak === 'function') speak(speech);
    }
  };

  const updateCalibrationUI = (label, currentSec, targetSec, color) => {
    // --- 1. 中央提示大字 (限制在校正框內) ---
    let centerLabel = document.getElementById('calib-center-label');
    if (!centerLabel) {
      centerLabel = document.createElement('div');
      centerLabel.id = 'calib-center-label';
      // CSS：改用 absolute，字體大小稍微調整適應框框
      centerLabel.style.cssText = 'position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); font-size:max(4.5rem, 8vmin); font-weight:900; text-shadow:0 4px 20px rgba(0,0,0,0.9); z-index:100; pointer-events:none; letter-spacing:6px; text-align:center; width:100%; line-height: 1.2;';
      
      // 將字體加到校正框框內！
      if (calibBox) {
        // 確保校正框具備定位基準
        if (getComputedStyle(calibBox).position === 'static') {
          calibBox.style.position = 'relative';
        }
        calibBox.appendChild(centerLabel);
      } else {
        document.body.appendChild(centerLabel); // 備用方案
      }
    }
    centerLabel.innerText = label;
    centerLabel.style.color = color;

    // --- 2. 螢幕最底部方塊進度條 (維持全螢幕固定，但樣式放大) ---
    let bottomBar = document.getElementById('calib-bottom-bar');
    if (!bottomBar) {
      bottomBar = document.createElement('div');
      bottomBar.id = 'calib-bottom-bar';
      // CSS：字體放大到 max(3rem, 6vmin)，並加強陰影與字距
      bottomBar.style.cssText = 'position:fixed; bottom:8%; left:50%; transform:translateX(-50%); font-size:max(3rem, 6vmin); font-weight:bold; text-shadow:0 4px 15px rgba(0,0,0,1); z-index:9999; text-align:center; letter-spacing:8px; width:100%; pointer-events:none;';
      document.body.appendChild(bottomBar);
    }
    
    // 計算進度與產生方塊 (例如：████░░░░░░ 40%)
    const p = Math.min(1, Math.max(0, currentSec / targetSec));
    const len = 10;
    const filled = Math.floor(p * len);
    const bar = '█'.repeat(filled) + '░'.repeat(len - filled);
    
    bottomBar.innerHTML = `${bar} ${Math.floor(p * 100)}%`;
    bottomBar.style.color = color;
  };

  // 若找不到人體
  if (!landmarks || landmarks.length === 0) {
    updateTextAndSpeak(getText('calib-body-not-found'), getText('speech-body-not-found'));
    if (calibBox) calibBox.style.borderColor = "rgba(255, 48, 80, 0.8)";
    calibHoldTime = 0;
    
    // 找不到人時，暫時清空畫面中央的字與進度條
    const centerLabel = document.getElementById('calib-center-label');
    if (centerLabel) centerLabel.innerText = '';
    const bottomBar = document.getElementById('calib-bottom-bar');
    if (bottomBar) bottomBar.innerText = '';
    
    return;
  }
  
  const calibrationVideoHeight = videoElement?.videoHeight || pCvs?.height || 480;
  const getVal = (idx) => (landmarks[idx] && landmarks[idx].visibility >= 0.4)
    ? landmarks[idx].y * calibrationVideoHeight
    : null;
  
  const lShoulder = getVal(11), rShoulder = getVal(12);
  const lHip = getVal(23), rHip = getVal(24);
  
  let curHipY = null, curShoulderY = null;
  if (lHip !== null && rHip !== null) curHipY = (lHip + rHip) / 2;
  else curHipY = lHip || rHip;
  
  if (lShoulder !== null && rShoulder !== null) curShoulderY = (lShoulder + rShoulder) / 2;
  else curShoulderY = lShoulder || rShoulder;

  if (curHipY === null || curShoulderY === null) {
    updateTextAndSpeak(getText('calib-frame-incomplete'), getText('speech-frame-incomplete'));
    return;
  }
  const calibrationMetrics = calcSTSMetricMP(
    landmarks,
    videoElement?.videoWidth || pCvs?.width || 640,
    videoElement?.videoHeight || pCvs?.height || 480
  );
  const hipAngle = calibrationMetrics?.angles?.hip;
  const calibrationHeelAngle = calibrationMetrics?.angles?.heel;
  const isSitting =
    Number.isFinite(hipAngle) &&
    hipAngle < 110 
  // ==========================================================
  // --- 校正狀態機 (肩膀+骨盆 雙重保險版) ---
  // ==========================================================
  switch (calibStage) {
    // 【Stage 0：初始坐姿定位】
    case 0:
      updateTextAndSpeak(getText('calib-step-sit'), getText('speech-hold-sit'));
      if (isSitting) {
        calibHoldTime += 0.1;
        if (calibBox) calibBox.style.borderColor = "rgba(0, 255, 170, 0.8)";
      } else {
        calibHoldTime = 0;
        if (calibBox) calibBox.style.borderColor = "rgba(255, 170, 0, 0.9)";
      }     
      
      // 呼叫 UI 更新
      updateCalibrationUI(getText('calib-center-sit'), calibHoldTime, 3, isSitting ? '#87a07c' : '#FFAA00');
      
      if (calibHoldTime >= 3) {
        calibMaxHipY = curHipY; 
        calibTopShoulderY = curShoulderY; 
        calibStage = 1;
        calibHoldTime = 0;
        if (typeof playSfx === 'function') playSfx('coin');
        speak(getText('speech-calib-stand'));
      }
      break;

    case 1:
      updateTextAndSpeak(getText('calib-step-stand'), null); 
      if (calibBox) calibBox.style.borderColor = "rgba(64, 144, 255, 0.9)";
      
      if (curHipY !== null && calibMaxHipY !== null && curHipY < (calibMaxHipY - 20)) {
        calibHoldTime += 0.1;
        if (calibMinHipY === null || curHipY < calibMinHipY) {
          calibMinHipY = curHipY;
          userStandHipBaseline = curHipY; 
        }
        // Stage 1 本來就是「站起＋墊腳尖」校正，因此同步保存個人的最大 Heel–Toe angle。
        if (Number.isFinite(calibrationHeelAngle)) {
          calibratedHeelMaxAngle = Math.max(calibratedHeelMaxAngle ?? calibrationHeelAngle, calibrationHeelAngle);
        }
      }

      updateCalibrationUI(getText('calib-center-tiptoe'), calibHoldTime, 2, '#4090FF');

      if (calibHoldTime >= 2) { 
        calibStage = 2;
        calibHoldTime = 0;
        if (typeof playSfx === 'function') playSfx('green');
        speak(getText('speech-calib-sit-back'));
      }
      break;

    // 【Stage 2：坐下回位 (確認椅面極限底線)】
    case 2:
      updateTextAndSpeak(getText('calib-step-sit-back'), null);

      if (calibBox) calibBox.style.borderColor = "rgba(255, 170, 0, 0.9)"
      if (isSitting) {
        let hipPassed = (curHipY !== null && calibMaxHipY !== null && curHipY > (calibMaxHipY - 80));
        let shoulderPassed = (curShoulderY !== null && calibTopShoulderY !== null && curShoulderY > (calibTopShoulderY - 60));
        
        if (hipPassed || shoulderPassed) {
          calibHoldTime += 0.1;
          if (curHipY !== null && calibMaxHipY !== null && curHipY > calibMaxHipY) calibMaxHipY = curHipY;
        }

        updateCalibrationUI(getText('calib-center-sit-back'), calibHoldTime, 3, '#FFAA00');

        if (calibHoldTime >= 3) {
          calibStage = 3; 
        }      
      }    
      break;

    // 【Stage 3：計算結果與鎖定環境空間】
    case 3:
      if (calibMaxHipY === null || calibMinHipY === null) {
         userHipRange = 150; 
      } else {
         userHipRange = Math.abs(calibMaxHipY - calibMinHipY);
      }
      
      updateTextAndSpeak(getText('calib-complete'), getText('speech-calib-complete'));
      updateCalibrationUI(getText('calib-center-complete'), 1, 1, '#00ffaa');
      
      if (calibBox) calibBox.style.boxShadow = "0 0 40px rgba(0, 255, 170, 0.8) inset";
      if (typeof playSfx === 'function') playSfx('win');
      
      clearInterval(calibTimerId);
      calibStage = 4;
      
      setTimeout(() => {
        try {
          // 清除大字與進度條
          const centerLabel = document.getElementById('calib-center-label');
          if (centerLabel) centerLabel.remove();
          const bottomBar = document.getElementById('calib-bottom-bar');
          if (bottomBar) bottomBar.remove();

          // 隱藏校正圖層，準備進入遊戲
          const calibOverlay = document.getElementById('calib-overlay');
          if (calibOverlay) calibOverlay.classList.add('calib-off');
          
          phase = "GAME";
          window.gameStartTime = Date.now();
          isTimeUp = false;
          
          if (window.gameLoopId) cancelAnimationFrame(window.gameLoopId);
          window.gameLoopId = requestAnimationFrame(gameLoop);
          
          if (typeof countdownStart === 'function') {
            countdownStart(beginPlay);
          } else {
            if (typeof beginPlay === 'function') beginPlay();
          }
        } catch (err) {
          console.error("❌ 進入遊戲時發生致命錯誤：", err);
          alert("進入遊戲失敗，錯誤原因：" + err.message);
        }
      }, 1000);
      break;
  }
}

function resizeCvs(){if(!gCvs)return;const p=document.getElementById('game-stage')||document.getElementById('right-panel');gCvs.width=p.clientWidth;gCvs.height=p.clientHeight;buildStarField()}

/* ── CAMERA RECORDING ── */
function getSupportedRecordingMimeType(){
  if(!window.MediaRecorder)return '';
  const candidates=[
    'video/webm;codecs=vp9',
    'video/webm;codecs=vp8',
    'video/webm',
    'video/mp4;codecs=avc1.42E01E',
    'video/mp4'
  ];
  if(typeof MediaRecorder.isTypeSupported!=='function')return '';
  return candidates.find(type=>MediaRecorder.isTypeSupported(type))||'';
}

function getRecordingExtension(mimeType=''){
  return mimeType.toLowerCase().includes('mp4')?'mp4':'webm';
}

function setRecordingBadge(isRecording){
  const badge=document.getElementById('recording-live-badge');
  if(badge)badge.classList.toggle('on',Boolean(isRecording));
}

function resetRecordingResultUI(){
  if(recordedVideoUrl){
    URL.revokeObjectURL(recordedVideoUrl);
    recordedVideoUrl=null;
  }
  recordedVideoBlob=null;
  recordedChunks=[];

  const panel=document.getElementById('recording-result');
  const preview=document.getElementById('recording-preview');
  const status=document.getElementById('recording-status');
  const downloadBtn=document.getElementById('recording-download-btn');
  const analysisStatus=document.getElementById('analysis-status');
  const pdfBtn=document.getElementById('analysis-pdf-btn');
  const csvBtn=document.getElementById('analysis-csv-btn');

  if(panel)panel.style.display='none';
  if(preview){
    preview.pause();
    preview.removeAttribute('src');
    preview.load();
  }
  if(status)status.textContent='尚未產生錄影';
  if(downloadBtn)downloadBtn.disabled=true;
  if(analysisStatus)analysisStatus.textContent='尚未開始分析';
  [pdfBtn,csvBtn].forEach(btn=>{
    if(!btn)return;
    btn.style.display='none';
    btn.removeAttribute('href');
  });
  lastAnalysisResult=null;
}

function showRecordingPreparing(){
  const panel=document.getElementById('recording-result');
  const status=document.getElementById('recording-status');
  const downloadBtn=document.getElementById('recording-download-btn');
  const analysisStatus=document.getElementById('analysis-status');
  if(panel)panel.style.display='flex';
  if(status)status.textContent='正在整理錄影資料…';
  if(downloadBtn)downloadBtn.disabled=true;
  if(analysisStatus)analysisStatus.textContent='等待錄影 Blob 建立完成…';
}

function startVideoRecording(){
  const stream=videoElement?.srcObject;

  resetRecordingResultUI();

  if(!stream){
    showToast('找不到攝影機串流，無法開始錄影', 'var(--red)');
    return false;
  }
  if(!window.MediaRecorder){
    showToast('目前瀏覽器不支援 MediaRecorder 錄影', 'var(--red)');
    return false;
  }

  recordingMimeType=getSupportedRecordingMimeType();

  try{
    const options=recordingMimeType?{mimeType:recordingMimeType}:undefined;
    const recorder=options?new MediaRecorder(stream,options):new MediaRecorder(stream);
    const sessionId=++recordingSessionId;
    const sessionChunks=[];
    const session={
      id:sessionId,
      chunks:sessionChunks,
      analysisInfo:null,
      uploadStarted:false
    };
    mediaRecorder=recorder;
    activeRecordingSession=session;
    recordedChunks=sessionChunks;

    recorder.ondataavailable=event=>{
      if(event.data&&event.data.size>0)session.chunks.push(event.data);
    };
    recorder.onerror=event=>{
      console.error('MediaRecorder error:',event.error||event);
      setRecordingBadge(false);
      showToast('錄影發生錯誤，請重新開始遊戲', 'var(--red)');
    };
    recorder.onstop=()=>{
      if(sessionId!==recordingSessionId)return;
      setRecordingBadge(false);
      mediaRecorder=null;
      const blob=new Blob(session.chunks,{type:recorder.mimeType});
      if(blob.size===0){
        const status=document.getElementById('recording-status');
        if(status)status.textContent='錄影資料是空的，請重新測試';
        showToast('沒有取得有效的錄影資料', 'var(--red)');
        return;
      }
      recordedVideoBlob=blob;
      recordedVideoUrl=URL.createObjectURL(blob);
      const panel=document.getElementById('recording-result');
      const preview=document.getElementById('recording-preview');
      const status=document.getElementById('recording-status');
      const downloadBtn=document.getElementById('recording-download-btn');
      const sizeMB=(blob.size/1024/1024).toFixed(2);

      if(panel)panel.style.display='flex';
      if(preview)preview.src=recordedVideoUrl;
      if(status)status.textContent=`錄影完成｜${sizeMB} MB｜${recorder.mimeType}`;
      if(downloadBtn)downloadBtn.disabled=false;

      if(session.analysisInfo&&!session.uploadStarted){
        session.uploadStarted=true;
        uploadRecordingForAnalysis(blob,session.analysisInfo,sessionId,recorder.mimeType);
      }else{
        const analysisStatus=document.getElementById('analysis-status');
        if(analysisStatus)analysisStatus.textContent='本次錄影未設定自動分析';
      }

      if(activeRecordingSession?.id===sessionId)activeRecordingSession=null;
    };

    // timeslice=1000：大約每秒交出一批已編碼的影片資料。
    recorder.start(1000);
    setRecordingBadge(true);
    return true;
  }catch(error){
    console.error('Unable to start recording:',error);
    mediaRecorder=null;
    setRecordingBadge(false);
    showToast('無法啟動錄影：'+error.message, 'var(--red)');
    return false;
  }
}

function stopVideoRecording(analysisInfo=null){
  if(activeRecordingSession&&analysisInfo){
    activeRecordingSession.analysisInfo={...analysisInfo};
  }
  if(!mediaRecorder||mediaRecorder.state==='inactive'){
    setRecordingBadge(false);
    return;
  }
  showRecordingPreparing();
  try{
    mediaRecorder.stop();
  }catch(error){
    console.error('Unable to stop recording:',error);
    setRecordingBadge(false);
  }
}


function createRecordingStamp(){
  const now=new Date();
  return [
    now.getFullYear(),
    String(now.getMonth()+1).padStart(2,'0'),
    String(now.getDate()).padStart(2,'0'),
    '_',
    String(now.getHours()).padStart(2,'0'),
    String(now.getMinutes()).padStart(2,'0'),
    String(now.getSeconds()).padStart(2,'0')
  ].join('');
}

/* ══════════════════ 後端偵測（雙模式） ══════════════════
   影片 Heavy 分析需要本機的 Flask 後端（server.py）。
   直接用檔案開啟或放在 GitHub Pages 這種靜態主機時是沒有後端的，
   所以開站時先探一次 /api/health：
     有後端 → 完整功能
     沒後端 → 只隱藏影片分析那一塊，其餘功能照常運作
   ══════════════════════════════════════════════════════ */
let backendAvailable = null;   // null = 尚未偵測

async function detectBackend() {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 2500);
    const res = await fetch('/api/health', { signal: ctrl.signal, cache: 'no-store' });
    clearTimeout(timer);
    const data = await res.json();
    backendAvailable = !!(res.ok && data && data.success);
  } catch (e) {
    backendAvailable = false;
  }
  applyBackendModeToUI();
  return backendAvailable;
}

function applyBackendModeToUI() {
  const analysisStatus = document.getElementById('analysis-status');
  const pdfBtn = document.getElementById('analysis-pdf-btn');
  const csvBtn = document.getElementById('analysis-csv-btn');

  if (backendAvailable) {
    if (analysisStatus) analysisStatus.style.display = '';
    return;
  }

  // 靜態模式：藏起分析結果的下載按鈕，並說明為什麼沒有分析
  [pdfBtn, csvBtn].forEach(btn => { if (btn) btn.style.display = 'none'; });
  if (analysisStatus) {
    analysisStatus.textContent = '（靜態模式）未偵測到分析後端，僅提供錄影下載';
    analysisStatus.style.display = '';
  }
}

window.addEventListener('DOMContentLoaded', () => { detectBackend(); });

async function uploadRecordingForAnalysis(blob,analysisInfo,sessionId,mimeType=''){
  const status=document.getElementById('recording-status');
  const analysisStatus=document.getElementById('analysis-status');
  const pdfBtn=document.getElementById('analysis-pdf-btn');
  const csvBtn=document.getElementById('analysis-csv-btn');
  const isCurrentSession=()=>sessionId===recordingSessionId;

  if(!blob||blob.size===0){
    if(isCurrentSession()&&analysisStatus)analysisStatus.textContent='無法分析：錄影 Blob 為空';
    return;
  }

  // 沒有後端就不要送出上傳請求，直接讓使用者下載本機錄影
  if(backendAvailable===null)await detectBackend();
  if(!backendAvailable){
    if(isCurrentSession()){
      if(status)status.textContent='錄影完成（靜態模式，未上傳）';
      applyBackendModeToUI();
    }
    return;
  }

  if(isCurrentSession()){
    if(status)status.textContent='錄影完成，正在上傳至後端…';
    if(analysisStatus)analysisStatus.textContent='正在上傳影片並執行 Heavy 重新辨識…';
    [pdfBtn,csvBtn].forEach(btn=>{
      if(!btn)return;
      btn.style.display='none';
      btn.removeAttribute('href');
    });
  }

  const ext=getRecordingExtension(mimeType||blob.type);
  const stamp=createRecordingStamp();
  const formData=new FormData();
  formData.append('video',blob,`sts_recording_${stamp}.${ext}`);
  formData.append('mode',String(analysisInfo.mode||''));
  formData.append('difficulty',String(analysisInfo.difficulty||''));
  formData.append('result',String(analysisInfo.result||''));
  formData.append('game_score',String(analysisInfo.gameScore??0));
  formData.append('game_reps',String(analysisInfo.gameReps??0));
  formData.append('game_time',String(analysisInfo.gameTime??0));
  formData.append('language', String(gameSettings?.lang || 'zh-TW'));

  try{
    const response=await fetch('/api/analyze',{
      method:'POST',
      body:formData
    });

    let result=null;
    try{
      result=await response.json();
    }catch(_error){
      throw new Error(`後端回傳無法解析的資料（HTTP ${response.status}）`);
    }

    if(!response.ok||!result?.success){
      throw new Error(result?.message||`Heavy 分析失敗（HTTP ${response.status}）`);
    }

    lastAnalysisResult=result;
    if(!isCurrentSession())return;

    if(status)status.textContent='錄影完成｜後端已保存影片';
    if(analysisStatus){
      analysisStatus.textContent=`Heavy 分析完成｜完整起立 ${result.heavy_reps??0} 次｜未完成 ${result.incomplete_reps??0} 次`;
    }
    if(pdfBtn&&result.pdf_url){
      pdfBtn.href=result.pdf_url;
      pdfBtn.style.display='inline-flex';
    }
    if(csvBtn&&result.csv_url){
      csvBtn.href=result.csv_url;
      csvBtn.style.display='inline-flex';
    }
    showToast('Heavy 動作分析報告已完成', 'var(--green)');
  }catch(error){
    console.error('Upload / Heavy analysis failed:',error);
    if(!isCurrentSession())return;
    if(status)status.textContent='錄影完成｜自動分析失敗';
    if(analysisStatus)analysisStatus.textContent=`分析失敗：${error.message}`;
    showToast('後端分析失敗，原始錄影仍可下載', 'var(--red)');
  }
}

function downloadRecordedVideo(){
  if(!recordedVideoBlob||!recordedVideoUrl){
    showToast('目前沒有可下載的錄影', 'var(--yellow)');
    return;
  }

  const stamp=createRecordingStamp();
  const ext=getRecordingExtension(recordedVideoBlob.type);
  const link=document.createElement('a');
  link.href=recordedVideoUrl;
  link.download=`sts_recording_${stamp}.${ext}`;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function countdownStart(cb){
  const el=document.getElementById('countdown');el.classList.add('on');
  const seq=['3','2','1','GO!'],col=['#FF3050','#FFAA00','#00CC6A','#4090FF'];
  let i=0;
  function tick(){
    ensureAudio();
    el.textContent=seq[i];
    el.style.color=col[i];
    if(i<3){
      playSfx('count');
      speak(seq[i]); 
    } else {
      playSfx('go');
      speak(getText('game-start'), 1.3, 1.2); 
    }
    i++;
    i<seq.length?setTimeout(tick,750):setTimeout(()=>{el.classList.remove('on');cb()},500)
  }
  tick();
}