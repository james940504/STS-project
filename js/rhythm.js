/* ══════════════════════════════════════════════════════════════
   節奏音樂模式（Rhythm Music Mode）

   跟冒險模式一樣，是完全獨立啟動的關卡：從左下角入口進來，
   先選節奏快慢，接著直接開打，不經過角色/模式/難度選擇畫面。

   核心玩法：背景有一個穩定的節拍器，每隔固定拍數（一小節）
   會有一次「起立拍點」，玩家要盡量讓自己完成起立的那一刻跟拍點對上。
   這裡跟一般模式看姿勢分數不同，看的是「準度」——
   越接近拍點，判定就越好（PERFECT / GREAT / GOOD / MISS），
   難度不是靠「起立次數」堆出來的，是靠「踩得準不準」。

   實作上完全掛在既有事件鉤子（onGameStart / onRepCompleted / onGameEnd）
   跟 app.js 既有的 tone() / ensureAudio() / playSfx() 音效工具上，
   不改動任何姿勢偵測、紅綠燈或計分邏輯——紅綠燈機制照常運作，
   節奏音樂只是疊加在上面的一層體驗，跟冒險模式的設計原則一致。
   ══════════════════════════════════════════════════════════════ */

const RHYTHM_TEMPOS = [
  { id: 'slow',   nameCn: '慢板小步', bpm: 66,  beatsPerCue: 4, targetReps: 8,  icon: '🐢', desc: '節奏放鬆，適合先熟悉「跟拍起立」的感覺' },
  { id: 'medium', nameCn: '中板漫步', bpm: 92,  beatsPerCue: 4, targetReps: 10, icon: '🚶', desc: '穩定的日常訓練節奏，難度適中' },
  { id: 'fast',   nameCn: '快板衝刺', bpm: 120, beatsPerCue: 4, targetReps: 12, icon: '🏃', desc: '心跳般的明快節奏，考驗反應與準度' }
]; // 之後要加新節奏，加進這個陣列就好，不用改其他邏輯

let activeRhythmSession = null; // { tempoId, bpm, beatIntervalMs, cueIntervalMs, targetReps, hitsCount, judgeCounts, combo, bestCombo }
let rhythmBeatTimerId = null;
let rhythmBeatCountInCue = 0;
let rhythmLastCueAt = 0;
let rhythmNextCueAt = 0;
let lastRhythmTempoId = null; // 給結算畫面「再玩一次」用

function findRhythmTempo(id) {
  return RHYTHM_TEMPOS.find(t => t.id === id) || null;
}

/* ── 選節奏畫面 ── */
function openRhythmScreen() {
  if (typeof ensureAudio === 'function') ensureAudio();
  if (typeof playSfx === 'function') playSfx('click');
  renderRhythmTempoList();
  document.getElementById('ov-rhythm')?.classList.add('on');
}

function closeRhythmScreen() {
  if (typeof playSfx === 'function') playSfx('click');
  document.getElementById('ov-rhythm')?.classList.remove('on');
}

function renderRhythmTempoList() {
  const wrap = document.getElementById('rhythm-tempo-list');
  if (!wrap) return;
  wrap.innerHTML = RHYTHM_TEMPOS.map(t => `
    <div class="rhythm-tempo-card" onclick="startRhythmSession('${t.id}')">
      <div class="rhythm-tempo-icon">${t.icon}</div>
      <div class="rhythm-tempo-name">${t.nameCn}</div>
      <div class="rhythm-tempo-bpm">${t.bpm} BPM｜共 ${t.targetReps} 下</div>
      <div class="rhythm-tempo-desc">${t.desc}</div>
    </div>
  `).join('');
}

/* ── 啟動：比照冒險模式，直接繞過角色/模式/難度選擇畫面 ── */
function startRhythmSession(tempoId) {
  const tempo = findRhythmTempo(tempoId);
  if (!tempo) return;
  if (typeof playSfx === 'function') playSfx('click');

  const beatIntervalMs = 60000 / tempo.bpm;
  activeRhythmSession = {
    tempoId: tempo.id,
    bpm: tempo.bpm,
    beatIntervalMs,
    cueIntervalMs: beatIntervalMs * tempo.beatsPerCue,
    targetReps: tempo.targetReps,
    hitsCount: 0,
    judgeCounts: { perfect: 0, great: 0, good: 0, miss: 0 },
    combo: 0,
    bestCombo: 0
  };

  // 固定用 infinite 模式＋easy 難度：紅綠燈照常運作，但姿勢門檻放最寬，
  // 讓玩家可以專心對拍點，不用同時應付高難度姿勢判定。跟 story.js 的做法一致。
  if (typeof DIFFS !== 'undefined') { selDiffKey = 'easy'; selDiff = DIFFS.easy; }
  selMode = 'infinite';

  document.getElementById('ov-rhythm')?.classList.remove('on');
  if (typeof launchGame === 'function') launchGame();
}

