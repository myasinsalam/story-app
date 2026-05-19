const CACHE_NAME =
  'story-app-v1';

const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './images/icon-192.png',
  './images/icon-512.png',
];

/* INSTALL */

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

/* ACTIVATE */

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

/* FETCH */

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

/* PUSH NOTIFICATION */

self.addEventListener(
  'push',
  (event) => {

    let data = {
      title: 'Story App',
      options: {
        body:
          'Ada story baru!',
      },
    };

    if (event.data) {

      data =
        event.data.json();
    }

    event.waitUntil(

      self.registration.showNotification(
        data.title,
        {
          body:
            data.options.body,

          icon:
            './images/icon-192.png',

          badge:
            './images/icon-192.png',
        }
      )
    );
  }
);

/* NOTIFICATION CLICK */

self.addEventListener(
  'notificationclick',
  (event) => {

    event.notification.close();

    event.waitUntil(

      clients.openWindow(
        './'
      )
    );
  }
);