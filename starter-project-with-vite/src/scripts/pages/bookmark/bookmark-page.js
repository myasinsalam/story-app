import {
  getAllStories,
  deleteStory,
} from '../../data/indexeddb.js';

const BookmarkPage = {

  async render() {

    return `
      <section class="container">

        <h2>
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

    const container =
      document.getElementById(
        'bookmarkStories'
      );

    const stories =
      await getAllStories();

    if (
      stories.length === 0
    ) {

      container.innerHTML = `
        <p>
          Belum ada bookmark story
        </p>
      `;

      return;
    }

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

              <h2>
                ${story.name}
              </h2>

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

        container.appendChild(
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

            window.location.reload();
          }
        );
      }
    );
  },
};

export default BookmarkPage;