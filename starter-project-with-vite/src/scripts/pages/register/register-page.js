import Swal from 'sweetalert2';

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

        Swal.fire({
          title: 'Loading...',
          text: 'Sedang register',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

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

        Swal.fire(
          'Berhasil',
          'Register berhasil',
          'success'
        );

        window.location.hash =
          '#/login';
      }
    );
  },
};

export default RegisterPage;