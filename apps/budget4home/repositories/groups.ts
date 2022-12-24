
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

export const getGroup = (firestore: Firestore, userId: string) => {
  return 'test repository';
};

export const addGroup = (firestore: Firestore, userId: string) => {
  return 'test repository';
};

export const updateGroup = (firestore: Firestore, userId: string) => {
  return 'test repository';
};

export const deleteGroup = (firestore: Firestore, userId: string) => {
  return 'test repository';
};

