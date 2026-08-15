const CACHE='card-show-apps-v1';
const SHELL=[
  './',
  './index.html',
  './mtg.html',
  './pokemon.html',
  './mtg-manifest.json',
  './pokemon-manifest.json',
  './mtg-192.png',
  './mtg-512.png',
  './pokemon-192.png',
  './pokemon-512.png'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
