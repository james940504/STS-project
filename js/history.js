/* ══════════════════════════════════════════════════════════════
   歷史紀錄（Training History）

   把每一次遊玩的完整訓練資料依時間序保存下來。
   跟右上角的「排行榜」不同：排行榜只留分數前 20 名，
   這裡是完整的個人訓練歷程，之後要拿來做長期趨勢分析。

   ── 之後要接資料庫時 ──
   所有讀寫都集中在 HistoryStore，只要換掉裡面的實作
   （改成打 API / Firebase），上層的 UI 與統計都不用動。
   函式已全部寫成 async，換成網路請求時不需要改呼叫端。

   每筆紀錄還帶著 synced 旗標與 clientId，
   之後做離線補傳（把 synced=false 的批次送出）時會用到。
   ══════════════════════════════════════════════════════════════ */

const HISTORY_KEY = 'sts_history_v1';
const HISTORY_MAX = 500;          // 本機先留 500 筆，接資料庫後可放寬

/* ── 小工具 ── */
function hi_t(key, fallback) {
  if (typeof window.t === 'function') return window.t(key, fallback);
  return fallback || key;
}

function hi_escape(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function hi_uuid() {
  const buf = new Uint8Array(16);
  (window.crypto || window.msCrypto).getRandomValues(buf);
  return Array.from(buf, b => b.toString(16).padStart(2, '0')).join('');
}

function hi_num(v, digits = 0) {
  const n = Number(v);
  if (!isFinite(n)) return 0;
  return digits ? Number(n.toFixed(digits)) : Math.round(n);
}

/* ══════════════════ 資料層（換資料庫只要改這裡） ══════════════════ */
const HistoryStore = {
  async list() {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  },

  async add(entry) {
    const all = await HistoryStore.list();
    all.unshift(entry);                       // 最新的放最前面
    const trimmed = all.slice(0, HISTORY_MAX);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
    return entry;
  },

  async remove(id) {
    const all = await HistoryStore.list();
    localStorage.setItem(HISTORY_KEY, JSON.stringify(all.filter(e => e.id !== id)));
    return true;
  },

  async clear() {
    localStorage.removeItem(HISTORY_KEY);
    return true;
  },

  /* 之後接後端時，把這裡換成真的上傳，並在成功後標記 synced */
  async pushUnsynced() {
    const all = await HistoryStore.list();
    const pending = all.filter(e => !e.synced);
    if (!pending.length) return { ok: true, sent: 0 };
    // TODO(後端)：POST /api/history 帶 pending，成功後把對應紀錄的 synced 設為 true
    return { ok: false, sent: 0, pending: pending.length, reason: 'no-backend' };
  }
};

/* ══════════════════ 寫入一筆紀錄 ══════════════════ */

/* 由 onGameEnd 呼叫。info 來自遊戲結束時的結算資料，
   其餘姿勢分數直接讀遊戲的全域變數（沒有就記 null，不要亂編）。 */
async function recordGameHistory(info) {
  if (!info) return null;

  const g = (name) => (typeof window[name] !== 'undefined' ? window[name] : undefined);
  const safe = (v) => (typeof v === 'number' && isFinite(v)) ? hi_num(v) : null;

  const entry = {
    id: hi_uuid(),
    clientId: (typeof loadSave === 'function' && loadSave().me && loadSave().me.code) || null,
    at: Date.now(),
    dateStr: new Date().toLocaleString('zh-TW', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit'
    }),

    // 基本成績
    mode: info.mode || null,
    diff: info.diff || null,
    result: info.result || null,
    score: hi_num(info.score),
    reps: hi_num(info.repsCount ?? info.reps),
    seconds: hi_num(info.elapsed, 1),

    // 姿勢分數（0-100，抓不到就留 null）
    posture: {
      total: safe(g('posture') && window.posture.total),
      trunk: safe(g('trunkScore')),
      heel:  safe(g('heelScore')),
      knee:  safe(g('kneeScore'))
    },

    // 原始角度量測，之後做趨勢分析用
    metrics: {
      trunkMaxDeg:  safe(g('trunkMax')),
      heelMaxDeg:   safe(g('heelMaxCal')),
      kneeValgusMin: (typeof g('kneeValgusMinCal') === 'number' && isFinite(window.kneeValgusMinCal))
        ? hi_num(window.kneeValgusMinCal, 3) : null
    },

    synced: false,          // 之後補傳資料庫用
    schema: 1               // 欄位版本，方便日後遷移
  };

  await HistoryStore.add(entry);
  return entry;
}

/* ══════════════════ 統計 ══════════════════ */

async function buildHistoryStats() {
  const all = await HistoryStore.list();
  if (!all.length) {
    return { count: 0, totalReps: 0, totalMinutes: 0, bestScore: 0, avgScore: 0, avgPosture: null };
  }
  const sum = (fn) => all.reduce((s, e) => s + (fn(e) || 0), 0);
  const postureVals = all.map(e => e.posture && e.posture.total).filter(v => typeof v === 'number');

  return {
    count: all.length,
    totalReps: sum(e => e.reps),
    totalMinutes: Math.round(sum(e => e.seconds) / 60),
    bestScore: Math.max(...all.map(e => e.score || 0)),
    avgScore: Math.round(sum(e => e.score) / all.length),
    avgPosture: postureVals.length
      ? Math.round(postureVals.reduce((a, b) => a + b, 0) / postureVals.length)
      : null
  };
}

/* ══════════════════ UI ══════════════════ */

let historyFilter = 'all';

function openHistoryScreen() {
  if (typeof ensureAudio === 'function') ensureAudio();
  if (typeof playSfx === 'function') playSfx('click');
  historyFilter = 'all';
  document.querySelectorAll('#history-tabs .diff-tab').forEach((x, i) => {
    x.classList.toggle('active', i === 0);
  });
  renderHistory();
  document.getElementById('ov-history')?.classList.add('on');
}

