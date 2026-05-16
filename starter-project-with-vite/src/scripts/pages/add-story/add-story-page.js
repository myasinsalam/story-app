import { addStory } from '../../data/api.js';

const AddStoryPage = {

  async render() {

    return `
      <section class="container">

        <h1>Tambah Story</h1>

        <form id="addStoryForm">

          <div>
            <label for="description">
              Deskripsi
            </label>

            <input
              type="text"
              id="description"
              required
            />
          </div>

          <div>
            <label for="photo">
              Foto
            </label>

            <input
              type="file"
              id="photo"
              accept="image/*"
              required
            />
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
      document.querySelector(
        '#addStoryForm'
      );

    form.addEventListener(
      'submit',
      async (event) => {

        event.preventDefault();

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