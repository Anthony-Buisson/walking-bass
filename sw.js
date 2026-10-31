// Keeps the timetable usable offline while picking up new versions as soon as the network allows.
const CACHE = "walking-bass-v9";
const ASSETS = [
  "./",
  "index.html",
  "timetable.js",
  "manifest.webmanifest",
  "fonts/creepster.woff2",
  "fonts/oswald.woff2",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "icons/apple-touch-icon.png"
];
// Past this delay a slow festival network falls back to the cached copy.
const NETWORK_TIMEOUT = 3000;

self.addEventListener("install", e => {
  // cache: "reload" skips the browser's HTTP cache, so a fresh install never stores a stale page.
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS.map(url => new Request(url, { cache: "reload" }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Pages and the manifest change with each release: network first, cache when offline or too slow.
function networkFirst(request) {
  return new Promise(resolve => {
    let settled = false;
    const fallback = () => caches.match(request, { ignoreSearch: true })
      .then(r => r || caches.match("index.html"));
    const timer = setTimeout(() => fallback().then(r => { if (r && !settled) { settled = true; resolve(r); } }), NETWORK_TIMEOUT);
    fetch(request, { cache: "no-cache" }).then(res => {
      if (res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(request, copy));
      }
      clearTimeout(timer);
      if (!settled) { settled = true; resolve(res); }
    }).catch(() => {
      clearTimeout(timer);
      fallback().then(r => { if (!settled) { settled = true; resolve(r || Response.error()); } });
    });
  });
}

// Fonts and icons never change: cache first.
function cacheFirst(request) {
  return caches.match(request).then(cached => cached || fetch(request).then(res => {
    if (res.ok) {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(request, copy));
    }
    return res;
  }));
}

self.addEventListener("fetch", e => {
  const { request } = e;
  if (request.method !== "GET" || new URL(request.url).origin !== location.origin) return;
  const isStatic = /\/(fonts|icons)\//.test(new URL(request.url).pathname);
  e.respondWith(isStatic ? cacheFirst(request) : networkFirst(request));
});
