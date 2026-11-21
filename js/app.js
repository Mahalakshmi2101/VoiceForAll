// ── APP.JS — Main Controller ──────────────────────────────────

const App = (() => {
  let currentLang = 'en';
  let currentMode = 'welcome';

  function init() {
    SpeechModule.init('speaking-status');
    EmergencyModule.init(currentLang);
    renderLangButtons();
    updateWelcomeTexts();
        CaregiverModule.checkFirstLaunch(currentLang);
    document.getElementById('welcome-screen').classList.remove('hidden');
    document.getElementById('mode-select').classList.add('hidden');
    document.getElementById('aac-board').classList.add('hidden');
    document.getElementById('signspeak-board').classList.add('hidden');
    document.getElementById('emergency-fab').classList.add('hidden');
  }

  function setLang(lang) {
    currentLang = lang;
    renderLangButtons();
    updateWelcomeTexts();
    AACModule.setLang(lang);
    EmergencyModule.setLang(lang);
    SignSpeakModule.setLang(lang);
    SignSpeakModule.renderGuide(lang);
    SpeechModule.updateSTTLang(lang);
    const sttBtn = document.getElementById('stt-btn');
    if (sttBtn) sttBtn.textContent = UI_STRINGS[lang].listenBtn;
    const sttPlaceholder = document.getElementById('stt-result');
    if (sttPlaceholder && sttPlaceholder.textContent === '') {
      sttPlaceholder.textContent = UI_STRINGS[lang].listenPlaceholder;
    }
  }

  function renderLangButtons() {
    const container = document.getElementById('lang-select');
    if (!container) return;
    container.innerHTML = Object.entries(LANG_DISPLAY_NAMES).map(([code, label]) => `
      <button class="lang-btn ${code === currentLang ? 'active' : ''}"
              onclick="App.setLang('${code}')">
        ${label}
      </button>
    `).join('');
  }

  function updateWelcomeTexts() {
    const s = UI_STRINGS[currentLang];
    const setHTML = (id, v) => { const el = document.getElementById(id); if (el) el.innerHTML = v; };
    const setText = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    setHTML('welcome-title', s.welcomeTitle);
    setText('welcome-sub', s.welcomeSub);
    setText('wc-speak-title', s.cardSpeakTitle);
    setText('wc-speak-desc', s.cardSpeakDesc);
    setText('wc-deaf-title', s.cardDeafTitle);
    setText('wc-deaf-desc', s.cardDeafDesc);
    setText('banner-title', s.bannerTitle);
    setText('banner-sub', s.bannerSub);
    setText('emg-heading', s.emergencyTitle);
    setText('emergency-fab-label', s.emergencyBtn);
    setText('response-title', s.responseTitle);
    setText('gesture-ref-title', s.gestureRef);
    setText('btn-speak-mode', s.modeSpeak);
    setText('btn-deaf-mode', s.modeDeaf);
  }

  function goHome() {
    currentMode = 'welcome';
    show('welcome-screen');
    hide('mode-select');
    hide('aac-board');
    hide('signspeak-board');
    hide('emergency-fab');
    MascotModule.show(false);
    SignSpeakModule.stopCamera();
  }

  function setMode(mode) {
    currentMode = mode;
    hide('welcome-screen');
    show('mode-select');
    show('emergency-fab');
    MascotModule.show(true);
    document.getElementById('btn-speak-mode').classList.toggle('active', mode === 'aac');
    document.getElementById('btn-deaf-mode').classList.toggle('active', mode === 'deaf');

    if (mode === 'aac') {
      show('aac-board');
      hide('signspeak-board');
      AACModule.init(currentLang);
      SignSpeakModule.stopCamera();
      MascotModule.speak('Here for you 💜');
    } else {
      hide('aac-board');
      show('signspeak-board');
      SignSpeakModule.renderGuide(currentLang);
      SignSpeakModule.startCamera(onCameraStatus);
      SpeechModule.initSTT('stt-btn', 'stt-result', currentLang);
      MascotModule.speak('Show your hand ✋');
    }
  }

  function onCameraStatus(status) {
    const el = document.getElementById('camera-status');
    const btn = document.getElementById('cam-toggle-btn');
    const s = UI_STRINGS[currentLang];
    if (!el) return;
    if (status === 'loading') {
      el.textContent = s.cameraLoading;
      el.className = 'status-badge loading';
    } else if (status === 'active') {
      el.textContent = s.cameraActive;
      el.className = 'status-badge on';
      if (btn) btn.textContent = s.pauseCamera;
    } else if (status === 'paused') {
      el.textContent = s.cameraPaused;
      el.className = 'status-badge off';
      if (btn) btn.textContent = s.resumeCamera;
    } else if (status === 'error') {
      el.textContent = s.cameraError;
      el.className = 'status-badge off';
    }
  }

   function speak(text, isEmergency = false) {
    SpeechModule.speak(text, currentLang, isEmergency);
    MascotModule.speak('🔊');
    // Open caregiver response panel after patient speaks
    if (!isEmergency && text && text.length > 4) {
      setTimeout(() => CaregiverModule.openCaregiverPanel(text, currentLang), 600);
    }
  }

  function speakEmergency(text) {
    speak(text, true);
    MascotModule.speak('🚨');
  }

  function speakCustomAAC() {
    const el = document.getElementById('custom-text');
    if (el && el.value.trim()) speak(el.value.trim());
  }

  function speakGesture() {
    const text = SignSpeakModule.getCurrentGestureText();
    if (text) speak(text);
  }

  function addGestureToSentence() {
    const added = SignSpeakModule.addToSentence();
    if (added) MascotModule.speak('➕');
  }

  function speakSentence() {
    const text = SignSpeakModule.getSentence();
    if (text) speak(text);
  }

  function clearSentence() {
    SignSpeakModule.clearSentence();
  }

  function toggleCamera() {
    SignSpeakModule.toggleCamera(onCameraStatus);
  }

  function show(id) { const el = document.getElementById(id); if (el) el.classList.remove('hidden'); }
  function hide(id) { const el = document.getElementById(id); if (el) el.classList.add('hidden'); }

    return {
    init, setLang, goHome, setMode,
    speak, speakEmergency, speakCustomAAC,
    speakGesture, addGestureToSentence,
    speakSentence, clearSentence, toggleCamera,
    openProfile: () => CaregiverModule.openProfileCard(currentLang)
  };
})();

document.addEventListener('DOMContentLoaded', () => App.init());