import * as admin from 'firebase-admin';
import { App } from 'firebase-admin/app';
import * as firestore from 'firebase-admin/firestore';

const privateKey = process.env.FIREBASE_PRIVATE_KEY as string;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string;

export const firebaseAdminApp: App =
  admin.apps.length > 0
    ? (admin.apps[0] as App)
    : admin.initializeApp({
        credential: admin.credential.cert({
          project_id: projectId,
          client_email: process.env.FIREBASE_CLIENT_EMAIL,
          private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
          private_key: privateKey.replace(/\\n/g, '\n')
        } as any),
        projectId: projectId,
        databaseURL: `https://${projectId}.firebaseio.com`,
        storageBucket: `${projectId}.appspot.com`
      });

export const firebaseAdminFirestore = firestore.getFirestore(firebaseAdminApp);
export const firebaseAdminAuth = admin.auth(firebaseAdminApp);
export const firebaseAdminStorage = admin.storage(firebaseAdminApp);
