import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseKey: string = `AIzaSyDMDE7eTQbjwkQglMJf5KnFtMr48-pAoVM`; //`${process.env.FIREBASE_KEY}`;
const firebaseProjectId: string = `${process.env.FIREBASE_PROJECT_ID}`;
const firebaseDatabaseURL: string = `https://lfmachadodasilva-dev.firebaseio.com`; //`https://${firebaseProjectId}.firebaseio.com`;

export const firebaseApp = initializeApp({
  apiKey: firebaseKey,
  authDomain: `${firebaseProjectId}.firebaseapp.com`,
  databaseURL: firebaseDatabaseURL,
  projectId: firebaseProjectId,
  storageBucket: `${firebaseProjectId}.appspot.com`
});

export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDatabase = getDatabase(firebaseApp);
