import { getFirebaseAdminFirestore } from '@b4h/firebase-admin';
import { LabelModel } from '@b4h/models';
import { FirestorePath } from '../path';
import { labelConverter } from './labelConverter';

export const getLabels = async (groupId: string, userId: string) => {
  const docs = await getFirebaseAdminFirestore()
    .collection(FirestorePath.labels(groupId))
    .orderBy('name', 'desc')
    .withConverter(labelConverter)
    .get();

  return docs.docs.map(doc => doc.data());
};

export const getLabel = async (
  groupId: string,
  userId: string,
  labelId: string
): Promise<LabelModel[]> => {
  const docs = await getFirebaseAdminFirestore()
    .collection(FirestorePath.label(groupId, labelId))
    .orderBy('name', 'desc')
    .withConverter(labelConverter)
    .get();

  return docs.docs.map(doc => doc.data());
};

export const addLabel = async (groupId: string, label: LabelModel) => {
  label.createdAt = new Date();
  label.updatedAt = new Date();

  const obj = await getFirebaseAdminFirestore()
    .collection(FirestorePath.labels(groupId))
    .add(label);
  const doc = await obj.get();
  return doc.data();
};

export const updateLabel = async (groupId: string, labelId: string, label: LabelModel) => {
  const doc = getFirebaseAdminFirestore().doc(FirestorePath.label(groupId, labelId));
  await doc.set(label, { merge: true });
};

export const deleteLabel = async (groupId: string, labelId: string) => {
  await getFirebaseAdminFirestore().doc(FirestorePath.label(groupId, labelId)).delete();
};