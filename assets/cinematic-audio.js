/* Maria & Mario — unified cinematic director, sound cues and photo-title intro. */
(() => {
  const portraitPaths = Array.from({ length: 14 }, (_, index) =>
    `./assets/images/portrait-${String(index + 1).padStart(2, '0')}.webp`
  );

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let audioContext = null;
  let master = null;
  let storybookRunning = false;
  let photoIntroRunning = false;

  const getAudioContext = () => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!audioContext) {
      audioContext = new AudioContextClass();
      master = audioContext.createGain();
      master.gain.value = 0.2;
      master.connect(audioContext.destination);
    }
    if (audioContext.state === 'suspended') audioContext.resume();
    return audioContext;
  };

  const tone = (frequency, duration, type = 'sine', gain = 0.05, delay = 0, endFrequency = null) => {
    const context = getAudioContext();
    if (!context) return;
    const start = context.currentTime + delay;
    const oscillator = context.createOscillator();
    const volume = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    if (endFrequency) oscillator.frequency.exponentialRampToValueAtTime(Math.max(20, endFrequency), start + duration);
    volume.gain.setValueAtTime(0.0001, start);
    volume.gain.exponentialRampToValueAtTime(gain, start + 0.012);
    volume.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(volume).connect(master);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.03);
  };

  const noise = (duration = 0.4, gain = 0.04, delay = 0, filterStart = 600, filterEnd = 6000) => {
    const context = getAudioContext();
    if (!context) return;
    const length = Math.max(1, Math.floor(context.sampleRate * duration));
    const buffer = context.createBuffer(1, length, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let index = 0; index < length; index += 1) data[index] = Math.random() * 2 - 1;
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const volume = context.createGain();
    const start = context.currentTime + delay;
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(filterStart, start);
    filter.frequency.exponentialRampToValueAtTime(filterEnd, start + duration);
    filter.Q.value = 0.8;
    volume.gain.setValueAtTime(0.0001, start);
    volume.gain.exponentialRampToValueAtTime(gain, start + 0.015);
    volume.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    source.buffer = buffer;
    source.connect(filter).connect(volume).connect(master);
    source.start(start);
    source.stop(start + duration + 0.03);
  };

  const playCodeTick = () => tone(880 + Math.random() * 540, 0.042, 'square', 0.012);

  const playPortalSound = () => {
    noise(1.25, 0.035, 0, 450, 7600);
    tone(70, 1.3, 'sine', 0.08, 0, 30);
    tone(220, 1.1, 'triangle', 0.035, 0.12, 920);
    tone(523.25, 1.25, 'sine', 0.026, 0.5, 1318.51);
  };

  const playStorybookSound = () => {
    noise(2.4, 0.016, 0, 900, 5200);
    tone(65, 3.1, 'sine', 0.04, 0, 32);
    [392, 523.25, 659.25, 783.99, 1046.5, 1318.51].forEach((note, index) => {
      tone(note, 2.15, 'sine', 0.052 - index * 0.005, 0.65 + index * 0.28, note * 1.01);
    });
    tone(1567.98, 2.6, 'sine', 0.026, 2.6, 2093);
    noise(2.5, 0.016, 3.1, 2600, 11000);
  };

  const playPhotoIntroSound = () => {
    tone(48, 3.2, 'sawtooth', 0.055, 0, 28);
    tone(96, 1.25, 'triangle', 0.06, 0.08, 52);
    noise(0.5, 0.035, 0.05, 120, 1600);
    tone(220, 1.2, 'square', 0.022, 1.1, 880);
    tone(440, 1.3, 'triangle', 0.03, 2.0, 1320);
    tone(62, 0.9, 'sine', 0.12, 4.7, 28);
    noise(0.34, 0.05, 4.72, 100, 2200);
    tone(110, 1.5, 'sawtooth', 0.065, 4.76, 55);
  };

  const stopIntroTrack = () => {
    const intro = document.getElementById('introAudio');
    if (!intro) return;
    intro.pause();
    try { intro.currentTime = 0; } catch (_) {}
  };

  const hideStoryScreens = () => {
    ['matrixIntro', 'farewellScreen', 'welcomeScreen', 'mainExperience'].forEach((id) => {
      document.getElementById(id)?.classList.add('hidden-screen');
    });
  };

  const showWelcome = () => {
    hideStoryScreens();
    const welcome = document.getElementById('welcomeScreen');
    if (!welcome) return;
    welcome.classList.remove('hidden-screen');
    welcome.classList.remove('mm-scene-live');
    void welcome.offsetWidth;
    welcome.classList.add('mm-scene-live');
  };

  const makeStorybookScreen = () => {
    document.getElementById('mmStorybookIntro')?.remove();
    const screen = document.createElement('section');
    screen.id = 'mmStorybookIntro';
    screen.setAttribute('aria-label', 'Maria and Mario fairytale logo introduction');
    screen.innerHTML = `
      <div class="mm-sky" aria-hidden="true"><div class="mm-stars"></div><div class="mm-horizon"></div></div>
      <div class="mm-rays" aria-hidden="true"></div>
      <div class="mm-arc" aria-hidden="true"></div>
      <div class="mm-core">
        <div class="mm-beam" aria-hidden="true"></div>
        <div class="mm-initials" aria-label="M and M">M&amp;M</div>
        <div class="mm-logo-shine" aria-hidden="true">M&amp;M</div>
      </div>
      <div class="mm-caption">MARIA &amp; MARIO</div>`;
    document.body.appendChild(screen);
    return screen;
  };

  const playStorybook = () => {
    if (storybookRunning) return;
    storybookRunning = true;
    stopIntroTrack();
    playPortalSound();
    window.setTimeout(playStorybookSound, 380);
    const screen = makeStorybookScreen();
    requestAnimationFrame(() => requestAnimationFrame(() => screen.classList.add('is-live')));
    const duration = reducedMotion.matches ? 1100 : 8000;
    window.setTimeout(() => {
      screen.classList.add('is-leaving');
      window.setTimeout(() => {
        screen.remove();
        storybookRunning = false;
        showWelcome();
      }, reducedMotion.matches ? 40 : 900);
    }, duration);
  };

  const makeFilmRow = (order) => {
    const row = document.createElement('div');
    row.className = 'mm-film-row';
    order.forEach((portraitIndex) => {
      const image = document.createElement('img');
      image.src = portraitPaths[portraitIndex];
      image.alt = '';
      image.decoding = 'async';
      row.appendChild(image);
    });
    return row;
  };

  const makePhotoIntro = () => {
    document.getElementById('mmMarvelIntro')?.remove();
    const screen = document.createElement('section');
    screen.id = 'mmMarvelIntro';
    screen.setAttribute('aria-label', 'Maria and Mario cinematic photo introduction');

    const stage = document.createElement('div');
    stage.className = 'mm-photo-stage';
    stage.setAttribute('aria-hidden', 'true');
    stage.append(
      makeFilmRow([0, 4, 8, 12, 2, 6, 10, 13, 1, 5]),
      makeFilmRow([11, 7, 3, 9, 1, 13, 5, 8, 0, 6]),
      makeFilmRow([2, 10, 6, 4, 12, 9, 3, 11, 7, 13])
    );

    const photoTitle = document.createElement('div');
    photoTitle.className = 'mm-photo-title';
    photoTitle.innerHTML = '<span>MARIA &amp; MARIO</span>';

    const finalLockup = document.createElement('div');
    finalLockup.className = 'mm-final-lockup';
    finalLockup.innerHTML = `
      <div class="mm-lockup-box">
        <span class="mm-lockup-title">MARIA &amp; MARIO</span>
        <span class="mm-lockup-subtitle">OUR STORY • 2027</span>
      </div>`;

    screen.append(stage);
    screen.insertAdjacentHTML('beforeend', '<div class="mm-red-wash" aria-hidden="true"></div><div class="mm-frame-lines" aria-hidden="true"></div>');
    screen.append(photoTitle, finalLockup);
    document.body.appendChild(screen);
    return screen;
  };

  const playPhotoIntro = () => {
    if (photoIntroRunning) return;
    photoIntroRunning = true;
    playPhotoIntroSound();
    const screen = makePhotoIntro();
    requestAnimationFrame(() => requestAnimationFrame(() => screen.classList.add('is-live')));
    const duration = reducedMotion.matches ? 1200 : 8300;
    window.setTimeout(() => {
      screen.classList.add('is-leaving');
      window.setTimeout(() => {
        screen.remove();
        photoIntroRunning = false;
        window.MMCore?.enterJourney?.();
      }, reducedMotion.matches ? 40 : 430);
    }, duration);
  };

  const installCodeSounds = () => {
    const sequence = document.getElementById('typeSequence');
    if (!sequence) return;
    let lastText = '';
    const observer = new MutationObserver(() => {
      const text = (sequence.textContent || '').trim();
      if (!text || text === lastText) return;
      lastText = text;
      if (text.length % 4 === 0) playCodeTick();
    });
    observer.observe(sequence, { childList: true, subtree: true, characterData: true });
  };

  const installStaggerAndTilt = () => {
    document.querySelectorAll('.reveal-card').forEach((card, index) => {
      card.style.setProperty('--mm-reveal-delay', `${(index % 4) * 70}ms`);
    });

    if (reducedMotion.matches || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    document.querySelectorAll('.mission-card, .music-card, .donate-card, .rsvp-card').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        card.style.setProperty('--mm-tilt-x', `${(-y * 2.6).toFixed(2)}deg`);
        card.style.setProperty('--mm-tilt-y', `${(x * 3.2).toFixed(2)}deg`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--mm-tilt-x', '0deg');
        card.style.setProperty('--mm-tilt-y', '0deg');
      });
    });
  };

  const preloadPortraits = () => {
    portraitPaths.forEach((path) => {
      const image = new Image();
      image.decoding = 'async';
      image.src = path;
    });
  };

  const attach = () => {
    document.addEventListener('pointerdown', getAudioContext, { once: true, passive: true });
    document.addEventListener('keydown', getAudioContext, { once: true });
    installCodeSounds();
    installStaggerAndTilt();
    preloadPortraits();

    document.addEventListener('click', (event) => {
      if (event.target.closest?.('#yesBtn')) {
        event.preventDefault();
        event.stopImmediatePropagation();
        playStorybook();
        return;
      }

      if (event.target.closest?.('#enterWorldBtn')) {
        event.preventDefault();
        event.stopImmediatePropagation();
        playPhotoIntro();
      }
    }, true);

    window.MMCinematic = { playStorybook, playPhotoIntro };
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', attach);
  else attach();
})();
