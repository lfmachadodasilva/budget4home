import { getFirebaseAdminFirestore, Timestamp } from '@b4h/firebase-admin';
import { ExpenseModel } from '@b4h/models';
import { addMonths, startOfMonth } from 'date-fns';
import { tryGroupIsValidFirestore } from '../groups';
import { FirestorePath } from '../path';
import { ExpenseConverter } from './converter';

const expenseConverter = new ExpenseConverter();

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

export const getExpenseFirebase = async (
  userId: string,
  groupId: string,
  labelId: string
): Promise<ExpenseModel | undefined | null> => {
  await tryGroupIsValidFirestore(userId, groupId);

  const doc = await getFirebaseAdminFirestore()
    .doc(FirestorePath.expese(groupId, labelId))
    .withConverter(expenseConverter)
    .get();

  return doc.data();
};

export const addExpenseFirebase = async (
  userId: string,
  groupId: string,
  expense: Partial<ExpenseModel>
) => {
  await tryGroupIsValidFirestore(userId, groupId);

  const toAdd = {
    ...expense,
    createdAt: new Date(),
    createdBy: userId,
    updatedAt: new Date(),
    updatedBy: userId
  } as ExpenseModel;

  const obj = await getFirebaseAdminFirestore()
    .collection(FirestorePath.expeses(groupId))
    .withConverter(expenseConverter)
    .add(toAdd);

  const doc = await obj.get();
  return doc.data();
};

export const addExpensesFirebase = async (
  userId: string,
  groupId: string,
  expenses: Partial<ExpenseModel>[]
) => {
  await tryGroupIsValidFirestore(userId, groupId);

  const batch = getFirebaseAdminFirestore().batch();

  expenses.forEach(expense => {
    const toAdd = {
      ...expense,
      createdAt: expense.createdAt ?? new Date(),
      createdBy: expense.createdBy ?? userId,
      updatedAt: new Date(),
      updatedBy: userId
    } as ExpenseModel;

    const doc = getFirebaseAdminFirestore()
      .collection(FirestorePath.expeses(groupId))
      .doc()
      .withConverter(expenseConverter);
    batch.set(doc, toAdd, { merge: true });
  });

  await batch.commit();
};

export const updateExpensesFirebase = async (
  userId: string,
  groupId: string,
  expenses: Partial<ExpenseModel>[]
) => {
  await tryGroupIsValidFirestore(userId, groupId);

  const batch = getFirebaseAdminFirestore().batch();

  expenses.forEach(expense => {
    const toUpdate = {
      ...expense,
      updatedAt: new Date(),
      updatedBy: userId
    } as ExpenseModel;

    const doc = getFirebaseAdminFirestore()
      .doc(FirestorePath.expese(groupId, expense.id as string))
      .withConverter(expenseConverter);
    batch.set(doc, toUpdate, { merge: true });
  });

  await batch.commit();
};

export const updateExpenseFirebase = async (
  userId: string,
  groupId: string,
  expense: Partial<ExpenseModel>
) => {
  await tryGroupIsValidFirestore(userId, groupId);

  const toUpdate = {
    ...expense,
    updatedAt: new Date(),
    updatedBy: userId
  } as ExpenseModel;

  const doc = getFirebaseAdminFirestore()
    .doc(FirestorePath.expese(groupId, expense.id as string))
    .withConverter(expenseConverter);
  await doc.set(toUpdate, { merge: true });

  return toUpdate;
};

export const deleteExpenseFirebase = async (userId: string, groupId: string, expenseId: string) => {
  await tryGroupIsValidFirestore(userId, groupId);
  await getFirebaseAdminFirestore().doc(FirestorePath.expese(groupId, expenseId)).delete();
};

export const deleteExpensesFirebase = async (
  userId: string,
  groupId: string,
  expenseIds: string[]
) => {
  await tryGroupIsValidFirestore(userId, groupId);

  const batch = getFirebaseAdminFirestore().batch();

  expenseIds.forEach(id => {
    if (id) {
      const doc = getFirebaseAdminFirestore().doc(FirestorePath.expese(groupId, id));
      batch.delete(doc);
    }
  });

  await batch.commit();
};

export const deleteExpensesByLabelFirebase = async (
  userId: string,
  groupId: string,
  labelId: string
) => {
  await tryGroupIsValidFirestore(userId, groupId);
  const query = getFirebaseAdminFirestore()
    .collection(FirestorePath.expeses(groupId))
    .where('label', '==', labelId)
    .withConverter(expenseConverter)
    .limit(10);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(query, resolve).catch(reject);
  });
};

async function deleteQueryBatch(
  query: FirebaseFirestore.Query<ExpenseModel, FirebaseFirestore.DocumentData>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolve: (value?: any) => void
) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = getFirebaseAdminFirestore().batch();
  snapshot.docs.forEach(doc => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(query, resolve);
  });
}
