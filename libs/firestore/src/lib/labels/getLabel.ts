import { getFirebaseAdminFirestore } from '@b4h/firebase-admin';
import { LabelModel } from '@b4h/models';
import { tryGroupIsValidFirestore } from '../groups/validateGroup';
import { FirestorePath } from '../path';
import { labelConverter } from './converter';

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
