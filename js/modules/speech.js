// ── SPEECH MODULE ────────────────────────────────────────────
// TTS + STT. Sound fix: unlock utterance is now protected from
// cancel(). Vibration added for deaf-user haptic confirmation.

const SpeechModule = (() => {
  let availableVoices = [];
  let voiceWarningShown = {};
  let statusEl = null;
  let audioUnlocked = false;  // ← tracks whether Chrome is unlocked

  function init(speakingStatusElementId) {
    statusEl = document.getElementById(speakingStatusElementId);
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    setTimeout(loadVoices, 500);
    setTimeout(loadVoices, 1500);

    // ── UNLOCK FIX ──────────────────────────────────────────
    // Chrome blocks TTS until a real user gesture happens.
    // We fire a silent utterance on first touch/click.
    // KEY FIX: we do NOT call cancel() before this utterance —
    // that was killing the unlock before it could register.
    const unlock = () => {
      if (audioUnlocked) return;
      const u = new SpeechSynthesisUtterance(' ');
      u.volume = 0;
      u.rate   = 10;
      u.onend  = () => { audioUnlocked = true; };
      u.onerror = () => { audioUnlocked = true; }; // count it anyway
      window.speechSynthesis.speak(u);
      document.removeEventListener('pointerdown', unlock);
      document.removeEventListener('click', unlock);
    };
    document.addEventListener('pointerdown', unlock, { once: true });
    document.addEventListener('click',       unlock, { once: true });
  }

  function loadVoices() {
    const v = window.speechSynthesis.getVoices();
    if (v.length) availableVoices = v;
  }

  function findVoice(langCode) {
    if (!availableVoices.length) loadVoices();
    let v = availableVoices.find(v => v.lang === langCode);
    if (v) return v;
    const prefix = langCode.split('-')[0];
    v = availableVoices.find(v => v.lang.startsWith(prefix));
    if (v) return v;
    return availableVoices.find(v => v.lang.startsWith('en')) || null;
  }

  function speak(text, lang, isEmergency = false) {
    if (!text || !text.trim()) return;

    if (!availableVoices.length) {
      loadVoices();
      if (!availableVoices.length) {
        setTimeout(() => speak(text, lang, isEmergency), 400);
        return;
      }
    }

    const targetCode = LANG_VOICE_MAP[lang] || 'en-IN';
    const voice      = findVoice(targetCode);
    const matchesLang = voice && voice.lang.startsWith(lang === 'en' ? 'en' : lang);

    flashText(text);
    vibrate(); // haptic for deaf users

    if (!matchesLang) {
      showNoVoiceWarning(lang);
      if (!isEmergency) return;
      _doSpeak(text, findVoice('en-IN'), lang);
      return;
    }
    _doSpeak(text, voice, lang);
  }

  function _doSpeak(text, voice, lang) {
    // ── CANCEL FIX ─────────────────────────────────────────
    // Only cancel if something is actively speaking — do NOT
    // cancel if synth is idle, because that resets Chrome's
    // internal state and can eat the next utterance.
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    const utter = new SpeechSynthesisUtterance(text);
    if (voice) utter.voice = voice;
    utter.lang   = LANG_VOICE_MAP[lang] || 'en-IN';
    utter.rate   = 0.9;
    utter.pitch  = 1.05;
    utter.volume = 1;

    if (statusEl) {
      statusEl.textContent = '🔊 Speaking...';
      utter.onend   = () => { if (statusEl) statusEl.textContent = ''; };
      utter.onerror = (e) => {
        if (statusEl) statusEl.textContent = '';
        if (e.error !== 'interrupted') console.warn('TTS error:', e.error, text);
      };
    }

    // No setTimeout — must stay inside user gesture trust window
    window.speechSynthesis.speak(utter);
  }

  // ── VIBRATION ─────────────────────────────────────────────
  // Short pulse so deaf users know the gesture/tap was registered.
  function vibrate(pattern = [60, 40, 60]) {
    if (navigator.vibrate) navigator.vibrate(pattern);
  }

  // ── FLASH OVERLAY ─────────────────────────────────────────
  function flashText(text) {
    let overlay = document.getElementById('vfa-flash-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'vfa-flash-overlay';
      overlay.style.cssText = `
        position:fixed;inset:0;z-index:9999;
        background:rgba(0,0,0,0.82);
        display:flex;align-items:center;justify-content:center;
        padding:32px;opacity:0;transition:opacity 0.2s ease;pointer-events:none;`;
      overlay.innerHTML = `
        <div style="background:white;border-radius:24px;padding:32px 28px;
          text-align:center;max-width:340px;width:100%;
          box-shadow:0 20px 60px rgba(0,0,0,0.5);">
          <div id="vfa-flash-text" style="font-family:'Nunito',sans-serif;
            font-size:26px;font-weight:900;color:#1E1B2E;line-height:1.4;"></div>
          <div style="margin-top:12px;font-size:13px;color:#7A778F;font-weight:700;">🔊 Speaking</div>
        </div>`;
      document.body.appendChild(overlay);
    }
    document.getElementById('vfa-flash-text').textContent = text;
    overlay.style.opacity      = '1';
    overlay.style.pointerEvents = 'auto';
    clearTimeout(overlay._timer);
    overlay._timer = setTimeout(() => {
      overlay.style.opacity      = '0';
      overlay.style.pointerEvents = 'none';
    }, 2500);
  }

  function showNoVoiceWarning(lang) {
    if (voiceWarningShown[lang]) return;
    voiceWarningShown[lang] = true;
    const s = UI_STRINGS[lang] || UI_STRINGS['en'];
    const banner = document.createElement('div');
    banner.style.cssText = `
      position:fixed;bottom:90px;left:50%;transform:translateX(-50%);
      background:#2D1B0E;color:#F5A623;border:1px solid #F5A623;
      border-radius:12px;padding:10px 18px;font-size:13px;font-weight:700;
      font-family:'Nunito',sans-serif;z-index:9000;text-align:center;
      max-width:320px;width:90%;box-shadow:0 4px 20px rgba(0,0,0,0.4);`;
    banner.textContent = s.noVoiceWarning || 'Voice not available for this language on this device.';
    document.body.appendChild(banner);
    setTimeout(() => banner.remove(), 5000);
  }

  // ── STT ───────────────────────────────────────────────────
  let sttRecognition = null;
  let sttRunning     = false;

  function initSTT(btnId, resultId, lang) {
    const btn       = document.getElementById(btnId);
    const resultDiv = document.getElementById(resultId);
    if (!btn || !resultDiv) return;
    btn.onclick = () => toggleSTT(btn, resultDiv, lang);
  }

  function toggleSTT(btn, resultDiv, lang) {
    const s  = UI_STRINGS[lang] || UI_STRINGS['en'];
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { resultDiv.textContent = 'Speech recognition not supported. Use Chrome.'; return; }
    if (sttRunning) { sttRecognition && sttRecognition.stop(); return; }

    sttRecognition = new SR();
    sttRecognition.lang            = LANG_VOICE_MAP[lang] || 'en-IN';
    sttRecognition.continuous      = false;
    sttRecognition.interimResults  = true;

    sttRecognition.onstart  = () => {
      sttRunning = true;
      btn.textContent = s.listeningBtn || '🔴 Listening...';
      btn.classList.add('listening');
      resultDiv.textContent = '...';
    };
    sttRecognition.onresult = (e) => {
      let t = '';
      for (let i = e.resultIndex; i < e.results.length; i++) t += e.results[i][0].transcript;
      resultDiv.textContent = t;
      resultDiv.style.fontSize = t.length < 40 ? '20px' : '16px';
    };
    sttRecognition.onend   = () => {
      sttRunning = false;
      btn.textContent = s.listenBtn || '🎤 Speak';
      btn.classList.remove('listening');
    };
    sttRecognition.onerror = (e) => {
      sttRunning = false;
      btn.textContent = s.listenBtn || '🎤 Speak';
      btn.classList.remove('listening');
      resultDiv.textContent = e.error === 'not-allowed' ? 'Mic denied.' : 'Error: ' + e.error;
    };
    sttRecognition.start();
  }

  function updateSTTLang(lang) { if (sttRunning) sttRecognition && sttRecognition.stop(); }

  return { init, speak, vibrate, initSTT, updateSTTLang, flashText };
})();
