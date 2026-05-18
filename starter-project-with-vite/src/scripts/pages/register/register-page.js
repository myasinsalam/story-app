import { register } from '../../data/api.js';

const RegisterPage = {

  async render() {

    return `
      <section class="container">

        <h1 style="margin-bottom:20px;">
          Register
        </h1>

        <form id="registerForm">

          <label for="name">
            Nama
          </label>

          <input
            type="text"
            id="name"
            required
          />

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
            Register
          </button>

        </form>

        <p style="margin-top:16px;">

          Sudah punya akun?

          <a href="#/login">
            Login
          </a>

        </p>

      </section>
    `;
  },

  async afterRender() {

    const form =
      document.querySelector(
        '#registerForm'
      );

    form.addEventListener(
      'submit',
      async (event) => {

        event.preventDefault();

        try {

          const name =
            document.querySelector(
              '#name'
            ).value;

          const email =
            document.querySelector(
              '#email'
            ).value;

          const password =
            document.querySelector(
              '#password'
            ).value;

          const result =
            await register(
              name,
              email,
              password
            );

          if (!result.error) {

            alert(
              'Register berhasil'
            );

            window.location.hash =
              '#/login';

          } else {

            alert(
              result.message
            );
          }

        } catch (error) {

          console.error(error);

          alert(
            'Register gagal'
          );
        }
      }
    );
  },
};

export default RegisterPage;