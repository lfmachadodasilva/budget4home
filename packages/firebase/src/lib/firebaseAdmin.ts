import * as admin from 'firebase-admin';
import { App, ServiceAccount } from 'firebase-admin/app';
import * as firestore from 'firebase-admin/firestore';
import { Auth } from 'firebase-admin/lib/auth/auth';
import { Storage } from 'firebase-admin/lib/storage/storage';

export let firebaseAdminApp: App;
export let firebaseAdminFirestore: firestore.Firestore;
export let firebaseAdminAuth: Auth;
export let firebaseAdminStorage: Storage;

export const getFirebaseAdminApp = () => {
  firebaseAdminApp ??= admin.apps.length > 0
    ? (admin.apps[0] as App)
    : admin.initializeApp({
      credential: admin.credential.cert({
        project_id: process.env['FIREBASE_PROJECT_ID'],
        client_email: process.env['FIREBASE_CLIENT_EMAIL'],
        private_key_id: process.env['FIREBASE_PRIVATE_KEY_ID'],
        private_key: (process.env['FIREBASE_PRIVATE_KEY'] as string).replace(/\\n/g, '\n')
      } as ServiceAccount),
      projectId: process.env['FIREBASE_PROJECT_ID'],
      databaseURL: `https://${process.env['FIREBASE_PROJECT_ID']}.firebaseio.com`,
      storageBucket: `${process.env['FIREBASE_PROJECT_ID']}.appspot.com`
    });
  return firebaseAdminApp;
}

export const getFirebaseAdminFirestore = () => {
  firebaseAdminFirestore ??= firestore.getFirestore(getFirebaseAdminApp());
  return firebaseAdminFirestore;
}

export const getFirebaseAdminAuth = () => {
  firebaseAdminAuth ??= admin.auth(getFirebaseAdminApp());
  return firebaseAdminAuth;
}

export const getFirebaseAdminStorage = () => {
  firebaseAdminStorage ??= admin.storage(getFirebaseAdminApp());
  return firebaseAdminStorage;
}