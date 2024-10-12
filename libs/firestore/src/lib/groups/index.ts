import { FirestoreDataConverter, getFirebaseAdminFirestore } from '@b4h/firebase-admin';
import { GroupModel } from '@b4h/models';
import { FirestorePath } from '../path';

class GroupConverter implements FirestoreDataConverter<GroupModel> {
  toFirestore(modelObject: GroupModel): FirebaseFirestore.DocumentData {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...model } = modelObject;
    return model;
  }
  fromFirestore(
    snapshot: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
  ): GroupModel {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = snapshot.data() as any;

    return {
      ...data,
      createdAt: data.createdAt && new Date(data.createdAt.toDate()),
      updatedAt: data.updatedAt && new Date(data.updatedAt.toDate()),
      id: snapshot.id
    } as GroupModel;
  }
}
const groupConverter = new GroupConverter();

export const getGroupsFirestore = async (userId: string): Promise<GroupModel[]> => {
  const docs = await getFirebaseAdminFirestore()
    .collection(FirestorePath.groups)
    .where('userIds', 'array-contains', userId)
    .orderBy('name', 'asc')
    .withConverter(groupConverter)
    .get();

  return docs.docs.map(doc => doc.data());
};

export const getGroupFirestore = async (
  userId: string,
  groupId: string
): Promise<GroupModel | undefined | null> => {
  const doc = await getFirebaseAdminFirestore()
    .doc(FirestorePath.group(groupId))
    .withConverter(groupConverter)
    .get();

  const data = doc.data();
  return data?.userIds.includes(userId) ? data : null;
};

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

export const updateGroupFirestore = async (userId: string, group: Partial<GroupModel>) => {
  const groupToUpdate = {
    ...group,
    updatedAt: new Date(),
    updatedBy: userId
  } as GroupModel;

  await getFirebaseAdminFirestore()
    .doc(FirestorePath.group(group.id as string))
    .withConverter(groupConverter)
    .set(groupToUpdate, {
      merge: true
    });

  return groupToUpdate;
};

export const deleteGroupFirestore = async (groupId: string) => {
  await getFirebaseAdminFirestore().doc(FirestorePath.group(groupId)).delete();
};
