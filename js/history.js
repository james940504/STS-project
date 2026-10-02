/* ══════════════════════════════════════════════════════════════
   歷史紀錄（Training History）

   每個帳號各自一份完整的訓練歷程，存在資料庫（training_sessions 表），
   換電腦、換瀏覽器登入同一個帳號都看得到。

   資料流程：
   1. 遊戲結束 → onGameEnd() → recordGameHistory()：先寫進本機快取（依帳號分開），
      再背景同步到 /api/history。沒網路或伺服器沒開也不會丟，下次開畫面會補傳。
   2. 若這場有錄影分析，Heavy 分析完成後，後端會用同一個 history_client_id
      把「正式分數＋AI 評語＋報告」掛到同一筆紀錄上（見 server.py）。
   3. 開歷史畫面 → HistoryStore.list() 從資料庫讀回，並合併尚未同步的本機紀錄。

   所有讀寫都集中在 HistoryStore，UI 與統計不直接碰 localStorage 或 fetch。
   ══════════════════════════════════════════════════════════════ */

const HISTORY_KEY_PREFIX = 'sts_history_v2';
const HISTORY_MAX = 500;          // 本機快取最多保留幾筆

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

function hi_dateStr(at) {
  return new Date(at).toLocaleString('zh-TW', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  });
}

/* 等登入資料載入完（index.html 的 playerReady），才知道要讀哪個帳號的紀錄 */
async function hi_userId() {
  try { if (window.playerReady) await window.playerReady; } catch (e) { /* ignore */ }
  return (window.currentPlayer && window.currentPlayer.id != null) ? window.currentPlayer.id : null;
}

async function hi_api(method, path, body) {
  try {
    const res = await fetch(path, {
      method,
      credentials: 'same-origin',
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined
    });
    let data = null;
    try { data = await res.json(); } catch (e) { /* 非 JSON */ }
    return { ok: res.ok && !!(data && data.success), status: res.status, data };
  } catch (e) {
    return { ok: false, status: 0, data: null };   // 伺服器沒開 / 沒網路
  }
}

