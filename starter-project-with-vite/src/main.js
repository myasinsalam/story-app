import './styles/styles.css';

import App from './scripts/pages/app.js';

import {
  subscribeNotification,
} from './scripts/data/api.js';

const VAPID_PUBLIC_KEY =
  'ISI_VAPID_KEY_ASLI_DARI_DICODING';

function urlBase64ToUint8Array(
  base64String
) {

  const padding =
    '='.repeat(
      (4 - base64String.length % 4) % 4
    );

  const base64 =
    (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

  const rawData =
    window.atob(base64);

  return Uint8Array.from(
    [...rawData].map(
      (char) =>
        char.charCodeAt(0)
    )
  );
}

async function registerServiceWorker() {

  if (
    !('serviceWorker' in navigator)
  ) {
    return;
  }

  try {

    const registration =
      await navigator.serviceWorker.register(
        '/story-app/sw.js'
      );

    console.log(
      'Service Worker registered'
    );

    const permission =
      await Notification.requestPermission();

    if (
      permission !== 'granted'
    ) {
      return;
    }

    const subscription =
      await registration.pushManager.subscribe(
        {
          userVisibleOnly: true,
          applicationServerKey:
            urlBase64ToUint8Array(
              VAPID_PUBLIC_KEY
            ),
        }
      );

    const token =
      localStorage.getItem(
        'token'
      );

    if (token) {

      await subscribeNotification(
        {
          endpoint:
            subscription.endpoint,
          keys: {
            p256dh:
              subscription.toJSON().keys.p256dh,
            auth:
              subscription.toJSON().keys.auth,
          },
        },
        token
      );

      console.log(
        'Push subscribed'
      );
    }

  } catch (error) {

    console.error(error);
  }
}

const app = new App({
  content:
    document.querySelector(
      '#mainContent'
    ),
});

window.addEventListener(
  'hashchange',
  async () => {

    await app.renderPage();
  }
);

window.addEventListener(
  'load',
  async () => {

    await app.renderPage();

    await registerServiceWorker();
  }
);