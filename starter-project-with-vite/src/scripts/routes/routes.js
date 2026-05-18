import HomePage from '../pages/home/home-page';
import LoginPage from '../pages/login/login-page';
import RegisterPage from '../pages/register/register-page';
import AddStoryPage from '../pages/add-story/add-story-page';

const routes = {
  '/': new LoginPage(),
  '/login': new LoginPage(),
  '/register': new RegisterPage(),
  '/home': new HomePage(),
  '/add-story': new AddStoryPage(),
};

export default routes;