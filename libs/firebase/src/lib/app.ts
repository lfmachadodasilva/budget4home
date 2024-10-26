import firebase from 'firebase/compat/app';

import 'firebase/compat/firestore';

import { FirebaseApp } from 'firebase/app';

const firebasePrivatekey = process.env['NEXT_PUBLIC_FIREBASE_PRIVATE_KEY_ID'] as string;
const firebaseAuthDomain = process.env['NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'] as string;
const firebaseDatabaseUrl = process.env['NEXT_PUBLIC_FIREBASE_DATABASE_URL'] as string;
const firebaseProjectId = process.env['NEXT_PUBLIC_FIREBASE_PROJECT_ID'] as string;
const firebaseStorageBucket = process.env['NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'] as string;
const firebaseMessagingSenderId = process.env['NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'] as string;
const firebaseAppId = process.env['NEXT_PUBLIC_FIREBASE_APP_ID'] as string;
const firebaseMeasurementId = process.env['NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID'] as string;

let firebaseApp: FirebaseApp;

export const getFirebaseApp = () => {
  firebaseApp ??=
    firebase.apps.length > 0
      ? firebase.apps[0]
      : firebase.initializeApp({
          apiKey: firebasePrivatekey,
          authDomain: firebaseAuthDomain,
          databaseURL: firebaseDatabaseUrl,
          projectId: firebaseProjectId,
          storageBucket: firebaseStorageBucket,
          messagingSenderId: firebaseMessagingSenderId,
          appId: firebaseAppId,
          measurementId: firebaseMeasurementId
        });
  return firebaseApp;
};
