const MascotModule = (() => {
  let bubbleTimer = null;

  function speak(msg) {
    const fig = document.getElementById('mascot-figure');
    const bubble = document.getElementById('mascot-bubble');
    if (!fig) return;
    fig.classList.remove('speaking');
    void fig.offsetWidth;
    fig.classList.add('speaking');
    if (msg && bubble) {
      bubble.textContent = msg;
      bubble.classList.add('show');
      clearTimeout(bubbleTimer);
      bubbleTimer = setTimeout(() => bubble.classList.remove('show'), 2200);
    }
    setTimeout(() => fig.classList.remove('speaking'), 700);
  }

  function show(visible) {
    const wrap = document.getElementById('mascot-wrap');
    if (wrap) wrap.style.display = visible ? 'flex' : 'none';
  }

  return { speak, show };
})();