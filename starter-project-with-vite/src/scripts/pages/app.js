import routes from '../routes/routes.js';

class App {

  constructor({
    content,
  }) {

    this._content =
      content;
  }

  async renderPage() {

    const hash =
      window.location.hash
        .slice(1)
        .toLowerCase();

    const url =
      hash || '/';

    const page =
      routes[url];

    if (!page) {

      this._content.innerHTML =
        '<h2>Page not found</h2>';

      return;
    }

    if (
      document.startViewTransition
    ) {

      document.startViewTransition(
        async () => {

          this._content.innerHTML =
            await page.render();

          await page.afterRender();
        }
      );

    } else {

      this._content.innerHTML =
        await page.render();

      await page.afterRender();
    }
  }
}

export default App;