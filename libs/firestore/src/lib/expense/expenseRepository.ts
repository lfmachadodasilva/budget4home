import { ExpenseModel } from '@budget4home/models';
import { Firestore } from 'firebase-admin/firestore';
import { v4 } from 'uuid';

import { FirestoreCollections } from '../collections';
import { getGroup } from '../group/groupRepository';
import { expenseConverter } from './expenseConverter';

export const getAllExpenses = async (
  firestore: Firestore,
  groupId: string,
  userId: string,
  from: Date,
  to: Date
): Promise<ExpenseModel[]> => {
  if (!(await getGroup(firestore, groupId, userId))) {
    return [];
  }

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
  groupId: string,
  userId: string
): Promise<ExpenseModel | undefined | null> => {
  if (!(await getGroup(firestore, groupId, userId))) {
    return null;
  }

  const doc = await firestore
    .doc(FirestoreCollections.expese(groupId, expenseId))
    .withConverter(expenseConverter)
    .get();
  return doc.data();
};

export const addOrUpdateExpense = async (
  firestore: Firestore,
  expense: Partial<ExpenseModel>,
  groupId: string,
  userId: string
): Promise<Partial<ExpenseModel> | null | undefined> => {
  if (!(await getGroup(firestore, groupId, userId))) {
    return;
  }

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
  groupId: string,
  userId: string
): Promise<void> => {
  if (!(await getGroup(firestore, groupId, userId))) {
    return;
  }

  const docRef = firestore.doc(FirestoreCollections.expese(groupId, expenseId));
  await docRef.delete();
};

export const deleteExpenseByLabel = async (
  firestore: Firestore,
  labelId: string,
  groupId: string,
  userId: string
): Promise<void> => {
  if (!(await getGroup(firestore, groupId, userId))) {
    return;
  }

  const docs = await firestore
    .collection(FirestoreCollections.expeses(groupId))
    .where('labelId', '==', labelId)
    .get();

  const batch = firestore.batch();
  docs.docs.forEach(doc => batch.delete(doc.ref));
  await batch.commit();
};
