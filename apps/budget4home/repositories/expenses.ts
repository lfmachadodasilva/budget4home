import { Firestore, Timestamp } from 'firebase-admin/firestore';
import { Expense, expenseToModel } from '../modals/expense';
import { FirestoreCollections } from './collections';

export const getAllExpenses = async (firestore: Firestore, _userId: string, groupId: string): Promise<Expense[]> => {
  const docs = await firestore.collection(FirestoreCollections.expeses(groupId)).get();

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
  const doc = await firestore.doc(FirestoreCollections.expese(groupId, expenseId)).get();
  const data = doc.data();

  if (!data) {
    return null;
  }

  return await expenseToModel(doc);
};

export const addExpense = async (firestore: Firestore, userId: string, groupId: string, expense: Partial<Expense>) => {
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
  const obj = await expenseToFirestore(firestore, expense as Expense);
  const doc = await firestore.doc(FirestoreCollections.expese(groupId, expense.id)).set(obj);
  return doc;
};

export const deleteExpense = async (firestore: Firestore, userId: string, groupId: string, expenseId: string) => {
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
