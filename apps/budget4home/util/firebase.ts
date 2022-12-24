import getConfig from 'next/config';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const {
  publicRuntimeConfig: { firebase }
} = getConfig();

export const firebaseApp = initializeApp({
  apiKey: firebase.key,
  authDomain: `${firebase.projectId}.firebaseapp.com`,
  databaseURL: `https://${firebase.projectId}.firebaseio.com`,
  projectId: firebase.projectId,
  storageBucket: `${firebase.projectId}.appspot.com`
});

export const firebaseAuth = getAuth(firebaseApp);
