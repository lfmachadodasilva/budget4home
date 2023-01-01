import { FieldPath, Firestore } from "firebase-admin/firestore";

import { Group } from "../models/group";
import { FirestoreCollections } from "./collections";

export const getAllGroups = async (
  firestore: Firestore,
  userId: string
): Promise<Group[]> => {
  const docs = await firestore
    .collection(FirestoreCollections.groups)
    .where("userIds", "array-contains", userId)
    .get();

  return docs.docs.map((doc) => {
    return {
      id: doc.id,
      name: doc.data().name,
    } as Group;
  });
};

export const getFirstGroup = async (
  firestore: Firestore,
  userId: string
): Promise<Group | null> => {
  const docs = await firestore
    .collection(FirestoreCollections.groups)
    .where("userIds", "array-contains", userId)
    .get();

  if (docs.docs.length === 0) {
    return null;
  }

  const doc = docs.docs[0];
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name,
    userIds: data.userIds,
  } as Group;
};

export const getGroup = async (
  firestore: Firestore,
  userId: string,
  groupId: string
): Promise<Group | null> => {
  if (await isInvalidGroup(firestore, userId, groupId)) {
    // TODO throw ex
    return null;
  }

  const doc = await firestore.doc(FirestoreCollections.group(groupId)).get();
  const data = doc.data();

  return {
    id: doc.id,
    name: data.name,
    userIds: data.userIds,
  } as Group;
};

export const addGroup = async (
  firestore: Firestore,
  userId: string,
  group: Partial<Group>
) => {
  const doc = await firestore
    .collection(FirestoreCollections.groups)
    .add({ name: group.name, userIds: group.userIds });

  return {
    id: doc.id,
  } as Group;
};

export const updateGroup = async (
  firestore: Firestore,
  userId: string,
  group: Group
) => {
  if (await isInvalidGroup(firestore, userId, group.id)) {
    // TODO throw ex
    return null;
  }

  const doc = await firestore
    .doc(FirestoreCollections.group(group.id))
    .set({ name: group.name, userIds: group.userIds });

  return doc;
};

export const deleteGroup = async (
  firestore: Firestore,
  userId: string,
  groupId: string
) => {
  if (await isInvalidGroup(firestore, userId, groupId)) {
    // TODO throw ex
    return null;
  }

  const doc = await firestore.doc(FirestoreCollections.group(groupId)).delete();

  return doc;
};

export const isInvalidGroup = async (
  firestore: Firestore,
  userId: string,
  groupId: string
) => {
  const doc = await firestore
    .collection(FirestoreCollections.groups)
    .where("userIds", "array-contains", userId)
    .where(FieldPath.documentId(), "==", groupId)
    .count()
    .get();
  return doc.data().count !== 1;
};
