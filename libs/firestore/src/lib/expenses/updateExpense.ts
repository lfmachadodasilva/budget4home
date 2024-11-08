import { getFirebaseAdminFirestore } from '@b4h/firebase-admin';
import { ExpenseModel } from '@b4h/models';
import { tryGroupIsValidFirestore } from '../groups/validateGroup';
import { FirestorePath } from '../path';
import { expenseConverter } from './converter';

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
