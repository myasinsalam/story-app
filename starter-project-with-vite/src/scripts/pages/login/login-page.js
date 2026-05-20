import Swal from 'sweetalert2';

import {
  login,
} from '../../data/api.js';

const LoginPage = {

  async render() {

    return `
      <section class="auth-container">

        <h1>
          Login
        </h1>

        <form id="loginForm">

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
            Login
          </button>

        </form>

        <p style="margin-top:16px;">

          Belum punya akun?

          <a href="#/register">
            Register di sini
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

        Swal.fire({
          title: 'Loading...',
          text: 'Sedang login',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const email =
          document.getElementById(
            'email'
          ).value;

        const password =
          document.getElementById(
            'password'
          ).value;

        const response =
          await login(
            email,
            password
          );

        Swal.close();

        if (
          response.error
        ) {

          Swal.fire(
            'Gagal',
            response.message,
            'error'
          );

          return;
        }

        localStorage.setItem(
          'token',
          response.loginResult.token
        );

        Swal.fire(
          'Berhasil',
          'Login berhasil',
          'success'
        );

        window.location.hash =
          '#/';
      }
    );
  },
};

export default LoginPage;