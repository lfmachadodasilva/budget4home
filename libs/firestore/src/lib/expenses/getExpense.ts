import { getFirebaseAdminFirestore } from '@b4h/firebase-admin';
import { ExpenseModel } from '@b4h/models';
import { tryGroupIsValidFirestore } from '../groups/validateGroup';
import { FirestorePath } from '../path';
import { expenseConverter } from './converter';

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
