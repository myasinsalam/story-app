import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

self.skipWaiting();
clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

registerRoute(
  new NavigationRoute(createHandlerBoundToURL('index.html'))
);

registerRoute(
  /^https:\/\/story-api\.dicoding\.dev\/v1\/stories/,
  new NetworkFirst({
    cacheName: 'stories-api-cache',
    plugins: [
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 }),
      new CacheableResponsePlugin({ statuses: [0, 200] }),
    ],
  }),
  'GET'
);

registerRoute(
  /^https:\/\/tile\.openstreetmap\.org/,
  new CacheFirst({
    cacheName: 'osm-cache',
    plugins: [
      new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 }),
      new CacheableResponsePlugin({ statuses: [0, 200] }),
    ],
  }),
  'GET'
);

self.addEventListener('push', (event) => {
  let data = {
    title: 'Story App',
    options: {
      body: 'Ada notifikasi baru dari Story App!',
      icon: '/story-app/images/icon-192.png',
      badge: '/story-app/images/icon-192.png',
    },
  };

  if (event.data) {
    try {
      const payload = event.data.json();
      data = {
        title: payload.title || data.title,
        options: {
          body: payload.options?.body || payload.body || data.options.body,
          icon: payload.options?.icon || payload.icon || data.options.icon,
          badge: payload.options?.badge || payload.badge || data.options.badge,
          data: payload.options?.data || payload.data || {},
        },
      };
    } catch {
      data.options.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, data.options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl = event.notification.data?.url || '/story-app/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
