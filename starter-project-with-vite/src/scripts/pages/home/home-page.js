import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

import {
  getStories,
} from '../../data/api.js';

import {
  saveStory,
  getAllStories,
  deleteStory,
} from '../../data/indexeddb.js';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',

  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',

  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const HomePage = {

  async render() {

    return `
      <section class="container">

        <h1>
          Daftar Story
        </h1>

        <div
          id="map"
          style="
            height:400px;
            margin-bottom:24px;
          "
        ></div>

        <div
          id="stories"
          style="
            display:grid;
            grid-template-columns:
              repeat(
                auto-fit,
                minmax(
                  250px,
                  1fr
                )
              );
            gap:16px;
          "
        ></div>

        <h2
          style="
            margin-top:40px;
          "
        >
          Bookmark Story
        </h2>

        <div
          id="bookmarkStories"
          style="
            display:grid;
            grid-template-columns:
              repeat(
                auto-fit,
                minmax(
                  250px,
                  1fr
                )
              );
            gap:16px;
          "
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

    const result =
      await getStories(token);

    const storiesContainer =
      document.getElementById(
        'stories'
      );

    const bookmarkContainer =
      document.getElementById(
        'bookmarkStories'
      );

    const map = L.map('map')
      .setView(
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

    result.listStory.forEach(
      (story) => {

        const storyElement =
          document.createElement(
            'div'
          );

        storyElement.innerHTML = `
          <article
            style="
              border:1px solid #ddd;
              border-radius:12px;
              overflow:hidden;
              background:#fff;
            "
          >

            <img
              src="${story.photoUrl}"
              alt="${story.name}"
              style="
                width:100%;
                height:200px;
                object-fit:cover;
              "
            />

            <div
              style="
                padding:16px;
              "
            >

              <h3>
                ${story.name}
              </h3>

              <p>
                ${story.description}
              </p>

              <p>
                ID:
                ${story.id}
              </p>

              <p>
                Dibuat:
                ${new Date(
                  story.createdAt
                ).toLocaleString()}
              </p>

              <button
                class="save-btn"
                data-id="${story.id}"
              >
                Bookmark
              </button>

            </div>

          </article>
        `;

        storiesContainer.appendChild(
          storyElement
        );

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
            <b>
              ${story.name}
            </b>
            <br>
            ${story.description}
          `);
        }
      }
    );

    const saveButtons =
      document.querySelectorAll(
        '.save-btn'
      );

    saveButtons.forEach(
      (button) => {

        button.addEventListener(
          'click',
          async () => {

            const story =
              result.listStory.find(
                (item) =>
                  item.id ===
                  button.dataset.id
              );

            await saveStory(
              story
            );

            alert(
              'Bookmark berhasil disimpan'
            );

            loadBookmarks();
          }
        );
      }
    );

    async function loadBookmarks() {

      bookmarkContainer.innerHTML =
        '';

      const stories =
        await getAllStories();

      stories.forEach(
        (story) => {

          const storyElement =
            document.createElement(
              'div'
            );

          storyElement.innerHTML = `
            <article
              style="
                border:1px solid #ddd;
                border-radius:12px;
                overflow:hidden;
                background:#fff;
              "
            >

              <img
                src="${story.photoUrl}"
                alt="${story.name}"
                style="
                  width:100%;
                  height:200px;
                  object-fit:cover;
                "
              />

              <div
                style="
                  padding:16px;
                "
              >

                <h3>
                  ${story.name}
                </h3>

                <p>
                  ${story.description}
                </p>

                <button
                  class="delete-btn"
                  data-id="${story.id}"
                >
                  Hapus Bookmark
                </button>

              </div>

            </article>
          `;

          bookmarkContainer.appendChild(
            storyElement
          );
        }
      );

      const deleteButtons =
        document.querySelectorAll(
          '.delete-btn'
        );

      deleteButtons.forEach(
        (button) => {

          button.addEventListener(
            'click',
            async () => {

              await deleteStory(
                button.dataset.id
              );

              alert(
                'Bookmark berhasil dihapus'
              );

              loadBookmarks();
            }
          );
        }
      );
    }

    loadBookmarks();
  },
};

export default HomePage;