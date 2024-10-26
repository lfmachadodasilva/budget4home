import { Analytics, getAnalytics } from 'firebase/analytics';
import { getFirebaseApp } from './app';

import 'firebase/compat/analytics';

let firebaseAnalytic: Analytics;

export const getFirebaseAnalytics = () => {
  firebaseAnalytic ??= getAnalytics(getFirebaseApp());
  return firebaseAnalytic;
};
