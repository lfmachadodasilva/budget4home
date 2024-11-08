import { getFirebaseAdminFirestore } from '@b4h/firebase-admin';
import { LabelModel } from '@b4h/models';
import { tryGroupIsValidFirestore } from '../groups/validateGroup';
import { FirestorePath } from '../path';
import { labelConverter } from './converter';

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

  const doc = getFirebaseAdminFirestore()
    .doc(FirestorePath.label(groupId, label.id as string))
    .withConverter(labelConverter);
  await doc.set(labelToUpdate, { merge: true });

  return labelToUpdate;
};
