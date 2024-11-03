import { Analytics, getAnalytics, isSupported } from 'firebase/analytics';
import { getFirebaseApp } from './app';

import 'firebase/compat/analytics';

let firebaseAnalytic: Analytics;

export const getFirebaseAnalytics = async () => {
  const support = await isSupported();
  if (!support) {
    return null;
  }
  firebaseAnalytic ??= getAnalytics(getFirebaseApp());
  return firebaseAnalytic;
};

export { logEvent } from 'firebase/analytics';
