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

    let notificationData = {
      title: 'Story App',
      options: {
        body:
          'Ada story baru!',
      },
    };

    if (event.data) {

      try {

        const text =
          event.data.text();

        const data =
          JSON.parse(text);

        notificationData = {
          title:
            data.title ||
            'Story App',

          options: {
            body:
              data.options?.body ||
              data.body ||
              'Ada story baru!',
          },
        };

      } catch (error) {

        notificationData = {
          title: 'Story App',

          options: {
            body:
              event.data.text(),
          },
        };
      }
    }

    event.waitUntil(

      self.registration.showNotification(
        notificationData.title,
        notificationData.options
      )
    );
  }
);