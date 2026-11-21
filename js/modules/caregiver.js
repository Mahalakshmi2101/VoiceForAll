// ── CAREGIVER MODULE ─────────────────────────────────────────
// Provides two features:
//   1. CaregiverPanel — hearing person's response board
//      (shown after patient speaks, closes the communication loop)
//   2. ProfileCard — patient's name, blood group, allergies, emergency contact
//      (always one tap away; filled once on first launch)

const CaregiverModule = (() => {

  // ── PROFILE STORAGE ───────────────────────────────────────
  const PROFILE_KEY = 'vfa_patient_profile';

  function getProfile() {
    try { return JSON.parse(localStorage.getItem(PROFILE_KEY)) || null; }
    catch { return null; }
  }

  function saveProfile(data) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
  }

  // ── PROFILE CARD UI ───────────────────────────────────────
  // Shows the saved card, or the setup form if not filled yet.
  function openProfileCard(lang) {
    const profile = getProfile();
    const s = UI_STRINGS[lang] || UI_STRINGS['en'];

    let el = document.getElementById('vfa-profile-overlay');
    if (!el) {
      el = document.createElement('div');
      el.id = 'vfa-profile-overlay';
      el.style.cssText = `
        position:fixed;inset:0;z-index:10000;
        background:rgba(0,0,0,0.88);
        display:flex;align-items:center;justify-content:center;
        padding:20px;font-family:'Nunito',sans-serif;`;
      document.body.appendChild(el);
    }

    if (profile && profile.name) {
      el.innerHTML = _profileCardHTML(profile, lang);
    } else {
      el.innerHTML = _profileFormHTML(lang);
      _attachFormListeners(lang);
    }

    el.style.display = 'flex';
    // Close on background tap
    el.addEventListener('click', (e) => {
      if (e.target === el) closeProfileCard();
    }, { once: true });
  }

  function closeProfileCard() {
    const el = document.getElementById('vfa-profile-overlay');
    if (el) el.style.display = 'none';
  }

  function _profileCardHTML(p, lang) {
    return `
      <div style="background:#fff;border-radius:24px;padding:28px 24px;
        max-width:340px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.5);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <div style="font-size:22px;font-weight:900;color:#1E1B2E;">🪪 Patient Card</div>
          <button onclick="CaregiverModule.editProfile('${lang}')"
            style="background:#F3F0FF;border:none;border-radius:10px;padding:6px 14px;
            font-weight:800;color:#6C47FF;font-size:13px;cursor:pointer;">Edit</button>
        </div>
        <div style="display:grid;gap:10px;">
          ${_row('👤 Name', p.name)}
          ${_row('🩸 Blood Group', p.bloodGroup || '—')}
          ${_row('⚠️ Allergies', p.allergies || 'None')}
          ${_row('📞 Emergency Contact', p.emergency || '—')}
          ${p.notes ? _row('📝 Notes', p.notes) : ''}
        </div>
        <button onclick="CaregiverModule.closeProfileCard()"
          style="margin-top:20px;width:100%;background:#6C47FF;color:#fff;border:none;
          border-radius:14px;padding:14px;font-size:16px;font-weight:800;cursor:pointer;">
          Close
        </button>
      </div>`;
  }

  function _row(label, value) {
    return `
      <div style="background:#F8F7FF;border-radius:12px;padding:10px 14px;">
        <div style="font-size:11px;font-weight:700;color:#9B8FC4;margin-bottom:2px;">${label}</div>
        <div style="font-size:16px;font-weight:700;color:#1E1B2E;">${value}</div>
      </div>`;
  }

  function _profileFormHTML(lang) {
    return `
      <div style="background:#fff;border-radius:24px;padding:28px 24px;
        max-width:340px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.5);max-height:90vh;overflow-y:auto;">
        <div style="font-size:20px;font-weight:900;color:#1E1B2E;margin-bottom:6px;">🪪 Set up your patient card</div>
        <div style="font-size:13px;color:#7A778F;margin-bottom:20px;font-weight:600;">
          Nurses and doctors can read this instantly — no language barrier.
        </div>
        ${_field('vfa-pf-name',      'Your name',              'text',  'e.g. Ravi Kumar')}
        ${_field('vfa-pf-blood',     'Blood group',            'text',  'e.g. O+')}
        ${_field('vfa-pf-allergy',   'Known allergies',        'text',  'e.g. Penicillin, Nuts (or None)')}
        ${_field('vfa-pf-emergency', 'Emergency contact & number', 'text', 'e.g. Priya - 9876543210')}
        ${_field('vfa-pf-notes',     'Other notes (optional)', 'text',  'e.g. Diabetic, uses insulin')}
        <button id="vfa-pf-save"
          style="margin-top:16px;width:100%;background:#6C47FF;color:#fff;border:none;
          border-radius:14px;padding:14px;font-size:16px;font-weight:800;cursor:pointer;">
          Save card
        </button>
        <button onclick="CaregiverModule.closeProfileCard()"
          style="margin-top:10px;width:100%;background:#F3F0FF;color:#6C47FF;border:none;
          border-radius:14px;padding:12px;font-size:15px;font-weight:700;cursor:pointer;">
          Skip for now
        </button>
      </div>`;
  }

  function _field(id, label, type, placeholder) {
    return `
      <div style="margin-bottom:14px;">
        <label style="font-size:12px;font-weight:800;color:#6C47FF;display:block;margin-bottom:5px;">
          ${label}
        </label>
        <input id="${id}" type="${type}" placeholder="${placeholder}"
          style="width:100%;box-sizing:border-box;padding:11px 14px;border:2px solid #E8E5F5;
          border-radius:12px;font-size:15px;font-family:'Nunito',sans-serif;outline:none;
          color:#1E1B2E;font-weight:600;"
          onfocus="this.style.borderColor='#6C47FF'"
          onblur="this.style.borderColor='#E8E5F5'"/>
      </div>`;
  }

  function _attachFormListeners(lang) {
    // Wait one tick for DOM
    setTimeout(() => {
      const btn = document.getElementById('vfa-pf-save');
      if (!btn) return;
      btn.onclick = () => {
        const profile = {
          name:        document.getElementById('vfa-pf-name')?.value.trim()      || '',
          bloodGroup:  document.getElementById('vfa-pf-blood')?.value.trim()     || '',
          allergies:   document.getElementById('vfa-pf-allergy')?.value.trim()   || '',
          emergency:   document.getElementById('vfa-pf-emergency')?.value.trim() || '',
          notes:       document.getElementById('vfa-pf-notes')?.value.trim()     || '',
        };
        if (!profile.name) {
          document.getElementById('vfa-pf-name').style.borderColor = '#FF4D6D';
          return;
        }
        saveProfile(profile);
        openProfileCard(lang); // re-render as card view
      };
    }, 50);
  }

  function editProfile(lang) {
    const el = document.getElementById('vfa-profile-overlay');
    if (!el) return;
    const profile = getProfile() || {};
    el.innerHTML = _profileFormHTML(lang);
    // Pre-fill existing values
    setTimeout(() => {
      const fields = {
        'vfa-pf-name': profile.name, 'vfa-pf-blood': profile.bloodGroup,
        'vfa-pf-allergy': profile.allergies, 'vfa-pf-emergency': profile.emergency,
        'vfa-pf-notes': profile.notes
      };
      Object.entries(fields).forEach(([id, val]) => {
        const el = document.getElementById(id);
        if (el && val) el.value = val;
      });
      _attachFormListeners(lang);
    }, 50);
  }

  // ── FIRST-LAUNCH PROMPT ───────────────────────────────────
  // Shows once — prompts user to set up their card.
  function checkFirstLaunch(lang) {
    if (getProfile()) return; // already set up
    const KEY = 'vfa_first_launch_shown';
    if (localStorage.getItem(KEY)) return;
    localStorage.setItem(KEY, '1');

    // Show after a short delay so the app loads first
    setTimeout(() => {
      const toast = document.createElement('div');
      toast.style.cssText = `
        position:fixed;bottom:100px;left:50%;transform:translateX(-50%);
        background:#1E1B2E;color:#fff;border-radius:16px;padding:14px 20px;
        font-family:'Nunito',sans-serif;font-size:14px;font-weight:700;
        z-index:9500;text-align:center;max-width:300px;width:90%;
        box-shadow:0 8px 30px rgba(0,0,0,0.4);cursor:pointer;
        border:1.5px solid #6C47FF;`;
      toast.innerHTML = `🪪 Set up your patient card<br>
        <span style="font-size:12px;font-weight:600;color:#A89FCC;">
          Doctors can read it instantly — no language needed
        </span>`;
      toast.onclick = () => { toast.remove(); openProfileCard(lang); };
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 8000);
    }, 2000);
  }

  // ── CAREGIVER RESPONSE PANEL ──────────────────────────────
  // Opens after a patient phrase is spoken.
  // Shows the hearing person (nurse/doctor) preset responses.
  // They tap one — it shows in large text to the patient.

  const CAREGIVER_RESPONSES = {
    en: [
      { emoji: '📍', text: 'Point to where it hurts' },
      { emoji: '🩺', text: 'A doctor is coming' },
      { emoji: '😌', text: 'You are safe now' },
      { emoji: '1️⃣', text: 'Rate your pain: 1' },
      { emoji: '3️⃣', text: 'Rate your pain: 3' },
      { emoji: '5️⃣', text: 'Rate your pain: 5' },
      { emoji: '✅', text: 'We understand' },
      { emoji: '⏳', text: 'Please wait' },
      { emoji: '💊', text: 'Medicine is coming' },
      { emoji: '👨‍👩‍👧', text: 'Family is on the way' },
      { emoji: '🚑', text: 'Ambulance is called' },
      { emoji: '🔄', text: 'Can you repeat that?' },
    ],
    hi: [
      { emoji: '📍', text: 'दर्द कहाँ है दिखाइए' },
      { emoji: '🩺', text: 'डॉक्टर आ रहे हैं' },
      { emoji: '😌', text: 'आप सुरक्षित हैं' },
      { emoji: '✅', text: 'हम समझ गए' },
      { emoji: '⏳', text: 'कृपया प्रतीक्षा करें' },
      { emoji: '💊', text: 'दवाई आ रही है' },
      { emoji: '🔄', text: 'क्या आप दोहरा सकते हैं?' },
    ],
    ta: [
      { emoji: '📍', text: 'வலி எங்கு என்று காட்டுங்கள்' },
      { emoji: '🩺', text: 'மருத்துவர் வருகிறார்' },
      { emoji: '😌', text: 'நீங்கள் பாதுகாப்பாக இருக்கிறீர்கள்' },
      { emoji: '✅', text: 'நாங்கள் புரிந்துகொண்டோம்' },
      { emoji: '⏳', text: 'தயவுசெய்து காத்திருங்கள்' },
      { emoji: '💊', text: 'மருந்து வருகிறது' },
      { emoji: '🔄', text: 'மீண்டும் சொல்லுங்கள்' },
    ],
    te: [
      { emoji: '📍', text: 'నొప్పి ఎక్కడ ఉందో చూపించండి' },
      { emoji: '🩺', text: 'డాక్టర్ వస్తున్నారు' },
      { emoji: '😌', text: 'మీరు సురక్షితంగా ఉన్నారు' },
      { emoji: '✅', text: 'మేము అర్థం చేసుకున్నాం' },
      { emoji: '⏳', text: 'దయచేసి వేచి ఉండండి' },
      { emoji: '💊', text: 'మందు వస్తుంది' },
      { emoji: '🔄', text: 'మళ్ళీ చెప్పగలరా?' },
    ],
    ml: [
      { emoji: '📍', text: 'വേദന എവിടെ ആണ് കാണിക്കൂ' },
      { emoji: '🩺', text: 'ഡോക്ടർ വരുന്നു' },
      { emoji: '😌', text: 'നിങ്ങൾ സുരക്ഷിതരാണ്' },
      { emoji: '✅', text: 'ഞങ്ങൾ മനസ്സിലാക്കി' },
      { emoji: '⏳', text: 'ദയവായി കാത്തിരിക്കൂ' },
      { emoji: '💊', text: 'മരുന്ന് വരുന്നു' },
      { emoji: '🔄', text: 'ആവർത്തിക്കാമോ?' },
    ],
    kn: [
      { emoji: '📍', text: 'ನೋವು ಎಲ್ಲಿದೆ ತೋರಿಸಿ' },
      { emoji: '🩺', text: 'ವೈದ್ಯರು ಬರುತ್ತಿದ್ದಾರೆ' },
      { emoji: '😌', text: 'ನೀವು ಸುರಕ್ಷಿತರಾಗಿದ್ದೀರಿ' },
      { emoji: '✅', text: 'ನಮಗೆ ಅರ್ಥವಾಯಿತು' },
      { emoji: '⏳', text: 'ದಯವಿಟ್ಟು ಕಾಯಿರಿ' },
      { emoji: '💊', text: 'ಔಷಧ ಬರುತ್ತಿದೆ' },
      { emoji: '🔄', text: 'ಮತ್ತೆ ಹೇಳಬಹುದೇ?' },
    ],
  };

  let _panelVisible = false;

  function openCaregiverPanel(patientText, lang) {
    if (_panelVisible) closeCaregiverPanel();

    const responses = CAREGIVER_RESPONSES[lang] || CAREGIVER_RESPONSES['en'];

    const overlay = document.createElement('div');
    overlay.id = 'vfa-caregiver-overlay';
    overlay.style.cssText = `
      position:fixed;inset:0;z-index:10001;
      background:rgba(10,8,25,0.95);
      display:flex;flex-direction:column;
      font-family:'Nunito',sans-serif;
      animation:vfa-slide-up 0.25s ease;`;

    overlay.innerHTML = `
      <style>
        @keyframes vfa-slide-up {
          from { transform:translateY(60px); opacity:0; }
          to   { transform:translateY(0);    opacity:1; }
        }
        .cg-btn {
          background:#1A1730;border:1.5px solid #2E2A4A;border-radius:14px;
          padding:14px 16px;cursor:pointer;display:flex;align-items:center;
          gap:12px;text-align:left;transition:background 0.15s,border-color 0.15s;
          color:#fff;font-family:'Nunito',sans-serif;
        }
        .cg-btn:hover, .cg-btn:active { background:#2A2550;border-color:#6C47FF; }
        .cg-btn .cg-emoji { font-size:22px;flex-shrink:0; }
        .cg-btn .cg-label { font-size:15px;font-weight:700;line-height:1.3; }
      </style>

      <!-- Header: what the patient said -->
      <div style="background:#6C47FF;padding:16px 20px 14px;flex-shrink:0;">
        <div style="font-size:11px;font-weight:800;color:rgba(255,255,255,0.7);
          letter-spacing:0.08em;margin-bottom:4px;">PATIENT SAID</div>
        <div style="font-size:18px;font-weight:900;color:#fff;line-height:1.3;">
          "${patientText}"
        </div>
      </div>

      <!-- Label for caregiver -->
      <div style="padding:14px 20px 8px;flex-shrink:0;">
        <div style="font-size:13px;font-weight:800;color:#6C47FF;letter-spacing:0.06em;">
          TAP TO RESPOND
        </div>
        <div style="font-size:12px;font-weight:600;color:#5A576F;margin-top:2px;">
          Your response will show on screen in large text
        </div>
      </div>

      <!-- Response grid -->
      <div id="vfa-cg-grid" style="flex:1;overflow-y:auto;padding:0 16px 16px;
        display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        ${responses.map(r => `
          <button class="cg-btn" onclick="CaregiverModule._onCaregiverResponse('${r.text.replace(/'/g,"\\'")}','${lang}')">
            <span class="cg-emoji">${r.emoji}</span>
            <span class="cg-label">${r.text}</span>
          </button>`).join('')}
      </div>

      <!-- Close -->
      <div style="padding:12px 16px 20px;flex-shrink:0;">
        <button onclick="CaregiverModule.closeCaregiverPanel()"
          style="width:100%;background:#1A1730;border:1.5px solid #2E2A4A;border-radius:14px;
          padding:14px;color:#A89FCC;font-size:15px;font-weight:700;
          font-family:'Nunito',sans-serif;cursor:pointer;">
          Close
        </button>
      </div>`;

    document.body.appendChild(overlay);
    _panelVisible = true;
  }

  function _onCaregiverResponse(text, lang) {
    closeCaregiverPanel();
    // Show the caregiver's reply in large text to the patient
    _showCaregiverReply(text, lang);
    // Also speak it
    SpeechModule.speak(text, lang, false);
  }

  function _showCaregiverReply(text, lang) {
    let el = document.getElementById('vfa-cg-reply-overlay');
    if (!el) {
      el = document.createElement('div');
      el.id = 'vfa-cg-reply-overlay';
      el.style.cssText = `
        position:fixed;inset:0;z-index:10002;
        background:#6C47FF;
        display:flex;flex-direction:column;
        align-items:center;justify-content:center;
        padding:40px 28px;font-family:'Nunito',sans-serif;
        cursor:pointer;`;
      el.onclick = () => { el.style.display = 'none'; };
      document.body.appendChild(el);
    }
    el.innerHTML = `
      <div style="font-size:13px;font-weight:800;color:rgba(255,255,255,0.65);
        letter-spacing:0.08em;margin-bottom:16px;">NURSE / DOCTOR SAYS</div>
      <div style="font-size:36px;font-weight:900;color:#fff;text-align:center;
        line-height:1.3;max-width:320px;">${text}</div>
      <div style="margin-top:32px;font-size:13px;color:rgba(255,255,255,0.5);font-weight:600;">
        Tap anywhere to continue
      </div>`;
    el.style.display = 'flex';
    SpeechModule.vibrate([80, 40, 80, 40, 80]);
  }

  function closeCaregiverPanel() {
    const el = document.getElementById('vfa-caregiver-overlay');
    if (el) { el.remove(); _panelVisible = false; }
  }

  return {
    openProfileCard,
    closeProfileCard,
    editProfile,
    checkFirstLaunch,
    openCaregiverPanel,
    closeCaregiverPanel,
    _onCaregiverResponse,
  };
})();
