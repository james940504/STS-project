/* ══════════════════════════════════════════════════════════════
   新手導覽（Onboarding Tour）
   一個不依賴攝影機、可重複觀看的「聚光燈」式功能導覽，
   依序介紹主選單、右上角所有系統圖示與 AI 教練，
   讓新玩家在正式開始遊戲前，先認識所有功能入口。
   ══════════════════════════════════════════════════════════════ */

const TOUR_STEPS = [
  { target: null,
    zh: { icon:'👋', title:'歡迎來到 123木頭人 PRO！', desc:'讓我們花 1 分鐘認識所有功能。導覽隨時可以按「跳過」結束，之後到右下角的「設定」就能重新查看一次。' },
    en: { icon:'👋', title:'Welcome to 123 Statue PRO!', desc:'Let’s spend a minute walking through every feature. You can skip anytime, and replay this tour later from Settings.' } },

  { target: '#btn-start-game',
    zh: { icon:'▶️', title:'開始遊戲', desc:'依序選擇角色、模式、難度後進入攝影機偵測。除了經典／無限／限時，還有「控制坐下」與「腳跟控制」兩種慢速控制訓練。' },
    en: { icon:'▶️', title:'Start Game', desc:'Pick a character, mode, and difficulty. Besides Classic, Infinite and Timed, there are two slow-control modes: Controlled Sit and Heel Control.' } },

  { target: '#btn-watch-ad',
    zh: { icon:'🎬', title:'看廣告領金幣', desc:'點一下模擬廣告，立即免費領取 500 🪙，金幣可以在商城購買造型。' },
    en: { icon:'🎬', title:'Watch Ad for Coins', desc:'Watch a mock ad to instantly earn 500 🪙, spendable in the shop.' } },

  { target: '#coin-display',
    zh: { icon:'🪙', title:'我的金幣', desc:'這裡顯示你目前擁有的金幣總數，遊戲結束後領取的獎勵也會加進來。' },
    en: { icon:'🪙', title:'My Coins', desc:'Your current coin balance — rewards collected after each round get added here.' } },

  { target: '#nav-signin',
    zh: { icon:'📅', title:'每日簽到', desc:'每天登入點一次就能領金幣，連續簽到獎勵更豐富，別忘記天天來看看。' },
    en: { icon:'📅', title:'Daily Check-in', desc:'Tap once a day for coins — consecutive check-ins earn bigger rewards.' } },

  { target: '#nav-quests',
    zh: { icon:'🎯', title:'每日／每週任務', desc:'完成指定的遊戲任務（例如玩滿幾場、拿到幾分）可以額外領取金幣獎勵。' },
    en: { icon:'🎯', title:'Daily / Weekly Quests', desc:'Complete goals like playing N rounds or hitting a score target for bonus coins.' } },

  { target: '#nav-achievements',
    zh: { icon:'🏅', title:'成就徽章', desc:'達成特定里程碑（例如連續好姿勢、總遊玩次數、好友數量）會解鎖專屬徽章。' },
    en: { icon:'🏅', title:'Achievements', desc:'Unlock badges by hitting milestones like posture streaks, total plays, or number of friends.' } },

  { target: '#nav-friends',
    zh: { icon:'👥', title:'我的好友', desc:'用好友碼互相加好友，可以看到彼此的最佳成績、對戰勝負與排行榜，也能直接向好友發起挑戰。' },
    en: { icon:'👥', title:'My Friends', desc:'Add friends with friend codes to compare best scores, track head-to-head records, and challenge them directly.' } },

  { target: '#nav-challenge',
    zh: { icon:'🤝', title:'好友挑戰', desc:'遊戲結束後可以產生挑戰碼分享給朋友，邀請他們來比拚分數。' },
    en: { icon:'🤝', title:'Friend Challenge', desc:'After a round, generate a challenge code to share and compete with friends.' } },

  { target: '#nav-shop',
    zh: { icon:'🛒', title:'角色商城', desc:'用金幣解鎖新角色、動作軌跡特效與頭飾，讓遊戲畫面更有個人風格。' },
    en: { icon:'🛒', title:'Shop', desc:'Spend coins on new characters, trail effects, and hats to personalize your game.' } },

  { target: '#nav-board',
    zh: { icon:'🏆', title:'排行榜', desc:'查看歷史最高分紀錄，可依「本賽季／通關／無限／限時」模式篩選。' },
    en: { icon:'🏆', title:'Leaderboard', desc:'View top scores, filterable by season, classic, infinite, or timed mode.' } },

  { target: '#phonecam-btn',
    zh: { icon:'🤳', title:'手機鏡頭連線（測試版）', desc:'沒有電腦鏡頭嗎？可以用手機掃描 QR Code，把手機當作偵測畫面的鏡頭。' },
    en: { icon:'🤳', title:'Phone Camera (Beta)', desc:'No webcam? Scan a QR code to use your phone as the detection camera instead.' } },

  { target: '#nav-history',
    zh: { icon:'📊', title:'歷史紀錄', desc:'每一場訓練的完整資料都會存在這裡：分數、次數、時長與軀幹／腳跟／膝部的姿勢分數，可以匯出 CSV 帶去給治療師看。' },
    en: { icon:'📊', title:'Training History', desc:'Every session is saved here — score, reps, duration and trunk/heel/knee posture scores. Exportable as CSV.' } },

  { target: '#nav-advice',
    zh: { icon:'💡', title:'改善建議', desc:'累積幾場訓練後，這裡會整理出你最需要調整的動作重點，並推薦對應的加強練習。' },
    en: { icon:'💡', title:'Improvement Advice', desc:'After a few sessions, this highlights what to fix in your form and suggests drills to work on.' } },

  { target: '#nav-story',
    zh: { icon:'🗺️', title:'冒險地圖', desc:'化身「坐站王子（公主）」闖關！每個章節有 5 關，每一關都是不同的小故事，坐站一次就是攻擊一次，不看姿勢分數，闖過關卡看完劇情就算成功。' },
    en: { icon:'🗺️', title:'Adventure Map', desc:'Become the "Sit-Stand Hero" and battle through story levels! Each chapter has 5 levels with its own mini-story — every rep is an attack, no score required, just clear the rep count to win.' } },

  { target: '#nav-settings',
    zh: { icon:'⚙️', title:'遊戲設定', desc:'切換語言、開關音效與粒子特效，也有「大字體」「高對比」無障礙選項。新手導覽、遊戲規則、隱私權聲明與聯絡我們也都收在這裡。' },
    en: { icon:'⚙️', title:'Settings', desc:'Language, sound and particles, plus large-text and high-contrast accessibility options. The tour, game rules, privacy notice and contact form all live here too.' } },

  { target: '#ai-chat-btn',
    zh: { icon:'🤖', title:'AI 教練', desc:'隨時點擊這裡詢問遊戲規則、坐站訓練好處或高分技巧，AI 教練會即時回覆你。' },
    en: { icon:'🤖', title:'AI Coach', desc:'Ask about game rules, the benefits of sit-to-stand training, or scoring tips anytime.' } },

  { target: null,
    zh: { icon:'🚀', title:'準備好了嗎？', desc:'點擊「開始遊戲」，依序選好角色、模式、難度，跟著紅綠燈完成站➔坐➔站➔墊腳，就能開始你的第一場訓練！這份導覽隨時可以在「設定」中重新查看。' },
    en: { icon:'🚀', title:'Ready to go?', desc:'Tap "Start Game", pick a character/mode/difficulty, and follow the traffic light through stand → sit → stand → tiptoe. Replay this tour anytime from Settings.' } }
];

