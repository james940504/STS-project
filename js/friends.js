/* ══════════════════════════════════════════════════════════════
   好友系統（Friends）

   目前是「本機版」：好友名單存在瀏覽器的存檔裡，靠好友碼互加。
   好友碼本身就帶著對方的暱稱與最佳成績，所以完全不需要伺服器
   也能顯示戰力比較與排行榜。

   ── 之後要換成連線版時 ──
   所有讀寫都集中在下面的 FriendStore，只要換掉裡面的實作
   （改成打 API / Firebase），上層的 UI 與計分邏輯都不用動。
   函式已全部寫成 async，換成網路請求時不會需要改呼叫端。
   ══════════════════════════════════════════════════════════════ */

const FRIEND_CODE_PREFIX = 'STSF1-';
const MAX_FRIENDS = 50;

/* ── 小工具 ── */
function fr_t(key, fallback) {
  if (typeof window.t === 'function') return window.t(key, fallback);
  return fallback || key;
}

function fr_b64Encode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
    (_, p) => String.fromCharCode('0x' + p)));
}

function fr_b64Decode(str) {
  return decodeURIComponent(Array.prototype.map
    .call(atob(str), c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
    .join(''));
}

/* 產生一組不易碰撞、但人眼還讀得出來的識別碼（去掉 0/O/1/I 等易混字元） */
function fr_randomId(len = 8) {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = '';
  const buf = new Uint8Array(len);
  (window.crypto || window.msCrypto).getRandomValues(buf);
  for (let i = 0; i < len; i++) out += alphabet[buf[i] % alphabet.length];
  return out;
}

/* ══════════════════ 資料層（換連線版只要改這裡） ══════════════════ */
const FriendStore = {
  /* 我自己的身分：識別碼、暱稱、最佳成績快照 */
  async getMe() {
    const s = loadSave();
    if (!s.me || !s.me.code) {
      s.me = {
        code: fr_randomId(8),
        name: (s.me && s.me.name) || '',
        best: 0, mode: 'classic', diff: 'normal',
        updatedAt: Date.now()
      };
      writeSave(s);
    }
    return s.me;
  },

  async setMe(patch) {
    const s = loadSave();
    s.me = Object.assign({}, s.me, patch, { updatedAt: Date.now() });
    writeSave(s);
    return s.me;
  },

  async list() {
    const s = loadSave();
    return (s.friends || []).slice();
  },

  async get(code) {
    const all = await FriendStore.list();
    return all.find(f => f.code === code) || null;
  },

  async add(friend) {
    const s = loadSave();
    s.friends = s.friends || [];
    if (s.friends.some(f => f.code === friend.code)) return { ok: false, reason: 'duplicate' };
    if (s.friends.length >= MAX_FRIENDS) return { ok: false, reason: 'full' };
    s.friends.push(friend);
    writeSave(s);
    return { ok: true, friend };
  },

  async update(code, patch) {
    const s = loadSave();
    s.friends = s.friends || [];
    const i = s.friends.findIndex(f => f.code === code);
    if (i < 0) return null;
    s.friends[i] = Object.assign({}, s.friends[i], patch);
    writeSave(s);
    return s.friends[i];
  },

  async remove(code) {
    const s = loadSave();
    s.friends = (s.friends || []).filter(f => f.code !== code);
    writeSave(s);
    return true;
  }
};

/* ══════════════════ 好友碼 ══════════════════ */

/* 把「我是誰 + 我目前多強」打包成一組可分享的字串 */
async function buildMyFriendCode() {
  const me = await FriendStore.getMe();
  const s = loadSave();
  const st = (typeof ensureStats === 'function') ? ensureStats(s) : (s.stats || {});
  const payload = {
    v: 1,
    c: me.code,
    n: me.name || fr_t('fr-anon', '無名玩家'),
    s: Math.round(st.bestScore || 0),
    m: me.mode || 'classic',
    d: me.diff || 'normal'
  };
  return FRIEND_CODE_PREFIX + fr_b64Encode(JSON.stringify(payload));
}

function parseFriendCode(raw) {
  if (!raw) return null;
  // 使用者常常會把整段分享訊息貼上來，所以從中把好友碼撈出來就好
  const m = String(raw).match(new RegExp(FRIEND_CODE_PREFIX + '[A-Za-z0-9+/=]+'));
  if (!m) return null;
  try {
    const json = fr_b64Decode(m[0].slice(FRIEND_CODE_PREFIX.length));
    const p = JSON.parse(json);
    if (!p || p.v !== 1 || !p.c) return null;
    return p;
  } catch (e) {
    return null;
  }
}

/* ══════════════════ 好友名單操作 ══════════════════ */

async function addFriendFromInput() {
  if (typeof ensureAudio === 'function') ensureAudio();
  if (typeof playSfx === 'function') playSfx('click');

  const input = document.getElementById('friend-add-input');
  const raw = (input?.value || '').trim();
  if (!raw) {
    showToast(fr_t('fr-need-code', '請先貼上好友碼'), 'var(--yellow)');
    return;
  }

  const p = parseFriendCode(raw);
  if (!p) {
    showToast(fr_t('fr-bad-code', '好友碼看起來不正確，請重新確認'), 'var(--red)');
    return;
  }

  const me = await FriendStore.getMe();
  if (p.c === me.code) {
    showToast(fr_t('fr-self', '這是你自己的好友碼喔'), 'var(--yellow)');
    return;
  }

  const existing = await FriendStore.get(p.c);
  if (existing) {
    // 已經是好友：把對方的成績更新成比較新的那份
    await FriendStore.update(p.c, {
      name: p.n || existing.name,
      best: Math.max(existing.best || 0, p.s || 0),
      mode: p.m || existing.mode,
      diff: p.d || existing.diff
    });
    if (input) input.value = '';
    renderFriends();
    showToast(fr_t('fr-updated', '已更新好友的最新成績'), 'var(--blue2)');
    return;
  }

  const res = await FriendStore.add({
    code: p.c,
    name: p.n || fr_t('fr-anon', '無名玩家'),
    best: p.s || 0,
    mode: p.m || 'classic',
    diff: p.d || 'normal',
    wins: 0, losses: 0,
    addedAt: Date.now(),
    lastAt: null
  });

  if (!res.ok) {
    const msg = res.reason === 'full'
      ? fr_t('fr-full', '好友名單已滿，請先移除一些好友')
      : fr_t('fr-dup', '這位好友已經在名單裡了');
    showToast(msg, 'var(--yellow)');
    return;
  }

  if (input) input.value = '';
  renderFriends();
  if (typeof playSfx === 'function') playSfx('coin');
  showToast(`🤝 ${fr_t('fr-added', '已加入好友：')}${res.friend.name}`, 'var(--green)');
  if (typeof checkAchievements === 'function') checkAchievements();
}

async function removeFriend(code) {
  const f = await FriendStore.get(code);
  if (!f) return;
  const msg = fr_t('fr-confirm-del', '確定要移除好友「') + f.name + fr_t('fr-confirm-del2', '」嗎？');
  if (!confirm(msg)) return;
  await FriendStore.remove(code);
  if (typeof playSfx === 'function') playSfx('click');
  renderFriends();
  showToast(fr_t('fr-removed', '已移除好友'), 'var(--dim)');
}

/* 從好友清單直接發起挑戰：帶著對方的分數當作目標 */
async function challengeFriend(code) {
  const f = await FriendStore.get(code);
  if (!f) return;
  if (typeof ensureAudio === 'function') ensureAudio();
  if (typeof playSfx === 'function') playSfx('click');

  // 把好友的成績包成一場「待挑戰」，遊戲結束後 onGameEnd 會自動結算
  if (typeof window.setActiveChallenge === 'function') {
    window.setActiveChallenge({
      v: 1, n: f.name, s: f.best || 0,
      m: f.mode || 'classic', d: f.diff || 'normal',
      fc: f.code, t: Date.now()
    });
  }

  closeFriendsScreen();
  showToast(`🎯 ${fr_t('fr-chal-start', '目標：超越')}${f.name} ${f.best || 0}${fr_t('score-unit', '分')}`, 'var(--gold)');
  if (typeof goTo === 'function') goTo('scr-chars');
}

/* ══════════════════ 對戰戰績 ══════════════════ */

/* 由 onGameEnd 呼叫：把一場挑戰的勝負記到對應好友身上 */
async function recordFriendMatch(challenge, won) {
  if (!challenge) return;
  let f = null;
  if (challenge.fc) f = await FriendStore.get(challenge.fc);
  if (!f) {
    // 舊版挑戰碼沒有好友碼，退而求其次用暱稱比對
    const all = await FriendStore.list();
    f = all.find(x => x.name === challenge.n) || null;
  }
  if (!f) return;

  await FriendStore.update(f.code, {
    wins: (f.wins || 0) + (won ? 1 : 0),
    losses: (f.losses || 0) + (won ? 0 : 1),
    lastAt: Date.now()
  });
}

/* 每場遊戲結束後更新自己的成績快照，好友碼分享出去才是最新的 */
async function refreshMyFriendProfile(info) {
  if (!info) return;
  const me = await FriendStore.getMe();
  const s = loadSave();
  const st = (typeof ensureStats === 'function') ? ensureStats(s) : (s.stats || {});
  if ((info.score || 0) >= (st.bestScore || 0)) {
    await FriendStore.setMe({ mode: info.mode || me.mode, diff: info.diff || me.diff });
  }
}

/* ══════════════════ 排行榜 ══════════════════ */

async function buildFriendBoard() {
  const me = await FriendStore.getMe();
  const s = loadSave();
  const st = (typeof ensureStats === 'function') ? ensureStats(s) : (s.stats || {});
  const friends = await FriendStore.list();

  const rows = friends.map(f => ({
    code: f.code, name: f.name, best: f.best || 0, isMe: false
  }));
  rows.push({
    code: me.code,
    name: me.name || fr_t('fr-me', '我'),
    best: Math.round(st.bestScore || 0),
    isMe: true
  });

  rows.sort((a, b) => b.best - a.best);
  return rows;
}

/* ══════════════════ UI ══════════════════ */

function openFriendsScreen() {
  if (typeof ensureAudio === 'function') ensureAudio();
  if (typeof playSfx === 'function') playSfx('click');
  switchFriendTab('list');
  document.getElementById('ov-friends')?.classList.add('on');
}

function closeFriendsScreen() {
  if (typeof playSfx === 'function') playSfx('click');
  document.getElementById('ov-friends')?.classList.remove('on');
}

function switchFriendTab(tab, el) {
  if (typeof playSfx === 'function' && el) playSfx('click');
  document.querySelectorAll('#friend-tabs .diff-tab').forEach(x => x.classList.remove('active'));
  if (el) el.classList.add('active');
  else document.querySelector('#friend-tabs .diff-tab')?.classList.add('active');

  const panels = { list: 'friend-list-panel', board: 'friend-board-panel', code: 'friend-code-panel' };
  Object.keys(panels).forEach(k => {
    const p = document.getElementById(panels[k]);
    if (p) p.style.display = (k === tab) ? 'block' : 'none';
  });

  if (tab === 'list') renderFriends();
  if (tab === 'board') renderFriendBoard();
  if (tab === 'code') renderMyFriendCode();
}

function fr_initial(name) {
  const n = (name || '?').trim();
  return n ? n.charAt(0).toUpperCase() : '?';
}

function fr_escape(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

async function renderFriends() {
  const box = document.getElementById('friend-list');
  if (!box) return;
  const friends = await FriendStore.list();

  if (!friends.length) {
    box.innerHTML = `<div class="friend-empty">
      ${fr_t('fr-empty1', '還沒有好友。')}<br>
      ${fr_t('fr-empty2', '把你的好友碼分享給朋友，或貼上對方的好友碼來新增。')}
    </div>`;
    return;
  }

  friends.sort((a, b) => (b.best || 0) - (a.best || 0));

  box.innerHTML = friends.map(f => {
    const w = f.wins || 0, l = f.losses || 0;
    const record = (w + l) > 0
      ? `${fr_t('fr-record', '對戰')} ${w}${fr_t('fr-win-unit', '勝')} ${l}${fr_t('fr-lose-unit', '敗')}`
      : fr_t('fr-no-match', '尚無對戰紀錄');
    return `
      <div class="friend-item">
        <div class="friend-avatar">${fr_escape(fr_initial(f.name))}</div>
        <div class="friend-main">
          <div class="friend-name">${fr_escape(f.name)}</div>
          <div class="friend-sub">${fr_t('fr-best', '最佳')} ${f.best || 0}${fr_t('score-unit', '分')} · ${record}</div>
        </div>
        <div class="friend-actions">
          <button class="friend-mini-btn" onclick="challengeFriend('${fr_escape(f.code)}')">${fr_t('fr-btn-chal', '挑戰')}</button>
          <button class="friend-mini-btn danger" onclick="removeFriend('${fr_escape(f.code)}')">${fr_t('fr-btn-del', '移除')}</button>
        </div>
      </div>`;
  }).join('');
}

async function renderFriendBoard() {
  const box = document.getElementById('friend-board');
  if (!box) return;
  const rows = await buildFriendBoard();

  if (rows.length <= 1) {
    box.innerHTML = `<div class="friend-empty">
      ${fr_t('fr-board-empty', '加入好友之後，這裡就會顯示你和好友的排名。')}
    </div>`;
    return;
  }

  const medal = ['🥇', '🥈', '🥉'];
  box.innerHTML = rows.map((r, i) => `
    <div class="friend-item ${r.isMe ? 'is-me' : ''}">
      <div class="friend-rank">${medal[i] || (i + 1)}</div>
      <div class="friend-avatar">${fr_escape(fr_initial(r.name))}</div>
      <div class="friend-main">
        <div class="friend-name">${fr_escape(r.name)}${r.isMe ? ' <span style="color:var(--blue2);font-size:.8em;">(' + fr_t('fr-me', '我') + ')</span>' : ''}</div>
        <div class="friend-sub">${fr_t('fr-best', '最佳')} ${r.best}${fr_t('score-unit', '分')}</div>
      </div>
    </div>`).join('');
}

async function renderMyFriendCode() {
  const me = await FriendStore.getMe();

  const nameInput = document.getElementById('friend-my-name');
  if (nameInput && document.activeElement !== nameInput) nameInput.value = me.name || '';

  const out = document.getElementById('friend-my-code');
  if (out) out.value = await buildMyFriendCode();
}

async function saveMyFriendName() {
  const nameInput = document.getElementById('friend-my-name');
  const name = (nameInput?.value || '').trim().slice(0, 12);
  await FriendStore.setMe({ name });
  await renderMyFriendCode();
}

async function copyMyFriendCode() {
  if (typeof playSfx === 'function') playSfx('click');
  const code = await buildMyFriendCode();
  const me = await FriendStore.getMe();
  const text = `${me.name || fr_t('fr-anon', '無名玩家')} ${fr_t('fr-share-msg', '邀請你加入《要拚要猛》好友！我的好友碼：')}\n${code}`;

  const done = () => showToast(fr_t('fr-copied', '好友碼已複製，貼給朋友吧！'), 'var(--green)');
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(() => fr_fallbackCopy(text, done));
  } else {
    fr_fallbackCopy(text, done);
  }
}

function fr_fallbackCopy(text, done) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;top:-1000px;left:-1000px;';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); done(); }
  catch (e) { showToast(fr_t('fr-copy-fail', '複製失敗，請手動選取複製'), 'var(--red)'); }
  ta.remove();
}

/* 開站時先確保自己有一組識別碼，之後分享才不會臨時產生 */
window.addEventListener('DOMContentLoaded', () => {
  if (typeof loadSave === 'function') {
    FriendStore.getMe().catch(() => {});
  }
});

window.openFriendsScreen = openFriendsScreen;
window.recordFriendMatch = recordFriendMatch;
window.refreshMyFriendProfile = refreshMyFriendProfile;
