/* Mobile safety boot: guarantees the language gate can enter Matrix even if a mobile browser delays JS/audio. */
(() => {
  const boot = () => {
    const gate = document.getElementById('languageGate');
    const matrix = document.getElementById('matrixIntro');
    const canvas = document.getElementById('matrixCanvas');
    const choices = document.querySelectorAll('[data-lang-select]');
    if (!gate || !matrix || !choices.length) return;

    const fallback = (button) => {
      if (!matrix.classList.contains('hidden-screen')) return;
      const lang = button.dataset.langSelect || 'en';
      document.documentElement.lang = lang;
      gate.classList.add('hidden-screen');
      matrix.classList.remove('hidden-screen');
      document.querySelector('.lang-switch')?.classList.remove('hidden-switch');
      document.body.classList.remove('matrix-hidden');
      if (canvas) {
        canvas.style.display = 'block';
        canvas.style.visibility = 'visible';
        canvas.style.opacity = '.54';
      }
      window.dispatchEvent(new CustomEvent('mm-mobile-matrix-ready', { detail: { lang } }));
    };

    choices.forEach(button => {
      button.addEventListener('click', () => {
        window.setTimeout(() => fallback(button), 180);
      }, { passive: true });
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