/* ── js/social.js 的 onGameStart() 呼叫這裡：開始節拍器 ── */
function onRhythmGameStart() {
  if (!activeRhythmSession) return;
  rhythmBeatCountInCue = 0;
  const now = performance.now();
  rhythmLastCueAt = now;
  rhythmNextCueAt = now + activeRhythmSession.cueIntervalMs;
  updateRhythmHUD();
  clearRhythmJudgeText();
  document.getElementById('rhythm-hud')?.classList.add('on');
  startRhythmBeatClock();
}

/* 遊戲暫停/繼續時，節拍器也要跟著停/繼續：不然暫停中節拍器還在背景嗶嗶叫，
   而且拍點時間會跟玩家實際感受到的時間軸脫節，恢復後判定會整個對不上。
   app.js 的 pauseGame()/resumeGame() 會呼叫這兩個。 */
function onRhythmGamePause() {
  if (!activeRhythmSession) return;
  stopRhythmBeatClock();
}

function onRhythmGameResume() {
  if (!activeRhythmSession) return;
  rhythmBeatCountInCue = 0;
  const now = performance.now();
  rhythmLastCueAt = now;
  rhythmNextCueAt = now + activeRhythmSession.cueIntervalMs;
  startRhythmBeatClock();
}

function startRhythmBeatClock() {
  stopRhythmBeatClock();
  if (!activeRhythmSession) return;
  rhythmBeatTimerId = setInterval(rhythmBeatTick, activeRhythmSession.beatIntervalMs);
}

function stopRhythmBeatClock() {
  if (rhythmBeatTimerId) { clearInterval(rhythmBeatTimerId); rhythmBeatTimerId = null; }
}

function rhythmBeatTick() {
  if (!activeRhythmSession) return;
  const session = activeRhythmSession;
  const tempo = findRhythmTempo(session.tempoId);
  const beatsPerCue = tempo ? tempo.beatsPerCue : 4;
  rhythmBeatCountInCue++;
  const isCue = rhythmBeatCountInCue >= beatsPerCue;

  if (typeof ensureAudio === 'function') ensureAudio();
  if (isCue) {
    if (typeof tone === 'function') tone(392, 0.14, 'triangle', 0.22); // 重拍：起立拍點
    rhythmBeatCountInCue = 0;
    rhythmLastCueAt = performance.now();
    rhythmNextCueAt = rhythmLastCueAt + session.cueIntervalMs;
    pulseRhythmBeat(true);
  } else {
    if (typeof tone === 'function') tone(220, 0.06, 'sine', 0.10); // 輕拍：節拍器 tick
    pulseRhythmBeat(false);
  }
}

function pulseRhythmBeat(strong) {
  const dot = document.getElementById('rhythm-beat-dot');
  if (!dot) return;
  dot.classList.remove('pulse', 'pulse-strong');
  void dot.offsetWidth; // 強制 reflow，讓連續拍點都能重新播放動畫
  dot.classList.add(strong ? 'pulse-strong' : 'pulse');
}

/* ── js/social.js 的 onRepCompleted() 呼叫這裡：評分這一下離拍點多近 ── */
function onRhythmRepHit(repScore) {
  if (!activeRhythmSession) return;
  const session = activeRhythmSession;
  const now = performance.now();
  const deltaToLast = Math.abs(now - rhythmLastCueAt);
  const deltaToNext = Math.abs(rhythmNextCueAt - now);
  const delta = Math.min(deltaToLast, deltaToNext);
  const judge = judgeRhythmTiming(delta, session.cueIntervalMs);

  session.hitsCount++;
  session.judgeCounts[judge]++;
  if (judge === 'miss') session.combo = 0;
  else { session.combo++; session.bestCombo = Math.max(session.bestCombo, session.combo); }

  showRhythmJudgeText(judge);
  updateRhythmHUD();

  if (session.hitsCount >= session.targetReps) finishRhythmSession();
}

