'use client';

import { getFirebaseAnalytics, logEvent } from '@b4h/firebase';
import { track } from '@vercel/analytics/react';

const ExpensesAnalyticsKeys = {
  expenses: 'expenses',
  addExpense: 'add_expense',
  updateExpense: 'update_expense'
};

export const ExpensesAnalytics = () => {
  getFirebaseAnalytics().then(analytics => {
    analytics && logEvent(analytics, ExpensesAnalyticsKeys.expenses);
  });
  track(ExpensesAnalyticsKeys.expenses);

  return null;
};

export const AddExpenseAnalytics = () => {
  getFirebaseAnalytics().then(analytics => {
    analytics && logEvent(analytics, ExpensesAnalyticsKeys.addExpense);
  });
  track(ExpensesAnalyticsKeys.addExpense);

  return null;
};

export const UpdateExpenseAnalytics = () => {
  getFirebaseAnalytics().then(analytics => {
    analytics && logEvent(analytics, ExpensesAnalyticsKeys.updateExpense);
  });
  track(ExpensesAnalyticsKeys.updateExpense);

  return null;
};
