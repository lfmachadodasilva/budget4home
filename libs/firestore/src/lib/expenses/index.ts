import {
  FirestoreDataConverter,
  getFirebaseAdminFirestore,
  Timestamp,
  WithFieldValue
} from '@b4h/firebase-admin';
import { ExpenseModel } from '@b4h/models';
import { addMonths, startOfMonth } from 'date-fns';
import { tryGroupIsValidFirestore } from '../groups';
import { FirestorePath } from '../path';

class ExpenseConverter implements FirestoreDataConverter<ExpenseModel> {
  toFirestore(modelObject: WithFieldValue<ExpenseModel>): FirebaseFirestore.DocumentData {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...model } = modelObject;
    return {
      ...model,
      value: model.value
    };
  }
  fromFirestore(
    snapshot: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
  ): ExpenseModel {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { labelRef, parentRef, ...data } = snapshot.data() as any;

    return {
      ...data,
      createdAt: data.createdAt && new Date(data.createdAt.toDate()),
      updatedAt: data.updatedAt && new Date(data.updatedAt.toDate()),
      date: data.date && new Date(data.date.toDate()),
      label: labelRef?.id ?? data.label?.id ?? data.label,
      parent: parentRef?.id ?? data.parent?.id ?? data.parent,
      id: snapshot.id
    } as ExpenseModel;
  }
}
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
  const doc = getFirebaseAdminFirestore().collection(FirestorePath.expeses(groupId)).doc();

  expenses.map(expense => {
    const toAdd = {
      ...expense,
      createdAt: new Date(),
      createdBy: userId,
      updatedAt: new Date(),
      updatedBy: userId
    } as ExpenseModel;

    batch.set(doc, toAdd, { merge: true });
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

  const doc = getFirebaseAdminFirestore().doc(FirestorePath.expese(groupId, expense.id as string));
  await doc.set(toUpdate, { merge: true });

  return toUpdate;
};

export const deleteExpenseFirebase = async (userId: string, groupId: string, expenseId: string) => {
  await tryGroupIsValidFirestore(userId, groupId);
  await getFirebaseAdminFirestore().doc(FirestorePath.expese(groupId, expenseId)).delete();
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
