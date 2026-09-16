/* ══════════════════════════════════════════════════════════════
   改善建議（Improvement Advice）

   目前是「畫面骨架 + 本機粗略統計」版本：
   先把版面、按鈕、資料流跑通，等後端分析上線後再換資料來源。

   ── 之後要接後端時 ──
   只要把 AdviceSource.fetch() 換成打 API，回傳同樣形狀的物件，
   renderAdvice() 以下都不用改。回傳格式定義在下面 SHAPE 註解。

   SHAPE = {
     generatedAt: 1699999999999,
     source: 'backend' | 'local',
     scores:  { overall, trunk, heel, knee, tempo },   // 0-100，沒有就 null
     issues:  [ { title, detail, severity: 'high'|'mid'|'low' } ],
     drills:  [ { title, detail, freq } ],
     trend:   { points: [{ at, posture }], summary: '文字說明' }
   }
   ══════════════════════════════════════════════════════════════ */

let lastAdvice = null;

/* ══════════════════ 資料來源（換後端只要改這裡） ══════════════════ */
const AdviceSource = {
  /* 有後端就用後端的分析，沒有就退回本機統計 */
  async fetch() {
    if (typeof backendAvailable !== 'undefined' && backendAvailable) {
      try {
        const res = await fetch('/api/advice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ history: await HistoryStore.list() })
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.success && data.advice) {
            return Object.assign({ source: 'backend' }, data.advice);
          }
        }
      } catch (e) {
        // 後端還沒實作 /api/advice 就靜靜退回本機版
      }
    }
    return await AdviceSource.buildLocal();
  },

  /* 本機粗略版：只從歷史紀錄算平均，不做深入分析。
     這只是佔位，正式的動作分析會由後端產出。 */
  async buildLocal() {
    const all = (typeof HistoryStore !== 'undefined') ? await HistoryStore.list() : [];
    if (all.length < 3) {
      return {
        generatedAt: Date.now(),
        source: 'local',
        insufficient: true,
        need: 3,
        have: all.length,
        scores: { overall: null, trunk: null, heel: null, knee: null, tempo: null },
        issues: [], drills: [], trend: null
      };
    }

    const avg = (pick) => {
      const vals = all.map(pick).filter(v => typeof v === 'number' && isFinite(v));
      return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : null;
    };

    const scores = {
      overall: avg(e => e.posture && e.posture.total),
      trunk:   avg(e => e.posture && e.posture.trunk),
      heel:    avg(e => e.posture && e.posture.heel),
      knee:    avg(e => e.posture && e.posture.knee),
      tempo:   null            // 節奏需要逐幀資料，等後端
    };

    // 找出分數最低的項目當作重點問題
    const named = [
      { key: 'trunk', label: '軀幹前傾', v: scores.trunk,
        detail: '起立時軀幹彎曲角度偏大，可能過度依賴腰部代償。',
        drill: { title: '靠牆坐站', detail: '背貼牆練習起立，感受用臀腿發力而不是彎腰。', freq: '每天 2 組 × 10 次' } },
      { key: 'heel', label: '腳跟抬升', v: scores.heel,
        detail: '站立完成後腳跟抬起幅度不足，小腿肌群參與不夠。',
        drill: { title: '扶椅提踵', detail: '扶著椅背緩慢墊腳到最高，停 2 秒再放下。', freq: '每天 3 組 × 12 次' } },
      { key: 'knee', label: '膝部穩定', v: scores.knee,
        detail: '動作過程中膝蓋有內夾傾向，長期容易造成膝關節負擔。',
        drill: { title: '彈力帶外展', detail: '膝上綁彈力帶做坐站，練習把膝蓋往外推。', freq: '每天 2 組 × 12 次' } }
    ].filter(x => typeof x.v === 'number');

    named.sort((a, b) => a.v - b.v);

    const issues = named.filter(x => x.v < 80).slice(0, 3).map(x => ({
      title: `${x.label}（${x.v} 分）`,
      detail: x.detail,
      severity: x.v < 60 ? 'high' : (x.v < 70 ? 'mid' : 'low')
    }));

    const drills = named.filter(x => x.v < 80).slice(0, 3).map(x => x.drill);

    // 趨勢：取最近 10 場的姿勢總分
    const points = all.slice(0, 10).reverse()
      .filter(e => e.posture && typeof e.posture.total === 'number')
      .map(e => ({ at: e.at, posture: e.posture.total }));

    let summary = '資料還不夠多，再多練幾場就能看出趨勢。';
    if (points.length >= 4) {
      const half = Math.floor(points.length / 2);
      const early = points.slice(0, half).reduce((s, p) => s + p.posture, 0) / half;
      const late  = points.slice(half).reduce((s, p) => s + p.posture, 0) / (points.length - half);
      const diff  = Math.round(late - early);
      summary = diff > 2 ? `最近的姿勢分數比先前進步了約 ${diff} 分，維持下去。`
              : diff < -2 ? `最近的姿勢分數比先前下降了約 ${Math.abs(diff)} 分，注意動作品質。`
              : '最近的姿勢分數大致持平。';
    }

    return {
      generatedAt: Date.now(),
      source: 'local',
      insufficient: false,
      scores, issues, drills,
      trend: { points, summary }
    };
  }
};

