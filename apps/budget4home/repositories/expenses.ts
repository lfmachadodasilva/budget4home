import { addMonths, startOfMonth } from 'date-fns';
import { Firestore, Timestamp } from 'firebase-admin/firestore';

import { Expense, expenseToModel } from '../modals/expense';
import { FirestoreCollections } from './collections';
import { isInvalidGroup } from './groups';

export const getAllExpenses = async (firestore: Firestore, userId: string, groupId: string): Promise<Expense[]> => {
  if (await isInvalidGroup(firestore, userId, groupId)) {
    // TODO throw ex
    return null;
  }

  const docs = await firestore.collection(FirestoreCollections.expeses(groupId)).get();

  return await Promise.all(
    docs.docs.map(async doc => {
      return await expenseToModel(doc);
    })
  );
};

export const getAllExpensesThisMonth = async (
  firestore: Firestore,
  userId: string,
  groupId: string
): Promise<Expense[]> => {
  if (await isInvalidGroup(firestore, userId, groupId)) {
    // TODO throw ex
    return null;
  }

  const now = new Date();
  const startDay = startOfMonth(now);
  const endDay = addMonths(startDay, 1);

  const docs = await firestore
    .collection(FirestoreCollections.expeses(groupId))
    .where('date', '>=', Timestamp.fromDate(startDay))
    .where('date', '<', Timestamp.fromDate(endDay))
    .get();

  return await Promise.all(
    docs.docs.map(async doc => {
      return await expenseToModel(doc);
    })
  );
};

export const getExpense = async (
  firestore: Firestore,
  userId: string,
  groupId: string,
  expenseId: string
): Promise<Expense | null> => {
  if (await isInvalidGroup(firestore, userId, groupId)) {
    // TODO throw ex
    return null;
  }

  const doc = await firestore.doc(FirestoreCollections.expese(groupId, expenseId)).get();
  const data = doc.data();

  if (!data) {
    return null;
  }

  return await expenseToModel(doc);
};

export const addExpense = async (firestore: Firestore, userId: string, groupId: string, expense: Partial<Expense>) => {
  if (await isInvalidGroup(firestore, userId, groupId)) {
    // TODO throw ex
    return null;
  }

  const obj = await expenseToFirestore(firestore, expense as Expense);
  const doc = await firestore.collection(FirestoreCollections.expeses(groupId)).add(obj);
  return {
    id: doc.id
  } as Expense;
};

export const updateExpense = async (
  firestore: Firestore,
  userId: string,
  groupId: string,
  expense: Partial<Expense>
) => {
  if (await isInvalidGroup(firestore, userId, groupId)) {
    // TODO throw ex
    return null;
  }

  const obj = await expenseToFirestore(firestore, expense as Expense);
  const doc = await firestore.doc(FirestoreCollections.expese(groupId, expense.id)).set(obj);
  return doc;
};

export const deleteExpense = async (firestore: Firestore, userId: string, groupId: string, expenseId: string) => {
  if (await isInvalidGroup(firestore, userId, groupId)) {
    // TODO throw ex
    return null;
  }

  const doc = await firestore.doc(FirestoreCollections.expese(groupId, expenseId)).delete();
  return doc;
};

const expenseToFirestore = async (firestore: Firestore, model: Expense) => {
  return {
    name: model.name,
    type: model.type,
    date: Timestamp.fromDate(new Date(model.date)),
    value: model.value,
    labelRef: firestore.doc(FirestoreCollections.label(model.groupId, model.label?.id))
  };
};
