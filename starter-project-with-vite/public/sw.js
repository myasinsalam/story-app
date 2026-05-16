const CACHE_NAME = 'story-app-v1';

const urlsToCache = [
  '/story-app/',
  '/story-app/index.html',
];

self.addEventListener(
  'install',
  (event) => {

    console.log(
      'Service Worker Installed'
    );

    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => {
          return cache.addAll(
            urlsToCache
          );
        })
    );
  }
);

self.addEventListener(
  'fetch',
  (event) => {

    event.respondWith(
      caches.match(event.request)
        .then((response) => {

          return (
            response ||
            fetch(event.request)
          );
        })
    );
  }
);

self.addEventListener(
  'push',
  (event) => {

    const data = event.data.json();

    self.registration.showNotification(
      data.title,
      {
        body: data.options.body,
      }
    );
  }
);