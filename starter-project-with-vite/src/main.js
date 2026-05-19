import './styles/styles.css';

import App from './scripts/pages/app.js';

import {
  subscribeNotification,
  unsubscribeNotification,
} from './scripts/data/api.js';

const VAPID_PUBLIC_KEY =
  'BEl62iUYgUivTBV6FP0F4P4n6uT0KjQ9j0M9R8Tn2f0rGf6g3Ww2X6VvVn6M1j8N5m5Z0v5P7x8Y2Q3A4F5G6H7';

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

    const permission =
      await Notification.requestPermission();

    if (
      permission !== 'granted'
    ) {
      return;
    }

    let subscription =
      await registration.pushManager.getSubscription();

    if (!subscription) {

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

        alert(
          'Berhasil subscribe notification'
        );
      }
    }

  } catch (error) {

    console.error(
      error
    );
  }
}

const app = new App({
  content:
    document.querySelector(
      '#mainContent'
    ),
});

function updateNavbar() {

  const path =
    window.location.hash;

  const header =
    document.querySelector(
      'header'
    );

  if (
    path === '#/login' ||
    path === '#/register'
  ) {

    header.style.display =
      'none';

  } else {

    header.style.display =
      'block';
  }
}

window.addEventListener(
  'hashchange',
  async () => {

    updateNavbar();

    await app.renderPage();
  }
);

window.addEventListener(
  'load',
  async () => {

    updateNavbar();

    await app.renderPage();
  }
);

window.addEventListener(
  'click',
  async (event) => {

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

    if (
      event.target.id ===
      'subscribeButton'
    ) {

      await registerServiceWorker();
    }

    if (
      event.target.id ===
      'unsubscribeButton'
    ) {

      const registration =
        await navigator.serviceWorker.ready;

      const subscription =
        await registration.pushManager.getSubscription();

      if (subscription) {

        const token =
          localStorage.getItem(
            'token'
          );

        await unsubscribeNotification(
          subscription.endpoint,
          token
        );

        await subscription.unsubscribe();

        alert(
          'Berhasil unsubscribe'
        );
      }
    }
  }
);