import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseKey: string = process.env.NEXT_PUBLIC_FIREBASE_KEY;
const firebaseProjectId: string = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

export const firebaseApp = initializeApp({
  apiKey: firebaseKey,
  authDomain: `${firebaseProjectId}.firebaseapp.com`,
  databaseURL: `https://${firebaseProjectId}.firebaseio.com`,
  projectId: firebaseProjectId,
  storageBucket: `${firebaseProjectId}.appspot.com`
});

export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDatabase = getDatabase(firebaseApp);
