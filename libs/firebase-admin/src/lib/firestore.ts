import { type Firestore, getFirestore } from 'firebase-admin/firestore';
import { getFirebaseAdminApp } from './app';

let firebaseAdminFirestore: Firestore;

export const getFirebaseAdminFirestore = () => {
  firebaseAdminFirestore ??= getFirestore(getFirebaseAdminApp());
  return firebaseAdminFirestore;
};