/* ══════════════════ 資料層 ══════════════════ */
const HistoryStore = {
  /* 本機快取：依帳號分開存，同一台電腦換帳號不會看到別人的紀錄 */
  async _key() {
    const uid = await hi_userId();
    return `${HISTORY_KEY_PREFIX}:${uid == null ? 'guest' : uid}`;
  },

  async _readLocal() {
    try {
      const raw = localStorage.getItem(await HistoryStore._key());
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  },

  async _writeLocal(arr) {
    try {
      localStorage.setItem(await HistoryStore._key(), JSON.stringify(arr.slice(0, HISTORY_MAX)));
    } catch (e) { /* 儲存空間滿了就算了，資料庫才是正本 */ }
  },

  /* 讀取：以資料庫為準，再補上還沒同步成功的本機紀錄；伺服器連不上就只用本機快取 */
  async list() {
    const local = await HistoryStore._readLocal();
    const uid = await hi_userId();
    if (uid == null) return local;

    const r = await hi_api('GET', '/api/history?limit=500');
    if (!r.ok || !Array.isArray(r.data.entries)) return local;

    const server = r.data.entries.map(e => ({ ...e, dateStr: hi_dateStr(e.at) }));
    const serverIds = new Set(server.map(e => e.id));
    const pending = local.filter(e => !e.synced && !serverIds.has(e.id));
    const merged = [...pending, ...server].sort((a, b) => (b.at || 0) - (a.at || 0));
    await HistoryStore._writeLocal(merged);
    if (pending.length) HistoryStore.pushUnsynced();   // 順手補傳
    return merged;
  },

  async add(entry) {
    const local = await HistoryStore._readLocal();
    local.unshift(entry);                       // 最新的放最前面
    await HistoryStore._writeLocal(local);
    HistoryStore.pushUnsynced();                // 背景同步，不擋遊戲結算
    return entry;
  },

  async remove(id) {
    const local = await HistoryStore._readLocal();
    await HistoryStore._writeLocal(local.filter(e => e.id !== id));
    if ((await hi_userId()) != null) await hi_api('DELETE', `/api/history/${encodeURIComponent(id)}`);
    return true;
  },

  async clear() {
    await HistoryStore._writeLocal([]);
    if ((await hi_userId()) != null) await hi_api('DELETE', '/api/history');
    return true;
  },

  /* 把還沒同步的本機紀錄送到資料庫，成功後標記 synced */
  async pushUnsynced() {
    if ((await hi_userId()) == null) return { ok: false, sent: 0, reason: 'not-logged-in' };
    const local = await HistoryStore._readLocal();
    const pending = local.filter(e => !e.synced);
    if (!pending.length) return { ok: true, sent: 0 };

    const r = await hi_api('POST', '/api/history', { entries: pending.slice(0, 200) });
    if (!r.ok) return { ok: false, sent: 0, pending: pending.length, reason: 'server' };

    const done = new Set(r.data.saved_ids || []);
    const latest = await HistoryStore._readLocal();      // 重讀，避免蓋掉同步期間新增的紀錄
    latest.forEach(e => { if (done.has(e.id)) e.synced = true; });
    await HistoryStore._writeLocal(latest);
    return { ok: true, sent: done.size };
  }
};

/* ══════════════════ 寫入一筆紀錄 ══════════════════ */

/* 由 onGameEnd 呼叫。info 來自遊戲結束時的結算資料；
   姿勢分數用遊戲整場累積的陣列算平均，抓不到就記 null，不要亂編。 */
async function recordGameHistory(info) {
  if (!info) return null;

  const id = hi_uuid();
  window.lastHistoryClientId = id;   // 同步設定：稍後上傳錄影分析時，後端靠它對回這一筆（必須在第一個 await 之前）

  // app.js 的變數是 let 宣告，不在 window 上，所以用函式直接讀；沒有就是 undefined
  const read = (fn) => { try { return fn(); } catch (e) { return undefined; } };
  const avg = (arr) => (Array.isArray(arr) && arr.length)
    ? arr.reduce((a, b) => a + (Number(b) || 0), 0) / arr.length : null;
  const score = hi_num(info.score);
  const reps = hi_num(info.repsCount ?? info.reps);
  const trunk = avg(read(() => trunkScoresArray));
  const heel = avg(read(() => heelScoresArray));
  const knee = avg(read(() => kneeScoresArray));
  const at = Date.now();

  const entry = {
    id,
    at,
    dateStr: hi_dateStr(at),

    // 基本成績
    mode: info.mode || null,
    diff: info.diff || null,
    result: info.result || null,
    score,
    reps,
    seconds: hi_num(info.elapsed, 1),

    // 姿勢分數（0-100）：整場每一下的平均。總分用「分數 ÷ 次數」＝每一下的平均姿勢分
    posture: {
      total: reps > 0 ? Math.max(0, Math.min(100, Math.round(score / reps))) : null,
      trunk: trunk == null ? null : Math.round(trunk),
      heel:  heel  == null ? null : Math.round(heel),
      knee:  knee  == null ? null : Math.round(knee)
    },

    metrics: {},            // 角度類指標由 Heavy 分析提供（見 entry.heavy）
    sessionId: null,        // Heavy 分析完成後由後端補上
    heavy: null,

    synced: false,
    schema: 2
  };

  await HistoryStore.add(entry);
  return entry;
}

/* ══════════════════ 統計 ══════════════════ */

async function buildHistoryStats(all) {
  all = all || await HistoryStore.list();
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
let historyView = 'list';   // 'list' | 'trends'

function openHistoryScreen() {
  if (typeof ensureAudio === 'function') ensureAudio();
  if (typeof playSfx === 'function') playSfx('click');
  historyFilter = 'all';
  historyView = 'list';
  document.querySelectorAll('#history-tabs .diff-tab').forEach((x, i) => {
    x.classList.toggle('active', i === 0);
  });
  document.querySelectorAll('#history-views .diff-tab').forEach((x, i) => {
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

function switchHistoryView(view, el) {
  if (typeof playSfx === 'function' && el) playSfx('click');
  historyView = view === 'trends' ? 'trends' : 'list';
  document.querySelectorAll('#history-views .diff-tab').forEach(x => x.classList.remove('active'));
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

function hi_deg(v) {
  return (typeof v === 'number' && isFinite(v)) ? `${v.toFixed(1)}°` : '—';
}

async function renderHistory() {
  const listBox = document.getElementById('history-list');
  const statBox = document.getElementById('history-stats');
  if (!listBox) return;

  const all = await HistoryStore.list();
  const rows = historyFilter === 'all' ? all : all.filter(e => e.mode === historyFilter);

  // 上方統計條（跟著目前篩選的模式走）
  if (statBox) {
    const s = await buildHistoryStats(rows);
    statBox.innerHTML = s.count === 0 ? '' : `
      <div class="hist-stat"><div class="hist-stat-v">${s.count}</div><div class="hist-stat-l">總場次</div></div>
      <div class="hist-stat"><div class="hist-stat-v">${s.totalReps}</div><div class="hist-stat-l">總次數</div></div>
      <div class="hist-stat"><div class="hist-stat-v">${s.totalMinutes}</div><div class="hist-stat-l">總分鐘</div></div>
      <div class="hist-stat"><div class="hist-stat-v">${s.bestScore}</div><div class="hist-stat-l">最高分</div></div>
      <div class="hist-stat"><div class="hist-stat-v">${s.avgPosture ?? '—'}</div><div class="hist-stat-l">平均姿勢</div></div>
    `;
  }

  // 趨勢檢視：有資料就畫圖表，列表隱藏
  const trendBox = document.getElementById('history-trends');
  const showTrends = historyView === 'trends' && rows.length > 0 &&
    trendBox && typeof window.renderHistoryTrends === 'function';
  if (trendBox) trendBox.style.display = showTrends ? '' : 'none';
  listBox.style.display = showTrends ? 'none' : 'flex';
  if (showTrends) {
    try { window.renderHistoryTrends(trendBox, rows, historyFilter); }
    catch (e) { console.warn('[History] trends render failed', e); trendBox.style.display = 'none'; listBox.style.display = 'flex'; }
    if (!trendBox.style.display) return;
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

    // Heavy 分析（有錄影分析的場次才有）：正式角度、報告連結、AI 評語
    let heavyHtml = '';
    const hv = e.heavy;
    if (hv) {
      const sid = e.sessionId;
      const pdf = sid ? `records/${encodeURIComponent(sid)}/report_heavy_${encodeURIComponent(sid)}.pdf` : '';
      const adv = hv.advice || {};
      heavyHtml = `
        <div class="hist-posture">Heavy 分析${hv.estimated ? '（由 CSV 估算，與報告 PDF 可能有些微差異）' : ''}：平均最大軀幹前傾 ${hi_deg(hv.avg_max_trunk_deg)}　平均最大腳跟角度 ${hi_deg(hv.avg_max_heel_deg)}${
          typeof hv.overall_score === 'number' ? `　姿勢總分 ${Math.round(hv.overall_score)}` : ''}</div>
        ${adv.analysis ? `<details class="hist-posture"><summary style="cursor:pointer;">AI 姿勢評語${adv.source === 'openai' ? '' : '（本機規則）'}</summary>
          <div style="margin-top:6px; line-height:1.6;">${hi_escape(adv.analysis)}${adv.tip ? `<br><b>建議：</b>${hi_escape(adv.tip)}` : ''}</div></details>` : ''}
        ${pdf ? `<div class="hist-posture"><a href="${pdf}" target="_blank" rel="noopener" style="color:var(--blue2);">📄 開啟分析報告（PDF）</a></div>` : ''}`;
    }

    return `
      <div class="hist-item">
        <div class="hist-head">
          <span class="hist-mode">${hi_escape(hi_modeName(e.mode))}</span>
          <span class="hist-diff">${hi_escape(hi_diffName(e.diff))}</span>
          <span class="hist-date">${hi_escape(e.dateStr || hi_dateStr(e.at))}</span>
        </div>
        <div class="hist-body">
          <div class="hist-metric"><b>${e.score ?? 0}</b><span>分數</span></div>
          <div class="hist-metric"><b>${e.reps ?? 0}</b><span>次數</span></div>
          <div class="hist-metric"><b>${mins}:${String(secs).padStart(2,'0')}</b><span>時長</span></div>
          <div class="hist-metric"><b>${p.total ?? '—'}</b><span>姿勢</span></div>
        </div>
        <div class="hist-posture">${hi_escape(postureLine)}</div>
        ${heavyHtml}
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
  const head = ['時間','模式','難度','結果','分數','次數','秒數','姿勢總分','軀幹','腳跟','膝部','Heavy平均最大軀幹角','Heavy平均最大腳跟角','Heavy姿勢總分'];
  const lines = all.map(e => {
    const p = e.posture || {}, h = e.heavy || {};
    return [e.dateStr || hi_dateStr(e.at), e.mode, e.diff, e.result, e.score, e.reps, e.seconds,
            p.total ?? '', p.trunk ?? '', p.heel ?? '', p.knee ?? '',
            h.avg_max_trunk_deg ?? '', h.avg_max_heel_deg ?? '', h.overall_score ?? '']
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
window.closeHistoryScreen = closeHistoryScreen;
window.switchHistoryFilter = switchHistoryFilter;
window.switchHistoryView = switchHistoryView;
window.exportHistoryCSV = exportHistoryCSV;
window.clearHistory = clearHistory;
window.recordGameHistory = recordGameHistory;
window.HistoryStore = HistoryStore;
window.buildHistoryStats = buildHistoryStats;
