import { getFirebaseAdminFirestore } from '@b4h/firebase-admin';
import { tryGroupIsValidFirestore } from '../groups/validateGroup';
import { FirestorePath } from '../path';
import { labelConverter } from './converter';

export const getLabelsFirestore = async (userId: string, groupId: string) => {
  await tryGroupIsValidFirestore(userId, groupId);

  const docs = await getFirebaseAdminFirestore()
    .collection(FirestorePath.labels(groupId))
    .orderBy('name', 'asc')
    .withConverter(labelConverter)
    .get();

  return docs.docs.map(doc => doc.data());
};
