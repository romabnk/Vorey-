// ════════════════════════════════════════════════════════════════════════
// CE SERVICE WORKER NE SERT QU'À FAIRE PARTIR L'ANCIEN.
//
// Une première version de /draft/ avait enregistré un service worker. Un
// service worker intercepte les requêtes AVANT la page : il resservait sa
// copie figée de l'application, et aucun rechargement ne pouvait l'en
// empêcher — d'où l'écran bleu que seul un effacement manuel réparait.
//
// On ne peut pas le supprimer à distance. En revanche le navigateur
// revérifie CE fichier à chaque navigation : on y met donc de quoi le
// désinstaller lui-même, vider ses caches, et recharger les pages qu'il
// contrôlait. Après ce passage, plus rien ne s'interpose.
// ════════════════════════════════════════════════════════════════════════
self.addEventListener('install', function (e) {
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    (async function () {
      try {
        const noms = await caches.keys();
        await Promise.all(noms.map(function (n) { return caches.delete(n); }));
      } catch (err) {}
      try { await self.registration.unregister(); } catch (err) {}
      const pages = await self.clients.matchAll({ type: 'window' });
      pages.forEach(function (p) { p.navigate(p.url); });
    })()
  );
});

// Tant qu'il vit encore, il ne répond RIEN depuis un cache : tout passe
// par le réseau. Une version figée de plus serait une rechute.
self.addEventListener('fetch', function (e) {});
