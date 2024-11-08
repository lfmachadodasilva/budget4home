import { getFirebaseAdminFirestore } from '@b4h/firebase-admin';
import { ExpenseModel } from '@b4h/models';
import { tryGroupIsValidFirestore } from '../groups/validateGroup';
import { FirestorePath } from '../path';
import { expenseConverter } from './converter';

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
