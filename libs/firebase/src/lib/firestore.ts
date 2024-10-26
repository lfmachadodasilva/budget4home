import { Firestore, getFirestore } from 'firebase/firestore';
import { getFirebaseApp } from './app';

import 'firebase/compat/firestore';

let firebaseFirestore: Firestore;

export const getFirebaseFirestore = () => {
  firebaseFirestore ??= getFirestore(getFirebaseApp());
  return firebaseFirestore;
};
