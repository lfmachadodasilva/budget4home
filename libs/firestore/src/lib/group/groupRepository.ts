import { getFirebaseAdminFirestore } from '@b4h/firebase-admin';
import { GroupModel } from '@b4h/models';
import { FirestorePath } from '../path';
import { groupConverter } from './groupConverter';

export const getGroups = async (userId: string): Promise<GroupModel[]> => {
  const docs = await getFirebaseAdminFirestore()
    .collection(FirestorePath.groups)
    // .where('userIds', 'array-contains', userId)
    .orderBy('name', 'desc')
    .withConverter(groupConverter)
    .get();

  return docs.docs.map(doc => doc.data());
};

export const getGroup = async (
  userId: string,
  groupId: string
): Promise<GroupModel | undefined | null> => {
  const doc = await getFirebaseAdminFirestore()
    .doc(FirestorePath.group(groupId))
    // .where('userIds', 'array-contains', userId)
    .withConverter(groupConverter)
    .get();

  return doc.data();
};

export const addGroup = async (userId: string, group: Partial<GroupModel>) => {
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

export const updateGroup = async (userId: string, group: Partial<GroupModel>) => {
  const groupToUpdate = {
    ...group,
    updatedAt: new Date(),
    updatedBy: userId
  } as GroupModel;
  const col = await getFirebaseAdminFirestore()
    .doc(FirestorePath.group(group.id as string))
    .withConverter(groupConverter)
    .set(groupToUpdate, {
      merge: true
    });

  return groupToUpdate;
};

export const deleteGroup = async (groupId: string) => {
  await getFirebaseAdminFirestore().doc(FirestorePath.group(groupId)).delete();
};