function closeHistoryScreen() {
  if (typeof playSfx === 'function') playSfx('click');
  document.getElementById('ov-history')?.classList.remove('on');
}

function switchHistoryFilter(mode, el) {
  if (typeof playSfx === 'function' && el) playSfx('click');
  historyFilter = mode;
  document.querySelectorAll('#history-tabs .diff-tab').forEach(x => x.classList.remove('active'));
  if (el) el.classList.add('active');
  renderHistory();
}

function hi_modeName(m) {
  if (typeof MODES !== 'undefined' && MODES[m] && typeof getText === 'function') {
    const n = getText(MODES[m].nameKey);
    if (n && n !== MODES[m].nameKey) return n;
  }
  return m || '—';
}

function hi_diffName(d) {
  if (typeof DIFFS !== 'undefined' && DIFFS[d] && typeof getText === 'function') {
    const n = getText(DIFFS[d].nameKey);
    if (n && n !== DIFFS[d].nameKey) return n;
  }
  return d || '—';
}

async function renderHistory() {
  const listBox = document.getElementById('history-list');
  const statBox = document.getElementById('history-stats');
  if (!listBox) return;

  const all = await HistoryStore.list();
  const rows = historyFilter === 'all' ? all : all.filter(e => e.mode === historyFilter);

  // 上方統計條
  if (statBox) {
    const s = await buildHistoryStats();
    statBox.innerHTML = s.count === 0 ? '' : `
      <div class="hist-stat"><div class="hist-stat-v">${s.count}</div><div class="hist-stat-l">總場次</div></div>
      <div class="hist-stat"><div class="hist-stat-v">${s.totalReps}</div><div class="hist-stat-l">總次數</div></div>
      <div class="hist-stat"><div class="hist-stat-v">${s.totalMinutes}</div><div class="hist-stat-l">總分鐘</div></div>
      <div class="hist-stat"><div class="hist-stat-v">${s.bestScore}</div><div class="hist-stat-l">最高分</div></div>
      <div class="hist-stat"><div class="hist-stat-v">${s.avgPosture ?? '—'}</div><div class="hist-stat-l">平均姿勢</div></div>
    `;
  }

  if (!rows.length) {
    listBox.innerHTML = `<div class="friend-empty">
      ${all.length === 0
        ? '還沒有訓練紀錄。<br>完成一場遊戲之後，成績就會自動記在這裡。'
        : '這個模式還沒有紀錄。'}
    </div>`;
    return;
  }

  listBox.innerHTML = rows.map(e => {
    const p = e.posture || {};
    const parts = [];
    if (p.trunk != null) parts.push(`軀幹 ${p.trunk}`);
    if (p.heel  != null) parts.push(`腳跟 ${p.heel}`);
    if (p.knee  != null) parts.push(`膝部 ${p.knee}`);
    const postureLine = parts.length ? parts.join('　') : '無姿勢資料';
    const mins = Math.floor((e.seconds || 0) / 60);
    const secs = Math.round((e.seconds || 0) % 60);

    return `
      <div class="hist-item">
        <div class="hist-head">
          <span class="hist-mode">${hi_escape(hi_modeName(e.mode))}</span>
          <span class="hist-diff">${hi_escape(hi_diffName(e.diff))}</span>
          <span class="hist-date">${hi_escape(e.dateStr || '')}</span>
        </div>
        <div class="hist-body">
          <div class="hist-metric"><b>${e.score ?? 0}</b><span>分數</span></div>
          <div class="hist-metric"><b>${e.reps ?? 0}</b><span>次數</span></div>
          <div class="hist-metric"><b>${mins}:${String(secs).padStart(2,'0')}</b><span>時長</span></div>
          <div class="hist-metric"><b>${p.total ?? '—'}</b><span>姿勢</span></div>
        </div>
        <div class="hist-posture">${hi_escape(postureLine)}</div>
      </div>`;
  }).join('');
}

async function exportHistoryCSV() {
  if (typeof playSfx === 'function') playSfx('click');
  const all = await HistoryStore.list();
  if (!all.length) {
    showToast('沒有可匯出的紀錄', 'var(--yellow)');
    return;
  }
  const head = ['時間','模式','難度','結果','分數','次數','秒數','姿勢總分','軀幹','腳跟','膝部','軀幹最大角','腳跟最大角'];
  const lines = all.map(e => {
    const p = e.posture || {}, m = e.metrics || {};
    return [e.dateStr, e.mode, e.diff, e.result, e.score, e.reps, e.seconds,
            p.total ?? '', p.trunk ?? '', p.heel ?? '', p.knee ?? '',
            m.trunkMaxDeg ?? '', m.heelMaxDeg ?? '']
      .map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',');
  });
  // 加 BOM，Excel 開啟中文才不會變亂碼
  const blob = new Blob(['﻿' + [head.join(','), ...lines].join('\n')],
                        { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sts_history_${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  showToast('已匯出 CSV', 'var(--green)');
}

async function clearHistory() {
  const all = await HistoryStore.list();
  if (!all.length) {
    showToast('目前沒有紀錄', 'var(--dim)');
    return;
  }
  if (!confirm(`確定要清除全部 ${all.length} 筆訓練紀錄嗎？此動作無法復原。`)) return;
  await HistoryStore.clear();
  if (typeof playSfx === 'function') playSfx('click');
  renderHistory();
  showToast('已清除訓練紀錄', 'var(--dim)');
}

window.openHistoryScreen = openHistoryScreen;
window.recordGameHistory = recordGameHistory;
window.HistoryStore = HistoryStore;
window.buildHistoryStats = buildHistoryStats;
