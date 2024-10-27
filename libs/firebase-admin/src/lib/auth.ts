import { type Auth, getAuth } from 'firebase-admin/auth';
import { getFirebaseAdminApp } from './app';

let firebaseAdminAuth: Auth;

export const getFirebaseAdminAuth = () => {
  firebaseAdminAuth ??= getAuth(getFirebaseAdminApp());
  return firebaseAdminAuth;
};
