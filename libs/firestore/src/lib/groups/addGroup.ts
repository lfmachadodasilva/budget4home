import { getFirebaseAdminFirestore } from '@b4h/firebase-admin';
import { GroupModel } from '@b4h/models';
import { FirestorePath } from '../path';
import { groupConverter } from './converter';

export const addGroupFirestore = async (userId: string, group: Partial<GroupModel>) => {
  const groupToAdd = {
    ...group,
    createdAt: new Date(),
    createdBy: userId,
    updatedAt: new Date(),
    updatedBy: userId
  } as GroupModel;
  const col = await getFirebaseAdminFirestore()
    .collection(FirestorePath.groups)
    .withConverter(groupConverter)
    .add(groupToAdd);
  return (await col.get()).data();
};
