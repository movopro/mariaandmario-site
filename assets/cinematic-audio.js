/* Maria & Mario — cinematic Matrix + fairy-tale studio-style initials reveal. */
(() => {
  let ctx = null;
  let master = null;
  let enabled = false;

  const installMatrixPresentation = () => {
    if (document.getElementById('mmMatrixPresentation')) return;
    const style = document.createElement('style');
    style.id = 'mmMatrixPresentation';
    style.textContent = `
      /* Matrix opening: completely free-floating, no card or glass panel. */
      #matrixIntro .intro-center,
      #matrixIntro .intro-box {
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        border-radius: 0 !important;
      }
      #matrixIntro .intro-center { width:min(100%,1180px)!important; min-height:0!important; padding:40px 24px!important; }
      #matrixIntro .intro-center>.eyebrow { opacity:.72; text-shadow:0 0 18px rgba(108,255,159,.32); }
      #matrixIntro #typeSequence { width:100%!important; background:transparent!important; border:0!important; box-shadow:none!important; }
      #matrixIntro .type-line { text-shadow:0 0 12px rgba(255,255,255,.1),0 0 34px rgba(108,255,159,.18),0 0 90px rgba(108,255,159,.08); }

      #mmStorybookIntro {
        position:fixed; inset:0; z-index:55; overflow:hidden; display:grid; place-items:center;
        background:
          radial-gradient(circle at 50% 54%, rgba(255,244,202,.20), transparent 10%),
          radial-gradient(circle at 50% 54%, rgba(255,207,112,.10), transparent 31%),
          linear-gradient(180deg,#020306 0%,#070914 54%,#03040a 100%);
        opacity:0; pointer-events:none;
        transition:opacity 1.2s ease;
      }
      #mmStorybookIntro.is-live { opacity:1; pointer-events:auto; }
      #mmStorybookIntro.is-leaving { opacity:0; }
      #mmStorybookIntro .mm-sky { position:absolute; inset:0; overflow:hidden; }
      #mmStorybookIntro .mm-stars,
      #mmStorybookIntro .mm-stars::before,
      #mmStorybookIntro .mm-stars::after {
        content:""; position:absolute; inset:-20%;
        background-image:radial-gradient(circle,rgba(255,255,255,.95) 0 1px,transparent 1.8px);
        background-size:150px 150px; opacity:0; transform:scale(.72);
      }
      #mmStorybookIntro .mm-stars { animation:mmStars 7.2s ease-out forwards; }
      #mmStorybookIntro .mm-stars::before { background-size:230px 230px; opacity:0; animation:mmStars2 7.2s ease-out forwards; }
      #mmStorybookIntro .mm-stars::after { background-size:330px 330px; opacity:0; animation:mmStars3 7.2s ease-out forwards; }
      #mmStorybookIntro .mm-horizon {
        position:absolute; width:120vw; height:70vh; left:-10vw; bottom:-45vh;
        border-radius:50%; background:radial-gradient(ellipse at center,rgba(255,230,160,.28),rgba(255,207,112,.08) 24%,transparent 62%);
        filter:blur(18px); transform:scale(.55); opacity:0; animation:mmHorizon 7.2s ease-out forwards;
      }
      #mmStorybookIntro .mm-arc {
        position:absolute; width:min(90vw,1050px); height:min(90vw,1050px); border-radius:50%;
        border:1px solid rgba(255,236,173,.14); box-shadow:0 0 45px rgba(255,218,130,.08),inset 0 0 45px rgba(255,218,130,.04);
        transform:scale(.18) rotate(-28deg); opacity:0; animation:mmArc 7.2s cubic-bezier(.16,1,.3,1) forwards;
      }
      #mmStorybookIntro .mm-arc::before,
      #mmStorybookIntro .mm-arc::after {
        content:""; position:absolute; inset:8%; border-radius:50%; border:1px solid rgba(255,255,255,.07);
      }
      #mmStorybookIntro .mm-arc::after { inset:18%; border-color:rgba(255,221,140,.06); }
      #mmStorybookIntro .mm-rays {
        position:absolute; width:min(80vw,920px); aspect-ratio:1; border-radius:50%;
        background:conic-gradient(from 0deg,transparent 0 8deg,rgba(255,238,182,.12) 10deg,transparent 13deg 27deg,rgba(255,238,182,.10) 29deg,transparent 33deg 360deg);
        -webkit-mask-image:radial-gradient(circle,transparent 0 22%,#000 39%,transparent 73%); mask-image:radial-gradient(circle,transparent 0 22%,#000 39%,transparent 73%);
        transform:scale(.3) rotate(-25deg); opacity:0; animation:mmRays 7.2s ease-out forwards;
      }
      #mmStorybookIntro .mm-orbit { position:absolute; width:min(70vw,760px); aspect-ratio:1; border-radius:50%; transform:rotate(-20deg) scale(.2); opacity:0; animation:mmOrbit 7.2s cubic-bezier(.16,1,.3,1) forwards; }
      #mmStorybookIntro .mm-orbit::before,
      #mmStorybookIntro .mm-orbit::after { content:"✦"; position:absolute; color:#fff2c4; text-shadow:0 0 14px #ffd56f,0 0 34px rgba(255,196,72,.8); font-size:18px; }
      #mmStorybookIntro .mm-orbit::before { left:8%; top:35%; animation:mmSpark 1.8s ease-in-out infinite; }
      #mmStorybookIntro .mm-orbit::after { right:7%; top:58%; animation:mmSpark 1.5s ease-in-out .4s infinite; }
      #mmStorybookIntro .mm-core { position:relative; z-index:5; display:grid; place-items:center; width:min(72vw,700px); aspect-ratio:1; }
      #mmStorybookIntro .mm-core::before {
        content:""; position:absolute; width:18px; height:18px; border-radius:50%; background:#fff8dc;
        box-shadow:0 0 14px #fff,0 0 38px #ffe08a,0 0 100px rgba(255,195,70,.85);
        transform:scale(.1); opacity:0; animation:mmCore 7.2s ease-out forwards;
      }
      #mmStorybookIntro .mm-initials {
        position:relative; z-index:2; margin:0; font-family:"Cinzel",serif; font-size:clamp(8rem,23vw,18rem); line-height:.75; letter-spacing:-.09em;
        font-weight:500; color:transparent; -webkit-text-stroke:1px rgba(255,240,193,.72);
        background:linear-gradient(115deg,#fffdf2 0%,#ffe9a9 38%,#fffdf4 49%,#dba83f 51%,#fff1bd 72%,#fffdf2 100%);
        -webkit-background-clip:text; background-clip:text; filter:drop-shadow(0 0 8px rgba(255,232,160,.18)) drop-shadow(0 0 42px rgba(255,193,62,.16));
        opacity:0; transform:translateY(30px) scale(.58); animation:mmInitials 7.2s cubic-bezier(.16,1,.3,1) forwards;
      }
      #mmStorybookIntro .mm-initials::after { content:""; }
      #mmStorybookIntro .mm-sweep {
        position:absolute; z-index:8; width:8px; height:120%; top:-10%; left:-18%;
        background:linear-gradient(180deg,transparent,rgba(255,255,255,.95),rgba(255,215,116,.7),transparent);
        filter:blur(4px); transform:rotate(18deg); opacity:0; animation:mmSweep 7.2s ease-in-out forwards;
      }
      #mmStorybookIntro .mm-caption { position:absolute; z-index:7; bottom:12%; left:0; right:0; text-align:center; font-family:"Bebas Neue",sans-serif; letter-spacing:.42em; font-size:clamp(.75rem,1.4vw,1rem); color:rgba(255,242,201,.68); opacity:0; animation:mmCaption 7.2s ease-out forwards; }
      @keyframes mmStars { 0%{opacity:0;transform:scale(.72) translateY(3%)} 28%{opacity:.3} 100%{opacity:.55;transform:scale(1.18) translateY(-2%)} }
      @keyframes mmStars2 { 0%,18%{opacity:0} 48%{opacity:.18} 100%{opacity:.3;transform:scale(1.08)} }
      @keyframes mmStars3 { 0%,30%{opacity:0} 62%{opacity:.1} 100%{opacity:.2;transform:scale(1.02)} }
      @keyframes mmHorizon { 0%,20%{opacity:0;transform:scale(.55)} 50%{opacity:.35} 100%{opacity:.7;transform:scale(1.15)} }
      @keyframes mmArc { 0%,15%{opacity:0;transform:scale(.18) rotate(-28deg)} 38%{opacity:.15} 68%{opacity:.5} 100%{opacity:.78;transform:scale(1) rotate(8deg)} }
      @keyframes mmRays { 0%,25%{opacity:0;transform:scale(.3) rotate(-25deg)} 55%{opacity:.2} 100%{opacity:.58;transform:scale(1.05) rotate(18deg)} }
      @keyframes mmOrbit { 0%,35%{opacity:0;transform:rotate(-20deg) scale(.2)} 60%{opacity:.65} 100%{opacity:.9;transform:rotate(18deg) scale(1)} }
      @keyframes mmCore { 0%,32%{opacity:0;transform:scale(.1)} 43%{opacity:1;transform:scale(1)} 56%{transform:scale(18);opacity:.18} 66%{transform:scale(1);opacity:1} 100%{transform:scale(1);opacity:1} }
      @keyframes mmInitials { 0%,36%{opacity:0;transform:translateY(30px) scale(.58);filter:blur(14px) drop-shadow(0 0 0 transparent)} 52%{opacity:.55;transform:translateY(4px) scale(.9);filter:blur(3px) drop-shadow(0 0 24px rgba(255,213,104,.3))} 66%{opacity:1;transform:translateY(0) scale(1);filter:blur(0) drop-shadow(0 0 45px rgba(255,210,110,.3))} 100%{opacity:1;transform:translateY(0) scale(1)} }
      @keyframes mmSweep { 0%,48%{left:-18%;opacity:0} 58%{opacity:.8} 73%{left:118%;opacity:.35} 100%{left:118%;opacity:0} }
      @keyframes mmCaption { 0%,60%{opacity:0;transform:translateY(12px)} 74%{opacity:.65;transform:none} 100%{opacity:.65;transform:none} }
      @keyframes mmSpark { 0%,100%{transform:scale(.7) rotate(0deg);opacity:.35} 50%{transform:scale(1.45) rotate(30deg);opacity:1} }
      @media(max-width:760px){#mmStorybookIntro .mm-initials{font-size:clamp(6rem,27vw,10rem)}#mmStorybookIntro .mm-caption{letter-spacing:.25em;bottom:10%;}}
      @media(prefers-reduced-motion:reduce){#mmStorybookIntro *{animation-duration:.001ms!important;animation-iteration-count:1!important}}
    `;
    document.head.appendChild(style);
  };

  const getContext = () => {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      ctx = new AudioCtx();
      master = ctx.createGain();
      master.gain.value = 0.24;
      master.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    enabled = true;
    return ctx;
  };

  const tone = (freq,duration,type='sine',gain=.08,when=0,endFreq=null) => {
    const ac=getContext(); if(!ac) return;
    const t=ac.currentTime+when, osc=ac.createOscillator(), g=ac.createGain();
    osc.type=type; osc.frequency.setValueAtTime(freq,t);
    if(endFreq) osc.frequency.exponentialRampToValueAtTime(Math.max(20,endFreq),t+duration);
    g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(gain,t+.012); g.gain.exponentialRampToValueAtTime(.0001,t+duration);
    osc.connect(g).connect(master); osc.start(t); osc.stop(t+duration+.03);
  };

  const noise=(duration=.35,gain=.06,when=0,filterStart=800,filterEnd=5000)=>{
    const ac=getContext(); if(!ac) return;
    const length=Math.max(1,Math.floor(ac.sampleRate*duration)), buffer=ac.createBuffer(1,length,ac.sampleRate), data=buffer.getChannelData(0);
    for(let i=0;i<length;i++) data[i]=Math.random()*2-1;
    const src=ac.createBufferSource(), filter=ac.createBiquadFilter(), g=ac.createGain(), t=ac.currentTime+when;
    filter.type='bandpass'; filter.frequency.setValueAtTime(filterStart,t); filter.frequency.exponentialRampToValueAtTime(filterEnd,t+duration); filter.Q.value=.7;
    g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(gain,t+.015); g.gain.exponentialRampToValueAtTime(.0001,t+duration);
    src.buffer=buffer; src.connect(filter).connect(g).connect(master); src.start(t); src.stop(t+duration+.03);
  };

  const matrixTick=()=>tone(950+Math.random()*500,.045,'square',.018);
  const matrixLock=()=>{tone(740,.11,'sine',.035);tone(1110,.18,'sine',.025,.055);};
  const portal=()=>{noise(1.05,.045,0,500,7200);tone(90,1.2,'sine',.08,0,32);tone(220,.85,'triangle',.04,0,900);tone(440,1.1,'sine',.025,.18,1100);};
  const impact=()=>{tone(62,.8,'sine',.14,0,28);tone(110,.42,'triangle',.06,0,48);noise(.28,.05,0,100,1800);};
  const magic=()=>{tone(392,.7,'sine',.045,0,784);tone(523.25,.85,'sine',.04,.08,1046.5);tone(783.99,1.15,'sine',.035,.16,1568);tone(1046.5,1.4,'sine',.025,.26,2093);noise(1.2,.025,.2,1200,9000);};

  const storybookSound=()=>{
    getContext();
    noise(1.6,.018,0,700,4200);
    tone(65,2.8,'sine',.045,0,32);
    tone(196,2.4,'sine',.028,.25,392);
    const notes=[523.25,659.25,783.99,1046.5,1318.51];
    notes.forEach((n,i)=>tone(n,1.8,'sine',.055-i*.006,.75+i*.22,n*1.008));
    tone(1567.98,2.7,'sine',.035,1.75,2093);
    tone(1046.5,2.8,'triangle',.025,2.1,1568);
    tone(783.99,3.2,'sine',.018,2.6,1046.5);
    tone(2093,2.2,'sine',.018,3.25,2637);
    noise(2.8,.018,2.9,2500,11000);
  };

  const ensureStorybook = () => {
    if(document.getElementById('mmStorybookIntro')) return document.getElementById('mmStorybookIntro');
    const screen=document.createElement('section');
    screen.id='mmStorybookIntro';
    screen.setAttribute('aria-label','Maria and Mario cinematic initials');
    screen.innerHTML=`
      <div class="mm-sky"><div class="mm-stars"></div><div class="mm-horizon"></div></div>
      <div class="mm-rays" aria-hidden="true"></div>
      <div class="mm-arc" aria-hidden="true"></div>
      <div class="mm-orbit" aria-hidden="true"></div>
      <div class="mm-core"><div class="mm-sweep" aria-hidden="true"></div><div class="mm-initials">M<span class="mm-amp">&amp;</span>M</div></div>
      <div class="mm-caption">MARIA &amp; MARIO</div>`;
    document.body.appendChild(screen);
    return screen;
  };

  const playStorybook = () => {
    const screen=ensureStorybook();
    const intro=document.getElementById('introAudio');
    if(intro){intro.pause();intro.currentTime=0;}
    screen.classList.remove('is-leaving');
    void screen.offsetWidth;
    screen.classList.add('is-live');
    storybookSound();
    setTimeout(()=>{
      screen.classList.add('is-leaving');
      setTimeout(()=>{
        screen.classList.remove('is-live','is-leaving');
        const welcome=document.getElementById('welcomeScreen');
        if(welcome){
          [document.getElementById('matrixIntro'),document.getElementById('farewellScreen'),document.getElementById('welcomeScreen'),document.getElementById('mainExperience')].forEach(s=>s?.classList.add('hidden-screen'));
          welcome.classList.remove('hidden-screen');
        }
      },1200);
    },7600);
  };

  const attach=()=>{
    installMatrixPresentation();
    const activate=()=>getContext();
    document.addEventListener('pointerdown',activate,{once:true,passive:true});
    document.addEventListener('keydown',activate,{once:true});

    const sequence=document.getElementById('typeSequence');
    if(sequence){let lastText='';const observer=new MutationObserver(()=>{const text=(sequence.textContent||'').trim();if(!text||text===lastText)return;lastText=text;matrixTick();if(text.length>8)matrixLock();});observer.observe(sequence,{childList:true,subtree:true,characterData:true});}

    /* Capture-phase interception keeps the YES transition cinematic instead of jumping straight to welcome. */
    document.addEventListener('click',(event)=>{
      const yes=event.target.closest?.('#yesBtn');
      if(!yes)return;
      event.preventDefault(); event.stopImmediatePropagation();
      getContext(); portal(); setTimeout(impact,650); setTimeout(magic,900);
      playStorybook();
    },true);

    document.getElementById('noBtn')?.addEventListener('click',()=>{getContext();tone(180,.35,'sawtooth',.035,0,70);});
    document.getElementById('enterWorldBtn')?.addEventListener('click',()=>{getContext();impact();magic();});
    document.querySelectorAll('[data-lang-select]').forEach(btn=>btn.addEventListener('click',()=>{getContext();tone(330,.16,'sine',.03,0,520);}));

    window.MMcinematicAudio={enable:getContext,tick:matrixTick,portal,impact,magic,storybook:playStorybook,isEnabled:()=>enabled};
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',attach);else attach();
})();
