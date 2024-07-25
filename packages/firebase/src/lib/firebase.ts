import { Analytics, getAnalytics } from 'firebase/analytics';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Database, getDatabase } from 'firebase/database';
import { FirebaseStorage, getStorage } from 'firebase/storage';

const firebaseKey = process.env['FIREBASE_KEY'] as string;
const firebaseProjectId = process.env['FIREBASE_PROJECT_ID'] as string;

export let firebaseApp: FirebaseApp;
export let firebaseAuth: Auth;
export let firebaseDatabase: Database;
export let firebaseStorage: FirebaseStorage;
export let firebaseAnalytic: Analytics;

export const getFirebaseApp = () => {
  firebaseApp ??= initializeApp({
    apiKey: firebaseKey,
    authDomain: `${firebaseProjectId}.firebaseapp.com`,
    databaseURL: `https://${firebaseProjectId}.firebaseio.com`,
    projectId: firebaseProjectId,
    storageBucket: `${firebaseProjectId}.appspot.com`
  });
  return firebaseApp;
};

export const getFirebaseAuth = () => {
  firebaseAuth ??= getAuth(getFirebaseApp());
  return firebaseAuth;
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
