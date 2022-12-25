import { Firestore } from 'firebase-admin/firestore';
import { Group } from '../modals/group';
import { FirestoreCollections } from './collections';

export const getAllGroups = async (firestore: Firestore, _userId: string): Promise<Group[]> => {
  const docs = await firestore.collection(FirestoreCollections.groups).get();

  return docs.docs.map(doc => {
    return {
      id: doc.id,
      name: doc.data().name
    } as Group;
  });
};

export const getFirstGroup = async (firestore: Firestore, userId: string): Promise<Group | null> => {
  const docs = await firestore.collection(FirestoreCollections.groups).limit(1).get();

  if (docs.docs.length === 0) {
    return null;
  }

  const doc = docs.docs[0];
  return {
    id: doc.id,
    name: doc.data().name
  } as Group;
};

export const getGroup = async (firestore: Firestore, userId: string, groupId: string): Promise<Group | null> => {
  const doc = await firestore.doc(FirestoreCollections.group(groupId)).get();
  const data = doc.data();

  if (!data) {
    return null;
  }

  return {
    id: doc.id,
    name: data.name
  } as Group;
};

export const addGroup = async (firestore: Firestore, userId: string, group: Partial<Group>) => {
  const doc = await firestore.collection(FirestoreCollections.groups).add({ name: group.name });
  // const data = doc.data();
  return {
    id: doc.id
    //  name: data.name
  } as Group;
};

export const updateGroup = async (firestore: Firestore, userId: string, group: Group) => {
  const doc = await firestore.doc(FirestoreCollections.group(group.id)).set({ name: group.name });
  return doc;
};

export const deleteGroup = async (firestore: Firestore, userId: string, groupId: string) => {
  const doc = await firestore.doc(FirestoreCollections.group(groupId)).delete();
  return doc;
};
