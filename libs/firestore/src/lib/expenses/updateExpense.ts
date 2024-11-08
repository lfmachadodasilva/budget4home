import { getFirebaseAdminFirestore } from '@b4h/firebase-admin';
import { ExpenseModel } from '@b4h/models';
import { tryGroupIsValidFirestore } from '../groups/validateGroup';
import { FirestorePath } from '../path';

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

  console.log('updateExpenseFirebase', { userId, groupId, expense, toUpdate });

  const doc = await getFirebaseAdminFirestore()
    .doc(FirestorePath.expese(groupId, expense.id as string))
    // .withConverter(expenseConverter)
    .set(toUpdate, { merge: true });

  console.log('updateExpenseFirebase', { userId, groupId, expense, doc });

  return toUpdate;
};
