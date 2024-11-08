import { getFirebaseAdminFirestore } from '@b4h/firebase-admin';
import { deleteExpensesByLabelFirebase } from '../expenses';
import { tryGroupIsValidFirestore } from '../groups/validateGroup';
import { FirestorePath } from '../path';

export const deleteLabelFirestore = async (userId: string, groupId: string, labelId: string) => {
  await tryGroupIsValidFirestore(userId, groupId);

  await Promise.all([
    getFirebaseAdminFirestore().doc(FirestorePath.label(groupId, labelId)).delete(),
    deleteExpensesByLabelFirebase(userId, groupId, labelId)
  ]);
};
