import './styles/styles.css';

import { router } from './router.js';

router();

// REGISTER SERVICE WORKER
if ('serviceWorker' in navigator) {
  window.addEventListener(
    'load',
    async () => {
      try {
        const registration =
          await navigator.serviceWorker.register(
            '/sw.js'
          );

        console.log(
          'Service Worker registered'
        );

        // REQUEST NOTIFICATION
        await Notification.requestPermission();

      } catch (error) {
        console.error(error);
      }
    }
  );
}