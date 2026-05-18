import './styles/styles.css';

import { router } from './router.js';

async function registerServiceWorker() {

  if (
    'serviceWorker' in navigator
  ) {

    try {

      await navigator.serviceWorker.register(
        './sw.js'
      );

      console.log(
        'Service Worker registered'
      );

      await Notification.requestPermission();

    } catch (error) {

      console.error(error);
    }
  }
}

function handleHeaderVisibility() {

  const hash =
    window.location.hash;

  const header =
    document.querySelector(
      '#appHeader'
    );

  if (
    hash === '#/login' ||
    hash === '#/register' ||
    hash === ''
  ) {

    header.style.display =
      'none';

  } else {

    header.style.display =
      'block';
  }
}

async function renderPage() {

  handleHeaderVisibility();

  const app =
    document.querySelector(
      '#main-content'
    );

  const hash =
    window.location.hash.slice(1);

  const url =
    hash || '/login';

  const page =
    router[url];

  if (!page) {

    app.innerHTML = `
      <h1>
        404 Page Not Found
      </h1>
    `;

    return;
  }

  const renderContent =
    async () => {

      app.innerHTML =
        await page.render();

      await page.afterRender();
    };

  if (
    document.startViewTransition
  ) {

    document.startViewTransition(
      renderContent
    );

  } else {

    await renderContent();
  }
}

window.addEventListener(
  'hashchange',
  renderPage
);

window.addEventListener(
  'load',
  async () => {

    await registerServiceWorker();

    await renderPage();
  }
);