// ── AAC MODULE ────────────────────────────────────────────────
// Handles phrase board rendering and category switching

const AACModule = (() => {
  let currentCategory = 'emergency';
  let currentLang = 'en';

  function init(lang) {
    currentLang = lang;
    renderCategories();
    renderPhrases();
  }

  function setLang(lang) {
    currentLang = lang;
    renderCategories();
    renderPhrases();
  }

  function setCategory(cat) {
    currentCategory = cat;
    renderPhrases();
    // Update active button
    document.querySelectorAll('.cat-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.cat === cat);
    });
  }

  function renderCategories() {
    const s = UI_STRINGS[currentLang];
    const container = document.getElementById('category-strip');
    if (!container) return;
    const cats = [
      {id:'emergency', label: s.catEmergency},
      {id:'hospital',  label: s.catHospital},
      {id:'daily',     label: s.catDaily},
      {id:'emotions',  label: s.catEmotions},
      {id:'yesno',     label: s.catYesNo}
    ];
    container.innerHTML = cats.map(c => `
      <button class="cat-btn ${c.id === currentCategory ? 'active' : ''}"
              data-cat="${c.id}"
              onclick="AACModule._onCatClick('${c.id}')">
        ${c.label}
      </button>
    `).join('');
  }

  function renderPhrases() {
    const grid = document.getElementById('phrase-grid');
    if (!grid) return;
    const list = (PHRASES[currentLang] || PHRASES['en'])[currentCategory] || [];
    grid.innerHTML = list.map(p => `
            <button class="phrase-btn" onclick='App.speak(${JSON.stringify(p.text)})'>
        <span class="emoji">${p.emoji}</span>${p.text}
      </button>
    `).join('');
  }

  // Internal — called from inline onclick
  function _onCatClick(cat) { setCategory(cat); }

  return { init, setLang, setCategory, renderPhrases, _onCatClick };
})();