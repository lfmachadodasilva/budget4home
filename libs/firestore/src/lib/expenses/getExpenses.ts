import { getFirebaseAdminFirestore, Timestamp } from '@b4h/firebase-admin';
import { addMonths, startOfMonth } from 'date-fns';
import { tryGroupIsValidFirestore } from '../groups/validateGroup';
import { FirestorePath } from '../path';
import { expenseConverter } from './converter';

export const getExpensesFirebase = async (userId: string, groupId: string, date?: Date | null) => {
  await tryGroupIsValidFirestore(userId, groupId);

  const now = date ?? new Date();
  const from = startOfMonth(now);
  const to = addMonths(from, 1);

  const docs = await getFirebaseAdminFirestore()
    .collection(FirestorePath.expeses(groupId))
    .where('date', '>=', Timestamp.fromDate(from))
    .where('date', '<', Timestamp.fromDate(to))
    .orderBy('date', 'desc')
    .withConverter(expenseConverter)
    .get();

  return docs.docs.map(doc => doc.data());
};

export const getAllExpensesFirebase = async (userId: string, groupId: string) => {
  await tryGroupIsValidFirestore(userId, groupId);

  const docs = await getFirebaseAdminFirestore()
    .collection(FirestorePath.expeses(groupId))
    .orderBy('date', 'desc')
    .withConverter(expenseConverter)
    .get();

  return docs.docs.map(doc => doc.data());
};

export const getExpensesByParentFirebase = async (
  userId: string,
  groupId: string,
  parentId: string
) => {
  await tryGroupIsValidFirestore(userId, groupId);

  const docs = await getFirebaseAdminFirestore()
    .collection(FirestorePath.expeses(groupId))
    .where('parent', '==', parentId)
    .withConverter(expenseConverter)
    .get();

  return docs.docs.map(doc => doc.data());
};
