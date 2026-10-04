(function(){
const pages=[['index.html','🏠','হোম'],['learning.html','📚','লার্নিং'],['islamic.html','🌙','ইসলামিক'],['kids-learning.html','🤖','AI'],['quiz.html','🧩','কুইজ'],['voice.html','🔊','ভয়েস'],['draw.html','🎨','ড্রইং'],['stories.html','📖','গল্প'],['rhymes.html','🎵','ছড়া']];
const file=(location.pathname.split('/').pop()||'index.html').toLowerCase();
const progressKey='babyTutorProgress',starsKey='btStars';
function loadCss(id,href){if(document.getElementById(id))return;const link=document.createElement('link');link.id=id;link.rel='stylesheet';link.href=href;(document.head||document.documentElement).appendChild(link)}

function focusCss(){loadCss('bt-focus-navigation-css','focus-navigation.css')}
function pageTitle(){
 const h=document.querySelector('h1,h2,.sectionHead h2,.hero h1,.brand');
 return (h&&h.textContent||'Baby Tutor').replace(/\s+/g,' ').trim().slice(0,42);
}
function ensureFocusBar(title){
 let bar=document.getElementById('btFocusBar');
 if(!bar){
  bar=document.createElement('div');bar.id='btFocusBar';bar.className='bt-focus-bar';
  bar.innerHTML='<div class="bt-focus-bar-inner"><button class="bt-focus-back" id="btFocusBack" aria-label="এক ধাপ পিছনে">←</button><strong class="bt-focus-title" id="btFocusTitle"></strong><span class="bt-focus-sub">এক ধাপ করে শেখা</span></div>';
  document.body.insertBefore(bar,document.body.firstChild);
  document.getElementById('btFocusBack').addEventListener('click',focusBack);
 }
 document.getElementById('btFocusTitle').textContent=title||pageTitle();
 return bar;
}
function clearFocus(){
 document.body.classList.remove('bt-focus-active');
 document.querySelectorAll('.bt-focus-control-hide,.bt-focus-section-hide').forEach(el=>el.classList.remove('bt-focus-control-hide','bt-focus-section-hide'));
 document.querySelectorAll('.bt-focus-target').forEach(el=>el.classList.remove('bt-focus-target'));
 const bar=document.getElementById('btFocusBar');if(bar)bar.remove();
 sessionStorage.removeItem('btFocusTitle');
}
function hideOtherButtons(target){
 document.querySelectorAll('a,button,input,select,textarea').forEach(el=>{
  if(el.id==='btFocusBack'||el.closest('#btFocusBar')||target.contains(el)||el===target)return;
  el.classList.add('bt-focus-control-hide');
 });
}
function focusTarget(target,title,sectionMode){
 if(!target)return;
 clearFocus();
 document.body.classList.add('bt-focus-active');
 ensureFocusBar(title||pageTitle());
 target.classList.add('bt-focus-target');
 if(sectionMode){
  const section=target.closest('section,article,.section,.lesson,.topicGrid,.path,.quick')||target;
  const root=section.parentElement;
  if(root){
   [...root.children].forEach(ch=>{
    if(ch!==section&&!ch.contains(section))ch.classList.add('bt-focus-section-hide');
   });
  }
  hideOtherButtons(section);
 }else hideOtherButtons(target);
 sessionStorage.setItem('btFocusTitle',title||pageTitle());
 target.scrollIntoView({behavior:'smooth',block:'start'});
}
function focusAnchor(hash){
 if(!hash||hash==='#')return;
 const id=decodeURIComponent(hash.slice(1));
 const target=document.getElementById(id);
 if(target)setTimeout(()=>focusTarget(target,(target.querySelector('h1,h2,h3')||target).textContent, true),40);
}
function focusModal(){
 const target=document.querySelector('.lessonPanel.show,.panel.show,[role="dialog"].show');
 if(target)setTimeout(()=>focusTarget(target,(target.querySelector('h2,h3')||target).textContent,false),20);
}
function focusBack(){
 if(document.body.classList.contains('bt-focus-active')){
  const hadHash=!!location.hash;
  clearFocus();
  if(hadHash)history.back();
  return;
 }
 const previous=sessionStorage.getItem('btFocusParent')||'';
 if(previous&&previous!==location.href){location.href=previous;return}
 if(file!=='index.html'&&document.referrer&&document.referrer.indexOf(location.origin)===0){history.back();return}
 location.href='index.html';
}
function bindFocusNavigation(){
 document.addEventListener('click',function(e){
  const el=e.target.closest('a,button,.topic,.tile,.fld,.pbtn,.hxk');
  if(!el||el.closest('#btFocusBar'))return;
  const href=el.getAttribute('href')||'';
  const onclick=el.getAttribute('onclick')||'';
  const label=(el.textContent||'').replace(/\s+/g,' ').trim().slice(0,42);
  if(href&&href.charAt(0)==='#'){
   e.preventDefault();
   history.pushState(null,'',href);
   focusAnchor(href);
   return;
  }
  if(/openTopic\\s*\\(|openPanel\\s*\\(/.test(onclick)){
   sessionStorage.setItem('btFocusParent',location.href);
   setTimeout(focusModal,40);
   return;
  }
  if(el.classList.contains('topic')||el.classList.contains('tile')||el.classList.contains('fld')||el.classList.contains('pbtn')||el.classList.contains('hxk')){
   if(href&&href.indexOf('#')===0)return;
   sessionStorage.setItem('btFocusParent',location.href);
   sessionStorage.setItem('btFocusTitle',label||pageTitle());
  }
 },true);
 window.addEventListener('popstate',()=>clearFocus());
}

loadCss('bt-premium-buttons-css','premium-buttons.css');
loadCss('bt-more-topics-css','more-topics.css');focusCss();
loadCss('bt-site-repair-css','site-repair.css');
let progress=Math.min(100,Math.max(0,Number(localStorage.getItem(progressKey)||0))),stars=Math.max(0,Number(localStorage.getItem(starsKey)||0));
function render(){const fill=document.getElementById('btFill'),p=document.getElementById('btPct'),d=document.getElementById('btDashPct'),s=document.getElementById('btStars');if(fill)fill.style.width=progress+'%';if(p)p.textContent=progress+'%';if(d)d.textContent=progress+'%';if(s)s.textContent=stars}
function addProgress(n=4,bonus=1){progress=Math.min(100,progress+n);stars+=bonus;localStorage.setItem(progressKey,progress);localStorage.setItem(starsKey,stars);render()}
function markMoreTopics(){if(file!=='index.html')return;const nodes=[...document.querySelectorAll('h1,h2,h3,h4,h5,.section-title,.sectionTitle,.title,.heading')];const heading=nodes.find(el=>/আরও\s*শেখার\s*বিষয়|আরও\s*শেখার\s*বিষয়/.test((el.textContent||'').trim()));if(!heading)return;let section=heading.closest('section')||heading.parentElement;if(section)section.classList.add('bt-more-topics')}
function homeUpgrade(){
 if(file!=='index.html')return;
 document.body.classList.add('bt-home');
 const replaceText=(from,to)=>{const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(n=>{if(n.nodeValue&&n.nodeValue.trim()===from)n.nodeValue=to})};
 replaceText('🎓Baby Tutor⭐','🎓 Baby Tutor ⭐');replaceText('শিখি • খেলি • বড় হই','শিখি • খেলি • বড় হই');replaceText('শিখি আজ, গড়ব আগামীর ❤️','শিখি আজ, গড়ব আগামীর ❤️');
 const old=document.querySelector('.hero');
 if(old&&!document.querySelector('.bt-home-visual')){
  const v=document.createElement('section');v.className='bt-home-visual';
  v.innerHTML=`<div class="bt-home-copy"><div class="bt-home-brand">🎓 <span>Baby Tutor</span> ⭐</div><h1>আজও একটু একটু করে শিখি!</h1><p>শিখি • খেলি • বড় হই</p><div class="bt-home-stars">⭐ ০ <span>আজকের শেখার যাত্রা</span></div></div><div class="bt-home-babies" aria-label="বই নিয়ে পড়ছে এমন কিউট শিশুদের ছবি"><div class="bt-baby b1"><img src="https://images.unsplash.com/photo-1651862959539-9df2a6a34805?auto=format&fit=crop&fm=jpg&q=82&w=1000" alt="বই দেখছে কিউট শিশু"></div><div class="bt-baby b2"><img src="https://images.unsplash.com/photo-1624161288546-916a24423dbf?auto=format&fit=crop&fm=jpg&q=82&w=900" alt="হাসোজ্জ্বল শিশু"></div><div class="bt-book">📚</div></div>`;
  old.parentNode.insertBefore(v,old);old.style.display='none';
 }
 markMoreTopics();
}
function shell(){
 if(file!=='index.html'){
  document.body.classList.add('bt-subpage');
  const saved=sessionStorage.getItem('btFocusTitle');
  if(saved){document.body.classList.add('bt-focus-active');ensureFocusBar(saved);}
 }
 if(document.querySelector('.bt-shell'))return;
 const header=document.createElement('header');header.className='bt-shell';
 header.innerHTML='<div class="bt-head"><a class="bt-logo" href="index.html">🧸 Baby Tutor</a><nav class="bt-nav" aria-label="প্রধান নেভিগেশন">'+pages.map(p=>'<a href="'+p[0]+'" class="'+(file===p[0]?'bt-active':'')+'">'+p[1]+' '+p[2]+'</a>').join('')+'</nav><div class="bt-progress"><small><span>শেখার অগ্রগতি</span><span id="btPct">'+progress+'%</span></small><div class="bt-track"><div class="bt-fill" id="btFill"></div></div></div></div>';
 document.body.insertBefore(header,document.body.firstChild);
 const welcome=document.createElement('div');welcome.className='bt-welcome';welcome.innerHTML='<div class="bt-welcome-card"><div><strong>🌟 আজও একটু একটু করে শিখি!</strong><small>বর্ণমালা • সংখ্যা • গল্প • কুইজ • সৃজনশীল শেখা</small></div><a href="kids-learning.html">🚀 Smart Learning</a></div>';document.body.insertBefore(welcome,header.nextSibling);
 const dash=document.createElement('aside');dash.className='bt-dash';dash.innerHTML='⭐ <span id="btStars">'+stars+'</span> Stars <span>•</span> 📈 <span id="btDashPct">'+progress+'%</span> সম্পন্ন';document.body.appendChild(dash);
 const bottom=document.createElement('nav');bottom.className='bt-bottom';bottom.setAttribute('aria-label','মোবাইল নেভিগেশন');bottom.innerHTML=pages.map(p=>'<a href="'+p[0]+'" class="'+(file===p[0]?'bt-active':'')+'"><b>'+p[1]+'</b>'+p[2]+'</a>').join('');document.body.appendChild(bottom);
 const footer=document.createElement('footer');footer.className='bt-footer';footer.innerHTML='<div class="bt-footer-card"><div><strong>🧸 Baby Tutor</strong><small> — শিশুদের আনন্দময় ডিজিটাল শেখার জগৎ</small></div><div class="bt-footer-links"><a href="learning.html">📚 শেখা</a><a href="quiz.html">🧩 কুইজ</a><a href="kids-learning.html">🤖 Smart</a><a href="draw.html">🎨 আঁকি</a><a href="stories.html">📖 গল্প</a></div></div>';document.body.appendChild(footer);
 render();
 document.addEventListener('click',function(e){const target=e.target.closest('[data-progress]');if(target){addProgress(Number(target.dataset.progress||5),Number(target.dataset.stars||1));return}const learn=e.target.closest('.learn, .quiz-card, .option, .activity, [data-learn]');if(learn&&!e.target.closest('a'))addProgress(3,1)});
 window.addEventListener('storage',function(e){if(e.key===progressKey)progress=Math.min(100,Math.max(0,Number(e.newValue)||0));if(e.key===starsKey)stars=Math.max(0,Number(e.newValue)||0);render()});
}
function polishContent(){
 document.documentElement.lang='bn';
 document.querySelectorAll('img').forEach((img,i)=>{
   if(!img.hasAttribute('loading'))img.loading=i<4?'eager':'lazy';
   if(!img.hasAttribute('decoding'))img.decoding='async';
   img.addEventListener('error',function(){this.classList.add('bt-image-failed');this.setAttribute('aria-hidden','true')},{once:true});
 });
 document.querySelectorAll('a[href],button').forEach(el=>{
   if(!el.getAttribute('aria-label') && !el.textContent.trim()){
     const img=el.querySelector('img[alt]');
     if(img&&img.alt)el.setAttribute('aria-label',img.alt);
   }
 });
 // Keep Smart Learning's dashboard numbers tied to the same local progress store.
 if(file==='kids-learning.html'){
   const p=Math.min(100,Math.max(0,Number(localStorage.getItem(progressKey)||0)));
   const s=Math.max(0,Number(localStorage.getItem(starsKey)||0));
   const stars=document.getElementById('stars'); if(stars)stars.textContent=s;
   const fill=document.querySelector('.profile .progress span'); if(fill)fill.style.width=p+'%';
   const pct=document.querySelector('.profile .progress')?.parentElement?.querySelector('div[style*="justify-content"] span:last-child');
   if(pct)pct.textContent=p+'%';
 }
 // Keep the Islamic learning labels consistent without changing the Master visual system.
 const replacements=[
  ['আল্লাহর নাম','আল্লাহর সুন্দর নাম'],
  ['🎯 কুইজ','🎯 ইসলামিক কুইজ']
 ];
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
 const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
 nodes.forEach(n=>replacements.forEach(([a,b])=>{if(n.nodeValue&&n.nodeValue.trim()===a)n.nodeValue=b}));
}
function install3DButtonIcons(){
 const iconMap={
  '🔊':'sound.svg','🧹':'clean.svg','🖌️':'brush.svg','🎙️':'record.svg',
  '➡️':'next.svg','🔄':'next.svg','🔤':'learn.svg','🔠':'learn.svg','🕌':'learn.svg',
  '🔢':'learn.svg','🧮':'learn.svg','✖️':'learn.svg','🌍':'learn.svg','🎨':'brush.svg',
  '🎯':'quiz.svg','📖':'learn.svg','🤖':'learn.svg','🌱':'learn.svg',
  '🌟':'learn.svg','🕋':'learn.svg','💧':'learn.svg','🧎':'learn.svg','🤲':'learn.svg',
  '🌙':'learn.svg','💚':'learn.svg','📜':'learn.svg','✨':'learn.svg','🤝':'learn.svg'
 };
 const emojiRe=/^(🔊|🧹|🖌️|🎙️|➡️|🔄|🔤|🔠|🕌|🔢|🧮|✖️|🌍|🎨|🎯|📖|🤖|🌱|🌟|🕋|💧|🧎|🤲|🌙|💚|📜|✨|🤝)\s*/;
 document.querySelectorAll('button, a.quick, a.topic, a.fld, a.hxk, .quick a, .topic').forEach(btn=>{
  if(btn.dataset.bt3dIcon||btn.querySelector('.bt3d-icon'))return;
  const first=Array.from(btn.childNodes).find(n=>n.nodeType===Node.TEXT_NODE&&n.nodeValue.trim());
  if(!first)return;
  const raw=first.nodeValue.trim(),m=raw.match(emojiRe); if(!m)return;
  const fileName=iconMap[m[1]]; if(!fileName)return;
  first.nodeValue=raw.replace(emojiRe,'');
  const img=document.createElement('img');
  img.className='bt3d-icon';img.alt='';img.setAttribute('aria-hidden','true');
  img.src='assets/ui/'+fileName;img.loading='lazy';img.decoding='async';
  btn.insertBefore(img,btn.firstChild);
  btn.dataset.bt3dIcon='1';
 });
}
function install3DButtonIconStyles(){
 if(document.getElementById('bt3d-icon-styles'))return;
 const s=document.createElement('style');s.id='bt3d-icon-styles';
 s.textContent='.bt3d-icon{width:30px;height:30px;object-fit:contain;display:inline-block;vertical-align:middle;margin-right:7px;filter:drop-shadow(0 3px 3px rgba(35,39,90,.18))}.bt3d-icon+*{vertical-align:middle}@media(max-width:520px){.bt3d-icon{width:26px;height:26px;margin-right:5px}}';
 document.head.appendChild(s);
}
function boot(){homeUpgrade();shell();bindFocusNavigation();focusModal();polishContent();install3DButtonIconStyles();install3DButtonIcons();if(location.hash)focusAnchor(location.hash)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();

function cleanTopicImageWhiteBg(img){
 if(!img||img.dataset.btWhiteCleaned)return;
 // CSS handles the white-panel blending; avoid expensive canvas work during startup.
 img.dataset.btWhiteCleaned='css';
}
function cleanTopicImages(){
 if(file!=='index.html')return;
 const run=()=>document.querySelectorAll('.bt-more-topics img').forEach(cleanTopicImageWhiteBg);
 if('requestIdleCallback' in window) requestIdleCallback(run,{timeout:1200}); else setTimeout(run,300);
}

})();