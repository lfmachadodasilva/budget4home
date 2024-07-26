import { getFirebaseAdminFirestore } from '@b4h/firebase';
import { LabelModel } from '@b4h/models';
import { FirestorePath } from '../path';
import { labelConverter } from './labelConverter';

export const getLabels = async (groupId: string, userId: string): Promise<LabelModel[]> => {
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
  from: Date,
  to: Date
): Promise<LabelModel[]> => {
  const docs = await getFirebaseAdminFirestore()
    .collection(FirestorePath.expeses(groupId))
    .where('date', '>=', new Date(from))
    .where('date', '<', new Date(to))
    .orderBy('date', 'desc')
    .withConverter(labelConverter)
    .get();

  return docs.docs.map(doc => doc.data());
};

export const addOrUpdateLabel = async (
  label: Partial<LabelModel>,
  groupId: string,
  userId: string
): Promise<Partial<LabelModel> | null | undefined> => {
  label.id = label.id ?? '1';

  const docRef = getFirebaseAdminFirestore().doc(FirestorePath.label(groupId, label.id ?? ''));

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