let tourIdx = 0;

function tourLang() {
  return (typeof gameSettings !== 'undefined' && gameSettings.lang) || window.currentLang || 'zh-TW';
}

function ensureTourStyles() {
  if (document.getElementById('tour-style')) return;
  const style = document.createElement('style');
  style.id = 'tour-style';
  style.textContent = `
    #tour-mask{position:fixed;inset:0;z-index:10050;background:transparent;}
    #tour-spotlight{position:fixed;z-index:10051;pointer-events:none;border-radius:14px;
      border:2px solid var(--blue2);box-shadow:0 0 0 9999px rgba(6,14,28,.86);
      transition:top .35s ease,left .35s ease,width .35s ease,height .35s ease;}
    #tour-card{position:fixed;z-index:10052;background:var(--card);border:1.5px solid var(--border);
      border-radius:14px;padding:18px 20px;width:320px;box-shadow:0 14px 44px rgba(0,0,0,.55);
      animation:tourFadeIn .25s ease;}
    @keyframes tourFadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
    #tour-card .tour-nav-btn{padding:6px 14px;font-size:.8em;}
  `;
  document.head.appendChild(style);
}

function tourCloseOverlays() {
  document.querySelectorAll('.overlay-modal.on').forEach(el => el.classList.remove('on'));
  const legal = document.getElementById('ov-legal');
  if (legal && !legal.classList.contains('off') && typeof hasAgreedToLegal === 'function' && hasAgreedToLegal()) {
    legal.classList.add('off');
  }
  const settings = document.getElementById('ov-settings');
  if (settings) settings.classList.add('off');
}

