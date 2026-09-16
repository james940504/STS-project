/* ══════════════════════════════════════════════════════════════
   隱私權 / 攝影機使用同意 / 運動安全提醒 (Privacy & Consent)
   ══════════════════════════════════════════════════════════════ */

const LEGAL_VERSION = 'v2';
const LEGAL_UPDATED_DATE = '2026-07-08';

function hasAgreedToLegal() {
  const s = loadSave();
  return !!(s.legalConsent && s.legalConsent.version === LEGAL_VERSION);
}

function renderLegalContent(mode) {
  const el = document.getElementById('legal-content');
  if (!el) return;

  const curLang = (typeof gameSettings !== 'undefined' && gameSettings.lang) 
               || window.currentLang 
               || localStorage.getItem('app_lang') 
               || 'zh-TW';

  // 2. 繁體中文內容
  const contentZh = `
    <div class="legal-section">
      <h3>📄 隱私權政策</h3>
      <p class="legal-updated">最後更新日期：${LEGAL_UPDATED_DATE}</p>
      <p><strong>攝影機影像：</strong>為提供姿勢辨識、動作評分與訓練報告功能，遊戲進行中擷取的攝影機影像（或由影像擷取之姿勢關鍵點資料）會透過加密連線傳送至我們的伺服器進行運算與必要之儲存。此類資料屬於較敏感之生理／健康相關資料，我們僅會將其用於提供、維護與改善本服務，不會用於與本服務無關之目的。</p>
      <p><strong>資料傳輸與儲存安全：</strong>影像資料傳輸過程採加密連線（HTTPS/TLS）保護；伺服器端資料由我們及委任之雲端服務供應商依保密義務管理，並採取合理之技術與組織安全措施，以防止未經授權之存取、外洩、竄改或毀損。</p>
      <p><strong>資料保留期間：</strong>攝影機影像／姿勢影格資料於完成處理、產生對應之訓練報告與分數後，預設將於一定期間內（例如 30 天，實際天數請以我們公告之最新設定為準）刪除，僅保留去識別化之統計數據（例如分數、次數、角度指標）供你查看歷史紀錄與排行榜使用。</p>
      <p><strong>第三方與資料處理者：</strong>我們可能委託雲端主機、運算或 AI 服務供應商協助處理與儲存前述資料，該等供應商僅得依我們之指示處理資料並負保密義務，不會另行用於其自身目的。除法律要求或經你同意外，我們不會將你的攝影機影像提供予其他第三方（例如廣告商）。若我們使用之伺服器位於境外，你的資料可能因此傳輸至該地區處理與儲存，我們將要求供應商提供不低於本政策所定之保護水準。</p>
      <p><strong>你的資料權利：</strong>你可以隨時要求查詢、更正或刪除我們保存之個人資料（包含伺服器端之影像／報告紀錄），亦可要求我們停止處理或撤回同意。請透過本政策所載聯絡方式提出申請，我們將於合理期限內處理。</p>
      <p><strong>AI 教練對話：</strong>使用「AI 教練」功能時，你輸入的文字內容會傳送至第三方服務（Google Gemini API）以產生回覆，該部分資料傳輸受 Google 之隱私權政策規範，請避免輸入個人敏感資訊。</p>
      <p><strong>個人識別資訊：</strong>我們不會另外收集你的真實姓名、電子郵件或電話；排行榜暱稱為你自行輸入的 3 字暱稱。</p>
      <p><strong>未成年使用者：</strong>若你未滿法定年齡，建議在家長或監護人陪同下使用本應用程式。</p>
      <p><strong>政策更新：</strong>本政策如有變更，將於本頁面更新版本與日期，請定期查閱；如涉及重大變更（例如資料用途擴大），我們會請你重新閱讀並同意。</p>
    </div>
    <div class="legal-section">
      <h3>📷 攝影機使用說明與同意</h3>
      <p>本遊戲需要使用你的攝影機，即時偵測身體姿勢（例如坐下、站立、腳跟角度等），以判斷遊戲中的動作是否正確。</p>
      <p>為提供姿勢辨識、動作評分與訓練報告功能，遊戲進行中的攝影機影像（或由影像擷取之姿勢關鍵點資料）將<strong>傳送至我們的伺服器</strong>進行運算與必要儲存，用途包含：即時姿勢判定、產生訓練報告，以及服務品質改善。我們會採取加密傳輸與合理之安全措施保護此等資料，並依【隱私權政策】所述之保留期限處理。</p>
      <p>瀏覽器將另外跳出系統的攝影機權限請求，你可隨時在瀏覽器設定中撤銷此授權；若不同意將影像資料傳送至伺服器處理，你可以選擇不使用本遊戲的動作偵測功能。</p>
    </div>
    <div class="legal-section">
      <h3>⚠️ 運動安全提醒</h3>
      <p>本遊戲為輔助「坐站訓練」的居家運動輔助工具，內容僅供一般運動參考，<strong>並非醫療器材，也不能取代物理治療師、醫師或專業教練之評估與指導</strong>。</p>
      <p>若你有下列狀況，請於運動前諮詢醫師或物理治療師：心血管疾病、平衡感不佳、近期跌倒病史、骨質疏鬆、關節或脊椎手術史、暈眩或姿勢性低血壓，或其他不適合從事下肢運動之狀況。</p>
      <p>使用時請確保：座椅穩固、不會滑動，且有足夠支撐；周圍空間淨空、移除障礙物；長者或平衡感較弱者，建議有人在旁陪同或攙扶。</p>
      <p>若運動過程中感到胸悶、頭暈、關節劇痛、失去平衡或任何不適，請<strong>立即停止並休息</strong>，必要時尋求醫療協助。使用本遊戲之風險由使用者自行承擔。</p>
    </div>
  `;

  // 3. 英文內容
  const contentEn = `
    <div class="legal-section">
      <h3>📄 Privacy Policy</h3>
      <p class="legal-updated">Last Updated: ${LEGAL_UPDATED_DATE}</p>
      <p><strong>Camera Images:</strong> To provide posture recognition, motion scoring, and training report features, camera images (or pose keypoint data extracted from images) captured during gameplay will be transmitted via encrypted connection to our servers for computing and necessary storage. This sensitive physiological/health data is used solely to provide, maintain, and improve this service, and will not be used for unrelated purposes.</p>
      <p><strong>Transmission & Storage Security:</strong> Image data transmission is protected via encrypted connections (HTTPS/TLS). Server-side data is managed under confidentiality obligations using reasonable technical and organizational security measures to prevent unauthorized access, disclosure, alteration, or destruction.</p>
      <p><strong>Data Retention:</strong> Camera images and pose frame data will be deleted after processing and generating training reports/scores within a default period (e.g., 30 days). Only anonymized statistical data (e.g., scores, reps, angle metrics) will be retained for history and leaderboards.</p>
      <p><strong>Third Parties & Processors:</strong> We may entrust cloud hosting or AI providers to assist in processing and storing data. These providers process data strictly under our instructions under confidentiality obligations. Except when required by law or with your consent, we will not provide your camera images to third parties (such as advertisers).</p>
      <p><strong>Your Data Rights:</strong> You may request to inquire, correct, or delete personal data stored on our servers at any time, or withdraw consent by contacting us. We will handle your request within a reasonable timeframe.</p>
      <p><strong>Game Records:</strong> Coins, characters, achievements, quest progress, sign-in records, and leaderboard scores are stored in your browser's local storage (localStorage) and do not sync across devices. Clearing browser data will result in loss of local records.</p>
      <p><strong>AI Coach Chat:</strong> Text messages entered in "AI Coach" are sent to a third-party service (Google Gemini API) to generate responses. This transmission is governed by Google's Privacy Policy; please avoid entering sensitive personal details.</p>
      <p><strong>Personal Identifiable Information:</strong> We do not collect your real name, email, or phone number. Leaderboard nicknames are 3-character handles chosen by you.</p>
      <p><strong>Minor Users:</strong> Users under legal age are advised to use this application under parent or guardian supervision.</p>
      <p><strong>Policy Updates:</strong> Revisions will be posted here with updated dates. Major changes will prompt a re-consent request.</p>
    </div>
    <div class="legal-section">
      <h3>📷 Camera Usage & Consent</h3>
      <p>This game requires camera access to detect body posture in real time (e.g., sitting, standing, heel angles) and evaluate your movements.</p>
      <p>Camera images or keypoint data during gameplay are <strong>transmitted to our servers</strong> for computing posture accuracy, generating training reports, and service improvement under encrypted transmission and strict retention limits.</p>
      <p>Your browser will prompt for camera permission, which you can revoke anytime in browser settings. If you do not consent to server-side image processing, you may choose not to use motion detection features.</p>
    </div>
    <div class="legal-section">
      <h3>⚠️ Exercise Safety Disclaimer</h3>
      <p>This game is a home exercise tool designed to assist Sit-to-Stand training. Content is for general fitness reference only, <strong>is not a medical device, and cannot replace professional physical therapy, medical diagnosis, or coaching guidance</strong>.</p>
      <p>Please consult a physician before exercising if you have: cardiovascular disease, poor balance, recent fall history, osteoporosis, joint/spine surgery history, dizziness, or orthostatic hypotension.</p>
      <p>Always ensure: chairs are stable and non-slip; exercise space is cleared of obstacles; elderly users or those with poor balance have supervision or support nearby.</p>
      <p>If you experience chest tightness, dizziness, severe joint pain, or loss of balance, <strong>stop immediately and rest</strong>. Seek medical aid if necessary. Users assume all risks associated with using this game.</p>
    </div>
  `;

  // 4. 寫入內容
  el.innerHTML = (curLang === 'en') ? contentEn : contentZh;

  // 5. 按鈕與模式切換
  const agreeRow = document.getElementById('legal-agree-row');
  const agreeBtn = document.getElementById('legal-agree-btn');
  const closeBtn = document.getElementById('legal-close-btn');
  const checkbox = document.getElementById('legal-agree-checkbox');
  if (!agreeRow || !agreeBtn || !closeBtn || !checkbox) return;

  // 💡【關鍵修復】如果沒有傳 mode，自動根據當前顯示狀態判定是 view 還是 onboarding
  if (!mode) {
    mode = (agreeRow.style.display !== 'none' && agreeRow.style.display !== '') ? 'onboarding' : 'view';
  }

  if (mode === 'view') {
    agreeRow.style.display = 'none';
    agreeBtn.style.display = 'none';
    closeBtn.style.display = '';
  } else {
    agreeRow.style.display = 'flex';
    agreeBtn.style.display = '';
    closeBtn.style.display = 'none';
  }
}


