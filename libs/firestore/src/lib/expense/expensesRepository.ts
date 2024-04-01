import { firebaseAdminFirestore } from '@budget4home/firebase';
import { ExpenseModel } from '@budget4home/models';
import { FirestoreCollections } from '../collections';
import { expenseConverter } from './expenseConverter';

export const getExpenses = async (
  groupId: string,
  userId: string,
  from: Date,
  to: Date
): Promise<ExpenseModel[]> => {
  const docs = await firebaseAdminFirestore
    .collection(FirestoreCollections.expeses(groupId))
    .where('date', '>=', new Date(from))
    .where('date', '<', new Date(to))
    .orderBy('date', 'desc')
    .withConverter(expenseConverter)
    .get();

  return docs.docs.map(doc => doc.data());
};