function tourKeyHandler(e) {
  if (e.key === 'Escape') skipTour();
  else if (e.key === 'ArrowRight') tourGoNext();
  else if (e.key === 'ArrowLeft' && tourIdx > 0) renderTourStep(tourIdx - 1);
}

function positionTour(step) {
  const spotlight = document.getElementById('tour-spotlight');
  const card = document.getElementById('tour-card');
  if (!step.target) {
    spotlight.style.display = 'none';
    card.style.top = '50%'; card.style.left = '50%'; card.style.transform = 'translate(-50%,-50%)';
    return;
  }
  const el = document.querySelector(step.target);
  if (!el) {
    spotlight.style.display = 'none';
    card.style.top = '50%'; card.style.left = '50%'; card.style.transform = 'translate(-50%,-50%)';
    return;
  }
  card.style.transform = 'none';
  spotlight.style.display = 'block';
  const pad = 10;
  const r = el.getBoundingClientRect();
  spotlight.style.top = (r.top - pad) + 'px';
  spotlight.style.left = (r.left - pad) + 'px';
  spotlight.style.width = (r.width + pad * 2) + 'px';
  spotlight.style.height = (r.height + pad * 2) + 'px';

  // getBoundingClientRect() forces a synchronous layout, so this reads the
  // just-rendered card size without needing a rAF round-trip (avoids a flash).
  const cr = card.getBoundingClientRect();
  let top = r.bottom + pad + 10;
  let left = r.left + r.width / 2 - cr.width / 2;
  if (top + cr.height > window.innerHeight - 10) top = r.top - cr.height - pad - 10;
  if (top < 10) top = 10;
  if (left < 10) left = 10;
  if (left + cr.width > window.innerWidth - 10) left = window.innerWidth - 10 - cr.width;
  card.style.top = top + 'px';
  card.style.left = left + 'px';
}

function tourGoNext() {
  if (tourIdx >= TOUR_STEPS.length - 1) finishTour();
  else renderTourStep(tourIdx + 1);
}

