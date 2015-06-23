var CACHE_VERSION = 5;
var CURRENT_CACHES = {
  prefetch: 'prefetch-cache-v' + CACHE_VERSION
};

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CURRENT_CACHES['prefetch']).then(function(cache) {
      return cache.addAll([
        '/',
        'index.html',
        'style.css',
        'app.js',
        'image-list.js',
        'star-wars-logo.jpg',
        'gallery/bountyHunters.jpg',
        'gallery/myLittleVader.jpg',
        'gallery/fallback-kitten.jpg'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {

  var cacheWhitelist = [CURRENT_CACHES['prefetch']];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
