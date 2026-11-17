'use strict';
(() => {
  const mobile = matchMedia('(max-width: 700px)');
  const disclosures = [...document.querySelectorAll('.mobile-disclosure')];
  const compactCopy = [
    ['#online-tab span', 'Websites'],
    ['#business-tab span', 'Software'],
    ['#it-tab span', 'IT support'],
    ['.home-hero .hero-center>p:not(.eyebrow)', 'Websites, apps, business software, and IT support. Everything your business needs to get online and work better.'],
    ['.services-hero .lead', 'Websites, online shops, billing, branding, and marketing. Find the service you need.'],
    ['.about-hero .lead', 'We help businesses get online, simplify daily work, and connect their IT.'],
    ['.contact-simple .lead', 'Have a project or a question? Send a message or contact us directly.']
  ].map(([selector, text]) => ({element:document.querySelector(selector),text})).filter(item=>item.element);
  compactCopy.forEach(item=>item.original=item.element.textContent);
  function adapt() {
    disclosures.forEach(element=>{element.open=!mobile.matches;});
    compactCopy.forEach(item=>{item.element.textContent=mobile.matches?item.text:item.original;});
  }
  adapt(); mobile.addEventListener('change', adapt);
  // Keep an expanded navigation panel out of the page when following a link.
  document.querySelectorAll('.mobile-disclosure').forEach(element=>element.addEventListener('toggle',()=>{
    if(!mobile.matches&&!element.open) element.open=true;
  }));
})();
