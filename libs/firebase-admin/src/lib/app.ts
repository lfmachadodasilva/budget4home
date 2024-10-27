import { type App, cert, getApps, initializeApp } from 'firebase-admin/app';

const firebaseProjectId = process.env['NEXT_PUBLIC_FIREBASE_PROJECT_ID'] as string;
const firebasePrivateKey = process.env['FIREBASE_PRIVATE_KEY'] as string;
const firebasePrivateKeyId = process.env['FIREBASE_PRIVATE_KEY_ID'] as string;
const firebaseClientEmail = process.env['FIREBASE_CLIENT_EMAIL'] as string;
const firebaseClientId = process.env['FIREBASE_CLIENT_ID'] as string;
const firebaseAuthUrl = process.env['FIREBASE_AUTH_URL'] as string;
const firebaseTokenUrl = process.env['FIREBASE_TOKEN_URL'] as string;
const firebaseAuthProviderUrl = process.env['FIREBASE_AUTH_PROVIDER_URL'] as string;
const firebaseClientUrl = process.env['FIREBASE_CLIENT_URL'] as string;
const firebaseUniverseDomain = process.env['FIREBASE_UNIVERSE_DOMAIN'] as string;
const firebaseStorageBucket = process.env['FIREBASE_STORAGE_BUCKET'] as string;
const firebaseDatabaseUrl = process.env['FIREBASE_DATABASE_URL'] as string;

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
            private_key: firebasePrivateKey.replace(/\\n/g, '\n'),
            client_email: firebaseClientEmail,
            client_id: firebaseClientId,
            auth_uri: firebaseAuthUrl,
            token_uri: firebaseTokenUrl,
            auth_provider_x509_cert_url: firebaseAuthProviderUrl,
            client_x509_cert_url: firebaseClientUrl,
            universe_domain: firebaseUniverseDomain
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any),
          projectId: firebaseProjectId,
          storageBucket: firebaseStorageBucket,
          databaseURL: firebaseDatabaseUrl
        });
  return firebaseAdminApp;
};
