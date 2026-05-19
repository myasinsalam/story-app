import {
  register,
} from '../../data/api.js';

const RegisterPage = {

  async render() {

    return `
      <section class="auth-container">

        <h1>
          Register
        </h1>

        <form id="registerForm">

          <label for="name">
            Nama
          </label>

          <input
            id="name"
            type="text"
            required
          />

          <label for="email">
            Email
          </label>

          <input
            id="email"
            type="email"
            required
          />

          <label for="password">
            Password
          </label>

          <input
            id="password"
            type="password"
            required
          />

          <button type="submit">
            Register
          </button>

        </form>

        <p
          style="
            margin-top:16px;
          "
        >
          Sudah punya akun?

          <a href="#/login">
            Login di sini
          </a>
        </p>

      </section>
    `;
  },

  async afterRender() {

    const form =
      document.getElementById(
        'registerForm'
      );

    form.addEventListener(
      'submit',
      async (event) => {

        event.preventDefault();

        const name =
          document.getElementById(
            'name'
          ).value;

        const email =
          document.getElementById(
            'email'
          ).value;

        const password =
          document.getElementById(
            'password'
          ).value;

        const response =
          await register(
            name,
            email,
            password
          );

        alert(
          response.message
        );

        window.location.hash =
          '#/login';
      }
    );
  },
};

export default RegisterPage;