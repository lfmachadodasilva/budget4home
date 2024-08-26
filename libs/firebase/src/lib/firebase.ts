// import { Analytics, getAnalytics } from 'firebase/analytics';
import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
// import { Database, getDatabase } from 'firebase/database';
import { Firestore, getFirestore } from 'firebase/firestore';
import { FirebaseStorage, getStorage } from 'firebase/storage';

const firebasePrivatekey = process.env['NEXT_PUBLIC_FIREBASE_PRIVATE_KEY_ID'] as string;
const firebaseAuthDomain = process.env['NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'] as string;
const firebaseDatabaseUrl = process.env['NEXT_PUBLIC_FIREBASE_DATABASE_URL'] as string;
const firebaseProjectId = process.env['NEXT_PUBLIC_FIREBASE_PROJECT_ID'] as string;
const firebaseStorageBucket = process.env['NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'] as string;
const firebaseMessagingSenderId = process.env['NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'] as string;
const firebaseAppId = process.env['NEXT_PUBLIC_FIREBASE_APP_ID'] as string;
const firebaseMeasurementId = process.env['NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID'] as string;

let firebaseApp: FirebaseApp;
let firebaseAuth: Auth;
let firebaseFirestore: Firestore;
// let firebaseDatabase: Database;
let firebaseStorage: FirebaseStorage;
// let firebaseAnalytic: Analytics;

export const getFirebaseApp = () => {
  firebaseApp ??=
    getApps().length > 0
      ? getApps()[0]
      : initializeApp({
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

export const getFirebaseAuth = () => {
  firebaseAuth ??= getAuth(getFirebaseApp());
  return firebaseAuth;
};

export const getFirebaseFirestore = () => {
  firebaseFirestore ??= getFirestore(getFirebaseApp());
  return firebaseFirestore;
};

// export const getFirebaseDatabase = () => {
//   firebaseDatabase ??= getDatabase(getFirebaseApp());
//   return firebaseDatabase;
// };

export const getFirebaseStorage = () => {
  firebaseStorage ??= getStorage(getFirebaseApp());
  return firebaseStorage;
};

// export const getFirebaseAnalytics = () => {
//   firebaseAnalytic ??= getAnalytics(getFirebaseApp());
//   return firebaseAnalytic;
// };