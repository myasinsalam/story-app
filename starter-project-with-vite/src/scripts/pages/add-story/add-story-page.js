import L from 'leaflet';

import Swal from 'sweetalert2';

import {
  addStory,
} from '../../data/api.js';

const AddStoryPage = {

  async render() {

    return `
      <section class="container">

        <h2>
          Add Story
        </h2>

        <form id="addStoryForm">

          <div class="form-control">

            <label for="description">
              Description
            </label>

            <textarea
              id="description"
              required
            ></textarea>

          </div>

          <div class="form-control">

            <label for="photo">
              Upload Photo
            </label>

            <input
              type="file"
              id="photo"
              accept="image/*"
              capture="environment"
              required
            />

          </div>

          <div class="form-control">

            <label>
              Pilih Lokasi
            </label>

            <div
              id="map"
              style="
                height: 400px;
                margin-top: 10px;
              "
            ></div>

          </div>

          <button type="submit">
            Tambah Story
          </button>

        </form>

      </section>
    `;
  },

  async afterRender() {

    const form =
      document.getElementById(
        'addStoryForm'
      );

    const photoInput =
      document.getElementById(
        'photo'
      );

    let selectedLat = null;

    let selectedLon = null;

    const map = L.map(
      'map'
    ).setView(
      [-6.2, 106.816666],
      5
    );

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; OpenStreetMap contributors',
      }
    ).addTo(map);

    let marker;

    map.on(
      'click',
      (event) => {

        selectedLat =
          event.latlng.lat;

        selectedLon =
          event.latlng.lng;

        if (marker) {

          marker.setLatLng(
            event.latlng
          );

        } else {

          marker = L.marker(
            event.latlng
          ).addTo(map);
        }
      }
    );

    form.addEventListener(
      'submit',
      async (event) => {

        event.preventDefault();

        Swal.fire({
          title: 'Loading...',
          text:
            'Sedang menambah story',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const description =
          document.getElementById(
            'description'
          ).value;

        const photo =
          photoInput.files[0];

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
          selectedLat &&
          selectedLon
        ) {

          formData.append(
            'lat',
            selectedLat
          );

          formData.append(
            'lon',
            selectedLon
          );
        }

        const token =
          localStorage.getItem(
            'token'
          );

        const response =
          await addStory(
            formData,
            token
          );

        Swal.close();

        if (
          response.error
        ) {

          Swal.fire(
            'Gagal',
            response.message,
            'error'
          );

          return;
        }

        Swal.fire(
          'Berhasil',
          'Story berhasil ditambahkan',
          'success'
        );

        if (
          'serviceWorker' in navigator
        ) {

          const registration =
            await navigator.serviceWorker.ready;

          const subscription =
            await registration.pushManager.getSubscription();

          if (subscription) {

            registration.showNotification(
              'Story App',
              {
                body:
                  'Story baru berhasil ditambahkan',

                icon:
                  '/story-app/images/icon-192.png',

                badge:
                  '/story-app/images/icon-192.png',
              }
            );
          }
        }

        window.location.hash =
          '#/';
      }
    );
  },
};

export default AddStoryPage;