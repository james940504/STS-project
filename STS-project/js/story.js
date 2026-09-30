/* ══════════════════════════════════════════════════════════════
   冒險情境模式（Story Battle Mode）

   設定：你是傳說中的「坐站王子（公主）」，每完成一次坐站動作，
   就是對眼前的對手發動一次「起立衝擊」。不看姿勢分數、不看名次，
   純粹是闖關體驗——只要完成關卡要求的坐站次數，就能過關看到後續劇情。

   跟一般模式的差別（這是這一版重點）：
   每一關都是「點進去就是一個獨立關卡」——
     地圖 → 點關卡 → 先看一段專屬故事（ov-story-intro）→ 按下開始
     → 直接跳過角色/模式/難度選單，用固定設定直接進入攝影機遊戲
     → 打滿需求次數立刻結束這一場，不看成績，改顯示專屬的過關劇情
       （ov-story-victory，取代一般的成績結算畫面）
     → 可以直接「挑戰下一關」或回地圖。

   結構：STORY_CHAPTERS 是章節陣列，每章底下有 levels 陣列（目前每章 5 關）。
   這兩層都是純資料、用陣列長度動態渲染，之後要加第 6 章、
   或某一章加到 6 關、7 關，都只要在陣列裡多寫幾筆，不用改渲染邏輯。

   關卡解鎖規則：把所有章節的關卡攤平成一條時間軸，
   第一關永遠可玩，之後每一關要等「前一關」破關才會解鎖
   （包含跨章節銜接：某章第5關破了，下一章第1關自動解鎖）。
   ══════════════════════════════════════════════════════════════ */

