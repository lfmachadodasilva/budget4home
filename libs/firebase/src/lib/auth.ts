import { Auth, getAuth } from 'firebase/auth';
import { getFirebaseApp } from './app';

import 'firebase/compat/auth';

let firebaseAuth: Auth;

export const getFirebaseAuth = () => {
  firebaseAuth ??= getAuth(getFirebaseApp());
  return firebaseAuth;
};
