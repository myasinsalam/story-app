import {
  addStory,
} from '../../data/api.js';

let stream = null;

const AddStoryPage = {
  async render() {
    return `
      <section class="container">

        <h1>Tambah Story</h1>

        <form id="add-story-form">

          <div class="form-control">
            <label for="description">
              Deskripsi
            </label>

            <textarea
              id="description"
              required
            ></textarea>
          </div>

          <div class="form-control">
            <label for="photo">
              Upload Gambar
            </label>

            <input
              type="file"
              id="photo"
              accept="image/*"
            />
          </div>

          <div class="form-control">
            <label>
              Atau Gunakan Kamera
            </label>

            <video
              id="camera-preview"
              autoplay
              playsinline
              width="300"
            ></video>

            <canvas
              id="camera-canvas"
              hidden
            ></canvas>

            <button
              type="button"
              id="open-camera"
            >
              Buka Kamera
            </button>

            <button
              type="button"
              id="capture-button"
            >
              Ambil Foto
            </button>
          </div>

          <div class="form-control">
            <label>
              Pilih Lokasi
            </label>

            <div
              id="map"
              style="
                height: 300px;
                margin-block: 1rem;
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

    const form = document.querySelector(
      '#add-story-form'
    );

    const photoInput =
      document.querySelector('#photo');

    const openCameraButton =
      document.querySelector(
        '#open-camera'
      );

    const captureButton =
      document.querySelector(
        '#capture-button'
      );

    const video =
      document.querySelector(
        '#camera-preview'
      );

    const canvas =
      document.querySelector(
        '#camera-canvas'
      );

    let latitude = null;
    let longitude = null;

    let capturedBlob = null;

    // MAP
    const map = L.map('map').setView(
      [-2.5, 118],
      5
    );

    const osm = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; OpenStreetMap',
      }
    );

    const satellite = L.tileLayer(
      'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; OpenTopoMap',
      }
    );

    osm.addTo(map);

    L.control.layers({
      OpenStreetMap: osm,
      Topography: satellite,
    }).addTo(map);

    let marker;

    map.on('click', (event) => {

      latitude = event.latlng.lat;
      longitude = event.latlng.lng;

      if (marker) {
        map.removeLayer(marker);
      }

      marker = L.marker([
        latitude,
        longitude,
      ]).addTo(map);
    });

    // OPEN CAMERA
    openCameraButton.addEventListener(
      'click',
      async () => {

        stream =
          await navigator.mediaDevices.getUserMedia({
            video: true,
          });

        video.srcObject = stream;
      }
    );

    // CAPTURE
    captureButton.addEventListener(
      'click',
      () => {

        const context =
          canvas.getContext('2d');

        canvas.width = video.videoWidth;

        canvas.height =
          video.videoHeight;

        context.drawImage(
          video,
          0,
          0
        );

        canvas.toBlob((blob) => {

          capturedBlob = blob;

          alert(
            'Foto berhasil diambil'
          );

        }, 'image/jpeg');

        // STOP CAMERA
        if (stream) {

          stream
            .getTracks()
            .forEach((track) =>
              track.stop()
            );
        }
      }
    );

    // SUBMIT
    form.addEventListener(
      'submit',
      async (event) => {

        event.preventDefault();

        const description =
          document.querySelector(
            '#description'
          ).value;

        let photo =
          photoInput.files[0];

        if (!photo && capturedBlob) {

          photo = new File(
            [capturedBlob],
            'camera.jpg',
            {
              type: 'image/jpeg',
            }
          );
        }

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

        const token =
          localStorage.getItem(
            'token'
          );

        const result =
          await addStory(
            formData,
            token
          );

        if (!result.error) {

          alert(
            'Story berhasil ditambahkan'
          );

          window.location.hash =
            '#/home';

        } else {

          alert(result.message);
        }
      }
    );
  },
};

export default AddStoryPage;