const STORY_CHAPTERS = [
  {
    id: 'ch1', title: '第一章', name: '起始村的異變', icon: '🏡',
    levels: [
      { id: 'ch1-1', name: '村口的路障',   enemy: '懶散史萊姆',       enemyIcon: '🟢', need: 5,  coin: 15,
        intro:   '村口出現一隻軟綿綿的「懶散史萊姆」，賴在路中央不肯讓開。用你的起立衝擊把它震醒吧！',
        victory: '史萊姆被你一次次的起立衝擊震得彈開，滾著滾著就讓出了路。村口重新恢復暢通。' },
      { id: 'ch1-2', name: '打哈欠的稻草人', enemy: '打哈欠稻草人',     enemyIcon: '🧑‍🌾', need: 6,  coin: 18,
        intro:   '田裡的稻草人打著哈欠，鬆垮垮地擋住了小路，好像已經很久沒有人陪它動一動了。',
        victory: '稻草人被你的節奏帶動，總算挺直了腰桿，開心地讓出了小路。' },
      { id: 'ch1-3', name: '卡住的石磨',   enemy: '頑固石磨',         enemyIcon: '⚙️', need: 7,  coin: 20,
        intro:   '村子的石磨卡住不轉了，村民急得團團轉，或許需要你的力量幫忙推一把。',
        victory: '石磨伴隨你的每一次起立緩緩轉動，終於重新磨出麵粉，村民歡呼了起來。' },
      { id: 'ch1-4', name: '守門的瞌睡犬', enemy: '瞌睡看門犬',       enemyIcon: '🐕', need: 8,  coin: 22,
        intro:   '村莊大門前趴著一隻打瞌睡的看門犬，任誰喊都喚不醒牠。',
        victory: '看門犬被你充滿活力的動作吵醒，搖著尾巴站了起來，還幫你帶了路。' },
      { id: 'ch1-5', name: '呼呼男爵的高塔', enemy: '懶惰領主・呼呼男爵', enemyIcon: '👑', need: 10, coin: 40,
        intro:   '盤據村莊高塔的呼呼男爵，成天窩在躺椅上，是村莊變得死氣沉沉的原因。',
        victory: '呼呼男爵終於被你的起立節奏震下躺椅，鬆口承認是自己太久沒運動，乖乖讓開了通往下一段旅程的路。' }
    ]
  },
  {
    id: 'ch2', title: '第二章', name: '顫抖沼澤', icon: '🐸',
    levels: [
      { id: 'ch2-1', name: '搖晃的泥地',   enemy: '搖晃泥怪',         enemyIcon: '🟤', need: 6,  coin: 15,
        intro:   '沼澤裡的泥怪走起路來東倒西歪，一不小心就會滑倒。',
        victory: '泥怪跟著你穩定的節奏，總算找回了平衡，開心地陷回泥地裡打滾。' },
      { id: 'ch2-2', name: '木橋上的青蛙軍團', enemy: '濕滑青蛙軍團',   enemyIcon: '🐸', need: 7,  coin: 18,
        intro:   '一群小青蛙擋在木橋上跳來跳去，滑溜溜的很難通過。',
        victory: '青蛙們被你的節奏震得蹦蹦跳跳散開，木橋總算清出一條路。' },
      { id: 'ch2-3', name: '纏人的水草',   enemy: '纏人水草',         enemyIcon: '🌿', need: 8,  coin: 20,
        intro:   '濃密的水草纏住了小船，越掙扎纏得越緊。',
        victory: '隨著你一次次穩穩地站起，水草鬆開了糾結，小船終於能夠繼續前進。' },
      { id: 'ch2-4', name: '迷霧深處',     enemy: '迷霧螢火怪',       enemyIcon: '✨', need: 9,  coin: 22,
        intro:   '沼澤深處瀰漫著詭異的螢光霧氣，讓人分不清方向。',
        victory: '螢火怪被你的節奏震得四散，霧氣散去後，前方的路豁然開朗。' },
      { id: 'ch2-5', name: '沼澤的出口',   enemy: '沼澤守護者・搖擺巨龜', enemyIcon: '🐢', need: 11, coin: 42,
        intro:   '守護沼澤的巨龜龜殼上長滿青苔，走起路來搖搖晃晃，擋住了唯一的出口。',
        victory: '巨龜被你穩健的起立節奏感染，慢慢挺直了身子，讓開了沼澤的出口。' }
    ]
  },
  {
    id: 'ch3', title: '第三章', name: '鏽蝕鋼鐵城', icon: '⚙️',
    levels: [
      { id: 'ch3-1', name: '生鏽的城門',   enemy: '生鏽小齒輪',       enemyIcon: '⚙️', need: 8,  coin: 16,
        intro:   '城門口的小齒輪卡滿了鐵鏽，轉不動也動不了。',
        victory: '齒輪跟著你的節奏一次次鬆動，終於恢復了轉動，發出久違的喀啦聲。' },
      { id: 'ch3-2', name: '巡邏的鐵甲兵', enemy: '僵硬鐵甲兵',       enemyIcon: '🤖', need: 9,  coin: 19,
        intro:   '巡邏的鐵甲兵關節生鏽，動作僵硬得像個雕像。',
        victory: '鐵甲兵的關節在你的起立衝擊下慢慢鬆開，終於能自由活動，對你行了個禮。' },
      { id: 'ch3-3', name: '卡關的電梯',   enemy: '卡關電梯魔像',     enemyIcon: '🛗', need: 10, coin: 21,
        intro:   '通往上層的電梯魔像卡在半路，怎麼推都不肯動。',
        victory: '電梯魔像隨著你的節奏一階階往上，總算把你送到了上層。' },
      { id: 'ch3-4', name: '雙子守衛',     enemy: '鏽蝕守衛雙子',     enemyIcon: '🗿', need: 11, coin: 24,
        intro:   '兩尊鏽蝕的守衛雕像同時擋住通道，似乎在比賽誰先生鏽倒下。',
        victory: '雙子守衛被你的連續起立震得鏽蝕剝落，露出底下閃亮的金屬，乖乖讓開。' },
      { id: 'ch3-5', name: '城主的寶座',   enemy: '鋼鐵城主・鏽甲霸王', enemyIcon: '👑', need: 13, coin: 45,
        intro:   '城主全身裹著厚重鏽甲，是整座城市停滯不前的原因。',
        victory: '鏽甲霸王在你一次次的起立衝擊下，鏽蝕大片剝落，終於卸下沉重的盔甲，城市重新運轉了起來。' }
    ]
  },
  {
    id: 'ch4', title: '第四章', name: '風化神殿', icon: '🏛️',
    levels: [
      { id: 'ch4-1', name: '神殿大門',     enemy: '石化門神',         enemyIcon: '🗿', need: 9,  coin: 17,
        intro:   '神殿大門前的門神雕像因為年久失修而僵化，擋住了入口。',
        victory: '門神在你的節奏中緩緩活動起筋骨，微笑著讓開了神殿大門。' },
      { id: 'ch4-2', name: '傾斜的石柱',   enemy: '搖擺石柱',         enemyIcon: '🏛️', need: 10, coin: 20,
        intro:   '傾斜的石柱隨時可能倒下，擋住了通往內殿的走廊。',
        victory: '石柱跟著你的起立節奏漸漸站穩，恢復了筆直的姿態。' },
      { id: 'ch4-3', name: '壁畫裡的幻影', enemy: '風化壁畫幻影',     enemyIcon: '👻', need: 11, coin: 22,
        intro:   '牆上斑駁的壁畫突然浮現出模糊的人影，考驗著你的耐力。',
        victory: '幻影在你堅持不懈的動作中漸漸清晰又漸漸消散，只留下一句感謝的低語。' },
      { id: 'ch4-4', name: '試煉階梯',     enemy: '試煉階梯守衛',     enemyIcon: '🛡️', need: 12, coin: 25,
        intro:   '長長的階梯上站著考驗旅人的守衛，只認可願意持續起立的人。',
        victory: '守衛被你穩定的節奏打動，恭敬地讓出了階梯。' },
      { id: 'ch4-5', name: '祭司的靜止',   enemy: '神殿祭司・靜止化身', enemyIcon: '🧘', need: 14, coin: 48,
        intro:   '神殿深處的祭司陷入了長久的靜止，是整座神殿失去生氣的根源。',
        victory: '祭司隨著你一次次的起立衝擊漸漸甦醒，神殿重新充滿了光與活力。' }
    ]
  },
  {
    id: 'ch5', title: '第五章', name: '王座之巔', icon: '👑',
    levels: [
      { id: 'ch5-1', name: '僵化的侍衛長', enemy: '僵化侍衛長',       enemyIcon: '💂', need: 10, coin: 18,
        intro:   '通往王座的第一道關卡，是全身僵硬的侍衛長。',
        victory: '侍衛長的僵硬在你的節奏中漸漸化開，對你俯首讓路。' },
      { id: 'ch5-2', name: '不動如山的幻影', enemy: '幻影分身・靜',     enemyIcon: '🌫️', need: 11, coin: 21,
        intro:   '王座前的幻影考驗著你是否能維持穩定的節奏，不被打亂。',
        victory: '幻影跟不上你穩健的步調，漸漸消散在光芒之中。' },
      { id: 'ch5-3', name: '風暴迴廊',     enemy: '風暴迴廊',         enemyIcon: '🌪️', need: 12, coin: 24,
        intro:   '迴廊裡狂風大作，每一步都需要更穩固的重心。',
        victory: '你一次次穩穩地站起，風暴漸漸平息，迴廊恢復了平靜。' },
      { id: 'ch5-4', name: '王座守護獸',   enemy: '王座守護獸',       enemyIcon: '🦁', need: 14, coin: 28,
        intro:   '守護王座的巨獸盤踞在最後的通道上，考驗著你堅持到底的意志。',
        victory: '巨獸被你不放棄的節奏打動，溫馴地趴下，讓開了通往王座的路。' },
      { id: 'ch5-5', name: '僵化之霧的核心', enemy: '僵化之霧・王國的心結', enemyIcon: '🌀', need: 16, coin: 60,
        intro:   '王座之上凝聚著整個王國僵化的根源——一團濃重的「僵化之霧」。這是這段旅程最後、也最需要耐心的一戰。',
        victory: '隨著你一次又一次穩穩地站起，僵化之霧終於徹底散去。王國甦醒了，而你，就是那位真正的坐站王子（公主）。這段旅程告一段落——但更多的冒險，還在後頭等著你。' }
    ]
  }
  /* 之後要延伸更多章節，直接在這個陣列後面繼續加 { id, title, name, icon, levels:[...] } 即可，
     不用改下面任何一行渲染或解鎖邏輯。 */
];

