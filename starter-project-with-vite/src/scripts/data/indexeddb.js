import { openDB } from 'idb';

const DATABASE_NAME = 'story-app-db';
const DATABASE_VERSION = 1;
const OBJECT_STORE_NAME = 'stories';

const dbPromise = openDB(
  DATABASE_NAME,
  DATABASE_VERSION,
  {
    upgrade(database) {
      database.createObjectStore(
        OBJECT_STORE_NAME,
        {
          keyPath: 'id',
        }
      );
    },
  }
);

export async function saveStory(story) {
  return (await dbPromise).put(
    OBJECT_STORE_NAME,
    story
  );
}

export async function getAllStories() {
  return (await dbPromise).getAll(
    OBJECT_STORE_NAME
  );
}

export async function deleteStory(id) {
  return (await dbPromise).delete(
    OBJECT_STORE_NAME,
    id
  );
}