import { getFirebaseAdminFirestore } from '@b4h/firebase-admin';
import { LabelModel } from '@b4h/models';
import { B4hFirestoreConverter } from '../converter';
import { deleteExpensesByLabelFirebase } from '../expenses';
import { tryGroupIsValidFirestore } from '../groups';
import { FirestorePath } from '../path';

const labelConverter = new B4hFirestoreConverter<LabelModel>();

export const getLabelsFirestore = async (userId: string, groupId: string) => {
  await tryGroupIsValidFirestore(userId, groupId);

  const docs = await getFirebaseAdminFirestore()
    .collection(FirestorePath.labels(groupId))
    .orderBy('name', 'asc')
    .withConverter(labelConverter)
    .get();

  return docs.docs.map(doc => doc.data());
};

export const getLabelFirestore = async (
  userId: string,
  groupId: string,
  labelId: string
): Promise<LabelModel | undefined | null> => {
  await tryGroupIsValidFirestore(userId, groupId);

  const doc = await getFirebaseAdminFirestore()
    .doc(FirestorePath.label(groupId, labelId))
    .withConverter(labelConverter)
    .get();

  return doc.data();
};

export const addLabelFirestore = async (
  userId: string,
  groupId: string,
  label: Partial<LabelModel>
) => {
  await tryGroupIsValidFirestore(userId, groupId);

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

export const updateLabelFirestore = async (
  userId: string,
  groupId: string,
  label: Partial<LabelModel>
) => {
  await tryGroupIsValidFirestore(userId, groupId);

  const labelToUpdate = {
    ...label,
    updatedAt: new Date(),
    updatedBy: userId
  } as LabelModel;

  const doc = getFirebaseAdminFirestore().doc(FirestorePath.label(groupId, label.id as string));
  await doc.set(labelToUpdate, { merge: true });

  return labelToUpdate;
};

export const updateLabelsFirebase = async (
  userId: string,
  groupId: string,
  labels: Partial<LabelModel>[]
) => {
  await tryGroupIsValidFirestore(userId, groupId);

  const batch = getFirebaseAdminFirestore().batch();

  labels.forEach(label => {
    const toUpdate = {
      ...label,
      updatedAt: new Date(),
      updatedBy: userId
    } as LabelModel;

    const doc = getFirebaseAdminFirestore()
      .doc(FirestorePath.label(groupId, label.id as string))
      .withConverter(labelConverter);
    batch.set(doc, toUpdate, { merge: true });
  });

  await batch.commit();
};

export const deleteLabelFirestore = async (userId: string, groupId: string, labelId: string) => {
  await tryGroupIsValidFirestore(userId, groupId);
  await Promise.all([
    getFirebaseAdminFirestore().doc(FirestorePath.label(groupId, labelId)).delete(),
    deleteExpensesByLabelFirebase(userId, groupId, labelId)
  ]);
};
