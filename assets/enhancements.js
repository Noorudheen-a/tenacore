/* V4: automatic motion with manual selection and a persistent accessible preference. */
(()=>{
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 const hover=matchMedia('(hover: hover)');
 const root=document.documentElement;
 const motionInput=document.getElementById('reduce-motion');
 const motionStatus=document.getElementById('motion-status');
 let stored=null;try{stored=localStorage.getItem('tenacore-reduce-motion');}catch{}
 let reduce=stored===null?preference.matches:stored==='true';
 const controllers=[];
 function applyMotion(announce=false){root.classList.toggle('is-motion-reduced',reduce);if(motionInput)motionInput.checked=reduce;controllers.forEach(c=>c.sync());if(announce&&motionStatus)motionStatus.textContent=reduce?'Automatic motion is off. Use the image arrows, dots, or tabs to choose content.':'Automatic motion is on.';}
 function setMotion(value,announce=true){reduce=value;try{localStorage.setItem('tenacore-reduce-motion',String(reduce));}catch{}applyMotion(announce);}
 motionInput?.addEventListener('change',()=>setMotion(motionInput.checked));
 preference.addEventListener('change',e=>{let saved=null;try{saved=localStorage.getItem('tenacore-reduce-motion');}catch{}if(saved===null){reduce=e.matches;applyMotion();}});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!document.querySelector('.product-toggle[aria-expanded=true],.menu-toggle[aria-expanded=true]'))setMotion(true,false);},{capture:true});
 applyMotion();
 const product=document.querySelector('.nav-product');const trigger=document.querySelector('.product-toggle');const panel=document.getElementById('product-menu');let closeTimer;
 function openMenu(){clearTimeout(closeTimer);trigger.setAttribute('aria-expanded','true');panel.hidden=false;}
 product.addEventListener('pointerenter',e=>{if(hover.matches&&e.pointerType!=='touch')openMenu();});
 product.addEventListener('pointerleave',()=>{if(hover.matches)closeTimer=setTimeout(()=>{if(!product.contains(document.activeElement))closeProducts();},150);});
 product.addEventListener('focusin',e=>{if(e.target!==trigger)openMenu();});
 product.addEventListener('focusout',()=>setTimeout(()=>{if(!product.contains(document.activeElement))closeProducts();},0));
 function autoController(region,next,interval){
  let inView=false;let pointerInside=false;let timer=null;let manualUntil=0;
  function sync(){clearTimeout(timer);region.classList.toggle('is-paused',reduce);const hasFocus=region.contains(document.activeElement);if(!reduce&&inView&&!pointerInside&&!hasFocus&&!document.hidden){timer=setTimeout(()=>{next();sync();},Math.max(interval,manualUntil-Date.now()));}}
  function manual(){manualUntil=Date.now()+9000;sync();}
  region.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch'){pointerInside=true;sync();}});region.addEventListener('pointerleave',()=>{pointerInside=false;sync();});
  region.addEventListener('focusin',sync);region.addEventListener('focusout',()=>setTimeout(sync,0));document.addEventListener('visibilitychange',sync);
  new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;sync();},{threshold:.15}).observe(region);
  const control={manual,sync};controllers.push(control);sync();return control;
 }
 document.querySelectorAll('[data-carousel]').forEach(region=>{
  const slides=[...region.querySelectorAll('[data-slide]')];const dots=[...region.querySelectorAll('[data-slide-to]')];let index=0;
  function select(n){index=(n+slides.length)%slides.length;slides.forEach((s,i)=>s.hidden=i!==index);dots.forEach((d,i)=>d.setAttribute('aria-pressed',String(i===index)));region.querySelector('[data-carousel-count]').textContent=`${String(index+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;region.dataset.activeSlide=String(index);}
  const auto=autoController(region,()=>select(index+1),Number(region.dataset.interval)||5800);
  dots.forEach((d,i)=>d.addEventListener('click',()=>{select(i);auto.manual();}));
  region.querySelector('[data-carousel-prev]').addEventListener('click',()=>{select(index-1);auto.manual();});region.querySelector('[data-carousel-next]').addEventListener('click',()=>{select(index+1);auto.manual();});
  region.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();select(index+(e.key==='ArrowRight'?1:-1));auto.manual();}});
  let start=null;region.querySelector('.media-slides').addEventListener('pointerdown',e=>{if(e.pointerType==='touch')start={x:e.clientX,y:e.clientY};});region.addEventListener('pointerup',e=>{if(start){const dx=e.clientX-start.x,dy=e.clientY-start.y;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)){select(index+(dx<0?1:-1));auto.manual();}start=null;}});region.addEventListener('pointercancel',()=>start=null);select(0);
 });
 const hero=document.querySelector('[data-hero-carousel]');
 if(hero){const tabs=[...hero.querySelectorAll('[role=tab]')];const count=document.querySelector('[data-hero-count]');const progress=document.querySelector('.hero-progress i');const original=chooseCapability;
  chooseCapability=function(tab){original(tab);const n=tabs.indexOf(tab);count.textContent=`${String(n+1).padStart(2,'0')} / 03`;progress.style.width=`${((n+1)/tabs.length)*100}%`;hero.dataset.activeSlide=String(n);};
  const auto=autoController(document.querySelector('.home-hero'),()=>{const i=tabs.findIndex(t=>t.getAttribute('aria-selected')==='true');chooseCapability(tabs[(i+1)%tabs.length]);},6500);tabs.forEach(t=>t.addEventListener('click',auto.manual));chooseCapability(tabs[0]);
 }
 function syncGallery(){document.querySelectorAll('.gallery-stagger').forEach(g=>{const cards=[...g.querySelectorAll('.project-card')].filter(c=>!c.hidden);g.dataset.galleryCount=String(cards.length);cards.forEach((c,i)=>c.dataset.galleryOrder=String(i));});}
 document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',syncGallery));syncGallery();
 const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-revealed');reveal.unobserve(e.target);}}),{threshold:.12});document.querySelectorAll('.layered-product-visual,.gallery-card').forEach(el=>reveal.observe(el));
})();
