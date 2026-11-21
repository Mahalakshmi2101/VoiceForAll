const SignSpeakModule = (() => {
  let handsInstance = null;
  let cameraInstance = null;
  let cameraRunning = false;
  let currentLang = 'en';
  let currentGestureId = null;
  let lastDetectedGesture = null;
  let gestureHoldCount = 0;
  const HOLD_THRESHOLD = 7;

  // ── FINGER STATE ─────────────────────────────────────────────
  // Returns [thumb, index, middle, ring, pinky] — true = extended
  // Uses a 0.03 margin on finger extension to suppress noise
  function getFingerState(lm) {
    // Thumb: wrist-to-tip distance vs wrist-to-IP distance, with clear margin
    const wristTip = Math.hypot(lm[4].x - lm[0].x, lm[4].y - lm[0].y);
    const wristIP  = Math.hypot(lm[3].x - lm[0].x, lm[3].y - lm[0].y);
    const thumbAwayFromPalm = Math.hypot(lm[4].x - lm[5].x, lm[4].y - lm[5].y) > 0.1;
    const th = (wristTip > wristIP * 1.15) && thumbAwayFromPalm;

    const tips = [8, 12, 16, 20];
    const pips = [6, 10, 14, 18];
    const fingers = tips.map((tip, i) => (lm[pips[i]].y - lm[tip].y) > 0.03);
    return [th, ...fingers];
  }

  // ── THUMB DIRECTION ───────────────────────────────────────────
  // For thumbs-up vs thumbs-down:
  // thumb tip y < wrist y → pointing UP
  // thumb tip y > wrist y → pointing DOWN
  function thumbPointsDown(lm) {
    return lm[4].y > lm[0].y + 0.05; // tip is clearly below wrist
  }

  // ── CLASSIFY ─────────────────────────────────────────────────
  function classifyGesture(lm) {
    const [th, ix, mi, ri, pi] = getFingerState(lm);
    const thumbIndexDist = Math.hypot(lm[4].x - lm[8].x, lm[4].y - lm[8].y);

    // ── 0 fingers extended ───────────────────────────────────
    if (!th && !ix && !mi && !ri && !pi) return 'pain';         // closed fist

    // ── PINKY ONLY ────────────────────────────────────────────
    if (!th && !ix && !mi && !ri && pi) return 'toilet';        // pinky only → toilet

    // ── RING + PINKY ──────────────────────────────────────────
    if (!th && !ix && !mi && ri && pi) return 'medicine';       // ring+pinky → medicine

    // ── THUMB ONLY ────────────────────────────────────────────
    if (th && !ix && !mi && !ri && !pi) {
      // thumbs up vs thumbs down
      return thumbPointsDown(lm) ? 'repeat' : 'understand';
    }

    // ── INDEX ONLY ────────────────────────────────────────────
    if (!th && ix && !mi && !ri && !pi) {
      // index up (vertical) vs index sideways (horizontal → police)
      const dxIndex = Math.abs(lm[8].x - lm[5].x); // tip vs MCP
      const dyIndex = Math.abs(lm[8].y - lm[5].y);
      return (dxIndex > dyIndex) ? 'police' : 'no';
    }

    // ── 2-FINGER COMBOS ───────────────────────────────────────
    if (!th && ix && mi && !ri && !pi) {
      // V-sign (yes) vs crossed (sad)
      const tipDist = Math.hypot(lm[8].x - lm[12].x, lm[8].y - lm[12].y);
      return (tipDist < 0.04) ? 'sad' : 'yes';
    }
    if (th  && ix && !mi && !ri && !pi) return 'lost';          // L-shape
    if (th  && !ix && !mi && !ri && pi) return 'family';        // shaka
    if (!th && ix && !mi && !ri && pi)  return 'danger';        // horns (no thumb)

    // ── ILY: thumb + index + pinky ────────────────────────────
    if (th && ix && !mi && !ri && pi) return 'water';

    // ── PINCH: thumb+index close, rest folded ─────────────────
    if (th && ix && !mi && !ri && !pi && thumbIndexDist < 0.07) return 'scared';

    // ── THREE FINGERS ─────────────────────────────────────────
    if (!th && ix && mi && ri && !pi) return 'ambulance';       // index+mid+ring
    if (!th && ix && mi && !ri && pi) return 'police';          // fallback: ix+mi+pi (less reliable, prefer sideways-index above)

    // ── FOUR FINGERS (no thumb) ───────────────────────────────
    if (!th && ix && mi && ri && pi) return 'hungry';           // 4 up, no thumb

    // ── THUMB + MID + RING + PINKY (index folded) ─────────────
    if (th && !ix && mi && ri && pi) return 'home';

    // ── ALL 5 ─────────────────────────────────────────────────
    if (th && ix && mi && ri && pi) {
      // Doctor (Vulcan): index+middle pair tight, ring+pinky pair tight, big gap between
      const ixMiGap = Math.abs(lm[8].x  - lm[12].x);
      const riPiGap = Math.abs(lm[16].x - lm[20].x);
      const pairGap = Math.abs((lm[8].x + lm[12].x)/2 - (lm[16].x + lm[20].x)/2);
      if (ixMiGap < 0.05 && riPiGap < 0.05 && pairGap > 0.07) return 'doctor';

      // Thankyou: palm facing DOWN (z negative on middle MCP)
      if (lm[9].z < -0.07) return 'thankyou';

      // Default all-5: help
      return 'help';
    }

    return null;
  }

  // ── PROGRESS BAR ─────────────────────────────────────────────
  function updateProgressBar(count) {
    const bar = document.getElementById('gesture-progress-bar');
    if (!bar) return;
    const pct = Math.min((count / HOLD_THRESHOLD) * 100, 100);
    bar.style.width = pct + '%';
    bar.style.background = pct >= 100 ? '#00C9B1' : '#7C5CBF';
  }

  // ── MEDIAPIPE RESULTS ────────────────────────────────────────
  function onResults(results) {
    const canvas = document.getElementById('output-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const video = document.getElementById('input-video');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      const lm = results.multiHandLandmarks[0];
      if (typeof drawConnectors !== 'undefined') {
        drawConnectors(ctx, lm, HAND_CONNECTIONS, {color:'#3BBFB2', lineWidth:2.5});
        drawLandmarks(ctx, lm, {color:'#fff', lineWidth:1, radius:5});
      }
      const detected = classifyGesture(lm);
      if (detected) {
        if (detected === lastDetectedGesture) {
          gestureHoldCount++;
          updateProgressBar(gestureHoldCount);
          if (gestureHoldCount >= HOLD_THRESHOLD) {
            confirmGesture(detected);
            gestureHoldCount = 0;
          }
        } else {
          lastDetectedGesture = detected;
          gestureHoldCount = 1;
          updateProgressBar(1);
          showTentativeGesture(detected);
        }
      } else {
        lastDetectedGesture = null;
        gestureHoldCount = 0;
        updateProgressBar(0);
        showNoHand();
      }
    } else {
      gestureHoldCount = 0;
      updateProgressBar(0);
    }
  }

  function showTentativeGesture(id) {
    const g = GESTURES.find(x => x.id === id);
    if (!g) return;
    const textEl = document.getElementById('gesture-text');
    const transEl = document.getElementById('gesture-translation');
    if (textEl) { textEl.textContent = g.emoji + ' ' + g[currentLang]; textEl.style.opacity = '0.5'; }
    if (transEl) transEl.textContent = 'Hold steady...';
  }

  function confirmGesture(id) {
    currentGestureId = id;
    const g = GESTURES.find(x => x.id === id);
    if (!g) return;
    const textEl = document.getElementById('gesture-text');
    const transEl = document.getElementById('gesture-translation');
    if (textEl) { textEl.textContent = g.emoji + ' ' + g[currentLang]; textEl.style.opacity = '1'; }
    if (transEl) transEl.textContent = g.instruction;
    if (navigator.vibrate) navigator.vibrate(150);
    flashCanvasGreen();
  }

  function showNoHand() {
    const textEl = document.getElementById('gesture-text');
    if (textEl && textEl.style.opacity !== '1') textEl.textContent = '— show your hand —';
  }

  function flashCanvasGreen() {
    const canvas = document.getElementById('output-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0,201,177,0.25)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setTimeout(() => ctx.clearRect(0, 0, canvas.width, canvas.height), 200);
  }

  // ── CAMERA ───────────────────────────────────────────────────
  async function startCamera(onStatusChange) {
    onStatusChange('loading');
    try {
      handsInstance = new Hands({ locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}` });
      handsInstance.setOptions({ maxNumHands:1, modelComplexity:1, minDetectionConfidence:0.75, minTrackingConfidence:0.6 });
      handsInstance.onResults(onResults);
      const video = document.getElementById('input-video');
      cameraInstance = new Camera(video, {
        onFrame: async () => { if (handsInstance) await handsInstance.send({image:video}); },
        width:640, height:480
      });
      await cameraInstance.start();
      cameraRunning = true;
      onStatusChange('active');
    } catch(e) { onStatusChange('error'); }
  }

  function stopCamera() {
    if (cameraInstance) { try { cameraInstance.stop(); } catch(e) {} cameraRunning = false; }
    if (handsInstance)  { try { handsInstance.close();  } catch(e) {} }
  }

  function toggleCamera(onStatusChange) {
    if (cameraRunning) { cameraInstance.stop(); cameraRunning = false; onStatusChange('paused'); }
    else { cameraInstance.start(); cameraRunning = true; onStatusChange('active'); }
  }

  // ── SENTENCE BUILDER ─────────────────────────────────────────
  let sentenceWords = [];
  function addToSentence() {
    if (!currentGestureId) return false;
    const g = GESTURES.find(x => x.id === currentGestureId);
    if (!g) return false;
    sentenceWords.push(g[currentLang]);
    updateSentenceDisplay();
    return true;
  }
  function getSentence()   { return sentenceWords.join(' '); }
  function clearSentence() { sentenceWords = []; updateSentenceDisplay(); }
  function updateSentenceDisplay() {
    const el = document.getElementById('history-text');
    if (el) el.textContent = sentenceWords.length ? sentenceWords.join(' ') : '—';
  }
  function getCurrentGestureText() {
    if (!currentGestureId) return null;
    const g = GESTURES.find(x => x.id === currentGestureId);
    return g ? g[currentLang] : null;
  }
  function setLang(lang) {
    currentLang = lang;
    if (currentGestureId) {
      const g = GESTURES.find(x => x.id === currentGestureId);
      if (g) { const el = document.getElementById('gesture-text'); if (el) el.textContent = g.emoji + ' ' + g[currentLang]; }
    }
    updateSentenceDisplay();
  }
  function renderGuide(lang) {
    const grid = document.getElementById('gesture-guide-grid');
    if (!grid) return;
    grid.innerHTML = GESTURES.map(g => `
      <div class="gesture-item">
        <span class="g-emoji">${g.emoji}</span>
        <div class="g-instruction">${g.instruction}</div>
        <div class="g-phrase">${g[lang]}</div>
      </div>`).join('');
  }

  return { startCamera, stopCamera, toggleCamera, addToSentence, getSentence,
           clearSentence, getCurrentGestureText, setLang, renderGuide };
})();
