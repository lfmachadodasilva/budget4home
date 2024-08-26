import { getFirebaseAdminFirestore } from '@b4h/firebase-admin';
import { GroupModel } from '@b4h/models';
import { FirestorePath } from '../path';
import { groupConverter } from './groupConverter';

export const getGroups = async (userId: string): Promise<GroupModel[]> => {
  const docs = await getFirebaseAdminFirestore()
    .collection(FirestorePath.groups)
    // .where('userIds', 'array-contains', userId)
    .orderBy('name', 'desc')
    .withConverter(groupConverter)
    .get();

  return docs.docs.map(doc => doc.data());
};