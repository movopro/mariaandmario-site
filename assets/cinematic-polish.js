/* Maria & Mario — bulletproof Matrix mobile/desktop reveal + original playful digital cue. */
(() => {
  let audioContext = null;

  const inject = () => {
    if (document.getElementById('mmBulletproofMatrix')) return;
    const s = document.createElement('style');
    s.id = 'mmBulletproofMatrix';
    s.textContent = `
      #matrixIntro .intro-center,#matrixIntro .intro-box,#matrixIntro #typeSequence{background:transparent!important;border:0!important;box-shadow:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border-radius:0!important}
      #mmMatrixOverlay{position:absolute;inset:0;z-index:20;display:grid;place-items:center;pointer-events:none;padding:24px;visibility:hidden;opacity:0;transition:opacity .25s ease}
      #mmMatrixOverlay.is-active{visibility:visible;opacity:1}
      #mmMatrixOverlay .mm-overlay-line{width:min(94vw,1100px);text-align:center;font-family:Cinzel,serif;font-size:clamp(2.05rem,5vw,5.4rem);font-weight:600;line-height:1.08;letter-spacing:.02em;color:#f7fff9;text-shadow:0 0 10px rgba(255,255,255,.13),0 0 28px rgba(57,233,122,.34),0 0 80px rgba(57,233,122,.12);opacity:0;transform:translate3d(0,18px,0) scale(.985);filter:blur(8px);will-change:opacity,transform,filter;transition:opacity .42s cubic-bezier(.16,1,.3,1),transform .42s cubic-bezier(.16,1,.3,1),filter .42s cubic-bezier(.16,1,.3,1)}
      #mmMatrixOverlay .mm-overlay-line.is-in{opacity:1;transform:translate3d(0,0,0) scale(1);filter:blur(0)}
      #mmMatrixOverlay .mm-overlay-line.is-out{opacity:0;transform:translate3d(0,-16px,0) scale(1.01);filter:blur(5px)}
      #mmMatrixOverlay .mm-cursor{display:inline-block;margin-left:.08em;color:#39e97a;text-shadow:0 0 12px #39e97a;animation:mmCursor .62s steps(1) infinite}
      @keyframes mmCursor{50%{opacity:0}}
      @media(max-width:760px){#mmMatrixOverlay{padding:20px 12px}#mmMatrixOverlay .mm-overlay-line{font-size:clamp(1.7rem,7.5vw,3.15rem);line-height:1.1;text-shadow:0 0 8px rgba(255,255,255,.1),0 0 24px rgba(57,233,122,.34),0 0 55px rgba(57,233,122,.12)}}
      @media(prefers-reduced-motion:reduce){#mmMatrixOverlay .mm-overlay-line{transition:none!important}}
    `;
    document.head.appendChild(s);
  };

  const ensureOverlay = () => {
    let overlay = document.getElementById('mmMatrixOverlay');
    if (overlay) return overlay;
    const intro = document.getElementById('matrixIntro');
    if (!intro) return null;
    overlay = document.createElement('div');
    overlay.id = 'mmMatrixOverlay';
    overlay.setAttribute('aria-live','polite');
    overlay.setAttribute('aria-label','Matrix invitation introduction');
    intro.appendChild(overlay);
    return overlay;
  };

  const sequences = {
    en:["TIME HAS COME...","TO GET MARRIED","IF YOU SEE THIS THEN YOU ARE SPECIAL TO US","AND...","YOU'VE BEEN SELECTED TO JOIN OUR MATRIX","ARE YOU IN?"],
    bg:["МОМЕНТЪТ НАСТЪПИ...","ДА СЕ ОЖЕНИМ","ЩОМ ВИЖДАШ ТОВА, ЗНАЧИ СИ СПЕЦИАЛЕН ЗА НАС","И...","ТИ БЕШЕ ИЗБРАН ДА ВЛЕЗЕШ В НАШАТА МАТРИЦА","ВЛИЗАШ ЛИ?"]
  };

  const reveal = (lang) => {
    const overlay = ensureOverlay();
    if (!overlay) return;
    const intro = document.getElementById('matrixIntro');
    if (intro) {
      intro.classList.remove('hidden-screen');
      intro.style.display = 'grid';
      intro.style.visibility = 'visible';
    }
    overlay.classList.add('is-active');
    overlay.replaceChildren();
    const lines = sequences[lang] || sequences.en;
    let i = 0;

    const showNext = () => {
      if (i >= lines.length) {
        overlay.classList.remove('is-active');
        setTimeout(() => {
          const date = document.getElementById('dateBlock');
          const choices = document.getElementById('choiceBlock');
          [date,choices].forEach(el => {
            if (!el) return;
            el.classList.remove('hidden');
            el.style.opacity='0';
            el.style.transform='translateY(12px)';
            el.style.filter='blur(5px)';
            requestAnimationFrame(() => requestAnimationFrame(() => {
              el.style.opacity='1'; el.style.transform='none'; el.style.filter='none';
            }));
          });
        },280);
        return;
      }
      const line = document.createElement('div');
      line.className='mm-overlay-line';
      line.textContent=lines[i++];
      const cursor=document.createElement('span');
      cursor.className='mm-cursor'; cursor.textContent='▋'; line.appendChild(cursor);
      overlay.replaceChildren(line);
      requestAnimationFrame(() => requestAnimationFrame(() => line.classList.add('is-in')));
      setTimeout(() => {
        line.classList.add('is-out');
        setTimeout(showNext,260);
      },1050);
    };
    showNext();
  };

  const matrixCue = () => {
    const AC=window.AudioContext||window.webkitAudioContext;
    if(!AC)return;
    try{
      audioContext?.close?.();
      audioContext=new AC();
      const c=audioContext, master=c.createGain();
      master.gain.value=.19; master.connect(c.destination);
      if(c.state==='suspended')c.resume();
      const now=c.currentTime;
      const tone=(f,d,type,g,delay,end)=>{
        const o=c.createOscillator(),v=c.createGain(),t=now+delay;
        o.type=type;o.frequency.setValueAtTime(f,t);
        if(end)o.frequency.exponentialRampToValueAtTime(end,t+d);
        v.gain.setValueAtTime(.0001,t);v.gain.exponentialRampToValueAtTime(g,t+.012);v.gain.exponentialRampToValueAtTime(.0001,t+d);
        o.connect(v).connect(master);o.start(t);o.stop(t+d+.03);
      };
      // Original cue: ominous Matrix-like bass + deliberately cheeky digital beeps.
      tone(55,.9,'sawtooth',.13,0,25);
      tone(110,.42,'square',.045,.04,55);
      tone(740,.09,'square',.028,.22,370);
      tone(980,.09,'square',.028,.34,490);
      tone(620,.12,'triangle',.035,.47,310);
      tone(1240,.07,'square',.026,.62,620);
      tone(330,.24,'triangle',.045,.76,165);
      tone(880,.14,'sine',.035,1.02,1320);
      tone(440,.42,'triangle',.045,1.16,220);
      setTimeout(()=>audioContext?.close?.(),1900);
    }catch(e){}
  };

  const onLanguageClick = (event) => {
    const button=event.target.closest?.('[data-lang-select]');
    if(!button)return;
    const lang=button.dataset.langSelect||'en';
    setTimeout(()=>{
      const intro=document.getElementById('introAudio');
      if(intro){intro.pause();try{intro.currentTime=0}catch(e){}}
      matrixCue();
      reveal(lang);
    },120);
  };

  const init=()=>{
    inject();
    ensureOverlay();
    document.addEventListener('click',onLanguageClick,{capture:true,passive:true});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
