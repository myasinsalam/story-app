export default class RegisterPage {
  async render() {
    return `
      <a href="#main-content" class="skip-link">
        Skip to Content
      </a>

      <header>
        <div class="container main-header">

          <a href="#/register" class="brand-name">
            Story App
          </a>

          <nav class="navigation-drawer">
            <ul class="nav-list">

              <li>
                <a href="#/login">
                  Login
                </a>
              </li>

              <li>
                <a href="#/register">
                  Register
                </a>
              </li>

            </ul>
          </nav>

        </div>
      </header>

      <main
        id="main-content"
        class="main-content container"
      >
        <h1>Register</h1>

        <form id="registerForm">

          <div style="margin-bottom:16px;">
            <label for="name">
              Nama
            </label>

            <input
              type="text"
              id="name"
              required
              style="
                width:100%;
                padding:10px;
              "
            >
          </div>

          <div style="margin-bottom:16px;">
            <label for="email">
              Email
            </label>

            <input
              type="email"
              id="email"
              required
              style="
                width:100%;
                padding:10px;
              "
            >
          </div>

          <div style="margin-bottom:16px;">
            <label for="password">
              Password
            </label>

            <input
              type="password"
              id="password"
              required
              style="
                width:100%;
                padding:10px;
              "
            >
          </div>

          <button type="submit">
            Register
          </button>

        </form>

        <p style="margin-top:20px;">
          Sudah punya akun?

          <a href="#/login">
            Login
          </a>
        </p>
      </main>

      <footer
        style="
          padding:20px;
          text-align:center;
        "
      >
        <p>Story App</p>
      </footer>
    `;
  }

  async afterRender() {
    const form =
      document.getElementById(
        'registerForm'
      );

    form.addEventListener(
      'submit',
      async (e) => {
        e.preventDefault();

        const name =
          document.getElementById('name')
            .value;

        const email =
          document.getElementById('email')
            .value;

        const password =
          document.getElementById(
            'password'
          ).value;

        const response = await fetch(
          'https://story-api.dicoding.dev/v1/register',
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json',
            },
            body: JSON.stringify({
              name,
              email,
              password,
            }),
          }
        );

        const result =
          await response.json();

        if (!result.error) {
          alert('Register berhasil');

          location.hash = '/login';
        } else {
          alert(result.message);
        }
      }
    );
  }
}