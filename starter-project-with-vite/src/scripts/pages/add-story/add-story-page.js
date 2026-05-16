export default class AddStoryPage {
  async render() {
    return `
      <a href="#main-content" class="skip-link">
        Skip to Content
      </a>

      <header>
        <div class="container main-header">

          <a href="#/home" class="brand-name">
            Story App
          </a>

          <nav class="navigation-drawer">
            <ul class="nav-list">

              <li>
                <a href="#/home">
                  Home
                </a>
              </li>

              <li>
                <a href="#/add-story">
                  Tambah Story
                </a>
              </li>

            </ul>
          </nav>

        </div>
      </header>

      <main
        id="main-content"
        class="main-content container"
      >
        <h1>Tambah Story</h1>

        <form id="addStoryForm">

          <div style="margin-bottom:16px;">
            <label for="description">
              Deskripsi
            </label>

            <textarea
              id="description"
              required
              rows="5"
              style="
                width:100%;
                padding:10px;
              "
            ></textarea>
          </div>

          <div style="margin-bottom:16px;">
            <label for="photo">
              Upload Foto
            </label>

            <input
              type="file"
              id="photo"
              accept="image/*"
            >
          </div>

          <!-- CAMERA -->
          <div style="margin-bottom:20px;">

            <video
              id="cameraPreview"
              autoplay
              playsinline
              width="300"
            ></video>

            <br><br>

            <button
              type="button"
              id="openCameraButton"
            >
              Buka Kamera
            </button>

            <button
              type="button"
              id="captureButton"
            >
              Ambil Foto
            </button>

            <canvas
              id="canvas"
              style="display:none"
            ></canvas>

          </div>

          <div style="margin-bottom:16px;">
            <label for="lat">
              Latitude
            </label>

            <input
              type="text"
              id="lat"
              readonly
              required
            >
          </div>

          <div style="margin-bottom:16px;">
            <label for="lon">
              Longitude
            </label>

            <input
              type="text"
              id="lon"
              readonly
              required
            >
          </div>

          <div
            id="map"
            aria-label="Peta memilih lokasi"
            style="
              height:400px;
              margin-bottom:20px;
            "
          ></div>

          <button type="submit">
            Tambah Story
          </button>

        </form>
      </main>

      <footer
        style="
          padding:20px;
          text-align:center;
        "
      >
        <p>Story App</p>
      </footer>
    `;
  }

  async afterRender() {
    const mapContainer =
      document.getElementById('map');

    if (mapContainer._leaflet_id) {
      mapContainer._leaflet_id = null;
    }

    const map = L.map('map').setView(
      [-2.5489, 118.0149],
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

    map.on('click', (e) => {
      const { lat, lng } = e.latlng;

      document.getElementById('lat').value = lat;

      document.getElementById('lon').value = lng;

      if (marker) {
        map.removeLayer(marker);
      }

      marker = L.marker([lat, lng]).addTo(map);
    });

    // CAMERA
    const video =
      document.getElementById('cameraPreview');

    const canvas =
      document.getElementById('canvas');

    const openCameraButton =
      document.getElementById(
        'openCameraButton'
      );

    const captureButton =
      document.getElementById(
        'captureButton'
      );

    let stream;

    let capturedFile = null;

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

    captureButton.addEventListener(
      'click',
      () => {
        const context =
          canvas.getContext('2d');

        canvas.width = video.videoWidth;

        canvas.height = video.videoHeight;

        context.drawImage(
          video,
          0,
          0,
          canvas.width,
          canvas.height
        );

        canvas.toBlob((blob) => {
          capturedFile = new File(
            [blob],
            'camera.jpg',
            {
              type: 'image/jpeg',
            }
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

    const form =
      document.getElementById(
        'addStoryForm'
      );

    form.addEventListener(
      'submit',
      async (e) => {
        e.preventDefault();

        const token =
          localStorage.getItem('token');

        const description =
          document.getElementById(
            'description'
          ).value;

        const uploadPhoto =
          document.getElementById(
            'photo'
          ).files[0];

        const photo =
          capturedFile || uploadPhoto;

        const lat =
          document.getElementById('lat')
            .value;

        const lon =
          document.getElementById('lon')
            .value;

        const formData = new FormData();

        formData.append(
          'description',
          description
        );

        formData.append('photo', photo);

        formData.append('lat', lat);

        formData.append('lon', lon);

        const response = await fetch(
          'https://story-api.dicoding.dev/v1/stories',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        const result =
          await response.json();

        if (!result.error) {

          const registration =
            await navigator.serviceWorker.ready;

          registration.showNotification(
            'Story berhasil dibuat',
            {
              body: description,
              icon: '/favicon.png',
            }
          );

          alert(
            'Story berhasil ditambahkan'
          );

          location.hash = '/home';

        } else {
          alert(result.message);
        }
      }
    );
  }
}