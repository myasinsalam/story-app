import './styles/styles.css';

import {
  registerSW,
} from 'virtual:pwa-register';

import App from './scripts/pages/app.js';

import {
  subscribeNotification,
  unsubscribeNotification,
} from './scripts/data/api.js';

const updateSW = registerSW({
  immediate: true,

  onRegistered(registration) {

    console.log(
      'SW REGISTERED:',
      registration
    );
  },

  onRegisterError(error) {

    console.error(
      'SW REGISTER ERROR:',
      error
    );
  },
});

const VAPID_PUBLIC_KEY =
  'BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk';

function urlBase64ToUint8Array(
  base64String
) {

  try {

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

  } catch (error) {

    console.error(
      'VAPID ERROR:',
      error
    );

    return null;
  }
}

async function subscribeUser() {

  try {

    if (
      !('serviceWorker' in navigator)
    ) {

      alert(
        'Service Worker tidak didukung'
      );

      return;
    }

    const registrations =
      await navigator.serviceWorker.getRegistrations();

    console.log(
      'ALL SW:',
      registrations
    );

    const registration =
      await navigator.serviceWorker.ready;

    console.log(
      'SW READY'
    );

    const permission =
      await Notification.requestPermission();

    if (
      permission !== 'granted'
    ) {

      console.log(
        'NOTIFICATION DENIED'
      );

      alert(
        'Izin notifikasi ditolak'
      );

      return;
    }

    console.log(
      'NOTIFICATION GRANTED'
    );

    const applicationServerKey =
      urlBase64ToUint8Array(
        VAPID_PUBLIC_KEY
      );

    if (!applicationServerKey) {

      alert(
        'VAPID KEY tidak valid'
      );

      return;
    }

    let subscription =
      await registration.pushManager.getSubscription();

    if (!subscription) {

      subscription =
        await registration.pushManager.subscribe(
          {
            userVisibleOnly: true,

            applicationServerKey,
          }
        );
    }

    console.log(
      'SUBSCRIPTION:',
      subscription
    );

    const token =
      localStorage.getItem(
        'token'
      );

    console.log(
      'TOKEN:',
      token
    );

    if (!token) {

      alert(
        'Silakan login terlebih dahulu'
      );

      return;
    }

    const response =
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
      'POST RESPONSE:',
      response
    );

    alert(
      'Subscribe berhasil'
    );

  } catch (error) {

    console.error(
      'SUBSCRIBE ERROR:',
      error
    );

    alert(
      'Subscribe gagal'
    );
  }
}

async function unsubscribeUser() {

  try {

    if (
      !('serviceWorker' in navigator)
    ) {
      return;
    }

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
        'Unsubscribe berhasil'
      );
    }

  } catch (error) {

    console.error(
      'UNSUBSCRIBE ERROR:',
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

document.addEventListener(
  'click',
  async (event) => {

    console.log(
      'CLICK:',
      event.target.id
    );

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

      console.log(
        'SUBSCRIBE BUTTON CLICKED'
      );

      await subscribeUser();
    }

    if (
      event.target.id ===
      'unsubscribeButton'
    ) {

      console.log(
        'UNSUBSCRIBE BUTTON CLICKED'
      );

      await unsubscribeUser();
    }
  }
);