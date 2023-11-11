import { Firestore } from 'firebase-admin/firestore';
import { v4 } from 'uuid';

import { LabelModel } from '@budget4home/models';

import { FirestoreCollections } from '../collections';
import { deleteExpenseByLabel } from '../expense/expenseRepository';
import { getGroup } from '../group/groupRepository';
import { labelConverter } from './labelConverter';

export const getAllLabels = async (
  firestore: Firestore,
  groupId: string,
  userId: string
): Promise<LabelModel[]> => {
  if (!(await getGroup(firestore, groupId, userId))) {
    return [];
  }

  const docs = await firestore
    .collection(FirestoreCollections.labels(groupId))
    .orderBy('name', 'desc')
    .withConverter(labelConverter)
    .get();

  return docs.docs.map(doc => doc.data());
};

export const getLabel = async (
  firestore: Firestore,
  labelId: string,
  groupId: string,
  userId: string
): Promise<LabelModel | undefined | null> => {
  if (!(await getGroup(firestore, groupId, userId))) {
    return null;
  }

  const doc = await firestore
    .doc(FirestoreCollections.label(groupId, labelId))
    .withConverter(labelConverter)
    .get();
  return doc.data();
};

export const addOrUpdateLabel = async (
  firestore: Firestore,
  label: Partial<LabelModel>,
  groupId: string,
  userId: string
): Promise<Partial<LabelModel> | null | undefined> => {
  if (!(await getGroup(firestore, groupId, userId))) {
    return null;
  }

  label.id = label.id ?? v4();

  const docRef = firestore.doc(FirestoreCollections.label(groupId, label.id));

  const now = new Date();
  const doc = await docRef.get();

  if (!doc.exists) {
    label.createdAt = now;
    label.createdBy = userId;
  }
  label.updatedAt = now;
  label.updatedBy = userId;

  await docRef.set(label);
  return label;
};

export const deleteLabel = async (
  firestore: Firestore,
  labelId: string,
  groupId: string,
  userId: string
): Promise<void> => {
  if (!(await getGroup(firestore, groupId, userId))) {
    return;
  }

  const docRef = firestore.doc(FirestoreCollections.label(groupId, labelId));

  await Promise.all([docRef.delete(), deleteExpenseByLabel(firestore, labelId, groupId, userId)]);
};
