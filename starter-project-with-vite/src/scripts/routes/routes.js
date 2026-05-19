import HomePage from '../pages/home/home-page.js';

import LoginPage from '../pages/login/login-page.js';

import RegisterPage from '../pages/register/register-page.js';

import AddStoryPage from '../pages/add-story/add-story-page.js';

const routes = {
  '/': HomePage,

  '/login': LoginPage,

  '/register': RegisterPage,

  '/add-story': AddStoryPage,
};

export default routes;