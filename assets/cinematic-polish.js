/* Maria & Mario — final cinematic polish + mobile Matrix safety fallback. */
(() => {
  const inject = () => {
    if (document.getElementById('mmCinematicPolish')) return;
    const style = document.createElement('style');
    style.id = 'mmCinematicPolish';
    style.textContent = `
      #mmStorybookIntro { isolation:isolate; background:#020306 !important; }
      #mmStorybookIntro::before { content:"";position:absolute;inset:-20%;z-index:0;pointer-events:none;background:radial-gradient(circle at 50% 53%,rgba(255,255,255,.95) 0 .18%,rgba(255,224,145,.32) .7%,transparent 9%),radial-gradient(circle at 50% 53%,rgba(255,210,105,.12),transparent 28%);opacity:0;transform:scale(.15);animation:mmCinematicFlash 7.6s cubic-bezier(.16,1,.3,1) forwards; }
      #mmStorybookIntro::after { content:"";position:absolute;inset:0;z-index:6;pointer-events:none;opacity:0;background:linear-gradient(115deg,transparent 0 42%,rgba(255,255,255,.9) 48%,rgba(255,216,125,.5) 50%,transparent 56%);transform:translateX(-120%);animation:mmCinematicSweep 7.6s ease-in-out forwards; }
      #mmStorybookIntro .mm-stars{animation:mmStarsPro 7.6s cubic-bezier(.16,1,.3,1) forwards!important;background-size:clamp(110px,10vw,170px) clamp(110px,10vw,170px)!important}
      #mmStorybookIntro .mm-stars::before{animation:mmStarsPro2 7.6s ease-out forwards!important} #mmStorybookIntro .mm-stars::after{animation:mmStarsPro3 7.6s ease-out forwards!important}
      #mmStorybookIntro .mm-horizon{animation:mmHorizonPro 7.6s cubic-bezier(.16,1,.3,1) forwards!important}
      #mmStorybookIntro .mm-arc{width:min(88vw,980px)!important;height:min(88vw,980px)!important;border-color:rgba(255,237,186,.22)!important;animation:mmArcPro 7.6s cubic-bezier(.16,1,.3,1) forwards!important}
      #mmStorybookIntro .mm-rays{animation:mmRaysPro 7.6s cubic-bezier(.16,1,.3,1) forwards!important} #mmStorybookIntro .mm-orbit{animation:mmOrbitPro 7.6s cubic-bezier(.16,1,.3,1) forwards!important}
      #mmStorybookIntro .mm-core{width:min(66vw,650px)!important} #mmStorybookIntro .mm-core::before{animation:mmCorePro 7.6s cubic-bezier(.16,1,.3,1) forwards!important}
      #mmStorybookIntro .mm-initials{font-size:clamp(9rem,20vw,17rem)!important;letter-spacing:-.11em!important;text-shadow:0 0 2px rgba(255,255,255,.9),0 0 25px rgba(255,218,130,.25)!important;animation:mmInitialsPro 7.6s cubic-bezier(.16,1,.3,1) forwards!important}
      #mmStorybookIntro .mm-sweep{width:11px!important;filter:blur(3px)!important;animation:mmSweepPro 7.6s cubic-bezier(.16,1,.3,1) forwards!important} #mmStorybookIntro .mm-caption{animation:mmCaptionPro 7.6s cubic-bezier(.16,1,.3,1) forwards!important}
      @keyframes mmCinematicFlash{0%,32%{opacity:0;transform:scale(.15)}42%{opacity:.9;transform:scale(1)}49%{opacity:.08;transform:scale(9)}56%{opacity:.18;transform:scale(1.6)}100%{opacity:.02;transform:scale(1)}}
      @keyframes mmCinematicSweep{0%,48%{opacity:0;transform:translateX(-125%)}56%{opacity:.8}70%{opacity:.18;transform:translateX(125%)}100%{opacity:0;transform:translateX(125%)}}
      @keyframes mmStarsPro{0%{opacity:0;transform:scale(.68) translate3d(0,4%,0)}30%{opacity:.16}58%{opacity:.58}100%{opacity:.72;transform:scale(1.14) translate3d(0,-2%,0)}}
      @keyframes mmStarsPro2{0%,24%{opacity:0;transform:scale(.7)}55%{opacity:.18}100%{opacity:.34;transform:scale(1.08)}} @keyframes mmStarsPro3{0%,34%{opacity:0;transform:scale(.75)}64%{opacity:.12}100%{opacity:.22;transform:scale(1.04)}}
      @keyframes mmHorizonPro{0%,20%{opacity:0;transform:scale(.4)}46%{opacity:.22}64%{opacity:.72;transform:scale(1)}100%{opacity:.9;transform:scale(1.18)}}
      @keyframes mmArcPro{0%,16%{opacity:0;transform:scale(.12) rotate(-30deg)}42%{opacity:.18}62%{opacity:.62}100%{opacity:.92;transform:scale(1) rotate(10deg)}}
      @keyframes mmRaysPro{0%,25%{opacity:0;transform:scale(.2) rotate(-35deg)}48%{opacity:.18}68%{opacity:.6}100%{opacity:.82;transform:scale(1.08) rotate(20deg)}}
      @keyframes mmOrbitPro{0%,30%{opacity:0;transform:rotate(-35deg) scale(.12)}55%{opacity:.4}72%{opacity:.9}100%{opacity:1;transform:rotate(22deg) scale(1)}}
      @keyframes mmCorePro{0%,29%{opacity:0;transform:scale(.04)}42%{opacity:1;transform:scale(1)}51%{opacity:.25;transform:scale(15)}59%{opacity:1;transform:scale(1)}100%{opacity:1;transform:scale(1)}}
      @keyframes mmInitialsPro{0%,35%{opacity:0;transform:translate3d(0,28px,0) scale(.48);filter:blur(18px) brightness(.8) drop-shadow(0 0 0 transparent)}49%{opacity:.42;transform:translate3d(0,5px,0) scale(.82);filter:blur(5px) brightness(1.05) drop-shadow(0 0 22px rgba(255,213,104,.25))}63%{opacity:1;transform:translate3d(0,0,0) scale(1);filter:blur(0) brightness(1.15) drop-shadow(0 0 42px rgba(255,210,110,.35))}72%{transform:scale(1.035)}100%{opacity:1;transform:scale(1)}}
      @keyframes mmSweepPro{0%,49%{left:-20%;opacity:0}56%{opacity:.95}71%{left:120%;opacity:.25}100%{left:120%;opacity:0}} @keyframes mmCaptionPro{0%,62%{opacity:0;transform:translateY(15px);filter:blur(5px)}76%{opacity:.72;transform:none;filter:none}100%{opacity:.72}}
      @media(max-width:760px){#mmStorybookIntro .mm-core{width:min(82vw,520px)!important}#mmStorybookIntro .mm-initials{font-size:clamp(6.4rem,29vw,10.5rem)!important;line-height:.78!important}#mmStorybookIntro .mm-arc{width:115vw!important;height:115vw!important}#mmStorybookIntro .mm-rays{width:110vw!important}#mmStorybookIntro .mm-orbit{width:94vw!important}#mmStorybookIntro .mm-caption{bottom:9%;font-size:.68rem;letter-spacing:.25em}#mmStorybookIntro::after{background:linear-gradient(115deg,transparent 0 38%,rgba(255,255,255,.82) 48%,rgba(255,216,125,.42) 51%,transparent 60%)}}
      @media(min-width:761px){#mmStorybookIntro .mm-orbit::before,#mmStorybookIntro .mm-orbit::after{font-size:22px}} @media(prefers-reduced-motion:reduce){#mmStorybookIntro::before,#mmStorybookIntro::after{animation:none;opacity:.35;transform:none}#mmStorybookIntro .mm-initials{animation:none!important;opacity:1;transform:none;filter:none}}
      .mm-mobile-sequence-fallback{position:relative;z-index:20;display:flex;flex-direction:column;align-items:center;justify-content:center;width:min(92vw,900px);min-height:22vh;margin:0 auto;text-align:center;pointer-events:none}.mm-mobile-sequence-fallback .fallback-line{font-family:Inter,system-ui,sans-serif;font-size:clamp(1.15rem,5vw,2.8rem);font-weight:600;letter-spacing:.08em;line-height:1.18;color:#e9fff4;text-shadow:0 0 12px rgba(57,233,122,.35),0 0 28px rgba(57,233,122,.12);margin:.45rem 0;opacity:0;transform:translateY(8px);animation:mmFallbackLine .65s ease forwards}.mm-mobile-sequence-fallback .fallback-cursor{display:inline-block;width:.55em;height:1.05em;margin-left:.18em;vertical-align:-.1em;background:#39e97a;box-shadow:0 0 10px #39e97a;animation:mmCursor .75s steps(1) infinite}.mm-fallback-date{margin-top:2rem;text-align:center;opacity:0;animation:mmFallbackShow .8s ease forwards}.mm-fallback-date strong{display:block;font-family:Cinzel,serif;font-size:clamp(1.5rem,6vw,3rem);letter-spacing:.12em;color:#fff2cf}.mm-fallback-label{font-size:.72rem;letter-spacing:.25em;color:rgba(255,255,255,.58)}
      @keyframes mmFallbackLine{to{opacity:1;transform:none}}@keyframes mmCursor{50%{opacity:0}}@keyframes mmFallbackShow{to{opacity:1}}
    `;
    document.head.appendChild(style);
  };

  const mobileMatrixFallback = () => {
    const gate=document.getElementById('languageGate'), matrix=document.getElementById('matrixIntro');
    if(!gate||!matrix)return;
    document.querySelectorAll('[data-lang-select]').forEach(button=>button.addEventListener('click',()=>{
      window.setTimeout(()=>{
        if(!matrix.classList.contains('hidden-screen'))return;
        gate.classList.add('hidden-screen');
        matrix.classList.remove('hidden-screen');
        document.body.classList.remove('matrix-hidden');
        document.querySelector('.lang-switch')?.classList.remove('hidden-switch');
        const canvas=document.getElementById('matrixCanvas');
        if(canvas){canvas.style.display='block';canvas.style.visibility='visible';canvas.style.opacity='.54';}
        window.dispatchEvent(new CustomEvent('mm-mobile-matrix-ready'));
      },250);
    },{passive:true});

    const runTextFallback=()=>{
      const host=document.getElementById('typeSequence');
      if(!host||host.textContent.trim())return;
      const bg=document.documentElement.lang==='bg';
      const lines=bg?["МОМЕНТЪТ НАСТЪПИ...","ДА СЕ ОЖЕНИМ","ЩОМ ВИЖДАШ ТОВА, ЗНАЧИ СИ СПЕЦИАЛЕН ЗА НАС","И...","ТИ БЕШЕ ИЗБРАН ДА ВЛЕЗЕШ В НАШАТА МАТРИЦА","ВЛИЗАШ ЛИ?"]:["TIME HAS COME...","TO GET MARRIED","IF YOU SEE THIS THEN YOU ARE SPECIAL TO US","AND...","YOU'VE BEEN SELECTED TO JOIN OUR MATRIX","ARE YOU IN?"];
      host.innerHTML='';
      const fallback=document.createElement('div');fallback.className='mm-mobile-sequence-fallback';host.appendChild(fallback);
      lines.forEach((text,i)=>{const line=document.createElement('div');line.className='fallback-line';line.textContent=text;line.style.animationDelay=`${i*900}ms`;fallback.appendChild(line);});
      window.setTimeout(()=>{
        const date=document.getElementById('dateBlock');const choice=document.getElementById('choiceBlock');
        if(date){date.classList.remove('hidden');date.style.opacity='1';}
        if(choice){choice.classList.remove('hidden');choice.style.opacity='1';}
      },lines.length*900+900);
    };

    window.setTimeout(runTextFallback,900);
    window.addEventListener('mm-mobile-matrix-ready',()=>window.setTimeout(runTextFallback,350),{once:true});
  };

  const init=()=>{inject();mobileMatrixFallback();const warm=()=>window.MMcinematicAudio?.enable?.();document.addEventListener('pointerdown',warm,{once:true,passive:true});document.addEventListener('keydown',warm,{once:true});};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();