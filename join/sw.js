// Vorey — service worker minimal de « My Vorey ».
// Il existe pour que Vorey s'installe proprement sur l'écran d'accueil, et
// NE GARDE RIEN EN CACHE : chaque ouverture charge la dernière version de la
// page (leçon de l'app Flutter, où un cache resservait d'anciennes versions).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) await caches.delete(key);
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', () => {});   // réseau direct, aucun cache
