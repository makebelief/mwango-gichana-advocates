
// Force a fresh homepage visit to begin at the hero instead of a mobile browser's restored scroll position.
const normalizedPath=location.pathname.replace(/\/+$/,'')||'/';
const isHomePath=normalizedPath==='/'||normalizedPath.endsWith('/index.html');
if(isHomePath&&'scrollRestoration' in history) history.scrollRestoration='manual';
if(isHomePath&&!location.hash){
  let homeBootActive=true;
  const resetHomeScroll=()=>{
    if(!homeBootActive)return;
    const root=document.documentElement;
    const body=document.body;
    root.style.scrollBehavior='auto';
    window.scrollTo(0,0);
    root.scrollTop=0;
    if(body)body.scrollTop=0;
  };
  resetHomeScroll();
  document.addEventListener('DOMContentLoaded',()=>{
    resetHomeScroll();
    requestAnimationFrame(()=>requestAnimationFrame(resetHomeScroll));
  },{once:true});
  window.addEventListener('load',()=>{
    resetHomeScroll();
    setTimeout(resetHomeScroll,60);
    setTimeout(resetHomeScroll,220);
    setTimeout(()=>{resetHomeScroll();homeBootActive=false;document.documentElement.style.scrollBehavior='';},600);
  },{once:true});
  window.addEventListener('pageshow',event=>{
    if(event.persisted){
      homeBootActive=true;
      resetHomeScroll();
      requestAnimationFrame(()=>requestAnimationFrame(resetHomeScroll));
      setTimeout(()=>{resetHomeScroll();homeBootActive=false;},350);
    }
  });
}
const FIRM_PHONE=''; // Add the verified Kenyan mobile number here, e.g. 2547XXXXXXXX.
const FIRM_EMAIL='gloria@mwangogichanalegal.com';

const menuButton=document.querySelector('.menu-toggle');
const mobileMenu=document.querySelector('#mobile-menu');
function setMenu(open){if(!menuButton||!mobileMenu)return;menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');mobileMenu.hidden=!open;document.body.classList.toggle('menu-open',open)}
menuButton?.addEventListener('click',()=>setMenu(menuButton.getAttribute('aria-expanded')!=='true'));
mobileMenu?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',event=>{if(event.key==='Escape')setMenu(false)});
const header=document.querySelector('[data-header]');
window.addEventListener('scroll',()=>header?.classList.toggle('is-scrolled',window.scrollY>10),{passive:true});
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

const revealItems=document.querySelectorAll('.reveal');
if('IntersectionObserver'in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver((entries,current)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');current.unobserve(entry.target)}}),{threshold:.1,rootMargin:'0px 0px -25px'});revealItems.forEach(item=>observer.observe(item))}else revealItems.forEach(item=>item.classList.add('is-visible'));

const brandReveal=document.querySelector('video[data-brand-reveal]');
if(brandReveal){
  brandReveal.muted=true;
  brandReveal.playsInline=true;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    brandReveal.pause();
  }else{
    const tryPlay=()=>brandReveal.play().catch(()=>{});
    if(brandReveal.readyState>=2) tryPlay();
    else brandReveal.addEventListener('canplay',tryPlay,{once:true});
    document.addEventListener('visibilitychange',()=>{if(!document.hidden)tryPlay()});
  }
}

const form=document.querySelector('[data-enquiry-form]');
form?.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const subject=`Website enquiry — ${data.get('service')||'General legal enquiry'}`;const body=[`Name: ${data.get('name')||''}`,`Email: ${data.get('email')||''}`,`Telephone: ${data.get('telephone')||'Not provided'}`,`Area: ${data.get('service')||'General enquiry'}`,'','Brief outline:',`${data.get('enquiry')||''}`].join('\n');const status=form.querySelector('[data-form-status]');if(status)status.textContent='Opening your email app with the enquiry prepared.';window.location.href=`mailto:${FIRM_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`});

const contactRail=document.createElement('aside');
contactRail.className='contact-rail'+(FIRM_PHONE?'':' pending');
contactRail.setAttribute('aria-label','Quick contact');
const whatsappHref=FIRM_PHONE?`https://wa.me/${FIRM_PHONE}?text=${encodeURIComponent('Hello Mwango Gichana & Co. Advocates')}`:'/contact';
const phoneHref=FIRM_PHONE?`tel:+${FIRM_PHONE}`:'/contact';
contactRail.innerHTML=`<div class="contact-rail-stack"><button class="contact-rail-toggle" type="button" aria-expanded="true" aria-label="Partially close quick contact options"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button><div class="contact-rail-actions"><a href="${whatsappHref}" ${FIRM_PHONE?'target="_blank" rel="noopener noreferrer"':''} aria-label="${FIRM_PHONE?'Chat with Mwango Gichana & Co. Advocates on WhatsApp':'Open contact page — WhatsApp number pending confirmation'}" title="WhatsApp"><svg class="brand-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994.001 7.94 7.94 0 0 0 .062 7.932c0 1.398.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.003A7.94 7.94 0 0 0 15.93 7.93a7.9 7.9 0 0 0-2.329-5.604ZM7.997 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.25a6.56 6.56 0 0 1-1.007-3.496A6.59 6.59 0 0 1 7.995 1.35a6.54 6.54 0 0 1 4.658 1.93 6.56 6.56 0 0 1 1.928 4.66 6.59 6.59 0 0 1-6.584 6.581m3.615-4.934c-.198-.099-1.17-.578-1.353-.644-.182-.066-.315-.099-.445.099-.132.198-.511.644-.627.775-.116.132-.231.148-.429.05-.198-.1-.836-.308-1.592-.984-.589-.525-.987-1.173-1.103-1.371-.116-.198-.012-.305.087-.404.089-.088.198-.231.297-.347.1-.116.132-.198.198-.33.066-.132.033-.248-.017-.347-.05-.099-.445-1.073-.61-1.47-.16-.388-.323-.335-.445-.341l-.379-.007a.73.73 0 0 0-.528.248c-.182.198-.693.677-.693 1.653 0 .975.71 1.917.81 2.05.098.132 1.397 2.132 3.385 2.992.473.204.842.326 1.13.417.475.151.907.13 1.249.079.38-.057 1.17-.479 1.336-.942.165-.462.165-.858.116-.942-.05-.082-.182-.132-.38-.23"/></svg></a><a href="${phoneHref}" aria-label="${FIRM_PHONE?'Call Mwango Gichana & Co. Advocates':'Open contact page — phone number pending confirmation'}" title="Call"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.28-1.28a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92Z"/></svg></a></div></div>`;
document.body.append(contactRail);
const railToggle=contactRail.querySelector('.contact-rail-toggle');
railToggle.addEventListener('click',()=>{const collapsed=contactRail.classList.toggle('is-collapsed');railToggle.setAttribute('aria-expanded',String(!collapsed));railToggle.setAttribute('aria-label',collapsed?'Expand quick contact options':'Partially close quick contact options')});
