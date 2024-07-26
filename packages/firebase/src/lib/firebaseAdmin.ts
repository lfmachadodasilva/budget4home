import * as admin from 'firebase-admin';
import { App } from 'firebase-admin/app';
import * as firestore from 'firebase-admin/firestore';

const firebaseKey = process.env['FIREBASE_KEY'] as string;
const firebasePrivateKey = process.env['FIREBASE_PRIVATE_KEY_ID'] as string;
const firebaseProjectId = process.env['FIREBASE_PROJECT_ID'] as string;
const firebaseClientEmail = process.env['FIREBASE_CLIENT_EMAIL'] as string;

let firebaseAdminApp: App;
let firebaseAdminFirestore: firestore.Firestore;
let firebaseAdminAuth: admin.auth.Auth;
let firebaseAdminStorage: admin.storage.Storage;

export const getFirebaseAdminApp = () => {
  return admin.apps.length > 0
    ? (admin.apps[0] as App)
    : admin.initializeApp({
        credential: admin.credential.cert({
          project_id: firebaseProjectId,
          client_email: firebaseClientEmail,
          private_key_id: firebasePrivateKey,
          private_key: firebaseKey.replace(/\\n/g, '\n')
        } as any),
        projectId: firebaseProjectId,
        databaseURL: `https://${firebaseProjectId}.firebaseio.com`,
        storageBucket: `${firebaseProjectId}.appspot.com`
      });
};

export const getFirebaseAdminFirestore = () => {
  firebaseAdminFirestore ??= firestore.getFirestore(firebaseAdminApp);
  return firebaseAdminFirestore;
};

export const getFirebaseAdminAuth = () => {
  firebaseAdminAuth ??= admin.auth(getFirebaseAdminApp());
  return firebaseAdminAuth;
};

export const getFirebaseAdminStorage = () => {
  firebaseAdminStorage ??= admin.storage(getFirebaseAdminApp());
  return firebaseAdminStorage;
};
