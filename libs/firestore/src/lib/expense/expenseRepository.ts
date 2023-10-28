import { ExpenseModel } from '@budget4home/models';
import { Firestore } from 'firebase-admin/firestore';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';
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
  expense: ExpenseModel,
  userId: string,
  groupId: string
): Promise<ExpenseModel> => {
  const docRef = firestore.doc(FirestoreCollections.expese(groupId, expense.id));

  await docRef.set(expense);

  return expense;
};

export const deleteExpense = (
  firestore: Firestore,
  expenseId: string,
  userId: string,
  groupId: string,
  from: Date,
  to: Date
): Promise<ExpenseModel> => {
  return Promise.resolve({} as ExpenseModel);
};

export const modelToFirestoreExpense = (model: ExpenseModel): any => {};

export const firestoreToExpense = (data: FirebaseFirestore.DocumentData): ExpenseModel => {
  return {} as ExpenseModel;
};

const postConverter = {
  toFirestore(post: ExpenseModel): DocumentData {
    return {};
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): ExpenseModel {
    const data = snapshot.data(options)!;
    return {} as ExpenseModel;
  }
};
