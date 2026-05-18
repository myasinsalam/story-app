const CACHE_NAME =
  'story-app-v1';

const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './images/icon-192.png',
  './images/icon-512.png',
];

self.addEventListener(
  'install',
  (event) => {

    event.waitUntil(

      caches.open(CACHE_NAME)
      .then((cache) => {

        return cache.addAll(
          urlsToCache
        );
      })
    );

    self.skipWaiting();
  }
);

self.addEventListener(
  'activate',
  (event) => {

    event.waitUntil(

      caches.keys()
      .then((cacheNames) => {

        return Promise.all(

          cacheNames.map(
            (cacheName) => {

              if (
                cacheName !==
                CACHE_NAME
              ) {

                return caches.delete(
                  cacheName
                );
              }
            }
          )
        );
      })
    );

    self.clients.claim();
  }
);

self.addEventListener(
  'fetch',
  (event) => {

    event.respondWith(

      caches.match(
        event.request
      )
      .then((response) => {

        if (response) {
          return response;
        }

        return fetch(
          event.request
        )
        .catch(() => {

          return caches.match(
            './index.html'
          );
        });
      })
    );
  }
);

self.addEventListener(
  'push',
  (event) => {

    const data = {
      title: 'Story App',
      options: {
        body:
          'Ada story baru!',
      },
    };

    event.waitUntil(

      self.registration.showNotification(
        data.title,
        data.options
      )
    );
  }
);