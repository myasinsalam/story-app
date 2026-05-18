import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { getStories } from '../../data/api.js';

import {
  saveStory,
  getAllStories,
  deleteStory,
} from '../../data/indexeddb.js';

const HomePage = {
  async render() {
    return `
      <section class="container">

        <div class="home-header">
          <h1>Daftar Story</h1>

          <button
            id="logoutButton"
            class="button"
          >
            Logout
          </button>
        </div>

        <div
          id="map"
          style="
            height: 400px;
            border-radius:16px;
            margin-bottom:24px;
          "
        ></div>

        <h2 style="margin-bottom:16px;">
          Story API
        </h2>

        <div
          id="storiesList"
          class="stories-grid"
        ></div>

        <h2
          style="
            margin-top:40px;
            margin-bottom:16px;
          "
        >
          Story Tersimpan
        </h2>

        <div
          id="savedStories"
          class="stories-grid"
        ></div>

      </section>
    `;
  },

  async afterRender() {
    const token =
      localStorage.getItem('token');

    if (!token) {
      window.location.hash =
        '#/login';
      return;
    }

    const logoutButton =
      document.getElementById(
        'logoutButton'
      );

    logoutButton.addEventListener(
      'click',
      () => {

        localStorage.removeItem(
          'token'
        );

        window.location.hash =
          '#/login';
      }
    );

    const storiesList =
      document.getElementById(
        'storiesList'
      );

    const savedStoriesContainer =
      document.getElementById(
        'savedStories'
      );

    try {

      const result =
        await getStories(token);

      const stories =
        result.listStory || [];

      // MAP
      const map = L.map('map')
        .setView([-2.5, 118], 5);

      L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution:
            '&copy; OpenStreetMap',
        }
      ).addTo(map);

      // MARKER
      stories.forEach((story) => {

        if (story.lat && story.lon) {

          L.marker([
            story.lat,
            story.lon,
          ])
            .addTo(map)
            .bindPopup(`
              <img
                src="${story.photoUrl}"
                alt="${story.name}"
                width="120"
                style="
                  border-radius:8px;
                  margin-bottom:8px;
                "
              />

              <br>

              <b>${story.name}</b>

              <br>

              ${story.description}
            `);
        }
      });

      // STORY API
      storiesList.innerHTML =
        stories.map((story) => `
          <article class="story-card">

            <img
              src="${story.photoUrl}"
              alt="${story.name}"
              class="story-image"
            />

            <div class="story-content">

              <h2>${story.name}</h2>

              <p>
                ${story.description}
              </p>

              <div class="story-actions">

                <button
                  class="save-button"
                  data-id="${story.id}"
                >
                  Save
                </button>

              </div>

            </div>

          </article>
        `).join('');

      // SAVE BUTTON
      document
        .querySelectorAll(
          '.save-button'
        )
        .forEach((button) => {

          button.addEventListener(
            'click',
            async () => {

              const story =
                stories.find(
                  (item) =>
                    item.id ===
                    button.dataset.id
                );

              await saveStory(story);

              alert(
                'Story berhasil disimpan'
              );

              location.reload();
            }
          );
        });

      // LOAD SAVED STORIES
      const savedStories =
        await getAllStories();

      savedStoriesContainer.innerHTML =
        savedStories.map((story) => `
          <article class="story-card">

            <img
              src="${story.photoUrl}"
              alt="${story.name}"
              class="story-image"
            />

            <div class="story-content">

              <h2>${story.name}</h2>

              <p>
                ${story.description}
              </p>

              <div class="story-actions">

                <button
                  class="delete-button"
                  data-id="${story.id}"
                >
                  Delete
                </button>

              </div>

            </div>

          </article>
        `).join('');

      // DELETE BUTTON
      document
        .querySelectorAll(
          '.delete-button'
        )
        .forEach((button) => {

          button.addEventListener(
            'click',
            async () => {

              await deleteStory(
                button.dataset.id
              );

              alert(
                'Story berhasil dihapus'
              );

              location.reload();
            }
          );
        });

    } catch (error) {

      console.error(error);

      storiesList.innerHTML = `
        <p>
          Gagal memuat data story
        </p>
      `;
    }
  },
};

export default HomePage;