import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import { getStories } from '../../data/api.js';

import {
  saveStory,
  getAllStories,
  deleteStory,
} from '../../data/indexeddb.js';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const HomePage = {

  async render() {

    return `
      <section class="container">

        <div class="home-header">

          <h1>Daftar Story</h1>

          <div
            style="
              display:flex;
              gap:12px;
            "
          >

            <a
              href="#/add-story"
              class="button"
            >
              Add Story
            </a>

            <button
              id="logoutButton"
              class="button"
            >
              Logout
            </button>

          </div>

        </div>

        <div
          id="map"
          style="
            height:400px;
            margin-bottom:24px;
            border-radius:16px;
          "
        ></div>

        <h2
          style="
            margin-bottom:16px;
          "
        >
          Story API
        </h2>

        <div
          id="storiesList"
          class="stories-grid"
        ></div>

        <h2
          style="
            margin-top:40px;
            margin-bottom:8px;
          "
        >
          Bookmark Story
        </h2>

        <p
          style="
            margin-bottom:16px;
          "
        >
          Story yang disimpan pengguna
          menggunakan IndexedDB.
        </p>

        <div
          id="savedStories"
          class="stories-grid"
        ></div>

      </section>
    `;
  },

  async afterRender() {

    const token =
      localStorage.getItem(
        'token'
      );

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

      /* MAP */

      const map =
        L.map('map').setView(
          [-2.5, 118],
          5
        );

      L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution:
            '&copy; OpenStreetMap',
        }
      ).addTo(map);

      /* MARKER */

      stories.forEach((story) => {

        if (
          story.lat &&
          story.lon
        ) {

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

            <b>
              ${story.name}
            </b>

            <br>

            ${story.description}
          `);
        }
      });

      /* STORY LIST */

      storiesList.innerHTML =
        stories.map((story) => `
          <article
            class="story-card"
          >

            <img
              src="${story.photoUrl}"
              alt="${story.name}"
              class="story-image"
            />

            <div
              class="story-content"
            >

              <h2>
                ${story.name}
              </h2>

              <p>
                ${story.description}
              </p>

              <button
                class="save-button"
                data-id="${story.id}"
              >
                Simpan ke Bookmark
              </button>

            </div>

          </article>
        `).join('');

      /* SAVE STORY */

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

              await saveStory(
                story
              );

              alert(
                'Story berhasil disimpan'
              );

              location.reload();
            }
          );
        });

      /* GET SAVED STORIES */

      const savedStories =
        await getAllStories();

      savedStoriesContainer.innerHTML =
        savedStories.map((story) => `
          <article
            class="story-card"
          >

            <img
              src="${story.photoUrl}"
              alt="${story.name}"
              class="story-image"
            />

            <div
              class="story-content"
            >

              <h2>
                ${story.name}
              </h2>

              <p>
                ${story.description}
              </p>

              <button
                class="delete-button"
                data-id="${story.id}"
              >
                Hapus Bookmark
              </button>

            </div>

          </article>
        `).join('');

      /* DELETE STORY */

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
          Gagal memuat story
        </p>
      `;
    }
  },
};

export default HomePage;