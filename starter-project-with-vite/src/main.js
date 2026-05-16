import './styles/styles.css';

import { router } from './router.js';

async function renderPage() {

  const app = document.querySelector('#app');

  const url = window.location.hash.slice(1) || '/';

  const page = router[url];

  if (!page) {

    app.innerHTML = `
      <section class="container">
        <h1>404 Page Not Found</h1>
      </section>
    `;

    return;
  }

  if (document.startViewTransition) {

    document.startViewTransition(async () => {

      app.innerHTML = await page.render();

      await page.afterRender();

    });

  } else {

    app.innerHTML = await page.render();

    await page.afterRender();
  }
}

window.addEventListener(
  'hashchange',
  renderPage
);

window.addEventListener(
  'load',
  async () => {

    await renderPage();

    // REGISTER SERVICE WORKER
    if ('serviceWorker' in navigator) {

      try {

        const registration =
          await navigator.serviceWorker.register(
            '/story-app/sw.js'
          );

        console.log(
          'Service Worker registered'
        );

      } catch (error) {

        console.error(error);
      }
    }
  }
);