import { getFirebaseAdminFirestore } from '@b4h/firebase-admin';
import { FirestorePath } from '../path';
import { tryGroupIsValidFirestore } from './validateGroup';

export const deleteGroupFirestore = async (userId: string, groupId: string) => {
  await tryGroupIsValidFirestore(userId, groupId);
  await getFirebaseAdminFirestore().doc(FirestorePath.group(groupId)).delete();
};
