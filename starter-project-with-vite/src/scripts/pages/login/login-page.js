import { login } from '../../data/api.js';

const LoginPage = {

  async render() {

    return `
      <section class="container">

        <h1>Login</h1>

        <form id="loginForm">

          <input
            type="email"
            id="email"
            placeholder="Email"
            required
          />

          <input
            type="password"
            id="password"
            placeholder="Password"
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

      </section>
    `;
  },

  async afterRender() {

    const form =
      document.querySelector(
        '#loginForm'
      );

    form.addEventListener(
      'submit',
      async (event) => {

        event.preventDefault();

        const email =
          document.querySelector(
            '#email'
          ).value;

        const password =
          document.querySelector(
            '#password'
          ).value;

        const result =
          await login(
            email,
            password
          );

        if (!result.error) {

          localStorage.setItem(
            'token',
            result.loginResult.token
          );

          window.location.hash =
            '#/home';

        } else {

          alert(result.message);
        }
      }
    );
  },
};

export default LoginPage;