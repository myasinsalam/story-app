import { getStories } from '../../data/api.js';

const HomePage = {

  async render() {

    return `
      <section class="container">

        <h1>Daftar Story</h1>

        <div id="stories"></div>

      </section>
    `;
  },

  async afterRender() {

    const token =
      localStorage.getItem(
        'token'
      );

    const result =
      await getStories(token);

    const storiesContainer =
      document.querySelector(
        '#stories'
      );

    storiesContainer.innerHTML =
      result.listStory.map(
        (story) => `
          <div>

            <img
              src="${story.photoUrl}"
              width="300"
            />

            <h2>
              ${story.name}
            </h2>

            <p>
              ${story.description}
            </p>

          </div>
        `
      ).join('');
  },
};

export default HomePage;