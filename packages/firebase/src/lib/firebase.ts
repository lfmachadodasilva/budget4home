import { Analytics, getAnalytics } from 'firebase/analytics';
import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Database, getDatabase } from 'firebase/database';
import { Firestore, getFirestore } from 'firebase/firestore';
import { FirebaseStorage, getStorage } from 'firebase/storage';

let firebaseApp: FirebaseApp;
let firebaseAuth: Auth;
let firebaseFirestore: Firestore;
let firebaseDatabase: Database;
let firebaseStorage: FirebaseStorage;
let firebaseAnalytic: Analytics;

export const getFirebaseApp = () => {
  firebaseApp ??=
    getApps().length > 0
      ? getApps()[0]
      : initializeApp({
          apiKey:
            (process.env['FIREBASE_PRIVATE_KEY'] as string) ??
            'AIzaSyDMDE7eTQbjwkQglMJf5KnFtMr48-pAoVM',
          authDomain:
            (process.env['FIREBASE_AUTH_DOMAIN'] as string) ??
            'lfmachadodasilva-dev.firebaseapp.com',
          databaseURL:
            (process.env['FIREBASE_DATABASE_URL'] as string) ??
            'https://lfmachadodasilva-dev.firebaseio.com',
          projectId: (process.env['FIREBASE_PROJECT_ID'] as string) ?? 'lfmachadodasilva-dev',
          storageBucket:
            (process.env['FIREBASE_STORAGE_BUCKET'] as string) ??
            'lfmachadodasilva-dev.appspot.com',
          messagingSenderId:
            (process.env['FIREBASE_MESSAGING_SENDER_ID'] as string) ?? '306074029958',
          appId:
            (process.env['FIREBASE_APP_ID'] as string) ??
            '1:306074029958:web:32d3aa9e5b0d6c76a26607',
          measurementId: (process.env['FIREBASE_MEASUREMENT_ID'] as string) ?? 'G-CXLPP3YND5'
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

export const getFirebaseDatabase = () => {
  firebaseDatabase ??= getDatabase(getFirebaseApp());
  return firebaseDatabase;
};

export const getFirebaseStorage = () => {
  firebaseStorage ??= getStorage(getFirebaseApp());
  return firebaseStorage;
};

export const getFirebaseAnalytics = () => {
  firebaseAnalytic ??= getAnalytics(getFirebaseApp());
  return firebaseAnalytic;
};
