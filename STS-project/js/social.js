/* ══════════════════════════════════════════════════════════════
   社群與黏著度系統 (Social & Retention System) - 多語系支援版
   ══════════════════════════════════════════════════════════════ */

/* ── 安全語系轉換 Helper（相容 app.js 的 getText） ── */
function t(key, fallback) {
  if (typeof window.getText === 'function') {
    const res = window.getText(key);
    if (res && res !== key) return res;
  }
  return fallback || key;
}

/* ── 本場遊戲暫存狀態（不寫入存檔，僅遊玩中使用） ── */
let curGameComboA = 0, curGameComboABest = 0;
let activeChallenge = null;   // 目前正在挑戰的好友資料 {v,n,s,m,d,c,t}
let lastShareBlob = null;     // 最近一次產生的分享卡片圖片 Blob

/* ── 共用小工具 ── */
function ensureStats(s) {
  s.stats = s.stats || {
    totalReps: 0, totalGames: 0, totalWins: 0, bestScore: 0,
    bestSingleRepScore: 0, maxComboA: 0,
    challengesCreated: 0, challengesPlayed: 0, challengesWon: 0,
    seasonsParticipated: 0, seasonWins: 0
  };
  return s.stats;
}

function getSignInStreak(s) {
  const history = new Set(s.signInHistory || []);
  const today = getTodayStr();
  let d = new Date();
  if (!history.has(today)) d.setDate(d.getDate() - 1);
  let streak = 0;
  while (true) {
    const str = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    if (history.has(str)) { streak++; d.setDate(d.getDate() - 1); } else break;
  }
  return streak;
}

function currentSeasonId() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function getMonday(d) {
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1 - day);
  const m = new Date(d);
  m.setDate(d.getDate() + diff);
  return `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, '0')}-${String(m.getDate()).padStart(2, '0')}`;
}

function clearActiveChallenge() { activeChallenge = null; }

/* ── 統一入口：確保任務/賽季狀態依日期重置 ── */
function ensureSocialState() {
  const s = loadSave();
  ensureStats(s);

  const today = getTodayStr();
  const monday = getMonday(new Date());
  s.quests = s.quests || {};
  if (s.quests.dailyDate !== today) {
    s.quests.dailyDate = today;
    s.quests.daily = { reps: 0, games: 0, gradeA: 0, signin: 0 };
    s.quests.dailyClaimed = [];
  }
  if (s.quests.weekStart !== monday) {
    s.quests.weekStart = monday;
    s.quests.weekly = { reps: 0, scoreSum: 0, games: 0, signin: 0 };
    s.quests.weeklyClaimed = [];
  }

  const nowSeason = currentSeasonId();
  s.season = s.season || { id: nowSeason, history: [] };
  if (s.season.id !== nowSeason) {
    const oldId = s.season.id;
    const board = getScores().filter(e => e.season === oldId).sort((a, b) => b.score - a.score);
    if (board.length) {
      const top = board[0];
      const reward = 300;
      s.coins = (s.coins || 0) + reward;
      const st = ensureStats(s);
      st.seasonsParticipated = (st.seasonsParticipated || 0) + 1;
      st.seasonWins = (st.seasonWins || 0) + 1;
      s.season.history = s.season.history || [];
      s.season.history.unshift({ season: oldId, topScore: top.score, topName: top.name, reward });
      s.season.history = s.season.history.slice(0, 12);
      setTimeout(() => {
        showToast(`🌟 ${oldId} ${t('toast-season-settle', '賽季結算！最佳分數')} ${top.score.toLocaleString()}（${top.name}），${t('toast-get-reward', '獲得')} ${reward} 🪙`, 'var(--gold)');
        updateCoinUI();
        checkAchievements();
      }, 900);
    }
    s.season.id = nowSeason;
  }

  writeSave(s);
}

