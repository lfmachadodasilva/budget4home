import { getFirebaseAdminFirestore } from '@b4h/firebase-admin';
import { LabelModel } from '@b4h/models';
import { tryGroupIsValidFirestore } from '../groups/validateGroup';
import { FirestorePath } from '../path';

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

    const doc = getFirebaseAdminFirestore().doc(FirestorePath.label(groupId, label.id as string));
    // .withConverter(labelConverter);
    batch.set(doc, toUpdate, { merge: true });
  });

  await batch.commit();
};
