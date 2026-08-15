/* Maria & Mario — original cinematic sound design using Web Audio API.
   No external sound library required. Audio starts only after a user gesture. */
(() => {
  let ctx = null;
  let master = null;
  let enabled = false;

  const getContext = () => {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      ctx = new AudioCtx();
      master = ctx.createGain();
      master.gain.value = 0.22;
      master.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    enabled = true;
    return ctx;
  };

  const tone = (freq, duration, type = 'sine', gain = 0.08, when = 0, endFreq = null) => {
    const ac = getContext();
    if (!ac) return;
    const t = ac.currentTime + when;
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (endFreq) osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), t + duration);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    osc.connect(g).connect(master);
    osc.start(t);
    osc.stop(t + duration + 0.03);
  };

  const noise = (duration = 0.35, gain = 0.06, when = 0, filterStart = 800, filterEnd = 5000) => {
    const ac = getContext();
    if (!ac) return;
    const length = Math.max(1, Math.floor(ac.sampleRate * duration));
    const buffer = ac.createBuffer(1, length, ac.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
    const src = ac.createBufferSource();
    const filter = ac.createBiquadFilter();
    const g = ac.createGain();
    const t = ac.currentTime + when;
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(filterStart, t);
    filter.frequency.exponentialRampToValueAtTime(filterEnd, t + duration);
    filter.Q.value = 0.7;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    src.buffer = buffer;
    src.connect(filter).connect(g).connect(master);
    src.start(t);
    src.stop(t + duration + 0.03);
  };

  const matrixTick = () => {
    tone(950 + Math.random() * 500, 0.045, 'square', 0.018);
  };

  const matrixLock = () => {
    tone(740, 0.11, 'sine', 0.035);
    tone(1110, 0.18, 'sine', 0.025, 0.055);
  };

  const portal = () => {
    noise(1.05, 0.045, 0, 500, 7200);
    tone(90, 1.2, 'sine', 0.08, 0, 32);
    tone(220, 0.85, 'triangle', 0.04, 0, 900);
    tone(440, 1.1, 'sine', 0.025, 0.18, 1100);
  };

  const impact = () => {
    tone(62, 0.8, 'sine', 0.14, 0, 28);
    tone(110, 0.42, 'triangle', 0.06, 0, 48);
    noise(0.28, 0.05, 0, 100, 1800);
  };

  const magic = () => {
    tone(392, 0.7, 'sine', 0.045, 0, 784);
    tone(523.25, 0.85, 'sine', 0.04, 0.08, 1046.5);
    tone(783.99, 1.15, 'sine', 0.035, 0.16, 1568);
    tone(1046.5, 1.4, 'sine', 0.025, 0.26, 2093);
    noise(1.2, 0.025, 0.2, 1200, 9000);
  };

  const attach = () => {
    const activate = () => getContext();
    document.addEventListener('pointerdown', activate, { once: true, passive: true });
    document.addEventListener('keydown', activate, { once: true });

    const sequence = document.getElementById('typeSequence');
    if (sequence) {
      let lastText = '';
      const observer = new MutationObserver(() => {
        const text = (sequence.textContent || '').trim();
        if (!text || text === lastText) return;
        lastText = text;
        matrixTick();
        if (text.length > 8) matrixLock();
      });
      observer.observe(sequence, { childList: true, subtree: true, characterData: true });
    }

    document.getElementById('yesBtn')?.addEventListener('click', () => {
      getContext();
      portal();
      setTimeout(impact, 650);
      setTimeout(magic, 900);
      document.body.classList.add('cinematic-audio-active');
    });

    document.getElementById('noBtn')?.addEventListener('click', () => {
      getContext();
      tone(180, 0.35, 'sawtooth', 0.035, 0, 70);
    });

    document.getElementById('enterWorldBtn')?.addEventListener('click', () => {
      getContext();
      impact();
      magic();
    });

    document.querySelectorAll('[data-lang-select]').forEach(btn => {
      btn.addEventListener('click', () => {
        getContext();
        tone(330, 0.16, 'sine', 0.03, 0, 520);
      });
    });

    window.MMcinematicAudio = {
      enable: getContext,
      tick: matrixTick,
      portal,
      impact,
      magic,
      isEnabled: () => enabled
    };
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', attach);
  else attach();
})();