/* ══════════════════ UI ══════════════════ */

function openAdviceScreen() {
  if (typeof ensureAudio === 'function') ensureAudio();
  if (typeof playSfx === 'function') playSfx('click');
  document.getElementById('ov-advice')?.classList.add('on');
  if (lastAdvice) renderAdvice(lastAdvice);
}

function closeAdviceScreen() {
  if (typeof playSfx === 'function') playSfx('click');
  document.getElementById('ov-advice')?.classList.remove('on');
}

async function generateAdvice() {
  if (typeof playSfx === 'function') playSfx('click');
  const status = document.getElementById('advice-status');
  const btn = document.getElementById('advice-generate-btn');

  if (status) status.textContent = '分析中…';
  if (btn) btn.disabled = true;

  try {
    const advice = await AdviceSource.fetch();
    lastAdvice = advice;
    renderAdvice(advice);
  } catch (e) {
    if (status) status.textContent = '分析失敗：' + (e.message || '未知錯誤');
  } finally {
    if (btn) btn.disabled = false;
  }
}

function ad_escape(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function renderAdvice(a) {
  const status  = document.getElementById('advice-status');
  const issues  = document.getElementById('advice-issues');
  const drills  = document.getElementById('advice-drills');
  const trend   = document.getElementById('advice-trend');

  // 分數
  const setScore = (key, v) => {
    const el = document.querySelector(`[data-advice="${key}"]`);
    if (el) el.textContent = (typeof v === 'number') ? v : '—';
  };
  const s = a.scores || {};
  setScore('overall', s.overall); setScore('trunk', s.trunk);
  setScore('heel', s.heel);       setScore('knee', s.knee);
  setScore('tempo', s.tempo);

  if (a.insufficient) {
    if (status) status.textContent =
      `資料還不夠：目前 ${a.have} 場，至少需要 ${a.need} 場才能分析`;
    if (issues) issues.innerHTML = '<div class="advice-placeholder">再完成幾場訓練就能產生建議。</div>';
    if (drills) drills.innerHTML = '<div class="advice-placeholder">—</div>';
    if (trend)  trend.innerHTML  = '<div class="advice-placeholder">—</div>';
    return;
  }

  const when = new Date(a.generatedAt).toLocaleString('zh-TW',
    { month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit' });
  if (status) {
    status.textContent = a.source === 'backend'
      ? `後端分析完成｜${when}`
      : `本機粗略分析｜${when}（完整動作分析需啟動後端）`;
  }

  // 重點問題
  if (issues) {
    issues.innerHTML = (a.issues && a.issues.length)
      ? a.issues.map(i => `
          <div class="advice-issue sev-${ad_escape(i.severity || 'low')}">
            <div class="advice-issue-title">${ad_escape(i.title)}</div>
            <div class="advice-issue-detail">${ad_escape(i.detail)}</div>
          </div>`).join('')
      : '<div class="advice-placeholder">目前各項分數都不錯，沒有明顯需要改善的地方。</div>';
  }

  // 建議練習
  if (drills) {
    drills.innerHTML = (a.drills && a.drills.length)
      ? a.drills.map(d => `
          <div class="advice-drill">
            <div class="advice-drill-title">${ad_escape(d.title)}</div>
            <div class="advice-drill-detail">${ad_escape(d.detail)}</div>
            <div class="advice-drill-freq">${ad_escape(d.freq || '')}</div>
          </div>`).join('')
      : '<div class="advice-placeholder">維持目前的訓練頻率即可。</div>';
  }

  // 趨勢
  if (trend) {
    if (a.trend && a.trend.points && a.trend.points.length) {
      const pts = a.trend.points;
      const max = Math.max(...pts.map(p => p.posture), 100);
      const bars = pts.map(p => {
        const h = Math.max(4, Math.round((p.posture / max) * 100));
        return `<div class="advice-bar" style="height:${h}%" title="${p.posture} 分"></div>`;
      }).join('');
      trend.innerHTML = `
        <div class="advice-chart">${bars}</div>
        <div class="advice-trend-summary">${ad_escape(a.trend.summary || '')}</div>`;
    } else {
      trend.innerHTML = '<div class="advice-placeholder">尚無足夠資料繪製趨勢。</div>';
    }
  }
}

async function exportAdviceReport() {
  if (typeof playSfx === 'function') playSfx('click');
  if (!lastAdvice) {
    showToast('請先產生分析報告', 'var(--yellow)');
    return;
  }
  const blob = new Blob([JSON.stringify(lastAdvice, null, 2)],
                        { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sts_advice_${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  showToast('已匯出報告', 'var(--green)');
}

window.openAdviceScreen = openAdviceScreen;
window.generateAdvice = generateAdvice;
window.AdviceSource = AdviceSource;
