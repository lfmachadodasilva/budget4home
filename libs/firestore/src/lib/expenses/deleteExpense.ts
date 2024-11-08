import { getFirebaseAdminFirestore } from '@b4h/firebase-admin';
import { tryGroupIsValidFirestore } from '../groups/validateGroup';
import { FirestorePath } from '../path';

export const deleteExpenseFirebase = async (userId: string, groupId: string, expenseId: string) => {
  await tryGroupIsValidFirestore(userId, groupId);
  await getFirebaseAdminFirestore().doc(FirestorePath.expese(groupId, expenseId)).delete();
};