/* ══════════════════ 成就徽章 Achievements ══════════════════ */
const ACHIEVEMENTS = [
  { id: 'first_rep', key: 'ach-first_rep', name: '初次站立', desc: '完成第一次坐站動作', icon: '🧍', tier: 'bronze', reward: 50, target: 1, val: (st) => st.totalReps },
  { id: 'rep_100', key: 'ach-rep_100', name: '站立達人', desc: '累計完成100次坐站', icon: '🚶', tier: 'silver', reward: 150, target: 100, val: (st) => st.totalReps },
  { id: 'rep_500', key: 'ach-rep_500', name: '站立大師', desc: '累計完成500次坐站', icon: '🏃', tier: 'gold', reward: 400, target: 500, val: (st) => st.totalReps },
  { id: 'perfect_pose', key: 'ach-perfect_pose', name: '完美姿勢', desc: '單次姿勢分數達到滿分', icon: '💯', tier: 'silver', reward: 150, target: 99, val: (st) => st.bestSingleRepScore },
  { id: 'combo_10', key: 'ach-combo_10', name: '連續達人', desc: '單場內連續10次A級以上姿勢', icon: '🔥', tier: 'gold', reward: 300, target: 10, val: (st) => st.maxComboA },
  { id: 'classic_win', key: 'ach-classic_win', name: '通關新手', desc: '完成一次通關模式', icon: '🏁', tier: 'bronze', reward: 80, target: 1, val: (st) => st.totalWins },
  { id: 'games_10', key: 'ach-games_10', name: '熱身完畢', desc: '累計遊玩10場遊戲', icon: '🎮', tier: 'bronze', reward: 60, target: 10, val: (st) => st.totalGames },
  { id: 'games_50', key: 'ach-games_50', name: '訓練狂人', desc: '累計遊玩50場遊戲', icon: '🕹️', tier: 'gold', reward: 350, target: 50, val: (st) => st.totalGames },
  { id: 'score_1000', key: 'ach-score_1000', name: '千分大關', desc: '單場分數達到1000', icon: '⭐', tier: 'silver', reward: 200, target: 1000, val: (st) => st.bestScore },
  { id: 'signin_7', key: 'ach-signin_7', name: '簽到新星', desc: '連續簽到7天', icon: '📅', tier: 'silver', reward: 150, target: 7, val: (st, s) => getSignInStreak(s) },
  { id: 'signin_30', key: 'ach-signin_30', name: '簽到王者', desc: '連續簽到30天', icon: '🗓️', tier: 'gold', reward: 500, target: 30, val: (st, s) => getSignInStreak(s) },
  { id: 'collector_3', key: 'ach-collector_3', name: '收藏家', desc: '在商城解鎖3款角色', icon: '🎭', tier: 'silver', reward: 250, target: 3, val: (st, s) => (s.owned || []).filter(id => SHOP_CHARS.some(c => c.id === id)).length },
  { id: 'challenger_1', key: 'ach-challenger_1', name: '挑戰者', desc: '完成第一次好友挑戰', icon: '🤝', tier: 'bronze', reward: 80, target: 1, val: (st) => st.challengesPlayed },
  { id: 'challenger_win5', key: 'ach-challenger_win5', name: '常勝軍', desc: '贏得5次好友挑戰', icon: '🏆', tier: 'gold', reward: 400, target: 5, val: (st) => st.challengesWon },
  { id: 'season_1', key: 'ach-season_1', name: '賽季先鋒', desc: '參與第一個賽季排行', icon: '🌟', tier: 'bronze', reward: 100, target: 1, val: (st) => st.seasonsParticipated },
  { id: 'season_champ', key: 'ach-season_champ', name: '賽季冠軍', desc: '賽季結算時奪得本機排行榜第一', icon: '👑', tier: 'gold', reward: 500, target: 1, val: (st) => st.seasonWins },
];

