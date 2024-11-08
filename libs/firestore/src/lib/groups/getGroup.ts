import { getFirebaseAdminFirestore } from '@b4h/firebase-admin';
import { GroupModel } from '@b4h/models';
import { FirestorePath } from '../path';
import { groupConverter } from './converter';

export const getGroupFirestore = async (
  userId: string,
  groupId: string
): Promise<GroupModel | undefined | null> => {
  const doc = await getFirebaseAdminFirestore()
    .doc(FirestorePath.group(groupId))
    .withConverter(groupConverter)
    .get();

  const data = doc.data();
  return data?.userIds.includes(userId) ? data : null;
};
