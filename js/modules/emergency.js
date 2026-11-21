// ── EMERGENCY MODULE ──────────────────────────────────────────
// Full-screen emergency overlay

const EmergencyModule = (() => {
  let currentLang = 'en';

  function init(lang) {
    currentLang = lang;
    renderGrid();
  }

  function setLang(lang) {
    currentLang = lang;
    renderGrid();
    // Update heading
    const heading = document.getElementById('emg-heading');
    if (heading) heading.textContent = UI_STRINGS[lang].emergencyTitle;
  }

  function open() {
    const screen = document.getElementById('emergency-screen');
    if (screen) screen.classList.add('active');
    renderGrid();
  }

  function close() {
    const screen = document.getElementById('emergency-screen');
    if (screen) screen.classList.remove('active');
  }

  function renderGrid() {
    const list = (PHRASES[currentLang] || PHRASES['en']).emergency || [];
    const grid = document.getElementById('emg-grid');
    if (!grid) return;
    grid.innerHTML = list.map(p => `
      <button class="emg-btn" onclick="App.speakEmergency(${JSON.stringify(p.text)})">
        <span class="emg-emoji">${p.emoji}</span>
        <div class="emg-text">${p.text}</div>
      </button>
    `).join('');
  }

  function speakCustom() {
    const el = document.getElementById('emg-custom-text');
    if (el && el.value.trim()) App.speak(el.value.trim(), true);
  }

  return { init, open, close, setLang, speakCustom };
})();