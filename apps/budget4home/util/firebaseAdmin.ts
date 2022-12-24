import getConfig from 'next/config';

import * as admin from 'firebase-admin';
import { App } from 'firebase-admin/app';
import * as firestore from 'firebase-admin/firestore';

const {
  publicRuntimeConfig: { firebase }
} = getConfig();

export const firebaseAdminApp: App = admin.apps.length > 0 ? admin.apps[0] as App : admin.initializeApp({
  credential: admin.credential.cert({
    project_id: firebase.projectId,
    client_email: firebase.clientEmail,
    private_key_id: firebase.privateKeyId,
    private_key: firebase.privateKey.replace(/\\n/g, '\n'),
  } as any),
  projectId: firebase.projectId,
  databaseURL: `https://${firebase.projectId}.firebaseio.com`
});

export const firebaseAdminFirestore = firestore.getFirestore(firebaseAdminApp);
