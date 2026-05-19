import { register } from '../../data/api.js';

const RegisterPage = {

  async render() {

    return `
      <section class="container">

        <h1>Register</h1>

        <form id="registerForm">

          <div>
            <label for="name">
              Nama
            </label>

            <input
              id="name"
              type="text"
              required
            />
          </div>

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
      }
    );
  },
};

export default RegisterPage;