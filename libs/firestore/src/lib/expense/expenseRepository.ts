import { getFirebaseAdminFirestore } from '@b4h/firebase-admin';
import { ExpenseModel, LabelModel } from '@b4h/models';
import { FirestorePath } from '../path';
import { expenseConverter } from './expenseConverter';

export const getExpenses = async (groupId: string, userId: string) => {
  const docs = await getFirebaseAdminFirestore()
    .collection(FirestorePath.expeses(groupId))
    .withConverter(expenseConverter)
    .get();

  return docs.docs.map(doc => doc.data());
};

export const getExpense = async (
  groupId: string,
  userId: string,
  labelId: string
): Promise<ExpenseModel | undefined | null> => {
  const doc = await getFirebaseAdminFirestore()
    .doc(FirestorePath.expese(groupId, labelId))
    .withConverter(expenseConverter)
    .get();

  return doc.data();
};

export const addExpense = async (
  userId: string,
  groupId: string,
  expense: Partial<ExpenseModel>
) => {
  const toAdd = {
    ...expense,
    createdAt: new Date(),
    createdBy: userId,
    updatedAt: new Date(),
    updatedBy: userId
  } as LabelModel;

  const obj = await getFirebaseAdminFirestore()
    .collection(FirestorePath.expeses(groupId))
    .add(toAdd);
  const doc = await obj.get();
  return doc.data();
};

export const updateExpense = async (
  userId: string,
  groupId: string,
  expense: Partial<ExpenseModel>
) => {
  const toUpdate = {
    ...expense,
    updatedAt: new Date(),
    updatedBy: userId
  } as LabelModel;

  const doc = getFirebaseAdminFirestore().doc(FirestorePath.expese(groupId, expense.id as string));
  await doc.set(toUpdate, { merge: true });

  return toUpdate;
};

export const deleteExpense = async (groupId: string, expenseId: string) => {
  await getFirebaseAdminFirestore().doc(FirestorePath.expese(groupId, expenseId)).delete();
};
