const CACHE_NAME = 'story-app-v1';

const urlsToCache = [
  '/',
  '/manifest.json',
  '/favicon.png',
];

// INSTALL
self.addEventListener('install', (event) => {
  console.log('Service Worker Installed');

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// FETCH
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(
      (response) => {
        return (
          response ||
          fetch(event.request)
        );
      }
    )
  );
});

// PUSH
self.addEventListener('push', (event) => {
  console.log(
    'Push notification received'
  );

  let notificationData = {
    title: 'Story App',
    options: {
      body: 'Ada story baru',
    },
  };

  if (event.data) {
    notificationData = JSON.parse(
      event.data.text()
    );
  }

  event.waitUntil(
    self.registration.showNotification(
      notificationData.title,
      notificationData.options
    )
  );
});