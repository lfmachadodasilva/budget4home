import { Firestore } from 'firebase-admin/firestore';

import { Label } from '../modals/label';
import { FirestoreCollections } from './collections';
import { isInvalidGroup } from './groups';

export const getAllLabels = async (firestore: Firestore, userId: string, groupId: string): Promise<Label[]> => {
  if (await isInvalidGroup(firestore, userId, groupId)) {
    // TODO throw ex
    return null;
  }

  const docs = await firestore.collection(FirestoreCollections.labels(groupId)).get();

  return docs.docs.map(doc => {
    return {
      id: doc.id,
      name: doc.data().name
    } as Label;
  });
};

export const getLabel = async (
  firestore: Firestore,
  userId: string,
  groupId: string,
  labelId: string
): Promise<Label | null> => {
  if (await isInvalidGroup(firestore, userId, groupId)) {
    // TODO throw ex
    return null;
  }

  const doc = await firestore.doc(FirestoreCollections.label(groupId, labelId)).get();
  const data = doc.data();

  if (!data) {
    return null;
  }

  return {
    id: doc.id,
    name: data.name
  } as Label;
};

export const addLabel = async (firestore: Firestore, userId: string, groupId: string, label: Partial<Label>) => {
  if (await isInvalidGroup(firestore, userId, groupId)) {
    // TODO throw ex
    return null;
  }

  const doc = await firestore.collection(FirestoreCollections.labels(groupId)).add({ name: label.name });
  // const data = doc.data();
  return {
    id: doc.id
    //  name: data.name
  } as Label;
};

export const updateLabel = async (firestore: Firestore, userId: string, groupId: string, label: Partial<Label>) => {
  if (await isInvalidGroup(firestore, userId, groupId)) {
    // TODO throw ex
    return null;
  }

  const doc = await firestore.doc(FirestoreCollections.label(groupId, label.id)).set({ name: label.name });
  return doc;
};

export const deleteLabel = async (firestore: Firestore, userId: string, groupId: string, labelId: string) => {
  if (await isInvalidGroup(firestore, userId, groupId)) {
    // TODO throw ex
    return null;
  }

  const doc = await firestore.doc(FirestoreCollections.label(groupId, labelId)).delete();
  return doc;
};