/* 目前選定要迎戰的關卡（存在記憶體，不寫進存檔；重整頁面就重置）。 */
let activeStoryLevel = null;
/* 目前劇情介紹畫面對應的關卡 id（按「開始迎戰」時要知道打的是哪一關）。 */
let currentIntroLevelId = null;
/* 最近一次過關的關卡 id，給「挑戰下一關」按鈕找下一筆用。 */
let lastClearedLevelId = null;

/* ══════════════════ 資料存取 ══════════════════ */
function ensureStoryState(s) {
  s.story = s.story || { clearedLevels: [] };
  if (!Array.isArray(s.story.clearedLevels)) s.story.clearedLevels = [];
  return s.story;
}

/* 把所有章節的關卡攤平成一條時間軸，用來判斷「前一關過了沒」。
   之後不管加幾章、每章加幾關，這裡都不用改。 */
function flattenStoryLevels() {
  const flat = [];
  STORY_CHAPTERS.forEach(ch => {
    ch.levels.forEach(lv => flat.push({ chapter: ch, level: lv }));
  });
  return flat;
}

function findStoryLevel(levelId) {
  return flattenStoryLevels().find(x => x.level.id === levelId) || null;
}

function isLevelCleared(levelId, story) {
  return story.clearedLevels.includes(levelId);
}

