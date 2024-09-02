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
): Promise<LabelModel | undefined | null> => {
  const doc = await getFirebaseAdminFirestore()
    .doc(FirestorePath.label(groupId, labelId))
    .withConverter(labelConverter)
    .get();

  return doc.data();
};

export const addLabel = async (userId: string, groupId: string, label: Partial<LabelModel>) => {
  const labelToAdd = {
    ...label,
    createdAt: new Date(),
    createdBy: userId,
    updatedAt: new Date(),
    updatedBy: userId
  } as LabelModel;

  const obj = await getFirebaseAdminFirestore()
    .collection(FirestorePath.labels(groupId))
    .add(labelToAdd);
  const doc = await obj.get();
  return doc.data();
};

export const updateLabel = async (userId: string, groupId: string, label: Partial<LabelModel>) => {
  const labelToUpdate = {
    ...label,
    updatedAt: new Date(),
    updatedBy: userId
  } as LabelModel;

  const doc = getFirebaseAdminFirestore().doc(FirestorePath.label(groupId, label.id as string));
  await doc.set(labelToUpdate, { merge: true });

  return labelToUpdate;
};

export const deleteLabel = async (groupId: string, labelId: string) => {
  await getFirebaseAdminFirestore().doc(FirestorePath.label(groupId, labelId)).delete();
};
