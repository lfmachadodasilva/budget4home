import { FieldPath } from 'firebase-admin/firestore';

import { firebaseAdminFirestore } from '@budget4home/firebase';
import { FirestoreCollections } from './collections';
import { GroupEntity } from '../entities/group';
import { getAddFirebaseData, getUpdateFirebaseData } from './utils';

export const getAllGroups = async (userId: string) => {
  const col = userId
    ? await firebaseAdminFirestore
        .collection(FirestoreCollections.groups)
        .where('userIds', 'array-contains', userId)
        .get()
    : await firebaseAdminFirestore.collection(FirestoreCollections.groups).get();

  return col.docs.map(doc => {
    const data = doc.data();

    return {
      id: doc.id,
      name: data.name,
      userIds: data.userIds
    } as GroupEntity;
  });
};

export const getFirstGroup = async (userId: string) => {
  const col = await firebaseAdminFirestore
    .collection(FirestoreCollections.groups)
    .where('userIds', 'array-contains', userId)
    .get();

  if (col.docs.length === 0) {
    return null;
  }

  const doc = col.docs[0];
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name,
    userIds: data.userIds
  } as GroupEntity;
};

export const getGroup = async (userId: string, groupId: string) => {
  const doc = await firebaseAdminFirestore.doc(FirestoreCollections.group(groupId)).get();
  const data = doc.data();

  return {
    id: doc.id,
    name: data?.name,
    userIds: data?.userIds
  } as GroupEntity;
};

export const addGroup = async (userId: string, group: GroupEntity) => {
  const col = await firebaseAdminFirestore.collection(FirestoreCollections.groups).add({
    ...group,
    ...getAddFirebaseData(group, userId)
  });

  return {
    ...group,
    id: col.id
  } as GroupEntity;
};

export const editGroup = async (userId: string, group: GroupEntity) => {
  if (await isInvalidGroup(userId, group.id)) {
    // TODO throw ex
    return null;
  }

  const doc = await firebaseAdminFirestore.doc(FirestoreCollections.group(group.id)).set(
    {
      ...group,
      ...getUpdateFirebaseData(group, userId)
    },
    { merge: true }
  );

  return {
    ...group,
    id: group.id
  } as GroupEntity;
};

export const deleteGroup = async (userId: string, groupId: string) => {
  await firebaseAdminFirestore.recursiveDelete(
    firebaseAdminFirestore.doc(FirestoreCollections.group(groupId))
  );

  return Promise.resolve();
};

const isInvalidGroup = async (userId: string, groupId: string) => {
  // TODO: add cache here
  const col = await firebaseAdminFirestore
    .collection(FirestoreCollections.groups)
    .where('userIds', 'array-contains', userId)
    .where(FieldPath.documentId(), '==', groupId)
    .count()
    .get();
  return col.data().count !== 1;
};
