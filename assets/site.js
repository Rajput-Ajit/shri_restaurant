const CONFIG={name:'Hotel Shree',whatsapp:'',/* add number with country code, e.g. 919XXXXXXXXX */ phone:'',address:'Jalna-Ambad Road, Laxmikant Nagar, Indewadi, Jalna'};
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const NAV=[['index.html','Home'],['rooms.html','Rooms'],['book.html','Book a room'],['dining.html','Dining'],['menu.html','Menu'],['gallery.html','Gallery'],['contact.html','Contact']];
const page=location.pathname.split('/').pop()||'index.html';
document.body.classList.add('pg');
document.body.insertAdjacentHTML('afterbegin',`
<header id="hdr" class="fixed inset-x-0 top-0 z-50 transition-all duration-700">
 <div class="max-w-[90rem] mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
  <a href="index.html" aria-label="Hotel Shree home"><img src="assets/logo.png" alt="Hotel Shree" class="h-16 w-auto transition duration-700" id="hlogo"></a>
  <nav class="nav hidden xl:flex gap-8 xl:gap-10 text-[.72rem] tracking-[.18em] uppercase">${NAV.map(n=>`<a class="lnk ${page===n[0]?'on':''}" href="${n[0]}">${n[1]}</a>`).join('')}</nav>
  <div class="flex items-center gap-4"><a href="scan.html" class="qrb grid place-content-center w-11 h-11 border border-gold/60 text-gold hover:bg-gold hover:text-ink transition duration-500" aria-label="Scan QR code" title="Scan QR code"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3M7 12h10"/></svg></a><a href="reserve.html" class="btn hidden sm:inline-block !py-3 !px-6">Reserve a table</a>
   <button id="bg" class="xl:hidden grid gap-1.5 w-10" aria-label="Open menu"><i class="block h-px bg-ivory"></i><i class="block h-px bg-ivory w-3/4 ml-auto"></i></button></div>
 </div></header>
<div id="mm" class="fixed inset-0 z-[60] bg-ink flex flex-col items-center justify-center gap-6 font-serif text-5xl opacity-0 invisible transition-all duration-700">
 <button id="mx" class="absolute top-7 right-7 font-sans font-light text-4xl" aria-label="Close menu">&times;</button>
 ${NAV.map(n=>`<a href="${n[0]}" class="hover:text-gold transition">${n[1]}</a>`).join('')}<a href="reserve.html" class="btn !text-sm mt-4 font-sans">Reserve a table</a></div>`);
document.body.insertAdjacentHTML('beforeend',`
<footer class="bg-coal border-t border-gold/20 mt-0"><div class="max-w-[90rem] mx-auto px-6 md:px-12 pt-20 pb-10">
 <div class="grid md:grid-cols-12 gap-12">
  <div class="md:col-span-5"><img src="assets/logo.png" alt="Hotel Shree" class="h-28 w-auto mb-6"><p class="font-serif text-2xl text-champ max-w-sm leading-snug">Stay, dine and unwind in the heart of Jalna.</p></div>
  <div class="md:col-span-3"><h4 class="lbl mb-5">Explore</h4><ul class="space-y-3 text-[.95rem]">${NAV.slice(1).map(n=>`<li><a class="hover:text-gold transition" href="${n[0]}">${n[1]}</a></li>`).join('')}<li><a class="hover:text-gold transition" href="reserve.html">Reserve a table</a></li><li><a class="hover:text-gold transition" href="scan.html">Scan QR</a></li></ul></div>
  <div class="md:col-span-4"><h4 class="lbl mb-5">Visit us</h4><address class="not-italic text-[.95rem] leading-relaxed text-ivory/80">Hotel Shree, Bar &middot; Restaurant &middot; Lodging<br>${CONFIG.address}<br>Maharashtra</address><a target="_blank" rel="noopener" class="inline-block mt-4 text-gold border-b border-gold/40 pb-1 hover:border-gold transition" href="https://www.google.com/maps/search/?api=1&query=Hotel+Shree+Indewadi+Jalna">Get directions</a></div>
 </div><div class="rule mt-16"></div>
 <div class="pt-6 flex flex-wrap justify-between gap-3 text-xs text-mute"><span>&copy; ${new Date().getFullYear()} Hotel Shree. All rights reserved.</span><button id="up" class="hover:text-gold transition">Back to top</button></div></div></footer>
<div id="toast" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] bg-ivory text-ink px-6 py-4 text-sm shadow-2xl translate-y-28 opacity-0 transition-all duration-500 max-w-[92vw]"></div>`);
const h=$('#hdr');addEventListener('scroll',()=>{const s=scrollY>80;h.classList.toggle('bg-ink/90',s);h.classList.toggle('backdrop-blur-md',s);h.classList.toggle('border-b',s);h.classList.toggle('border-gold/20',s);$('#hlogo').classList.toggle('!h-12',s)},{passive:true});
const mm=$('#mm'),tg=o=>{mm.classList.toggle('opacity-0',!o);mm.classList.toggle('invisible',!o);document.body.style.overflow=o?'hidden':''};
$('#bg').onclick=()=>tg(1);$('#mx').onclick=()=>tg(0);$$('a',mm).forEach(a=>a.onclick=()=>tg(0));$('#up').onclick=()=>scrollTo({top:0});
function toast(m){const t=$('#toast');t.textContent=m;t.classList.remove('translate-y-28','opacity-0');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.add('translate-y-28','opacity-0'),4500)}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
function observe(){$$('.reveal:not(.in)').forEach(e=>io.observe(e))}observe();
if(document.body.dataset.loader!==undefined&&!sessionStorage.getItem('shree_seen')){sessionStorage.setItem('shree_seen',1);
 document.body.insertAdjacentHTML('afterbegin','<div class="curtain" id="cur"><img src="assets/logo.png" alt="" class="h-40 w-auto"></div>');document.body.style.overflow='hidden';
 setTimeout(()=>{$('#cur').classList.add('out');document.body.style.overflow=''},1800)}
function lightbox(){if(!$('#lb'))document.body.insertAdjacentHTML('beforeend','<div id="lb" class="fixed inset-0 z-[100] bg-black/95 hidden items-center justify-center p-6 cursor-zoom-out"><img id="lbi" alt="" class="max-h-full max-w-full object-contain"></div>');
 const lb=$('#lb');$$('[data-lb]').forEach(b=>b.onclick=()=>{$('#lbi').src=b.dataset.lb;lb.classList.replace('hidden','flex')});lb.onclick=()=>lb.classList.replace('flex','hidden');addEventListener('keydown',e=>e.key==='Escape'&&lb.click())}
const heroHTML=(img,t,s)=>`<section class="relative h-[68vh] min-h-[460px] overflow-hidden"><img src="assets/${img}" alt="" class="kb absolute inset-0 w-full h-full object-cover"><div class="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/40 to-ink"></div><div class="relative h-full max-w-[90rem] mx-auto px-6 md:px-12 flex flex-col justify-end pb-20"><h1 class="font-serif font-light text-6xl md:text-8xl leading-none"><span class="line"><span style="animation-delay:.3s">${t}</span></span></h1><p class="fade mt-6 text-champ/80 max-w-lg" style="animation-delay:1s">${s}</p></div></section>`;
