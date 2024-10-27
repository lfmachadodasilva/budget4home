'use client';

import { getFirebaseAnalytics, logEvent } from '@b4h/firebase';

export const ExpensesAnalytics = () => {
  getFirebaseAnalytics().then(analytics => {
    analytics && logEvent(analytics, 'expenses');
  });

  return null;
};

export const AddExpenseAnalytics = () => {
  getFirebaseAnalytics().then(analytics => {
    analytics && logEvent(analytics, 'add_expense');
  });

  return null;
};

export const UpdateExpenseAnalytics = () => {
  getFirebaseAnalytics().then(analytics => {
    analytics && logEvent(analytics, 'update_expense');
  });

  return null;
};
