import { type App, cert, getApps, initializeApp } from 'firebase-admin/app';

const firebaseProjectId = process.env['NEXT_PUBLIC_FIREBASE_PROJECT_ID'] as string;
const firebasePrivatekey = process.env['NEXT_PUBLIC_FIREBASE_PRIVATE_KEY_ID'] as string;
const firebaseAuthDomain = `${firebaseProjectId}.firebaseapp.com`;
const firebaseDatabaseUrl = `https://${firebaseProjectId}.firebaseio.com`;
const firebaseStorageBucket = `${firebaseProjectId}.appspot.com`;
const firebaseMessagingSenderId = process.env['NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'] as string;
const firebaseAppId = process.env['NEXT_PUBLIC_FIREBASE_APP_ID'] as string;
const firebaseMeasurementId = process.env['NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID'] as string;

const firebasePrivateKey = process.env['FIREBASE_PRIVATE_KEY'] as string;
const firebasePrivateKeyId = process.env['FIREBASE_PRIVATE_KEY_ID'] as string;
const firebaseClientEmail = process.env['FIREBASE_CLIENT_EMAIL'] as string;
const firebaseClientId = process.env['FIREBASE_CLIENT_ID'] as string;
const firebaseClientUrl = process.env['FIREBASE_CLIENT_URL'] as string;

let firebaseAdminApp: App;

export const getFirebaseAdminApp = (): App => {
  firebaseAdminApp ??=
    getApps().length > 0
      ? getApps()[0]
      : initializeApp({
          credential: cert({
            type: 'service_account',
            project_id: firebaseProjectId,
            private_key_id: firebasePrivateKeyId,
            private_key: firebasePrivateKey?.replace(/\\n/g, '\n'),
            client_email: firebaseClientEmail,
            client_id: firebaseClientId,
            auth_uri: 'https://accounts.google.com/o/oauth2/auth',
            token_uri: 'https://oauth2.googleapis.com/token',
            auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
            client_x509_cert_url: firebaseClientUrl,
            universe_domain: 'googleapis.com'
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any),
          apiKey: firebasePrivatekey,
          authDomain: firebaseAuthDomain,
          databaseURL: firebaseDatabaseUrl,
          projectId: firebaseProjectId,
          storageBucket: firebaseStorageBucket,
          messagingSenderId: firebaseMessagingSenderId,
          appId: firebaseAppId,
          measurementId: firebaseMeasurementId
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
  return firebaseAdminApp;
};
