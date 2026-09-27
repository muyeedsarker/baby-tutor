(function(){
const pages=[['index.html','🏠','হোম'],['learning.html','📚','লার্নিং'],['kids-learning.html','🤖','AI'],['quiz.html','🧩','কুইজ'],['voice.html','🔊','ভয়েস'],['draw.html','🎨','ড্রইং'],['stories.html','📖','গল্প'],['rhymes.html','🎵','ছড়া']];
const file=(location.pathname.split('/').pop()||'index.html').toLowerCase();
const progressKey='babyTutorProgress',starsKey='btStars';
let progress=Math.min(100,Math.max(0,Number(localStorage.getItem(progressKey)||0))),stars=Math.max(0,Number(localStorage.getItem(starsKey)||0));
function render(){const fill=document.getElementById('btFill'),p=document.getElementById('btPct'),d=document.getElementById('btDashPct'),s=document.getElementById('btStars');if(fill)fill.style.width=progress+'%';if(p)p.textContent=progress+'%';if(d)d.textContent=progress+'%';if(s)s.textContent=stars}
function addProgress(n=4,bonus=1){progress=Math.min(100,progress+n);stars+=bonus;localStorage.setItem(progressKey,progress);localStorage.setItem(starsKey,stars);render()}
function shell(){
 if(document.querySelector('.bt-shell'))return;
 const header=document.createElement('header');header.className='bt-shell';
 header.innerHTML='<div class="bt-head"><a class="bt-logo" href="index.html">🧸 Baby Tutor</a><nav class="bt-nav" aria-label="প্রধান নেভিগেশন">'+pages.map(p=>'<a href="'+p[0]+'" class="'+(file===p[0]?'bt-active':'')+'">'+p[1]+' '+p[2]+'</a>').join('')+'</nav><div class="bt-progress"><small><span>শেখার অগ্রগতি</span><span id="btPct">'+progress+'%</span></small><div class="bt-track"><div class="bt-fill" id="btFill"></div></div></div></div>';
 document.body.insertBefore(header,document.body.firstChild);
 const welcome=document.createElement('div');welcome.className='bt-welcome';welcome.innerHTML='<div class="bt-welcome-card"><div><strong>🌟 আজও একটু একটু করে শিখি!</strong><small>বর্ণমালা • সংখ্যা • গল্প • কুইজ • সৃজনশীল শেখা</small></div><a href="kids-learning.html">🚀 Smart Learning</a></div>';document.body.insertBefore(welcome,header.nextSibling);
 const dash=document.createElement('aside');dash.className='bt-dash';dash.innerHTML='⭐ <span id="btStars">'+stars+'</span> Stars <span>•</span> 📈 <span id="btDashPct">'+progress+'%</span> সম্পন্ন';document.body.appendChild(dash);
 const bottom=document.createElement('nav');bottom.className='bt-bottom';bottom.setAttribute('aria-label','মোবাইল নেভিগেশন');bottom.innerHTML=pages.map(p=>'<a href="'+p[0]+'" class="'+(file===p[0]?'bt-active':'')+'"><b>'+p[1]+'</b>'+p[2]+'</a>').join('');document.body.appendChild(bottom);
 const footer=document.createElement('footer');footer.className='bt-footer';footer.innerHTML='<div class="bt-footer-card"><div><strong>🧸 Baby Tutor</strong><small> — শিশুদের আনন্দময় ডিজিটাল শেখার জগৎ</small></div><div class="bt-footer-links"><a href="learning.html">📚 শেখা</a><a href="quiz.html">🧩 কুইজ</a><a href="kids-learning.html">🤖 Smart</a><a href="draw.html">🎨 আঁকি</a><a href="stories.html">📖 গল্প</a></div></div>';document.body.appendChild(footer);
 render();
 document.addEventListener('click',function(e){
   const target=e.target.closest('[data-progress]');
   if(target){addProgress(Number(target.dataset.progress||5),Number(target.dataset.stars||1));return}
   const learn=e.target.closest('.learn, .quiz-card, .option, .activity, [data-learn]');
   if(learn && !e.target.closest('a'))addProgress(3,1);
 });
 window.addEventListener('storage',function(e){if(e.key===progressKey)progress=Math.min(100,Math.max(0,Number(e.newValue)||0));if(e.key===starsKey)stars=Math.max(0,Number(e.newValue)||0);render()});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',shell);else shell();
})();