import HomePage from './scripts/pages/home/home-page.js';

import LoginPage from './scripts/pages/login/login-page.js';

import RegisterPage from './scripts/pages/register/register-page.js';

import AddStoryPage from './scripts/pages/add-story/add-story-page.js';

export const router = {

  '/': LoginPage,

  '/login': LoginPage,

  '/register': RegisterPage,

  '/home': HomePage,

  '/add-story': AddStoryPage,
};