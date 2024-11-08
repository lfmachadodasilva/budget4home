import { connectFirestoreEmulator, Firestore, getFirestore } from 'firebase/firestore';
import { getFirebaseApp } from './app';

import 'firebase/compat/firestore';

let firebaseFirestore: Firestore;

export const getFirebaseFirestore = () => {
  if (process.env.NODE_ENV === 'test') {
    process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
    firebaseFirestore ??= getFirestore();
    connectFirestoreEmulator(firebaseFirestore, '127.0.0.1', 8080);
  } else {
    firebaseFirestore ??= getFirestore(getFirebaseApp());
  }
  return firebaseFirestore;
};
