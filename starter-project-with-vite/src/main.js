import './styles/styles.css';

import App from './scripts/pages/app.js';

import {
  subscribeNotification,
} from './scripts/data/api.js';

const VAPID_PUBLIC_KEY =
  'MASUKKAN_VAPID_KEY_ASLI_DARI_DICODING';

/* BASE64 */

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

/* SERVICE WORKER */

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

    /* CEK SUBSCRIPTION LAMA */

    let subscription =
      await registration.pushManager.getSubscription();

    /* HAPUS SUBSCRIPTION LAMA */

    if (subscription) {

      await subscription.unsubscribe();

      console.log(
        'Old subscription removed'
      );
    }

    /* SUBSCRIBE BARU */

    subscription =
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

    console.error(
      error
    );
  }
}

/* APP */

const app = new App({
  content:
    document.querySelector(
      '#mainContent'
    ),
});

/* ROUTE */

window.addEventListener(
  'hashchange',
  async () => {

    await app.renderPage();
  }
);

/* LOAD */

window.addEventListener(
  'load',
  async () => {

    await app.renderPage();

    await registerServiceWorker();
  }
);

/* LOGOUT */

window.addEventListener(
  'click',
  (event) => {

    if (
      event.target.id ===
      'logoutButton'
    ) {

      localStorage.removeItem(
        'token'
      );

      window.location.hash =
        '#/login';
    }
  }
);