import { ExpenseModel } from '@budget4home/models';
import { Firestore } from 'firebase-admin/firestore';
import { v4 } from 'uuid';

import { FirestoreCollections } from '../collections';
import { expenseConverter } from './expenseConverter';

export const getAllExpenses = async (
  firestore: Firestore,
  userId: string,
  groupId: string,
  from: Date,
  to: Date
): Promise<ExpenseModel[]> => {
  const docs = await firestore
    .collection(FirestoreCollections.expeses(groupId))
    .where('date', '>=', new Date(from))
    .where('date', '<', new Date(to))
    .orderBy('date', 'desc')
    .withConverter(expenseConverter)
    .get();

  return docs.docs.map(doc => doc.data());
};

export const getExpense = async (
  firestore: Firestore,
  expenseId: string,
  userId: string,
  groupId: string
): Promise<ExpenseModel | undefined | null> => {
  const doc = await firestore
    .doc(FirestoreCollections.expese(groupId, expenseId))
    .withConverter(expenseConverter)
    .get();
  return doc.data();
};

export const addOrUpdateExpense = async (
  firestore: Firestore,
  expense: Partial<ExpenseModel>,
  userId: string,
  groupId: string
): Promise<Partial<ExpenseModel>> => {
  expense.id = expense.id ?? v4();

  const docRef = firestore.doc(FirestoreCollections.expese(groupId, expense.id));

  const now = new Date();
  const doc = await docRef.get();

  if (!doc.exists) {
    expense.createdAt = now;
    expense.createdBy = userId;
  }
  expense.updatedAt = now;
  expense.updatedBy = userId;

  await docRef.set(expense);
  return expense;
};

export const deleteExpense = async (
  firestore: Firestore,
  expenseId: string,
  userId: string,
  groupId: string
): Promise<void> => {
  const docRef = firestore.doc(FirestoreCollections.expese(groupId, expenseId));
  await docRef.delete();
};