/* 準度門檻用「跟拍點差幾% 的一小節長度」來算，這樣不管選哪個節奏，
   判定的相對寬鬆程度都一致——快節奏跟慢節奏一樣好上手。 */
function judgeRhythmTiming(deltaMs, cueIntervalMs) {
  const ratio = deltaMs / cueIntervalMs;
  if (ratio <= 0.12) return 'perfect';
  if (ratio <= 0.25) return 'great';
  if (ratio <= 0.45) return 'good';
  return 'miss';
}

const RHYTHM_JUDGE_LABELS = {
  perfect: '完美！',
  great: '很棒！',
  good: '不錯',
  miss: '錯拍'
};

function showRhythmJudgeText(judge) {
  const el = document.getElementById('rhythm-judge-text');
  if (!el) return;
  el.textContent = RHYTHM_JUDGE_LABELS[judge] || '';
  el.className = 'rhythm-judge-text judge-' + judge;
  void el.offsetWidth;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 700);
}

function clearRhythmJudgeText() {
  const el = document.getElementById('rhythm-judge-text');
  if (el) { el.textContent = ''; el.className = 'rhythm-judge-text'; }
}

function updateRhythmHUD() {
  const session = activeRhythmSession;
  const progEl = document.getElementById('rhythm-hud-progress');
  const comboEl = document.getElementById('rhythm-hud-combo');
  if (!session) return;
  if (progEl) progEl.textContent = `${session.hitsCount} / ${session.targetReps}`;
  if (comboEl) comboEl.textContent = session.combo > 1 ? `連續準度 x${session.combo}` : '';
}

/* ── 結束：跟冒險模式一樣不看姿勢成績，改看準度結算 ── */
function finishRhythmSession() {
  const session = activeRhythmSession;
  if (!session) return;
  stopRhythmBeatClock();
  lastRhythmTempoId = session.tempoId;

  const jc = session.judgeCounts;
  const scoreSum = jc.perfect * 100 + jc.great * 70 + jc.good * 40 + jc.miss * 0;
  const maxScore = session.targetReps * 100;
  const pct = maxScore > 0 ? scoreSum / maxScore : 0;
  const grade = pct >= 0.9 ? 'S' : pct >= 0.75 ? 'A' : pct >= 0.5 ? 'B' : 'C';
  const tempo = findRhythmTempo(session.tempoId);

  if (typeof triggerRhythmEnd === 'function') {
    triggerRhythmEnd({
      tempoName: tempo ? tempo.nameCn : '',
      grade,
      pct,
      perfect: jc.perfect,
      great: jc.great,
      good: jc.good,
      miss: jc.miss,
      bestCombo: session.bestCombo
    });
  }
}

/* ── js/social.js 的 onGameEnd() 呼叫這裡：不管哪種方式結束都要收尾，
   避免下一場殘留舊的節拍器/HUD 狀態（例如中途被抓到而提早結束）。 ── */
function onRhythmGameEnd() {
  stopRhythmBeatClock();
  document.getElementById('rhythm-hud')?.classList.remove('on');
  activeRhythmSession = null;
}

function backToRhythmMenuFromResult() {
  document.getElementById('ov-rhythm-result')?.classList.remove('on');
  if (typeof playSfx === 'function') playSfx('click');
  if (typeof goTo === 'function') goTo('scr-menu'); // 跟 story.js 的 backToStoryMapFromVictory() 一致，先真的離開遊戲畫面
  openRhythmScreen();
}

function replayRhythmSession() {
  document.getElementById('ov-rhythm-result')?.classList.remove('on');
  if (lastRhythmTempoId) startRhythmSession(lastRhythmTempoId);
  else openRhythmScreen();
}

window.openRhythmScreen = openRhythmScreen;
window.closeRhythmScreen = closeRhythmScreen;
window.startRhythmSession = startRhythmSession;
window.onRhythmGameStart = onRhythmGameStart;
window.onRhythmGamePause = onRhythmGamePause;
window.onRhythmGameResume = onRhythmGameResume;
window.onRhythmRepHit = onRhythmRepHit;
window.onRhythmGameEnd = onRhythmGameEnd;
window.backToRhythmMenuFromResult = backToRhythmMenuFromResult;
window.replayRhythmSession = replayRhythmSession;
