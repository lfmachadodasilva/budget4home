import { FirebaseStorage, getStorage } from 'firebase/storage';
import { getFirebaseApp } from './app';

import 'firebase/compat/storage';

let firebaseStorage: FirebaseStorage;

export const getFirebaseStorage = () => {
  firebaseStorage ??= getStorage(getFirebaseApp());
  return firebaseStorage;
};
