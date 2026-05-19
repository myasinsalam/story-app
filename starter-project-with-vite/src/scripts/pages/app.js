import routes from '../routes/routes.js';

class App {

  constructor({
    content,
  }) {

    this._content =
      content;
  }

  async renderPage() {

    const url =
      window.location.hash
        .slice(1)
        .toLowerCase() || '/';

    const page =
      routes[url];

    if (!page) {

      this._content.innerHTML =
        '<h2>Page not found</h2>';

      return;
    }

    this._content.innerHTML =
      await page.render();

    await page.afterRender();
  }
}

export default App;