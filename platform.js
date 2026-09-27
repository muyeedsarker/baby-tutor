(function(){
const pages=[
['index.html','🏠','হোম'],['learning.html','📚','লার্নিং'],['kids-learning.html','🤖','AI'],['quiz.html','🧩','কুইজ'],
['voice.html','🔊','ভয়েস'],['draw.html','🎨','ড্রইং'],['stories.html','📖','গল্প'],['rhymes.html','🎵','ছড়া']
];
const file=(location.pathname.split('/').pop()||'index.html').toLowerCase();
const progressKey='babyTutorProgress';
let progress=Number(localStorage.getItem(progressKey)||0);
function shell(){
 if(document.querySelector('.bt-shell'))return;
 const header=document.createElement('div');header.className='bt-shell';
 header.innerHTML='<div class="bt-head"><a class="bt-logo" href="index.html">🧸 Baby Tutor</a><nav class="bt-nav">'+pages.map(p=>'<a href="'+p[0]+'" class="'+(file===p[0]?'bt-active':'')+'">'+p[1]+' '+p[2]+'</a>').join('')+'</nav><div class="bt-progress"><small><span>শেখার অগ্রগতি</span><span id="btPct">'+progress+'%</span></small><div class="bt-track"><div class="bt-fill" id="btFill"></div></div></div></div>';
 document.body.insertBefore(header,document.body.firstChild);
 const dash=document.createElement('div');dash.className='bt-dash';dash.innerHTML='⭐ <span id="btStars">0</span> Stars &nbsp;•&nbsp; 📈 <span>'+progress+'%</span> সম্পন্ন';document.body.appendChild(dash);
 const bottom=document.createElement('nav');bottom.className='bt-bottom';
 const mobile=pages.slice(0,5);bottom.innerHTML=mobile.map(p=>'<a href="'+p[0]+'" class="'+(file===p[0]?'bt-active':'')+'"><b>'+p[1]+'</b>'+p[2]+'</a>').join('')+'<a href="creator.html"><b>👤</b>প্রস্তুতকারক</a>';
 document.body.appendChild(bottom);
 document.getElementById('btFill').style.width=Math.min(100,Math.max(0,progress))+'%';
 document.addEventListener('click',function(e){const a=e.target.closest('[data-progress]');if(a){progress=Math.min(100,progress+Number(a.dataset.progress||5));localStorage.setItem(progressKey,progress);document.getElementById('btFill').style.width=progress+'%';document.getElementById('btPct').textContent=progress+'%';}});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',shell);else shell();
})();