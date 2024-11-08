import { getFirebaseAdminFirestore } from '@b4h/firebase-admin';
import { ExpenseModel } from '@b4h/models';
import { tryGroupIsValidFirestore } from '../groups/validateGroup';
import { FirestorePath } from '../path';
import { expenseConverter } from './converter';

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
