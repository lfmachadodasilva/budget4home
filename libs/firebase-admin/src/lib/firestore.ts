import { type Firestore, getFirestore } from 'firebase-admin/firestore';
import { getFirebaseAdminApp } from './app';

let firebaseAdminFirestore: Firestore;

export const getFirebaseAdminFirestore = () => {
  if (process.env['NODE_ENV'] === 'test') {
    process.env['FIRESTORE_EMULATOR_HOST'] = '127.0.0.1:8080';
    if (!firebaseAdminFirestore) {
      firebaseAdminFirestore = getFirestore(getFirebaseAdminApp());
      firebaseAdminFirestore.settings({
        host: '127.0.0.1:8080',
        ssl: false
      });
    }
  } else {
    firebaseAdminFirestore ??= getFirestore(getFirebaseAdminApp());
  }

  return firebaseAdminFirestore;
};