function renderTourStep(idx) {
  tourIdx = idx;
  const step = TOUR_STEPS[idx];
  const lang = tourLang();
  const t = lang === 'en' ? step.en : step.zh;
  const isFirst = idx === 0, isLast = idx === TOUR_STEPS.length - 1;
  const card = document.getElementById('tour-card');
  card.innerHTML = `
    <div style="font-size:.7em;font-weight:700;letter-spacing:1px;color:var(--dim);margin-bottom:6px;">${idx + 1} / ${TOUR_STEPS.length}</div>
    <div style="font-size:1.05em;font-weight:800;color:var(--blue2);margin-bottom:6px;">${t.icon} ${t.title}</div>
    <div style="font-size:.85em;color:var(--text);line-height:1.65;margin-bottom:14px;">${t.desc}</div>
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
      <button id="tour-skip-btn" style="background:none;border:none;color:var(--dim);font-size:.76em;cursor:pointer;text-decoration:underline;padding:4px 0;">${lang === 'en' ? 'Skip tour' : '跳過導覽'}</button>
      <div style="display:flex;gap:8px;">
        ${!isFirst ? `<button id="tour-prev-btn" class="btn btn-ghost tour-nav-btn">${lang === 'en' ? 'Back' : '上一步'}</button>` : ''}
        <button id="tour-next-btn" class="btn btn-blue tour-nav-btn">${isLast ? (lang === 'en' ? "Let's go!" : '開始探索！') : (lang === 'en' ? 'Next' : '下一步')}</button>
      </div>
    </div>
  `;
  document.getElementById('tour-skip-btn').onclick = skipTour;
  const prevBtn = document.getElementById('tour-prev-btn');
  if (prevBtn) prevBtn.onclick = () => renderTourStep(idx - 1);
  document.getElementById('tour-next-btn').onclick = tourGoNext;
  positionTour(step);
}

function startTour(force) {
  if (document.getElementById('tour-mask')) return; // already running
  if (typeof goTo === 'function') goTo('scr-menu');
  tourCloseOverlays();
  ensureTourStyles();

  const mask = document.createElement('div'); mask.id = 'tour-mask';
  const spotlight = document.createElement('div'); spotlight.id = 'tour-spotlight';
  const card = document.createElement('div'); card.id = 'tour-card';
  // Appended to <html>, not <body>: 大字體模式會在 body 上加 zoom，而 zoom 會
  // 連帶縮放 position:fixed 的子元素。掛在 documentElement 可以讓這三層維持在
  // 真實視窗像素，和 getBoundingClientRect() 量到的目標位置對得起來。
  document.documentElement.appendChild(mask);
  document.documentElement.appendChild(spotlight);
  document.documentElement.appendChild(card);

  document.addEventListener('keydown', tourKeyHandler);
  if (typeof playSfx === 'function') { try { playSfx('click'); } catch (e) {} }
  renderTourStep(0);
}

function endTour() {
  ['tour-mask', 'tour-spotlight', 'tour-card'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.remove();
  });
  document.removeEventListener('keydown', tourKeyHandler);
}

function markTourSeen() {
  try {
    const s = (typeof loadSave === 'function') ? loadSave() : {};
    s.tourSeen = true;
    if (typeof writeSave === 'function') writeSave(s);
  } catch (e) {}
}

function skipTour() {
  endTour();
  markTourSeen();
}

function finishTour() {
  endTour();
  markTourSeen();
  if (typeof showToast === 'function') {
    showToast(tourLang() === 'en' ? '🎉 Tour complete — have fun!' : '🎉 導覽完成，祝你玩得開心！', 'var(--green)');
  }
}

function maybeAutoStartTour() {
  try {
    const s = (typeof loadSave === 'function') ? loadSave() : {};
    if (s.tourSeen) return;
    if (typeof hasAgreedToLegal === 'function' && !hasAgreedToLegal()) return;
    setTimeout(() => { if (!document.getElementById('tour-mask')) startTour(false); }, 800);
  } catch (e) {}
}

window.addEventListener('DOMContentLoaded', () => { maybeAutoStartTour(); });

// 若使用者剛同意隱私權聲明，緊接著自動開始導覽
(function () {
  const origAgree = window.agreeToLegal;
  if (typeof origAgree === 'function') {
    window.agreeToLegal = function () {
      origAgree.apply(this, arguments);
      maybeAutoStartTour();
    };
  }
})();

// 語言切換時，若導覽正開著，重新渲染當前步驟的文字
window.addEventListener('languageChanged', () => {
  if (document.getElementById('tour-mask')) renderTourStep(tourIdx);
});

window.startTour = startTour;