function openLegalOverlay(mode) {
  const modal = document.getElementById('ov-legal');
  if (!modal) return;
  renderLegalContent(mode);
  modal.classList.remove('off');
}

function closeLegalOverlay() {
  const modal = document.getElementById('ov-legal');
  if (!modal) return;
  if (typeof playSfx === 'function') playSfx('click');
  modal.classList.add('off');
}

function agreeToLegal() {
  const checkbox = document.getElementById('legal-agree-checkbox');
  const curLang = window.currentLang || localStorage.getItem('app_lang') || 'zh-TW';

  if (!checkbox || !checkbox.checked) {
    if (typeof showToast === 'function') {
      const toastMsg = (curLang === 'en')
        ? 'Reminder: please read and check the box to agree to the Privacy & Safety Notice.'
        : '提醒：請先閱讀並勾選同意隱私權與安全聲明';
      showToast(toastMsg, 'var(--red)');
    }
  } else {
    const s = loadSave();
    s.legalConsent = { version: LEGAL_VERSION, agreedAt: Date.now() };
    writeSave(s);
  }
  if (typeof playSfx === 'function') playSfx('click');
  closeLegalOverlay();
}

// 💡 補上：監聽語言切換事件，即時重新渲染條款視窗
window.addEventListener('languageChanged', () => {
  const modal = document.getElementById('ov-legal');
  if (modal && !modal.classList.contains('off')) {
    const isConsentMode = document.getElementById('legal-agree-row')?.style.display !== 'none';
    renderLegalContent(isConsentMode ? 'onboarding' : 'view');
  }
});

window.addEventListener('DOMContentLoaded', () => {
  if (!hasAgreedToLegal()) {
    openLegalOverlay('onboarding');
  }
});
window.renderLegalContent = renderLegalContent;