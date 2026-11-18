/* progress bar */
document.body.insertAdjacentHTML('afterbegin','<div id="prog"></div>');
const prog=$('#prog');
/* split headings into words */
$$('[data-split]').forEach(el=>{el.classList.add('split');el.innerHTML=el.textContent.trim().split(/\s+/).map((w,i)=>`<span class="w"><i style="transition-delay:${i*70}ms">${w}</i></span>`).join(' ')});
$$('.split').forEach(e=>io.observe(e));
/* videos play only when visible */
const vio=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;e.isIntersecting?v.play().catch(()=>{}):v.pause()}),{threshold:.15});
$$('video').forEach(v=>{v.muted=true;vio.observe(v)});
/* counters */
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;cio.unobserve(e.target);const end=+e.target.dataset.n,suf=e.target.dataset.s||'',t0=performance.now();
 (function f(t){const p=Math.min(1,(t-t0)/1800),v=Math.round(end*(1-Math.pow(1-p,3)));e.target.textContent=v+suf;if(p<1)requestAnimationFrame(f)})(t0)}),{threshold:.6});
$$('[data-n]').forEach(e=>cio.observe(e));
/* scroll driven: progress, hero parallax, image parallax, expanding video */
const hero=$('#heroWrap'),hc=$('#heroContent'),ex=$('#expand'),exv=$('#expandBox'),pars=$$('[data-par]');
let tick=false;
function frame(){tick=false;const y=scrollY,H=innerHeight;
 prog.style.transform=`scaleX(${y/(document.documentElement.scrollHeight-H)})`;
 if(y<H*1.2){hc.style.transform=`translateY(${y*.25}px)`;hc.style.opacity=Math.max(0,1-y/(H*.7));$('#heroVid').style.transform=`scale(${1+y/H*.15})`}
 pars.forEach(el=>{const r=el.getBoundingClientRect();if(r.bottom<0||r.top>H)return;const k=+el.dataset.par,c=(r.top+r.height/2-H/2);el.style.transform=`translateY(${(-c*k).toFixed(1)}px)`});
 const r=ex.getBoundingClientRect(),p=Math.min(1,Math.max(0,-r.top/(r.height-H)));
 const e=Math.min(1,p*2.2);exv.style.clipPath=`inset(${(1-e)*14}% ${(1-e)*22}% ${(1-e)*14}% ${(1-e)*22}% round ${(1-e)*24}px)`;
 $('#exText').style.opacity=Math.min(1,Math.max(0,(p-.45)*3));$('#exText').style.transform=`translateY(${(1-Math.min(1,Math.max(0,(p-.45)*3)))*40}px)`}
addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(frame)}},{passive:true});frame();
/* panels: autoplay video on touch devices, hover on desktop */
$$('.panel').forEach(p=>{const v=$('video',p);if(!v)return;p.addEventListener('mouseenter',()=>v.play().catch(()=>{}))});
if(matchMedia('(hover:none)').matches)$$('.panel').forEach(p=>p.classList.add('act'));
/* subtle 3D tilt on framed images */
$$('.tilt').forEach(el=>{el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(900px) rotateY(${x*7}deg) rotateX(${-y*7}deg) scale(1.02)`});el.addEventListener('mouseleave',()=>el.style.transform='')});
