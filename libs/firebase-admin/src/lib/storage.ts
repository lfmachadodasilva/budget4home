import { type Storage, getStorage } from 'firebase-admin/storage';
import { getFirebaseAdminApp } from './app';

let firebaseAdminStorage: Storage;

export const getFirebaseAdminStorage = () => {
  firebaseAdminStorage ??= getStorage(getFirebaseAdminApp());
  return firebaseAdminStorage;
};
