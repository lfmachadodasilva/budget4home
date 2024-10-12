import {
  FirestoreDataConverter,
  getFirebaseAdminFirestore,
  Timestamp,
  WithFieldValue
} from '@b4h/firebase-admin';
import { ExpenseModel } from '@b4h/models';
import { addMonths, startOfMonth } from 'date-fns';
import { getGroupFirestore } from '../groups';
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
    const { labelRef, ...data } = snapshot.data() as any;

    return {
      ...data,
      createdAt: data.createdAt && new Date(data.createdAt.toDate()),
      updatedAt: data.updatedAt && new Date(data.updatedAt.toDate()),
      date: data.date && new Date(data.date.toDate()),
      label: labelRef?.id ?? data.label?.id ?? data.label,
      id: snapshot.id
    } as ExpenseModel;
  }
}
const expenseConverter = new ExpenseConverter();

export const getExpensesFirebase = async (userId: string, groupId: string, date?: Date | null) => {
  const group = getGroupFirestore(userId, groupId);
  if (!group) {
    throw new Error('Group not found');
  }

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
  groupId: string,
  userId: string,
  labelId: string
): Promise<ExpenseModel | undefined | null> => {
  const group = getGroupFirestore(userId, groupId);
  if (!group) {
    throw new Error('Group not found');
  }

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
  const group = getGroupFirestore(userId, groupId);
  if (!group) {
    throw new Error('Group not found');
  }

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

export const updateExpenseFirebase = async (
  userId: string,
  groupId: string,
  expense: Partial<ExpenseModel>
) => {
  const group = getGroupFirestore(userId, groupId);
  if (!group) {
    throw new Error('Group not found');
  }

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
  await getFirebaseAdminFirestore().doc(FirestorePath.expese(groupId, expenseId)).delete();
};
