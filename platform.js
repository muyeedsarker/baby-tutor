(function(){
const pages=[
 ['index.html','🏠','হোম'],['learning.html','📚','লার্নিং'],['kids-learning.html','🤖','AI'],
 ['quiz.html','🧩','কুইজ'],['voice.html','🔊','ভয়েস'],['draw.html','🎨','ড্রইং'],
 ['stories.html','📖','গল্প'],['rhymes.html','🎵','ছড়া']
];
const file=(location.pathname.split('/').pop()||'index.html').toLowerCase();
const progressKey='babyTutorProgress',starsKey='btStars';
let progress=Number(localStorage.getItem(progressKey)||0);
let stars=Number(localStorage.getItem(starsKey)||0);
const clamp=n=>Math.min(100,Math.max(0,Number(n)||0));
function render(){
 const pct=clamp(progress);
 const fill=document.getElementById('btFill'), pctEl=document.getElementById('btPct'), dashPct=document.getElementById('btDashPct'), dashStars=document.getElementById('btStars');
 if(fill)fill.style.width=pct+'%';
 if(pctEl)pctEl.textContent=pct+'%';
 if(dashPct)dashPct.textContent=pct+'%';
 if(dashStars)dashStars.textContent=stars;
}
function shell(){
 if(document.querySelector('.bt-shell'))return;
 const header=document.createElement('header');header.className='bt-shell';
 header.innerHTML='<div class="bt-head"><a class="bt-logo" href="index.html">🧸 Baby Tutor</a><nav class="bt-nav" aria-label="প্রধান নেভিগেশন">'+pages.map(p=>'<a href="'+p[0]+'" class="'+(file===p[0]?'bt-active':'')+'">'+p[1]+' '+p[2]+'</a>').join('')+'</nav><div class="bt-progress" aria-label="শেখার অগ্রগতি"><small><span>শেখার অগ্রগতি</span><span id="btPct">'+clamp(progress)+'%</span></small><div class="bt-track"><div class="bt-fill" id="btFill"></div></div></div></div>';
 document.body.insertBefore(header,document.body.firstChild);
 const dash=document.createElement('aside');dash.className='bt-dash';dash.innerHTML='⭐ <span id="btStars">'+stars+'</span> Stars <span>•</span> 📈 <span id="btDashPct">'+clamp(progress)+'%</span> সম্পন্ন';document.body.appendChild(dash);
 const bottom=document.createElement('nav');bottom.className='bt-bottom';bottom.setAttribute('aria-label','মোবাইল নেভিগেশন');
 bottom.innerHTML=pages.map(p=>'<a href="'+p[0]+'" class="'+(file===p[0]?'bt-active':'')+'"><b>'+p[1]+'</b>'+p[2]+'</a>').join('');
 document.body.appendChild(bottom);
 render();
 document.addEventListener('click',function(e){
   const a=e.target.closest('[data-progress]');
   if(!a)return;
   progress=clamp(progress+Number(a.dataset.progress||5));
   localStorage.setItem(progressKey,progress);
   const addStars=Number(a.dataset.stars||0);
   if(addStars){stars=Math.max(0,stars+addStars);localStorage.setItem(starsKey,stars)}
   render();
 });
 window.addEventListener('storage',function(e){
   if(e.key===progressKey)progress=Number(e.newValue||0);
   if(e.key===starsKey)stars=Number(e.newValue||0);
   render();
 });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',shell);else shell();
})();