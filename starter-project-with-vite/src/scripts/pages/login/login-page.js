export default class LoginPage {
  async render() {
    return `
      <a href="#main-content" class="skip-link">
        Skip to Content
      </a>

      <header>
        <div class="container main-header">

          <a href="#/login" class="brand-name">
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
        <h1>Login</h1>

        <form id="loginForm">

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
            Login
          </button>

        </form>

        <p style="margin-top:20px;">
          Belum punya akun?

          <a href="#/register">
            Register
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
        'loginForm'
      );

    form.addEventListener(
      'submit',
      async (e) => {
        e.preventDefault();

        const email =
          document.getElementById('email')
            .value;

        const password =
          document.getElementById(
            'password'
          ).value;

        const response = await fetch(
          'https://story-api.dicoding.dev/v1/login',
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json',
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

        const result =
          await response.json();

        if (!result.error) {
          localStorage.setItem(
            'token',
            result.loginResult.token
          );

          location.hash = '/home';
        } else {
          alert(result.message);
        }
      }
    );
  }
}