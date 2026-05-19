import HomePage from '../pages/home/home-page.js';

import AddStoryPage from '../pages/add-story/add-story-page.js';

import LoginPage from '../pages/login/login-page.js';

import RegisterPage from '../pages/register/register-page.js';

import BookmarkPage from '../pages/bookmark/bookmark-page.js';

const routes = {

  '/':
    HomePage,

  '/add-story':
    AddStoryPage,

  '/login':
    LoginPage,

  '/register':
    RegisterPage,

  '/bookmark':
    BookmarkPage,
};

export default routes;