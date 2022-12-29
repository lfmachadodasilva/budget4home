import * as admin from 'firebase-admin';
import { App } from 'firebase-admin/app';
import * as firestore from 'firebase-admin/firestore';

export const firebaseAdminApp: App =
  admin.apps.length > 0
    ? (admin.apps[0] as App)
    : admin.initializeApp({
        credential: admin.credential.cert({
          project_id: process.env.FIREBASE_PROJECT_ID, //firebase.projectId,
          client_email: process.env.FIREBASE_CLIENT_EMAIL, //firebase.clientEmail,
          private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID, //firebase.privateKeyId,
          private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') //firebase.privateKey.replace(/\\n/g, '\n')
        } as any),
        projectId: process.env.FIREBASE_PROJECT_ID, //firebase.projectId,
        databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
      });

export const firebaseAdminFirestore = firestore.getFirestore(firebaseAdminApp);
export const firebaseAdminAuth = admin.auth(firebaseAdminApp);
