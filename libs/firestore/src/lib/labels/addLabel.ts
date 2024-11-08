import { getFirebaseAdminFirestore } from '@b4h/firebase-admin';
import { LabelModel } from '@b4h/models';
import { tryGroupIsValidFirestore } from '../groups/validateGroup';
import { FirestorePath } from '../path';
import { labelConverter } from './converter';

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
    .withConverter(labelConverter)
    .add(labelToAdd);
  const doc = await obj.get();
  return doc.data();
};
