import { LabelModel } from '@b4h/models';
import { getFirebaseAdminFirestore } from '../../config/firebase';
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
  from: Date,
  to: Date
): Promise<LabelModel[]> => {
  const docs = await getFirebaseAdminFirestore()
    .collection(FirestorePath.expeses(groupId))
    .orderBy('name', 'desc')
    .withConverter(labelConverter)
    .get();

  return docs.docs.map(doc => doc.data());
};
