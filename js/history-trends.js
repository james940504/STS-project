/* ══════════════════════════════════════════════════════════════
   訓練趨勢圖（Training Trends）

   掛在歷史紀錄畫面的「📈 趨勢」分頁，由 history.js 的 renderHistory() 呼叫：
     renderHistoryTrends(容器, 目前篩選後的紀錄, 目前篩選的模式)

   內容：
   1. 「最近一場 vs 之前」對照卡：最近一場跟「前面最多 5 場」的平均比。
   2. 趨勢折線圖：姿勢分數、軀幹前傾、腳跟角度、單次動作時間（限時模式另有完成次數）。
      每張圖只畫一個指標、各自一條 Y 軸（不做雙軸）；有足夠場次時加一條「近 3 場平均」。
   3. 表格檢視：圖上每個數字都能在表格裡找到（不靠 hover 才看得到）。

   數字的意義：
   - 姿勢分數 = 每一下的平均姿勢分（前端即時算，所有場次都有）。
   - 軀幹／腳跟角度、單次動作時間 = 來自錄影的 Heavy 分析，只有有錄影分析的場次才有。
     從舊紀錄匯入的場次是由 CSV 估算的，圖上用空心點標示。
   - 「較佳／較差」只是跟自己最近幾場比的參考，不是醫療或診斷判斷。
   ══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const W = 520, H = 176, ML = 40, MR = 18, MT = 16, MB = 28;
  const PW = W - ML - MR, PH = H - MT - MB;
  const MA_WINDOW = 3;          // 移動平均視窗（場）
  const BASE_MAX = 5;           // 對照卡：跟前面最多幾場比
  const MIN_POINTS = 3;         // 少於幾場就不畫趨勢線

  const fin = (v) => typeof v === 'number' && isFinite(v);

  /* flat＝差距小於這個值就視為「持平」（是顯示用的雜訊門檻，不是臨床標準） */
  const METRICS = [
    { key: 'posture', title: '姿勢分數', sub: '每一下的平均姿勢分（0–100，越高越好）', unit: '分',
      get: (e) => e.posture && e.posture.total, domain: [0, 100], ticks: [0, 25, 50, 75, 100],
      better: 'up', flat: 2, dec: 0 },
    { key: 'trunk', title: '軀幹前傾', sub: '每一下最大前傾角度的平均（越小越穩）　僅含有錄影分析的場次', unit: '°',
      get: (e) => e.heavy && e.heavy.avg_max_trunk_deg, better: 'down', flat: 1, dec: 1,
      ref: { value: 15, label: '滿分門檻 15°' }, heavy: true },
    { key: 'heel', title: '腳跟角度', sub: '站立後腳跟抬起最大角度的平均（越大分數越高）　僅含有錄影分析的場次', unit: '°',
      get: (e) => e.heavy && e.heavy.avg_max_heel_deg, better: 'up', flat: 1.5, dec: 1,
      ref: { value: 35, label: '滿分門檻 35°' }, heavy: true },
    { key: 'dur', title: '單次動作時間', sub: '每一下平均花的秒數（沒有好壞之分，看自己的節奏）　僅含有錄影分析的場次', unit: '秒',
      get: (e) => e.heavy && e.heavy.avg_rep_duration_sec, better: null, flat: 0.2, dec: 1, heavy: true },
    { key: 'reps', title: '完成次數', sub: '限時內完成的次數（越多越好）', unit: '次',
      get: (e) => e.reps, better: 'up', flat: 1, dec: 0, onlyMode: 'timed' }
  ];

  /* ── 小工具 ── */
  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function val(m, e) { let v = null; try { v = m.get(e); } catch (_) { /* ignore */ } return fin(v) ? v : null; }
  function mean(a) { return a.reduce((s, x) => s + x, 0) / a.length; }
  function fmt(m, v) { return v.toFixed(m.dec); }
  function fmtDate(at) { const d = new Date(at); return `${d.getMonth() + 1}/${d.getDate()}`; }
  function fmtDateTime(at) {
    return new Date(at).toLocaleString('zh-TW', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
  function modeName(m) { return (typeof hi_modeName === 'function') ? hi_modeName(m) : (m || '—'); }
  function diffName(d) { return (typeof hi_diffName === 'function') ? hi_diffName(d) : (d || '—'); }
  function isEstimated(e) { return !!(e.heavy && e.heavy.estimated); }

  function niceTicks(min, max, n) {
    if (min === max) { min -= 1; max += 1; }
    const raw = (max - min) / n, mag = Math.pow(10, Math.floor(Math.log10(raw))), norm = raw / mag;
    const step = (norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10) * mag;
    const lo = Math.floor(min / step) * step, hi = Math.ceil(max / step) * step, t = [];
    for (let v = lo; v <= hi + step / 2; v += step) t.push(+v.toFixed(10));
    return t;
  }

  /* ══════════════ 趨勢折線圖 ══════════════ */
  function buildChart(m, pts) {
    const card = el('div', 'hv-card');
    card.appendChild(el('h4', 'hv-card-title', m.title));
    card.appendChild(el('div', 'hv-card-sub', m.sub));

    if (pts.length < MIN_POINTS) {
      card.appendChild(el('div', 'hv-empty',
        `至少要 ${MIN_POINTS} 場有這項資料才能畫趨勢（目前 ${pts.length} 場）。`));
      return card;
    }

    const n = pts.length;
    const vals = pts.map((p) => p.v);
    const ma = vals.map((_, i) => (i >= MA_WINDOW - 1 ? mean(vals.slice(i - MA_WINDOW + 1, i + 1)) : null));
    const showMA = n >= MA_WINDOW + 1;

    // Y 軸範圍：固定範圍的指標用固定值，其餘依資料＋參考線，上下留一點空間
    let ticks;
    if (m.ticks) ticks = m.ticks;
    else {
      let lo = Math.min(...vals), hi = Math.max(...vals);
      if (m.ref) { lo = Math.min(lo, m.ref.value); hi = Math.max(hi, m.ref.value); }
      const pad = (hi - lo) * 0.12 || 1;
      ticks = niceTicks(Math.max(0, lo - pad), hi + pad, 4);
    }
    const lo = ticks[0], hi = ticks[ticks.length - 1];
    const x = (i) => ML + (n === 1 ? 0 : (i * PW) / (n - 1));
    const y = (v) => MT + PH * (1 - (v - lo) / (hi - lo));
    const line = (arr) => arr.map((v, i) => (v == null ? null : `${x(i).toFixed(1)},${y(v).toFixed(1)}`)).filter(Boolean).join(' ');

    let s = `<svg class="hv-svg" viewBox="0 0 ${W} ${H}" tabindex="0" role="img" aria-label="${m.title}趨勢圖，共 ${n} 場，最新 ${fmt(m, vals[n - 1])}${m.unit}。方向鍵可逐場查看。">`;
    ticks.forEach((t) => {
      s += `<line class="hv-grid" x1="${ML}" x2="${W - MR}" y1="${y(t).toFixed(1)}" y2="${y(t).toFixed(1)}"/>`;
      s += `<text class="hv-tick" x="${ML - 6}" y="${(y(t) + 3).toFixed(1)}" text-anchor="end">${+t.toFixed(2)}</text>`;
    });
    s += `<line class="hv-axis" x1="${ML}" x2="${W - MR}" y1="${y(lo).toFixed(1)}" y2="${y(lo).toFixed(1)}"/>`;

    // X 軸日期：第一場、（場次夠多時）中間、最後一場
    const xi = n >= 5 ? [0, Math.floor((n - 1) / 2), n - 1] : [0, n - 1];
    xi.forEach((i) => {
      const anchor = i === 0 ? 'start' : (i === n - 1 ? 'end' : 'middle');
      s += `<text class="hv-tick" x="${x(i).toFixed(1)}" y="${H - 8}" text-anchor="${anchor}">${fmtDate(pts[i].e.at)}</text>`;
    });

    if (m.ref && m.ref.value >= lo && m.ref.value <= hi) {
      const ry = y(m.ref.value).toFixed(1);
      s += `<line class="hv-ref" x1="${ML}" x2="${W - MR}" y1="${ry}" y2="${ry}"/>`;
      s += `<text class="hv-ref-label" x="${ML + 6}" y="${(m.ref.value >= (lo + hi) / 2 ? +ry + 12 : +ry - 5)}">${m.ref.label}</text>`;
    }

    if (showMA) {
      s += `<polyline class="hv-line hv-line-ctx" points="${line(vals)}"/>`;
      s += `<polyline class="hv-line hv-line-main" points="${line(ma)}"/>`;
    } else {
      s += `<polyline class="hv-line hv-line-main" points="${line(vals)}"/>`;
    }
    pts.forEach((p, i) => {
      const cls = (showMA ? 'hv-dot hv-dot-ctx' : 'hv-dot hv-dot-main') + (p.est ? ' hv-dot-est' : '');
      s += `<circle class="${cls}" cx="${x(i).toFixed(1)}" cy="${y(p.v).toFixed(1)}" r="4"/>`;
    });

    // 直接標示最新一場的數值（只標這一個）
    const lx = x(n - 1), ly = y(vals[n - 1]);
    s += `<text class="hv-endlabel" x="${lx.toFixed(1)}" y="${(ly - 10).toFixed(1)}" text-anchor="${lx > W - 60 ? 'end' : 'middle'}">${fmt(m, vals[n - 1])}${m.unit}</text>`;

    s += `<line class="hv-xh" x1="0" x2="0" y1="${MT}" y2="${H - MB}" visibility="hidden"/>`;
    s += `<circle class="hv-active" r="6" cx="0" cy="0" visibility="hidden"/>`;
    s += `<rect class="hv-hit" x="0" y="0" width="${W}" height="${H}" fill="transparent"/>`;
    s += '</svg>';

    const plot = el('div', 'hv-plot');
    plot.innerHTML = s;                       // 只含程式自己產生的數字與固定文字
    const tip = el('div', 'hv-tip');
    tip.hidden = true;
    plot.appendChild(tip);
    card.appendChild(plot);

    // 圖例：至少兩種標記才需要
    const hasEst = pts.some((p) => p.est);
    if (showMA || hasEst) {
      const lg = el('div', 'hv-legend');
      if (showMA) {
        const a = el('span', 'hv-key'); a.appendChild(el('i', 'hv-sw hv-sw-dot')); a.appendChild(document.createTextNode('每一場')); lg.appendChild(a);
        const b = el('span', 'hv-key'); b.appendChild(el('i', 'hv-sw hv-sw-line')); b.appendChild(document.createTextNode(`近 ${MA_WINDOW} 場平均`)); lg.appendChild(b);
      }
      if (hasEst) {
        const c = el('span', 'hv-key'); c.appendChild(el('i', 'hv-sw hv-sw-hollow')); c.appendChild(document.createTextNode('空心＝由 CSV 估算')); lg.appendChild(c);
      }
      card.appendChild(lg);
    }

    // ── 互動：十字線＋提示框（滑鼠、觸控、方向鍵共用同一套） ──
    const svg = plot.querySelector('svg');
    const xh = svg.querySelector('.hv-xh'), ring = svg.querySelector('.hv-active');
    let cur = -1;

    function show(i) {
      i = Math.max(0, Math.min(n - 1, i));
      cur = i;
      const px = x(i), py = y(vals[i]);
      xh.setAttribute('x1', px); xh.setAttribute('x2', px); xh.setAttribute('visibility', 'visible');
      ring.setAttribute('cx', px); ring.setAttribute('cy', py); ring.setAttribute('visibility', 'visible');

      const p = pts[i];
      tip.textContent = '';
      tip.appendChild(el('div', 'hv-tip-when', `${fmtDateTime(p.e.at)}　${modeName(p.e.mode)}・${diffName(p.e.diff)}`));
      const row = el('div', 'hv-tip-row');
      row.appendChild(el('i', 'hv-tip-key'));
      row.appendChild(el('b', 'hv-tip-val', `${fmt(m, p.v)}${m.unit}`));
      row.appendChild(el('span', 'hv-tip-name', p.est ? '本場（估算）' : '本場'));
      tip.appendChild(row);
      if (showMA && ma[i] != null) {
        const r2 = el('div', 'hv-tip-row');
        r2.appendChild(el('i', 'hv-tip-key hv-tip-key-ma'));
        r2.appendChild(el('b', 'hv-tip-val', `${fmt(m, ma[i])}${m.unit}`));
        r2.appendChild(el('span', 'hv-tip-name', `近 ${MA_WINDOW} 場平均`));
        tip.appendChild(r2);
      }
      tip.hidden = false;
      const rect = svg.getBoundingClientRect();
      const left = (px / W) * rect.width;
      const tw = tip.offsetWidth;
      tip.style.left = Math.max(4, Math.min(rect.width - tw - 4, left - tw / 2)) + 'px';
    }
    function hide() {
      cur = -1;
      xh.setAttribute('visibility', 'hidden'); ring.setAttribute('visibility', 'hidden');
      tip.hidden = true;
    }
    function nearest(ev) {
      const r = svg.getBoundingClientRect();
      const px = ((ev.clientX - r.left) / r.width) * W;
      return Math.round(((px - ML) / PW) * (n - 1));
    }
    svg.addEventListener('pointermove', (ev) => show(nearest(ev)));
    svg.addEventListener('pointerdown', (ev) => show(nearest(ev)));
    svg.addEventListener('pointerleave', () => { if (document.activeElement !== svg) hide(); });
    svg.addEventListener('focus', () => show(cur >= 0 ? cur : n - 1));
    svg.addEventListener('blur', hide);
    svg.addEventListener('keydown', (ev) => {
      const k = ev.key;
      if (k === 'ArrowLeft') { show((cur < 0 ? n - 1 : cur) - 1); ev.preventDefault(); }
      else if (k === 'ArrowRight') { show((cur < 0 ? n - 1 : cur) + 1); ev.preventDefault(); }
      else if (k === 'Home') { show(0); ev.preventDefault(); }
      else if (k === 'End') { show(n - 1); ev.preventDefault(); }
      else if (k === 'Escape') { hide(); }
    });
    return card;
  }

  /* ══════════════ 最近一場 vs 之前（對照卡） ══════════════ */
  function sparkline(values, m) {
    const w = 88, h = 26, p = 3, n = values.length;
    let lo = Math.min(...values), hi = Math.max(...values);
    if (lo === hi) { lo -= 1; hi += 1; }
    const sx = (i) => p + (n === 1 ? 0 : (i * (w - 2 * p)) / (n - 1));
    const sy = (v) => p + (h - 2 * p) * (1 - (v - lo) / (hi - lo));
    const pts = values.map((v, i) => `${sx(i).toFixed(1)},${sy(v).toFixed(1)}`).join(' ');
    const last = values[n - 1];
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.setAttribute('class', 'hv-spark');
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = `<polyline class="hv-spark-line" points="${pts}"/><circle class="hv-spark-dot" cx="${sx(n - 1).toFixed(1)}" cy="${sy(last).toFixed(1)}" r="3"/>`;
    return svg;
  }

  function buildCompare(chrono, mode) {
    const box = el('div', 'hv-section');
    box.appendChild(el('h3', 'hv-h', '最近一場 vs 之前'));
    if (chrono.length < 2) {
      box.appendChild(el('div', 'hv-empty', '至少要有 2 場紀錄才能對照。再玩一場就會出現。'));
      return box;
    }
    const latest = chrono[chrono.length - 1];
    const base = chrono.slice(Math.max(0, chrono.length - 1 - BASE_MAX), chrono.length - 1);
    box.appendChild(el('div', 'hv-card-sub',
      `${fmtDateTime(latest.at)} 的這一場，對照前面 ${base.length} 場的平均。「較佳／較差」只是跟自己最近幾場比的參考。`));

    const grid = el('div', 'hv-tiles');
    METRICS.filter((m) => !m.onlyMode || m.onlyMode === mode).forEach((m) => {
      const t = el('div', 'hv-tile');
      t.appendChild(el('div', 'hv-tile-label', m.title));
      const lv = val(m, latest);
      const bvals = base.map((e) => val(m, e)).filter((v) => v != null);
      const bm = bvals.length ? mean(bvals) : null;

      t.appendChild(el('div', 'hv-tile-val', lv == null ? '—' : `${fmt(m, lv)}${m.unit}`));
      const d = el('div', 'hv-delta');
      if (lv == null) {
        d.classList.add('hv-flat');
        d.textContent = m.heavy ? '這一場沒有錄影分析' : '沒有資料';
      } else if (bm == null) {
        d.classList.add('hv-flat');
        d.textContent = '之前沒有可比較的資料';
      } else {
        const diff = lv - bm;
        if (Math.abs(diff) < m.flat) {
          d.classList.add('hv-flat');
          d.textContent = '≈ 持平';
        } else {
          const up = diff > 0;
          let cls = 'hv-flat', word = up ? '較高' : '較低';
          if (m.better) {
            const good = (m.better === 'up') === up;
            cls = good ? 'hv-good' : 'hv-bad';
            word = good ? '較佳' : '較差';
          } else {
            word = up ? '較慢' : '較快';
          }
          d.classList.add(cls);
          d.textContent = `${up ? '▲' : '▼'} ${up ? '+' : '−'}${Math.abs(diff).toFixed(m.dec)}${m.unit}　${word}`;
        }
      }
      t.appendChild(d);
      const series = chrono.slice(-8).map((e) => val(m, e)).filter((v) => v != null);
      if (series.length >= 2) t.appendChild(sparkline(series, m));
      grid.appendChild(t);
    });
    box.appendChild(grid);
    return box;
  }

  /* ══════════════ 表格檢視 ══════════════ */
  function buildTable(chrono, mode) {
    const det = el('details', 'hv-table-wrap');
    det.appendChild(el('summary', '', '📋 表格檢視（所有場次，最新在上）'));
    const ms = METRICS.filter((m) => !m.onlyMode || m.onlyMode === mode);
    const table = el('table', 'hv-table');
    const thead = el('thead'), hr = el('tr');
    ['日期', '模式', '難度'].concat(ms.map((m) => `${m.title}${m.unit ? '（' + m.unit + '）' : ''}`)).forEach((h) => hr.appendChild(el('th', '', h)));
    thead.appendChild(hr); table.appendChild(thead);
    const tb = el('tbody');
    chrono.slice().reverse().forEach((e) => {
      const tr = el('tr');
      tr.appendChild(el('td', '', fmtDateTime(e.at)));
      tr.appendChild(el('td', '', modeName(e.mode)));
      tr.appendChild(el('td', '', diffName(e.diff)));
      ms.forEach((m) => {
        const v = val(m, e);
        tr.appendChild(el('td', 'hv-num', v == null ? '—' : fmt(m, v) + (m.heavy && isEstimated(e) ? '*' : '')));
      });
      tb.appendChild(tr);
    });
    table.appendChild(tb);
    det.appendChild(table);
    if (chrono.some(isEstimated)) det.appendChild(el('div', 'hv-card-sub', '* 由 CSV 估算，與報告 PDF 可能有些微差異。'));
    return det;
  }

  /* ══════════════ 對外入口 ══════════════ */
  window.renderHistoryTrends = function (container, rows, mode) {
    container.textContent = ''; container.className = 'hv-wrap';
    const chrono = (rows || []).slice().sort((a, b) => (a.at || 0) - (b.at || 0));

    if (!chrono.length) {
      container.appendChild(el('div', 'friend-empty', '還沒有訓練紀錄，玩完一場之後這裡就會出現趨勢。'));
      return;
    }
    if (mode === 'all') {
      container.appendChild(el('div', 'hv-hint',
        'ℹ️ 不同模式的分數與次數不能直接比較。建議在上方選單一模式，趨勢會更有意義。'));
    }

    container.appendChild(buildCompare(chrono, mode));

    const sec = el('div', 'hv-section');
    sec.appendChild(el('h3', 'hv-h', '歷次趨勢'));
    METRICS.filter((m) => !m.onlyMode || m.onlyMode === mode).forEach((m) => {
      const pts = chrono
        .map((e) => ({ e, v: val(m, e), est: m.heavy && isEstimated(e) }))
        .filter((p) => p.v != null);
      sec.appendChild(buildChart(m, pts));
    });
    container.appendChild(sec);
    container.appendChild(buildTable(chrono, mode));
  };
})();
