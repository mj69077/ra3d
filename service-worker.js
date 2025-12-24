const CACHE = "raad-cache-v1";

self.addEventListener("install", e=>{
 e.waitUntil(
  caches.open(CACHE).then(c=>c.addAll(["./","./index.html"]))
 );
});

self.addEventListener("fetch", e=>{
 e.respondWith(
  fetch(e.request)
  .then(r=>{
    const res=r.clone();
    caches.open(CACHE).then(c=>c.put(e.request,res));
    return r;
  })
  .catch(()=>caches.match(e.request))
 );
});