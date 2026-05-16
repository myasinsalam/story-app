import Login from './scripts/pages/login/login-page.js';
import Register from './scripts/pages/register/register-page.js';
import Home from './scripts/pages/home/home-page.js';
import AddStory from './scripts/pages/add-story/add-story-page.js';

import { transition } from './scripts/utils/transition.js';

const routes = {
  '/login': Login,
  '/register': Register,
  '/home': Home,
  '/add-story': AddStory,
};

export async function router() {
  const app = document.querySelector('#app');

  const path = location.hash.slice(1) || '/login';

  const PageClass = routes[path];

  if (!PageClass) {
    app.innerHTML = `
      <main>
        <h1>404 Page Not Found</h1>
      </main>
    `;
    return;
  }

  const page = new PageClass();

  transition(async () => {
    app.innerHTML = await page.render();

    if (page.afterRender) {
      await page.afterRender();
    }
  });
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);