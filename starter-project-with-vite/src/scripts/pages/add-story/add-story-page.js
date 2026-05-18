import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

import { addStory } from '../../data/api.js';

const AddStoryPage = {

  async render() {

    return `
      <section class="container">

        <h1 style="margin-bottom:20px;">
          Tambah Story
        </h1>

        <form id="addStoryForm">

          <label for="description">
            Deskripsi Story
          </label>

          <textarea
            id="description"
            required
          ></textarea>

          <label for="photo">
            Upload Foto
          </label>

          <input
            type="file"
            id="photo"
            accept="image/*"
            required
          />

          <div
            id="map"
            style="
              height:400px;
              border-radius:16px;
              margin-bottom:16px;
            "
          ></div>

          <div
            id="selectedLocation"
            style="
              margin-bottom:16px;
              font-weight:bold;
            "
          >
            Klik peta untuk memilih lokasi
          </div>

          <button type="submit">
            Tambah Story
          </button>

        </form>

      </section>
    `;
  },

  async afterRender() {

    let latitude = null;
    let longitude = null;

    /* MAP */

    const map = L.map('map').setView(
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

    let marker;

    const selectedLocation =
      document.querySelector(
        '#selectedLocation'
      );

    map.on('click', (event) => {

      latitude = event.latlng.lat;
      longitude = event.latlng.lng;

      selectedLocation.innerHTML = `
        Latitude:
        ${latitude.toFixed(5)}

        <br>

        Longitude:
        ${longitude.toFixed(5)}
      `;

      if (marker) {

        map.removeLayer(marker);
      }

      marker = L.marker([
        latitude,
        longitude,
      ]).addTo(map);

      marker.bindPopup(
        'Lokasi dipilih'
      ).openPopup();
    });

    /* FORM */

    const form =
      document.querySelector(
        '#addStoryForm'
      );

    form.addEventListener(
      'submit',
      async (event) => {

        event.preventDefault();

        try {

          const token =
            localStorage.getItem(
              'token'
            );

          if (!token) {

            alert(
              'Silakan login terlebih dahulu'
            );

            window.location.hash =
              '#/login';

            return;
          }

          const description =
            document.querySelector(
              '#description'
            ).value;

          const photo =
            document.querySelector(
              '#photo'
            ).files[0];

          const formData =
            new FormData();

          formData.append(
            'description',
            description
          );

          formData.append(
            'photo',
            photo
          );

          if (
            latitude &&
            longitude
          ) {

            formData.append(
              'lat',
              latitude
            );

            formData.append(
              'lon',
              longitude
            );
          }

          const result =
            await addStory(
              formData,
              token
            );

          if (!result.error) {

            /* PUSH NOTIFICATION */

            if (
              Notification.permission ===
              'granted'
            ) {

              new Notification(
                'Story berhasil ditambahkan'
              );
            }

            alert(
              'Story berhasil ditambahkan'
            );

            window.location.hash =
              '#/home';

          } else {

            alert(
              result.message
            );
          }

        } catch (error) {

          console.error(error);

          alert(
            'Gagal menambahkan story'
          );
        }
      }
    );
  },
};

export default AddStoryPage;