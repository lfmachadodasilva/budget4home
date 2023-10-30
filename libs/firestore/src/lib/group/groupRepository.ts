import { Firestore } from 'firebase-admin/firestore';
import { v4 } from 'uuid';

import { GroupModel } from '@budget4home/models';

import { FirestoreCollections } from '../collections';
import { groupConverter } from './groupConverter';

export const getAllGroups = async (firestore: Firestore, userId: string): Promise<GroupModel[]> => {
  const docs = await firestore
    .collection(FirestoreCollections.groups)
    .where('userIds', 'array-contains', userId)
    .orderBy('name', 'desc')
    .withConverter(groupConverter)
    .get();

  return docs.docs.map(doc => doc.data());
};

export const getGroup = async (
  firestore: Firestore,
  userId: string,
  groupId: string
): Promise<GroupModel | undefined | null> => {
  const doc = await firestore
    .doc(FirestoreCollections.group(groupId))
    .withConverter(groupConverter)
    .get();
  const group = doc.data();

  return group?.userIds.includes(userId) ? group : null;
};

export const addOrUpdateGroup = async (
  firestore: Firestore,
  group: Partial<GroupModel>,
  userId: string
): Promise<Partial<GroupModel> | null | undefined> => {
  if (!group.userIds?.includes(userId)) {
    return null;
  }

  group.id = group.id ?? v4();

  const docRef = firestore.doc(FirestoreCollections.group(group.id)).withConverter(groupConverter);

  const now = new Date();
  const doc = await docRef.get();

  if (!doc.exists) {
    group.createdAt = now;
    group.createdBy = userId;
  } else if (!doc.data()?.userIds.includes(userId)) {
    return null;
  }
  group.updatedAt = now;
  group.updatedBy = userId;

  await docRef.set(group as GroupModel);
  return group;
};

export const deleteGroup = async (
  firestore: Firestore,
  userId: string,
  groupId: string
): Promise<void> => {
  if (!(await getGroup(firestore, userId, groupId))) {
    return;
  }

  const docRef = firestore.doc(FirestoreCollections.group(groupId));
  await docRef.delete();

  // TODO delete all labels
};
