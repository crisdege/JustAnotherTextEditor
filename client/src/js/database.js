import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// export a function that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  // create connection to the database
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges
  const tx = jateDb.transaction('jate', 'readwrite');

  // Open the desired object store
  const store = tx.objectStore('jate');

  // Use PUT to update item based on id
  const request = store.put({ id: 1, value: content });

  // Get confirmation of the request
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// export function that will use to GET to the database
export const getDb = async () => {
  console.log('GET from the database');

  // create connection to the database
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges
  const tx = jateDb.transaction('jate', 'readonly');

  // Open the desired object store
  const store = tx.objectStore('jate');

  // Use the .get method
  const request = store.get(1);

  // Get confirmation of the request
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};
initdb();
