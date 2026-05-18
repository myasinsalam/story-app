import { login } from '../../data/api.js';

const LoginPage = {

  async render() {

    return `
      <section class="container">

        <h1 style="margin-bottom:20px;">
          Login
        </h1>

        <form id="loginForm">

          <label for="email">
            Email
          </label>

          <input
            type="email"
            id="email"
            required
          />

          <label for="password">
            Password
          </label>

          <input
            type="password"
            id="password"
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p style="margin-top:16px;">

          Belum punya akun?

          <a href="#/register">
            Register
          </a>

        </p>

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

        try {

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

            alert(
              'Login berhasil'
            );

            window.location.hash =
              '#/home';

          } else {

            alert(
              result.message
            );
          }

        } catch (error) {

          console.error(error);

          alert(
            'Login gagal'
          );
        }
      }
    );
  },
};

export default LoginPage;