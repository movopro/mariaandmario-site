/* Maria & Mario — mobile Matrix reveal fix + original playful digital cue. */
(() => {
  let audioContext = null;
  const style = () => {
    if (document.getElementById('mmMatrixFix')) return;
    const s = document.createElement('style'); s.id = 'mmMatrixFix';
    s.textContent = `
      #matrixIntro .intro-center,#matrixIntro .intro-box,#matrixIntro #typeSequence{background:transparent!important;border:0!important;box-shadow:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border-radius:0!important}
      #matrixIntro .intro-center{padding:28px 16px!important;min-height:0!important}
      #matrixIntro #typeSequence{min-height:190px!important;width:min(94vw,1100px)!important;display:grid!important;place-items:center!important;overflow:visible!important}
      .mm-matrix-line{font-family:Cinzel,serif;font-size:clamp(2rem,5vw,5.2rem);font-weight:600;line-height:1.06;letter-spacing:.025em;text-align:center;color:#f7fff9;will-change:opacity,transform,filter;text-shadow:0 0 10px rgba(255,255,255,.10),0 0 28px rgba(57,233,122,.28),0 0 70px rgba(57,233,122,.10);opacity:0;transform:translateY(18px) scale(.985);filter:blur(9px);transition:opacity .36s cubic-bezier(.16,1,.3,1),transform .36s cubic-bezier(.16,1,.3,1),filter .36s cubic-bezier(.16,1,.3,1)}
      .mm-matrix-line.is-in{opacity:1;transform:none;filter:blur(0)}
      .mm-matrix-line.is-out{opacity:0;transform:translateY(-10px) scale(1.012);filter:blur(5px)}
      #matrixIntro .date-block,#matrixIntro .choice-block{transition:opacity .7s ease,transform .7s ease,filter .7s ease}
      @media(max-width:760px){#matrixIntro #typeSequence{min-height:175px!important}#matrixIntro .type-sequence{min-height:175px!important}.mm-matrix-line{font-size:clamp(1.65rem,7.7vw,3.15rem);line-height:1.08;padding:0 8px;text-shadow:0 0 8px rgba(255,255,255,.10),0 0 22px rgba(57,233,122,.30),0 0 50px rgba(57,233,122,.10)}}
      @media(prefers-reduced-motion:reduce){.mm-matrix-line{transition:none!important}}
    `; document.head.appendChild(s);
  };
  const cue = () => {
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
    try {
      audioContext?.close?.(); audioContext = new AC(); const c=audioContext, master=c.createGain(); master.gain.value=.22; master.connect(c.destination); if(c.state==='suspended')c.resume(); const now=c.currentTime;
      const tone=(freq,dur,type,gain,delay,endFreq)=>{const o=c.createOscillator(),g=c.createGain(),t=now+delay;o.type=type;o.frequency.setValueAtTime(freq,t);if(endFreq)o.frequency.exponentialRampToValueAtTime(endFreq,t+dur);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(gain,t+.018);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g).connect(master);o.start(t);o.stop(t+dur+.04)};
      tone(58,.72,'sawtooth',.14,0,24); tone(116,.42,'square',.055,.04,52); tone(420,.10,'square',.035,.20,210); tone(760,.08,'square',.028,.32,380); tone(980,.10,'square',.03,.42,490); tone(260,.18,'triangle',.04,.58,130); tone(520,.22,'sine',.045,.72,1040); tone(1040,.18,'square',.028,.94,520); tone(330,.38,'triangle',.055,1.08,165);
      setTimeout(()=>audioContext?.close?.(),1800);
    } catch(e) {}
  };
  const sequences={en:["TIME HAS COME...","TO GET MARRIED","IF YOU SEE THIS THEN YOU ARE SPECIAL TO US","AND...","YOU'VE BEEN SELECTED TO JOIN OUR MATRIX","ARE YOU IN?"],bg:["МОМЕНТЪТ НАСТЪПИ...","ДА СЕ ОЖЕНИМ","ЩОМ ВИЖДАШ ТОВА, ЗНАЧИ СИ СПЕЦИАЛЕН ЗА НАС","И...","ТИ БЕШЕ ИЗБРАН ДА ВЛЕЗЕШ В НАШАТА МАТРИЦА","ВЛИЗАШ ЛИ?"]};
  const runMatrixReveal=(lang)=>{const oldHost=document.getElementById('typeSequence');if(!oldHost)return;const host=oldHost.cloneNode(false);oldHost.replaceWith(host);host.classList.add('mm-fixed-sequence');host.innerHTML='';const lines=sequences[lang]||sequences.en;let i=0;const show=()=>{if(i>=lines.length){const date=document.getElementById('dateBlock'),choices=document.getElementById('choiceBlock');[date,choices].forEach(el=>{if(el){el.classList.remove('hidden');el.style.opacity='0';el.style.transform='translateY(10px)';el.style.filter='blur(4px)';requestAnimationFrame(()=>{el.style.opacity='1';el.style.transform='none';el.style.filter='none'})}});return}const line=document.createElement('div');line.className='mm-matrix-line';line.textContent=lines[i++];host.replaceChildren(line);requestAnimationFrame(()=>requestAnimationFrame(()=>line.classList.add('is-in')));setTimeout(()=>{line.classList.add('is-out');setTimeout(show,330)},780)};show()};
  const onLanguageClick=(event)=>{const button=event.target.closest?.('[data-lang-select]');if(!button)return;const lang=button.dataset.langSelect||'en';setTimeout(()=>{const intro=document.getElementById('introAudio');if(intro){intro.pause();try{intro.currentTime=0}catch(e){}}cue();runMatrixReveal(lang)},55)};
  const init=()=>{style();document.addEventListener('click',onLanguageClick,{capture:true,passive:true})}; if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
