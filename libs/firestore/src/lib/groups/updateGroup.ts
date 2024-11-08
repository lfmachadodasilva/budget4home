import { getFirebaseAdminFirestore } from '@b4h/firebase-admin';
import { GroupModel } from '@b4h/models';
import { FirestorePath } from '../path';

export const updateGroupFirestore = async (userId: string, group: Partial<GroupModel>) => {
  const groupToUpdate = {
    ...group,
    updatedAt: new Date(),
    updatedBy: userId
  } as GroupModel;

  await getFirebaseAdminFirestore()
    .doc(FirestorePath.group(group.id as string))
    // .withConverter(groupConverter)
    .set(groupToUpdate, {
      merge: true
    });

  return groupToUpdate;
};
