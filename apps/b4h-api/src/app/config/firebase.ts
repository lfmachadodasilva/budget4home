import { type App, cert, initializeApp } from 'firebase-admin/app';
import { type Auth, getAuth } from 'firebase-admin/auth';
import { type Firestore, getFirestore } from 'firebase-admin/firestore';
import { type Storage, getStorage } from 'firebase-admin/storage';

const firebaseKey = process.env['FIREBASE_KEY'] as string;
const firebasePrivateKey = process.env['FIREBASE_PRIVATE_KEY'] as string;
const firebasePrivateKeyId = process.env['FIREBASE_PRIVATE_KEY_ID'] as string;
const firebaseProjectId = process.env['FIREBASE_PROJECT_ID'] as string;
const firebaseClientEmail = process.env['FIREBASE_CLIENT_EMAIL'] as string;
const firebaseClientId = process.env['FIREBASE_CLIENT_ID'] as string;
const firebaseAuthUrl = process.env['FIREBASE_AUTH_URL'] as string;
const firebaseTokenUrl = process.env['FIREBASE_TOKEN_URL'] as string;
const firebaseAuthProviderUrl = process.env['FIREBASE_AUTH_PROVIDER_URL'] as string;
const firebaseClientUrl = process.env['FIREBASE_CLIENT_URL'] as string;
const firebaseUniverseDomain = process.env['FIREBASE_UNIVERSE_DOMAIN'] as string;

let firebaseAdminApp: App;
let firebaseAdminFirestore: Firestore;
let firebaseAdminAuth: Auth;
let firebaseAdminStorage: Storage;

export const getFirebaseAdminApp = (): App => {
  firebaseAdminApp ??= initializeApp({
    credential: cert({
      type: 'service_account',
      project_id: firebaseProjectId,
      private_key_id: firebasePrivateKeyId,
      private_key: firebasePrivateKey.replace(/\\n/g, '\n'),
      client_email: firebaseClientEmail,
      client_id: firebaseClientId,
      auth_uri: firebaseAuthUrl,
      token_uri: firebaseTokenUrl,
      auth_provider_x509_cert_url: firebaseAuthProviderUrl,
      client_x509_cert_url: firebaseClientUrl,
      universe_domain: firebaseUniverseDomain
    } as any),
    projectId: firebaseProjectId,
    databaseURL: `https://${firebaseProjectId}.firebaseio.com`,
    storageBucket: `${firebaseProjectId}.appspot.com`
  });
  return firebaseAdminApp;
};

export const getFirebaseAdminFirestore = () => {
  firebaseAdminFirestore ??= getFirestore(getFirebaseAdminApp());
  return firebaseAdminFirestore;
};

export const getFirebaseAdminAuth = () => {
  firebaseAdminAuth ??= getAuth(getFirebaseAdminApp());
  return firebaseAdminAuth;
};

export const getFirebaseAdminStorage = () => {
  firebaseAdminStorage ??= getStorage(getFirebaseAdminApp());
  return firebaseAdminStorage;
};
