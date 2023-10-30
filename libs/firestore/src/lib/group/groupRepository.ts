import { GroupModel } from '@budget4home/models';
import { Firestore } from 'firebase-admin/firestore';
import { FirestoreCollections } from '../collections';
import { groupConverter } from './groupConverter';

export const getAllGroups = async (
  firestore: Firestore,
  userId: string,
  groupId: string
): Promise<GroupModel[]> => {
  const docs = await firestore
    .collection(FirestoreCollections.expeses(groupId))
    .orderBy('name', 'desc')
    .withConverter(groupConverter)
    .get();

  return docs.docs.map(doc => doc.data());
};
