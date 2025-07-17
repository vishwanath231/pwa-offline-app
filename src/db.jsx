import Dexie from 'dexie';

// Define the database
export const db = new Dexie('MyAppDB');

// Define the schema
db.version(1).stores({
  users: '++id,username,email'
});