function isLevelAvailable(levelId, story) {
  const flat = flattenStoryLevels();
  const idx = flat.findIndex(x => x.level.id === levelId);
  if (idx < 0) return false;
  if (idx === 0) return true;
  return isLevelCleared(flat[idx - 1].level.id, story);
}

function st_escape(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* ══════════════════ 冒險地圖（章節/關卡節點列表） ══════════════════ */
function openStoryScreen() {
  if (typeof ensureAudio === 'function') ensureAudio();
  if (typeof playSfx === 'function') playSfx('click');
  renderStoryMap();
  document.getElementById('ov-story')?.classList.add('on');
}

function closeStoryScreen() {
  if (typeof playSfx === 'function') playSfx('click');
  document.getElementById('ov-story')?.classList.remove('on');
}

function renderStoryMap() {
  const list = document.getElementById('story-chapters');
  if (!list) return;
  const s = (typeof loadSave === 'function') ? loadSave() : {};
  const story = ensureStoryState(s);

  list.innerHTML = STORY_CHAPTERS.map(ch => {
    const clearedCount = ch.levels.filter(lv => isLevelCleared(lv.id, story)).length;
    const chapterTouched = ch.levels.some(lv => isLevelAvailable(lv.id, story));
    const nodes = ch.levels.map((lv, i) => {
      const cleared = isLevelCleared(lv.id, story);
      const available = isLevelAvailable(lv.id, story);
      const state = cleared ? 'cleared' : (available ? 'available' : 'locked');
      const icon = cleared ? '⭐' : (available ? '⚔️' : '🔒');
      return `<button type="button" class="story-node ${state}" onclick="selectStoryLevel('${lv.id}')">
        <span class="story-node-icon">${icon}</span><span class="story-node-num">${i + 1}</span>
      </button>`;
    }).join('');

    return `<div class="story-chapter ${chapterTouched ? '' : 'dim'}">
      <div class="story-chapter-head">
        <div class="story-chapter-icon">${ch.icon}</div>
        <div>
          <div class="story-chapter-title">${st_escape(ch.title)}・${st_escape(ch.name)}</div>
          <div class="story-chapter-progress">${clearedCount} / ${ch.levels.length} 關卡完成</div>
        </div>
      </div>
      <div class="story-level-row">${nodes}</div>
    </div>`;
  }).join('');
}

/* ══════════════════ 關卡前的獨立劇情畫面 ══════════════════ */

/* 點地圖上的關卡節點：先關掉地圖，換成這一關專屬的故事介紹畫面。
   這一關是「一個獨立關卡」的起點——不是回到地圖上小小的一塊文字。 */
function selectStoryLevel(levelId) {
  const found = findStoryLevel(levelId);
  if (!found) return;
  const s = (typeof loadSave === 'function') ? loadSave() : {};
  const story = ensureStoryState(s);

  if (!isLevelAvailable(levelId, story)) {
    if (typeof showToast === 'function') showToast('先過前面的關卡，這裡才會解鎖', 'var(--yellow)');
    return;
  }
  if (typeof playSfx === 'function') playSfx('click');
  currentIntroLevelId = levelId;
  renderStoryIntro(levelId);
  document.getElementById('ov-story')?.classList.remove('on');
  document.getElementById('ov-story-intro')?.classList.add('on');
}

function renderStoryIntro(levelId) {
  const found = findStoryLevel(levelId);
  if (!found) return;
  const s = (typeof loadSave === 'function') ? loadSave() : {};
  const story = ensureStoryState(s);
  const cleared = isLevelCleared(levelId, story);
  const { chapter, level } = found;

  const iconEl = document.getElementById('story-intro-enemy-icon');
  const titleEl = document.getElementById('story-intro-title');
  const nameEl = document.getElementById('story-intro-enemy-name');
  const textEl = document.getElementById('story-intro-text');
  const needEl = document.getElementById('story-intro-need');
  const startBtn = document.getElementById('story-intro-start-btn');

  if (iconEl) iconEl.textContent = level.enemyIcon;
  if (titleEl) titleEl.textContent = `${chapter.title}・${level.name}`;
  if (nameEl) nameEl.textContent = `對手：${level.enemy}${cleared ? '（已擊敗過）' : ''}`;
  if (textEl) textEl.textContent = cleared ? level.victory : level.intro;
  if (needEl) needEl.textContent = `⚔️ 這一關要用坐站攻擊 ${level.need} 次才會過關，不看姿勢分數，體驗為主`;
  if (startBtn) startBtn.textContent = cleared ? '🔁 重新挑戰' : '⚔️ 開始迎戰';
}

function backToStoryMapFromIntro() {
  if (typeof playSfx === 'function') playSfx('click');
  currentIntroLevelId = null;
  document.getElementById('ov-story-intro')?.classList.remove('on');
  openStoryScreen();
}

/* ══════════════════ 對戰機制（每一關都是獨立的一場遊戲） ══════════════════ */

/* 劇情畫面按下「開始迎戰」：不經過角色/模式/難度選單，
   固定用 infinite 模式（沒有自己的破關條件，才不會跟關卡的過關判斷打架）
   直接進攝影機遊戲，讓這一關成為一場獨立、專屬的對戰。 */
function confirmStartStoryBattle() {
  if (!currentIntroLevelId) return;
  startStoryBattle(currentIntroLevelId);
}

function startStoryBattle(levelId) {
  const found = findStoryLevel(levelId);
  if (!found) return;
  const s = (typeof loadSave === 'function') ? loadSave() : {};
  const story = ensureStoryState(s);
  if (!isLevelAvailable(levelId, story)) {
    if (typeof showToast === 'function') showToast('這一關還沒解鎖喔，先過前面的關卡吧', 'var(--yellow)');
    return;
  }
  if (typeof playSfx === 'function') playSfx('click');

  activeStoryLevel = {
    levelId, chapterId: found.chapter.id,
    need: found.level.need, progress: 0,
    enemy: found.level.enemy, enemyIcon: found.level.enemyIcon
  };

  // 固定用 infinite 模式＋easy 難度，讓每一關都是同樣輕鬆、體驗優先的節奏
  if (typeof DIFFS !== 'undefined') { selDiffKey = 'easy'; selDiff = DIFFS.easy; }
  selMode = 'infinite';

  document.getElementById('ov-story-intro')?.classList.remove('on');
  document.getElementById('ov-story')?.classList.remove('on');
  currentIntroLevelId = null;

  if (typeof launchGame === 'function') launchGame();
}

/* js/social.js 的 onRepCompleted() 每算一次坐站就呼叫這裡：一次坐站＝一次攻擊 */
function onStoryRepAttack() {
  if (!activeStoryLevel) return;
  activeStoryLevel.progress++;
  updateStoryBattleHUD();
  if (activeStoryLevel.progress >= activeStoryLevel.need) {
    clearActiveStoryLevel();
  }
}

function clearActiveStoryLevel() {
  const done = activeStoryLevel;
  activeStoryLevel = null;
  updateStoryBattleHUD();
  if (!done || typeof loadSave !== 'function') return;

  const found = findStoryLevel(done.levelId);
  if (!found) return;
  const { chapter, level } = found;

  const s = loadSave();
  const story = ensureStoryState(s);
  const alreadyCleared = isLevelCleared(done.levelId, story);
  let rewardText = '';
  if (!alreadyCleared) {
    story.clearedLevels.push(done.levelId);
    if (level.coin) {
      s.coins = (s.coins || 0) + level.coin;
      if (typeof updateCoinUI === 'function') updateCoinUI();
      rewardText = `\n\n🪙 +${level.coin} 金幣`;
    }
    if (typeof writeSave === 'function') writeSave(s);
  }
  lastClearedLevelId = done.levelId;

  const title = `${chapter.title}・${level.name}　過關！`;
  const storyText = level.victory + rewardText;
  if (typeof triggerStoryLevelClear === 'function') {
    triggerStoryLevelClear(title, storyText);
  }
}

/* ══════════════════ 遊戲畫面中的對戰 HUD ══════════════════ */
function updateStoryBattleHUD() {
  const hud = document.getElementById('story-battle-hud');
  if (!hud) return;
  if (!activeStoryLevel) {
    hud.classList.remove('on');
    return;
  }
  hud.classList.add('on');
  const enemyEl = document.getElementById('story-battle-enemy');
  const progEl = document.getElementById('story-battle-progress');
  if (enemyEl) enemyEl.textContent = `${activeStoryLevel.enemyIcon} ${activeStoryLevel.enemy}`;
  if (progEl) progEl.textContent = `${Math.min(activeStoryLevel.progress, activeStoryLevel.need)} / ${activeStoryLevel.need}`;
}

/* ══════════════════ 過關畫面（ov-story-victory）按鈕 ══════════════════ */
function backToStoryMapFromVictory() {
  if (typeof playSfx === 'function') playSfx('click');
  document.getElementById('ov-story-victory')?.classList.remove('on');
  if (typeof goTo === 'function') goTo('scr-menu');
  openStoryScreen();
}

function challengeNextStoryLevel() {
  if (typeof playSfx === 'function') playSfx('click');
  document.getElementById('ov-story-victory')?.classList.remove('on');
  if (typeof goTo === 'function') goTo('scr-menu');

  const flat = flattenStoryLevels();
  const idx = flat.findIndex(x => x.level.id === lastClearedLevelId);
  const next = (idx >= 0 && idx + 1 < flat.length) ? flat[idx + 1] : null;

  if (!next) {
    if (typeof showToast === 'function') showToast('目前章節都已經走完了，敬請期待之後延伸的新章節！', 'var(--gold)');
    openStoryScreen();
    return;
  }
  currentIntroLevelId = next.level.id;
  renderStoryIntro(next.level.id);
  document.getElementById('ov-story-intro')?.classList.add('on');
}

window.openStoryScreen = openStoryScreen;
window.closeStoryScreen = closeStoryScreen;
window.selectStoryLevel = selectStoryLevel;
window.confirmStartStoryBattle = confirmStartStoryBattle;
window.startStoryBattle = startStoryBattle;
window.backToStoryMapFromIntro = backToStoryMapFromIntro;
window.backToStoryMapFromVictory = backToStoryMapFromVictory;
window.challengeNextStoryLevel = challengeNextStoryLevel;
window.onStoryRepAttack = onStoryRepAttack;
window.updateStoryBattleHUD = updateStoryBattleHUD;
