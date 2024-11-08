import { getFirebaseAdminFirestore } from '@b4h/firebase-admin';
import { ExpenseModel } from '@b4h/models';
import { tryGroupIsValidFirestore } from '../groups/validateGroup';
import { FirestorePath } from '../path';
import { expenseConverter } from './converter';

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
