import { register } from '../../data/api.js';

const RegisterPage = {

  async render() {

    return `
      <section class="container">

        <h1>Register</h1>

        <form id="registerForm">

          <input
            type="text"
            id="name"
            placeholder="Nama"
            required
          />

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
            Register
          </button>

        </form>

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

          alert(result.message);
        }
      }
    );
  },
};

export default RegisterPage;