function checkAchievements() {
  const s = loadSave();
  const st = ensureStats(s);
  s.achievements = s.achievements || { unlocked: [] };
  const fresh = [];
  ACHIEVEMENTS.forEach(a => {
    if (!s.achievements.unlocked.includes(a.id) && a.val(st, s) >= a.target) {
      s.achievements.unlocked.push(a.id);
      fresh.push(a);
    }
  });
  if (fresh.length) s.coins = (s.coins || 0) + fresh.reduce((sum, a) => sum + a.reward, 0);
  writeSave(s);
  if (fresh.length) {
    updateCoinUI();
    fresh.forEach((a, i) => setTimeout(() => showAchievementToast(a), i * 1700));
  }
  return fresh;
}

function showAchievementToast(a) {
  ensureAudio(); playSfx('coin');
  const name = t(`${a.key}-name`, a.name);
  const el = document.createElement('div');
  el.className = 'ach-toast';
  el.innerHTML = `<div class="ach-toast-icon">${a.icon}</div><div><div class="ach-toast-title">🏅 ${t('ach-unlocked-title', '解鎖成就')}</div><div class="ach-toast-name">${name}</div><div class="ach-toast-reward">+${a.reward} 🪙</div></div>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

function openAchievementsScreen() {
  ensureAudio(); playSfx('click');
  renderAchievements();
  goTo('scr-achievements');
}

function renderAchievements() {
  ensureSocialState();
  const s = loadSave();
  const st = ensureStats(s);
  const unlocked = (s.achievements && s.achievements.unlocked) || [];
  const summary = document.getElementById('ach-summary');
  if (summary) summary.textContent = `${t('ach-unlocked-count', '已解鎖')} ${unlocked.length} / ${ACHIEVEMENTS.length}`;
  const grid = document.getElementById('ach-grid');
  if (!grid) return;
  grid.innerHTML = ACHIEVEMENTS.map(a => {
    const isUnlocked = unlocked.includes(a.id);
    const val = Math.min(a.val(st, s), a.target);
    const pct = Math.round(val / a.target * 100);
    const name = t(`${a.key}-name`, a.name);
    const desc = t(`${a.key}-desc`, a.desc);

    return `<div class="ach-card tier-${a.tier} ${isUnlocked ? 'unlocked' : 'locked'}">
      <div class="ach-icon">${isUnlocked ? a.icon : '🔒'}</div>
      <div class="ach-name">${name}</div>
      <div class="ach-desc">${desc}</div>
      ${isUnlocked
        ? `<div class="ach-reward unlocked-tag">${t('ach-tag-unlocked', '已解鎖')} +${a.reward}🪙</div><button class="btn btn-ghost ach-share-btn" onclick="openShareCardAchievement('${a.id}')">📸 ${t('btn-share', '分享')}</button>`
        : `<div class="ach-progress-bg"><div class="ach-progress-bar" style="width:${pct}%"></div></div><div class="ach-progress-text">${val}/${a.target}</div>`}
    </div>`;
  }).join('');
}

/* ══════════════════ 每日 / 每週任務 Quests ══════════════════ */
const DAILY_QUESTS = [
  { id: 'd_reps10', key: 'q-d_reps10', label: '完成 10 次坐站', icon: '🧍', type: 'reps', target: 10, reward: 40 },
  { id: 'd_gradeA', key: 'q-d_gradeA', label: '取得 1 次 A 級以上姿勢', icon: '🌟', type: 'gradeA', target: 1, reward: 30 },
  { id: 'd_games1', key: 'q-d_games1', label: '遊玩 1 場遊戲', icon: '🎮', type: 'games', target: 1, reward: 30 },
  { id: 'd_signin', key: 'q-d_signin', label: '完成今日簽到', icon: '📅', type: 'signin', target: 1, reward: 20 },
];
const WEEKLY_QUESTS = [
  { id: 'w_reps100', key: 'q-w_reps100', label: '累計完成 100 次坐站', icon: '🚶', type: 'reps', target: 100, reward: 200 },
  { id: 'w_score2000', key: 'q-w_score2000', label: '累計獲得 2000 分', icon: '💰', type: 'scoreSum', target: 2000, reward: 250 },
  { id: 'w_games5', key: 'q-w_games5', label: '遊玩 5 場遊戲', icon: '🕹️', type: 'games', target: 5, reward: 200 },
  { id: 'w_signin5', key: 'q-w_signin5', label: '本週簽到 5 天', icon: '🗓️', type: 'signin', target: 5, reward: 300 },
];

function updateQuestProgress(key, amount) {
  ensureSocialState();
  const s = loadSave();
  const q = s.quests;
  q.daily[key] = (q.daily[key] || 0) + amount;
  q.weekly[key] = (q.weekly[key] || 0) + amount;
  writeSave(s);
  refreshQuestDot();
}

function refreshQuestDot() {
  const dot = document.getElementById('quest-dot');
  if (!dot) return;
  ensureSocialState();
  const s = loadSave();
  const q = s.quests || {};
  const dailyClaimed = q.dailyClaimed || [];
  const weeklyClaimed = q.weeklyClaimed || [];
  const hasReady =
    DAILY_QUESTS.some(d => !dailyClaimed.includes(d.id) && ((q.daily && q.daily[d.type]) || 0) >= d.target) ||
    WEEKLY_QUESTS.some(d => !weeklyClaimed.includes(d.id) && ((q.weekly && q.weekly[d.type]) || 0) >= d.target);
  dot.style.display = hasReady ? 'block' : 'none';
}

function openQuestsScreen() {
  ensureAudio(); playSfx('click');
  renderQuests();
  goTo('scr-quests');
}

function renderQuests() {
  ensureSocialState();
  const s = loadSave();
  const q = s.quests;
  const dailyInfo = document.getElementById('quest-daily-reset-info');
  const weeklyInfo = document.getElementById('quest-weekly-reset-info');
  if (dailyInfo) dailyInfo.textContent = t('quest-reset-daily-lbl', '每日 00:00 重置');
  if (weeklyInfo) weeklyInfo.textContent = t('quest-reset-weekly-lbl', '每週一重置');

  const buildList = (defs, scope, prog, claimed) => defs.map(d => {
    const val = Math.min(prog[d.type] || 0, d.target);
    const pct = Math.round(val / d.target * 100);
    const done = val >= d.target;
    const isClaimed = claimed.includes(d.id);
    const label = t(`${d.key}-lbl`, d.label);

    let btnHtml;
    if (isClaimed) btnHtml = `<button class="quest-claim-btn claimed" disabled>${t('btn-claimed', '已領取')}</button>`;
    else if (done) btnHtml = `<button class="quest-claim-btn ready" onclick="claimQuest('${scope}','${d.id}')">🎁 ${t('btn-claim', '領取')} +${d.reward}</button>`;
    else btnHtml = `<button class="quest-claim-btn locked" disabled>${val}/${d.target}</button>`;
    
    return `<div class="quest-item ${done ? (isClaimed ? 'done-claimed' : 'done') : ''}">
      <div class="quest-item-icon">${d.icon}</div>
      <div class="quest-item-info">
        <div class="quest-item-label">${label}</div>
        <div class="quest-progress-bg"><div class="quest-progress-bar" style="width:${pct}%"></div></div>
      </div>
      ${btnHtml}
    </div>`;
  }).join('');

  const dailyEl = document.getElementById('quest-daily-list');
  const weeklyEl = document.getElementById('quest-weekly-list');
  if (dailyEl) dailyEl.innerHTML = buildList(DAILY_QUESTS, 'daily', q.daily, q.dailyClaimed);
  if (weeklyEl) weeklyEl.innerHTML = buildList(WEEKLY_QUESTS, 'weekly', q.weekly, q.weeklyClaimed);
}

function claimQuest(scope, id) {
  ensureSocialState();
  const s = loadSave();
  const q = s.quests;
  const defs = scope === 'daily' ? DAILY_QUESTS : WEEKLY_QUESTS;
  const def = defs.find(d => d.id === id);
  if (!def) return;
  const prog = scope === 'daily' ? q.daily : q.weekly;
  const claimed = scope === 'daily' ? q.dailyClaimed : q.weeklyClaimed;
  if (claimed.includes(id)) return;
  if ((prog[def.type] || 0) < def.target) { showToast(t('quest-not-finished', '任務尚未完成喔！'), 'var(--yellow)'); return; }
  claimed.push(id);
  s.coins = (s.coins || 0) + def.reward;
  writeSave(s);
  updateCoinUI();
  ensureAudio(); playSfx('coin');
  showToast(`✅ ${t('quest-completed-msg', '任務完成！獲得')} ${def.reward} 🪙`, 'var(--green)');
  renderQuests();
  refreshQuestDot();
}

/* ══════════════════ 賽季排行榜資訊 Panel ══════════════════ */
function renderSeasonInfo() {
  const el = document.getElementById('season-info');
  if (!el) return;
  ensureSocialState();
  const s = loadSave();
  const season = s.season || { id: currentSeasonId(), history: [] };
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const daysLeft = daysInMonth - now.getDate();
  const histHtml = (season.history || []).slice(0, 3).map(h =>
    `<div class="season-history-item">🏅 ${h.season}：${h.topName} ${t('season-winner-fmt', '以')} ${h.topScore.toLocaleString()} ${t('season-score-unit', '分奪冠')}（+${h.reward}🪙）</div>`
  ).join('') || `<div class="season-history-item" style="color:var(--dim)">${t('season-no-history', '尚無歷史賽季紀錄')}</div>`;
  
  el.innerHTML = `
    <div class="season-current">🌟 ${t('season-current-lbl', '本賽季')}（${season.id}）· ${t('season-reset-days', '距離重置還有')} ${daysLeft} ${t('day-unit', '天')}</div>
    <div class="season-history-list">${histHtml}</div>
  `;
}

/* ══════════════════ 好友挑戰 ══════════════════ */
function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p) => String.fromCharCode('0x' + p)));
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(Array.prototype.map.call(atob(str), c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
}

function createChallengeFromResult() {
  ensureAudio(); playSfx('click');
  const nameRaw = (document.getElementById('name-input')?.value || '').trim().toUpperCase();
  const payload = {
    v: 1,
    n: nameRaw || '???',
    s: Math.round(score),
    m: selMode,
    d: selDiffKey,
    c: selChar.id,
    t: Date.now()
  };
  const code = 'STS1-' + b64EncodeUnicode(JSON.stringify(payload));

  const s = loadSave();
  const st = ensureStats(s);
  st.challengesCreated = (st.challengesCreated || 0) + 1;
  writeSave(s);

  const shareText = `${t('chal-share-msg1', '我在《要拚要猛》坐站訓練拿到')} ${payload.s} ${t('chal-share-msg2', '分！模式：')}${MODES[selMode].label}／${DIFFS[selDiffKey].label}。${t('chal-share-msg3', '你敢來超越嗎？')}\n${t('chal-code-lbl', '挑戰碼：')}${code}`;
  const output = document.getElementById('challenge-code-output');
  if (output) output.value = shareText;

  document.querySelectorAll('#challenge-tabs .diff-tab').forEach(t => t.classList.remove('active'));
  const createTab = document.querySelector('#challenge-tabs .diff-tab');
  if (createTab) createTab.classList.add('active');
  const createPanel = document.getElementById('challenge-create-panel');
  const redeemPanel = document.getElementById('challenge-redeem-panel');
  const historyPanel = document.getElementById('challenge-history-panel');
  if (createPanel) createPanel.style.display = 'block';
  if (redeemPanel) redeemPanel.style.display = 'none';
  if (historyPanel) historyPanel.style.display = 'none';

  goTo('scr-challenge');
}

function openChallengeScreen() {
  ensureAudio(); playSfx('click');
  const output = document.getElementById('challenge-code-output');
  if (output && !output.value) output.value = t('chal-no-code-tip', '尚未產生挑戰碼，先完成一場遊戲後在結算畫面點「挑戰好友」！');
  renderChallengeHistory();
  goTo('scr-challenge');
}

function closeChallengeScreen() {
  playSfx('click');
  document.getElementById('ov-challenge').classList.remove('on');
}

function switchChallengeTab(tab, el) {
  playSfx('click');
  document.querySelectorAll('#challenge-tabs .diff-tab').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');
  document.getElementById('challenge-create-panel').style.display = tab === 'create' ? 'block' : 'none';
  document.getElementById('challenge-redeem-panel').style.display = tab === 'redeem' ? 'block' : 'none';
  document.getElementById('challenge-history-panel').style.display = tab === 'history' ? 'block' : 'none';
  if (tab === 'history') renderChallengeHistory();
}

function copyChallengeCode() {
  const text = document.getElementById('challenge-code-output').value;
  if (!text) return;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(
      () => showToast(`📋 ${t('toast-copied', '已複製到剪貼簿！')}`, 'var(--green)'),
      () => showToast(t('toast-copy-failed', '複製失敗，請手動選取文字複製'), 'var(--red)')
    );
  } else {
    showToast(t('toast-copy-not-support', '此瀏覽器不支援自動複製，請手動選取文字'), 'var(--yellow)');
  }
}

function shareChallengeCode() {
  const text = document.getElementById('challenge-code-output').value;
  if (!text) return;
  if (navigator.share) {
    navigator.share({ title: t('chal-share-title', '要拚要猛 STS 訓練挑戰'), text }).catch(() => {});
  } else {
    copyChallengeCode();
  }
}

function parseChallengeCode(raw) {
  try {
    const match = raw.match(/STS1-([A-Za-z0-9+/=]+)/);
    const code = match ? match[1] : (raw.startsWith('STS1-') ? raw.slice(5) : raw);
    const payload = JSON.parse(b64DecodeUnicode(code));
    if (!payload || typeof payload.s !== 'number' || !MODES[payload.m] || !DIFFS[payload.d]) return null;
    return payload;
  } catch (e) { return null; }
}

function acceptChallengeCode() {
  const raw = (document.getElementById('challenge-code-input').value || '').trim();
  const previewEl = document.getElementById('challenge-preview');
  const payload = parseChallengeCode(raw);
  if (!payload) {
    if (previewEl) previewEl.innerHTML = `<div class="challenge-preview-err">⚠️ ${t('chal-parse-err', '挑戰碼無法解析，請確認貼上完整內容')}</div>`;
    return;
  }
  activeChallenge = payload;
  selMode = payload.m;
  selDiffKey = payload.d;
  selDiff = DIFFS[payload.d];
  ensureAudio(); playSfx('click');
  closeChallengeScreen();
  showToast(`⚔️ ${t('chal-ready-msg1', '即將挑戰「')}${payload.n}${t('chal-ready-msg2', '」的 ')}${payload.s} ${t('chal-ready-msg3', '分！')}`, 'var(--gold)');
  setTimeout(() => launchGame(), 900);
}

function renderChallengeHistory() {
  const el = document.getElementById('challenge-history-list');
  if (!el) return;
  const s = loadSave();
  const hist = s.challengeHistory || [];
  if (!hist.length) {
    el.innerHTML = `<div class="quest-item" style="justify-content:center;color:var(--dim)">${t('chal-no-history', '尚無挑戰紀錄')}</div>`;
    return;
  }
  el.innerHTML = hist.map(h => `
    <div class="quest-item">
      <div class="quest-item-icon">${h.won ? '🏆' : '💦'}</div>
      <div class="quest-item-info">
        <div class="quest-item-label">${h.won ? t('chal-win-lbl', '獲勝') : t('chal-lose-lbl', '惜敗')} vs ${h.opponent}（${h.opponentScore}${t('score-unit', '分')}）</div>
        <div style="font-size:.72em;color:var(--dim)">${t('chal-my-score', '你的分數：')}${h.myScore} · ${h.date}</div>
      </div>
    </div>
  `).join('');
}

/* ══════════════════ 分享卡片 Share Card ══════════════════ */
function openShareCardFromResult() {
  ensureAudio(); playSfx('click');
  renderShareCard({
    type: 'score',
    score: Math.round(score),
    reps: repsCount,
    mode: selMode,
    diff: selDiffKey,
    timeStr: fmtT(elapsed)
  });
}

function openShareCardAchievement(id) {
  ensureAudio(); playSfx('click');
  const a = ACHIEVEMENTS.find(x => x.id === id);
  if (!a) return;
  renderShareCard({ type: 'achievement', icon: a.icon, name: t(`${a.key}-name`, a.name), desc: t(`${a.key}-desc`, a.desc) });
}

function renderShareCard(payload) {
  const cvs = buildShareCardCanvas(payload);
  cvs.toBlob(blob => {
    lastShareBlob = blob;
    const url = URL.createObjectURL(blob);
    const img = document.getElementById('share-card-preview-img');
    if (img) img.src = url;
    document.getElementById('ov-share-card').classList.add('on');
  }, 'image/png');
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const chars = String(text).split('');
  let line = '';
  let curY = y;
  chars.forEach(ch => {
    const test = line + ch;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, curY);
      line = ch;
      curY += lineHeight;
    } else line = test;
  });
  if (line) ctx.fillText(line, x, curY);
}

function buildShareCardCanvas(payload) {
  const cvs = document.createElement('canvas');
  cvs.width = 900; cvs.height = 1120;
  const ctx = cvs.getContext('2d');

  const g = ctx.createLinearGradient(0, 0, 0, cvs.height);
  g.addColorStop(0, '#0C1A32'); g.addColorStop(1, '#05091A');
  ctx.fillStyle = g; ctx.fillRect(0, 0, cvs.width, cvs.height);

  for (let i = 0; i < 60; i++) {
    ctx.globalAlpha = Math.random() * 0.5 + 0.1;
    ctx.fillStyle = '#80B8FF';
    ctx.beginPath();
    ctx.arc(Math.random() * cvs.width, Math.random() * cvs.height, Math.random() * 1.6 + 0.4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  ctx.textAlign = 'center';
  ctx.fillStyle = '#4090FF';
  ctx.font = 'bold 40px "Segoe UI",system-ui,sans-serif';
  ctx.fillText(t('share-card-game-title', '要拚要猛 · STS 姿勢訓練'), cvs.width / 2, 100);

  if (payload.type === 'score') {
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 150px system-ui';
    ctx.fillText(String(payload.score), cvs.width / 2, 430);
    ctx.font = '30px system-ui';
    ctx.fillStyle = '#A0C8FF';
    ctx.fillText(t('share-card-total-score', '本場總分'), cvs.width / 2, 480);

    ctx.font = 'bold 32px system-ui';
    ctx.fillStyle = '#FFAA00';
    ctx.fillText(`${MODES[payload.mode].label} · ${DIFFS[payload.diff].label}`, cvs.width / 2, 560);

    ctx.font = '26px system-ui';
    ctx.fillStyle = '#7FA8D8';
    ctx.fillText(`${t('share-card-done-reps', '完成')} ${payload.reps} ${t('share-card-reps-unit', '次坐站 · 用時')} ${payload.timeStr}`, cvs.width / 2, 610);

    ctx.font = '120px system-ui';
    ctx.fillText('🧍', cvs.width / 2, 780);
  } else {
    ctx.font = '190px system-ui';
    ctx.fillText(payload.icon, cvs.width / 2, 520);
    ctx.font = 'bold 48px system-ui';
    ctx.fillStyle = '#FFD700';
    ctx.fillText('🏅 ' + payload.name, cvs.width / 2, 610);
    ctx.font = '28px system-ui';
    ctx.fillStyle = '#C8D8F0';
    wrapText(ctx, payload.desc, cvs.width / 2, 660, 700, 36);
  }

  ctx.font = '22px system-ui';
  ctx.fillStyle = '#4868A0';
  ctx.fillText(new Date().toLocaleDateString(), cvs.width / 2, cvs.height - 60);

  return cvs;
}

async function doShareCard() {
  if (!lastShareBlob) return;
  const file = new File([lastShareBlob], 'sts-share.png', { type: 'image/png' });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: t('share-card-game-title', '要拚要猛 STS 訓練'), text: t('share-card-invite', '一起來坐站訓練吧！') });
      return;
    } catch (e) { }
  }
  doDownloadCard();
}

function doDownloadCard() {
  if (!lastShareBlob) return;
  const url = URL.createObjectURL(lastShareBlob);
  const a = document.createElement('a');
  a.href = url; a.download = 'sts-share.png'; a.click();
  URL.revokeObjectURL(url);
  showToast(`📥 ${t('toast-card-downloaded', '圖片已下載，快去分享到社群吧！')}`, 'var(--blue2)');
}

function closeShareCard() {
  playSfx('click');
  document.getElementById('ov-share-card').classList.remove('on');
}

/* ══════════════════ 遊戲事件掛鉤 ══════════════════ */
function onGameStart() {
  curGameComboA = 0;
  curGameComboABest = 0;
}

function onRepCompleted(repScore) {
  ensureSocialState();
  const s = loadSave();
  const st = ensureStats(s);
  st.totalReps++;
  st.bestSingleRepScore = Math.max(st.bestSingleRepScore, repScore);
  if (repScore >= 80) { curGameComboA++; curGameComboABest = Math.max(curGameComboABest, curGameComboA); }
  else curGameComboA = 0;
  st.maxComboA = Math.max(st.maxComboA, curGameComboABest);
  writeSave(s);

  updateQuestProgress('reps', 1);
  if (repScore >= 80) updateQuestProgress('gradeA', 1);

  checkAchievements();
}

function onGameEnd(info) {
  ensureSocialState();
  const s = loadSave();
  const st = ensureStats(s);
  st.totalGames++;
  if (info.result === 'win') st.totalWins++;
  st.bestScore = Math.max(st.bestScore, info.score);

  let challengeMsg = null, challengeWon = false;
  if (activeChallenge) {
    st.challengesPlayed++;
    challengeWon = info.score > activeChallenge.s;
    if (challengeWon) st.challengesWon++;
    s.challengeHistory = s.challengeHistory || [];
    s.challengeHistory.unshift({
      opponent: activeChallenge.n, opponentScore: activeChallenge.s,
      myScore: info.score, won: challengeWon, date: new Date().toLocaleDateString()
    });
    s.challengeHistory = s.challengeHistory.slice(0, 20);
    challengeMsg = challengeWon
      ? `🎉 ${t('chal-won-msg1', '你以')} ${info.score} ${t('chal-won-msg2', '分打敗了「')}${activeChallenge.n}${t('chal-won-msg3', '」的')} ${activeChallenge.s} ${t('score-unit', '分')}！`
      : `💦 ${t('chal-lost-msg1', '惜敗！差')} ${activeChallenge.s - info.score} ${t('chal-lost-msg2', '分輸給「')}${activeChallenge.n}${t('chal-lost-msg3', '」，再接再厲！')}`;
    activeChallenge = null;
  }

  writeSave(s);
  updateQuestProgress('games', 1);
  updateQuestProgress('scoreSum', info.score);
  checkAchievements();

  if (challengeMsg) {
    setTimeout(() => showToast(challengeMsg, challengeWon ? 'var(--gold)' : 'var(--red)'), 1200);
  }
}

function onSignIn(dateStr) {
  ensureSocialState();
  updateQuestProgress('signin', 1);
  checkAchievements();
}

/* ── 暴露 UI 渲染入口給全域（供 app.js 語言切換時調用） ── */
window.renderQuests = renderQuests;
window.renderAchievements = renderAchievements;
window.renderSeasonInfo = renderSeasonInfo;
window.refreshQuestDot = refreshQuestDot;

/* ── INIT ── */
window.addEventListener('DOMContentLoaded', () => {
  ensureSocialState();
  refreshQuestDot();
  checkAchievements();
});