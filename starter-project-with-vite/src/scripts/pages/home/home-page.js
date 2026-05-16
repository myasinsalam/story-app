import {
  saveStory,
  getAllStories,
  deleteStory,
} from '../../data/indexeddb.js';

export default class HomePage {

  async render() {
    return `
      <main
        id="main-content"
        class="container"
      >

        <section class="home-header">

          <h1>Daftar Story</h1>

          <div class="story-actions">

            <a
              href="#/add-story"
              class="button"
            >
              Tambah Story
            </a>

            <button
              id="logoutButton"
              class="button"
            >
              Logout
            </button>

          </div>

        </section>

        <section
          id="map"
          style="
            height:400px;
            margin-block:20px;
          "
          aria-label="Peta story"
        ></section>

        <section
          id="stories"
          class="stories-grid"
        ></section>

      </main>
    `;
  }

  async afterRender() {

    const token =
      localStorage.getItem('token');

    if (!token) {
      location.hash = '/login';
      return;
    }

    // LOGOUT
    document
      .getElementById(
        'logoutButton'
      )
      .addEventListener(
        'click',
        () => {

          localStorage.removeItem(
            'token'
          );

          location.hash = '/login';
        }
      );

    // FETCH API
    const response = await fetch(
      'https://story-api.dicoding.dev/v1/stories',
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    const result =
      await response.json();

    const stories =
      result.listStory;

    const storiesContainer =
      document.getElementById(
        'stories'
      );

    // MAP
    const map = L.map('map').setView(
      [-2.5, 118],
      5
    );

    // TILE LAYERS
    const osm =
      L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution:
            '&copy; OpenStreetMap',
        }
      );

    const satellite =
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution:
            'Tiles © Esri',
        }
      );

    osm.addTo(map);

    const baseMaps = {
      OpenStreetMap: osm,
      Satellite: satellite,
    };

    L.control.layers(baseMaps).addTo(
      map
    );

    // STORIES
    stories.forEach((story) => {

      storiesContainer.innerHTML += `
        <article class="story-card">

          <img
            src="${story.photoUrl}"
            alt="Foto story dari ${story.name}"
            class="story-image"
          >

          <div class="story-content">

            <h2>${story.name}</h2>

            <p>
              ${story.description}
            </p>

            <div
              style="
                display:flex;
                gap:10px;
                margin-top:10px;
              "
            >

              <button
                class="save-button"
                data-id="${story.id}"
              >
                Simpan
              </button>

              <button
                class="delete-button"
                data-id="${story.id}"
              >
                Hapus
              </button>

            </div>

          </div>

        </article>
      `;

      // MARKER
      if (story.lat && story.lon) {

        L.marker([
          story.lat,
          story.lon,
        ])
          .addTo(map)
          .bindPopup(`
            <b>${story.name}</b><br>
            ${story.description}
          `);
      }
    });

    // SAVE STORY
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
          }
        );
      });

    // DELETE STORY
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

          // HAPUS CARD DARI TAMPILAN
          button
            .closest('.story-card')
            .remove();

          alert(
            'Story berhasil dihapus'
          );
          }
        );
      });

    // READ INDEXEDDB
    const savedStories =
      await getAllStories();

    console.log(
      'IndexedDB Stories:',
      savedStories
    );
  }
}