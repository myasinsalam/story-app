import { login } from '../../data/api.js';

const LoginPage = {

  async render() {

    return `
      <section class="container">

        <h1>Login</h1>

        <form id="loginForm">

          <div>
            <label for="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              required
            />
          </div>

          <div>
            <label for="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              required
            />
          </div>

          <button type="submit">
            Login
          </button>

        </form>

        <p
          style="
            margin-top:16px;
          "
        >
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
      document.getElementById(
        'loginForm'
      );

    form.addEventListener(
      'submit',
      async (event) => {

        event.preventDefault();

        const email =
          document.getElementById(
            'email'
          ).value;

        const password =
          document.getElementById(
            'password'
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
            '#/';
        } else {

          alert(
            result.message
          );
        }
      }
    );
  },
};

export default LoginPage;