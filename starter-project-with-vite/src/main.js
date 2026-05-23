import './styles/styles.css';

import { registerSW } from 'virtual:pwa-register';

import App from './scripts/pages/app.js';

import {
  subscribeNotification,
  unsubscribeNotification,
} from './scripts/data/api.js';

registerSW({
  immediate: true,
  onRegistered(registration) {
    console.log('SW REGISTERED:', registration);
  },
  onRegisterError(error) {
    console.error('SW REGISTER ERROR:', error);
  },
});

const VAPID_PUBLIC_KEY =
  'BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk';

function urlBase64ToUint8Array(base64String) {
  try {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
  } catch (error) {
    console.error('VAPID ERROR:', error);
    return null;
  }
}

// ✅ FIX: Tunggu SW benar-benar siap dengan timeout agar tidak hang di lokal
function waitForServiceWorker(timeoutMs = 10000) {
  return Promise.race([
    navigator.serviceWorker.ready,
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error('Service Worker timeout — coba refresh halaman')),
        timeoutMs
      )
    ),
  ]);
}

async function subscribeUser() {
  try {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      alert('Browser tidak mendukung Web Push Notification');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Silakan login terlebih dahulu');
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      alert('Izin notifikasi ditolak');
      return;
    }

    // ✅ FIX: Gunakan waitForServiceWorker dengan timeout agar tidak hang di lokal
    let registration;
    try {
      registration = await waitForServiceWorker();
    } catch (e) {
      alert(e.message);
      return;
    }

    console.log('SW READY:', registration);

    const applicationServerKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
    if (!applicationServerKey) {
      alert('VAPID KEY tidak valid');
      return;
    }

    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      });
    }

    console.log('SUBSCRIPTION:', subscription);

    const response = await subscribeNotification(
      {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscription.toJSON().keys.p256dh,
          auth: subscription.toJSON().keys.auth,
        },
      },
      token
    );

    console.log('POST RESPONSE:', response);

    if (response.error) {
      throw new Error(response.message || 'Gagal subscribe ke server');
    }

    alert('Subscribe berhasil!');
  } catch (error) {
    console.error('SUBSCRIBE ERROR:', error);
    alert(`Subscribe gagal: ${error.message}`);
  }
}

async function unsubscribeUser() {
  try {
    if (!('serviceWorker' in navigator)) return;

    const token = localStorage.getItem('token');

    let registration;
    try {
      registration = await waitForServiceWorker();
    } catch (e) {
      alert(e.message);
      return;
    }

    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      await unsubscribeNotification(subscription.endpoint, token);
      await subscription.unsubscribe();
      alert('Unsubscribe berhasil');
    } else {
      alert('Tidak ada subscription aktif');
    }
  } catch (error) {
    console.error('UNSUBSCRIBE ERROR:', error);
    alert(`Unsubscribe gagal: ${error.message}`);
  }
}

const app = new App({
  content: document.querySelector('#mainContent'),
});

function updateNavbar() {
  const path = window.location.hash;
  const header = document.querySelector('header');
  if (path === '#/login' || path === '#/register') {
    header.style.display = 'none';
  } else {
    header.style.display = 'block';
  }
}

window.addEventListener('hashchange', async () => {
  updateNavbar();
  await app.renderPage();
});

window.addEventListener('load', async () => {
  updateNavbar();
  await app.renderPage();
});

document.addEventListener('click', async (event) => {
  if (event.target.id === 'logoutButton') {
    localStorage.removeItem('token');
    window.location.hash = '#/login';
  }

  if (event.target.id === 'subscribeButton') {
    await subscribeUser();
  }

  if (event.target.id === 'unsubscribeButton') {
    await unsubscribeUser();
  }
});