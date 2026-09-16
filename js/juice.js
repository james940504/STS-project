/* ══════════════════════════════════════════════════════════════
   演出效果（Juice / 打擊感）

   現有系統已經在追蹤「這一下的分數」跟「連續 A 級姿勢（combo）」，
   但畫面上幾乎沒有把它們變成看得到、感覺得到的回饋。
   這支腳本不改動任何姿勢偵測或計分邏輯，單純掛在
   js/social.js 既有的 onRepCompleted() 事件上，把資料「演出」出來：

   - 連擊數字：每一下都更新、跳一下動畫，數字大到一定門檻會變色
   - 完美閃光：單下分數 ≥95 分時，畫面短暫柔和閃一下金色
   - 連擊里程碑：連續 A 級達到 5 / 10 / 15 / 20 / 30 / 40 / 50 下時，
     跳出橫幅 + 粒子爆發慶祝一次

   刻意不用畫面搖晃（screen shake）——這款遊戲的受眾包含平衡感、
   前庭功能較敏感的長者，搖晃效果容易造成不適，所以只用
   單次淡入淡出的光暈與粒子，不做連續閃爍。
   ══════════════════════════════════════════════════════════════ */

const COMBO_MILESTONES = [5, 10, 15, 20, 30, 40, 50]; // 之後要調整里程碑，改這個陣列就好
let lastComboMilestoneShown = 0;

/* js/social.js 的 onRepCompleted() 算完 combo 之後呼叫這裡 */
function onRepJuice(repScore, combo) {
  updateComboDisplay(combo);

  if (repScore >= 95) flashScreen('perfect');

  if (combo > 0 && COMBO_MILESTONES.includes(combo) && combo !== lastComboMilestoneShown) {
    lastComboMilestoneShown = combo;
    if (repScore < 95) flashScreen('combo');
    showComboBanner(combo);
    burstParticles(combo >= 20 ? 26 : 14);
  }
  if (combo === 0) lastComboMilestoneShown = 0;
}

/* 每場新遊戲開始要重置，避免上一場的連擊里程碑記錄卡到這一場 */
function resetJuiceState() {
  lastComboMilestoneShown = 0;
  const el = document.getElementById('combo-display');
  if (el) {
    const num = document.getElementById('combo-num');
    if (num) num.textContent = '0';
    el.classList.remove('tier-hot', 'tier-fire', 'pop');
  }
}

function updateComboDisplay(combo) {
  const el = document.getElementById('combo-display');
  const num = document.getElementById('combo-num');
  if (!el || !num) return;
  num.textContent = String(combo);
  el.classList.toggle('tier-hot', combo >= 10 && combo < 20);
  el.classList.toggle('tier-fire', combo >= 20);
  // 重新觸發一次跳動動畫
  el.classList.remove('pop');
  void el.offsetWidth; // 強制 reflow，讓移除/加回 class 真的會重新播放動畫
  el.classList.add('pop');
}

function flashScreen(tier) {
  const el = document.getElementById('juice-flash');
  if (!el) return;
  el.className = '';
  void el.offsetWidth;
  el.classList.add('flash-' + tier);
}

function showComboBanner(combo) {
  const el = document.createElement('div');
  el.className = 'combo-banner' + (combo >= 20 ? ' tier-fire' : (combo >= 10 ? ' tier-hot' : ''));
  el.textContent = `${combo} 連擊！`;
  document.body.appendChild(el);
  if (typeof ensureAudio === 'function') ensureAudio();
  if (typeof playSfx === 'function') playSfx('coin');
  setTimeout(() => el.remove(), 1500);
}

function burstParticles(count) {
  const wrap = document.getElementById('juice-particles');
  if (!wrap) return;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'juice-particle';
    const angle = Math.random() * Math.PI * 2;
    const dist = 70 + Math.random() * 130;
    p.style.setProperty('--dx', (Math.cos(angle) * dist).toFixed(1) + 'px');
    p.style.setProperty('--dy', (Math.sin(angle) * dist).toFixed(1) + 'px');
    p.style.background = Math.random() > 0.5 ? 'var(--gold)' : 'var(--blue2)';
    wrap.appendChild(p);
    setTimeout(() => p.remove(), 900);
  }
}

window.onRepJuice = onRepJuice;
window.resetJuiceState = resetJuiceState;
