const CACHE="baby-tutor-v13-20261004";
const ASSETS=["./","./index.html","./kids-learning.html","./learning.html","./vowels.html","./consonants.html","./word-builder/","./word-builder/index.html","./arabic.html","./numbers.html","./words.html","./quiz.html","./rhymes.html","./stories.html","./voice.html","./draw.html","./creator.html","./style.css","./premium-pages.css","./premium-buttons.css","./assets/ui/sound.svg","./assets/ui/erase.svg","./assets/ui/brush.svg","./assets/ui/record.svg","./assets/ui/next.svg","./assets/ui/learn.svg","./assets/ui/quiz.svg","./assets/ui/clean.svg","./more-topics.css","./platform.css","./platform.js","./islamic.html","./manifest.json"];

self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));

self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));

self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;
  const url=new URL(e.request.url);
  if(url.origin===location.origin && (e.request.mode==="navigate" || url.pathname.endsWith(".html"))){
    e.respondWith(fetch(e.request,{cache:"no-store"}).then(res=>{
      const copy=res.clone();
      caches.open(CACHE).then(c=>c.put(e.request,copy));
      return res;
    }).catch(()=>caches.match(e.request).then(r=>r||caches.match("./kids-learning.html"))));
    return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
    const copy=res.clone();
    caches.open(CACHE).then(c=>c.put(e.request,copy));
    return res;
  }).catch(()=>caches.match("./kids-learning.html"))));
});
