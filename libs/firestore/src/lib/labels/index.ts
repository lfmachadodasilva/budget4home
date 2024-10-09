import { FirestoreDataConverter } from '@b4h/firebase-admin';
import { LabelModel } from '@b4h/models';
import { getFirebaseAdminFirestore } from '@b4h/firebase-admin';
import { FirestorePath } from '../path';
import { getGroupFirestore } from '../groups';

class LabelConverter implements FirestoreDataConverter<LabelModel> {
  toFirestore(modelObject: LabelModel): FirebaseFirestore.DocumentData {
    const { id, ...model } = modelObject;
    return model;
  }
  fromFirestore(
    snapshot: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
  ): LabelModel {
    const data = snapshot.data() as any;

    return {
      ...data,
      createdAt: data.createdAt && new Date(data.createdAt.toDate()),
      updatedAt: data.updatedAt && new Date(data.updatedAt.toDate()),
      id: snapshot.id
    } as LabelModel;
  }
}
const labelConverter = new LabelConverter();

export const getLabelsFirestore = async (userId: string, groupId: string) => {
  const group = getGroupFirestore(userId, groupId);
  if (!group) {
    throw new Error('Group not found');
  }
  const docs = await getFirebaseAdminFirestore()
    .collection(FirestorePath.labels(groupId))
    .orderBy('name', 'asc')
    .withConverter(labelConverter)
    .get();

  return docs.docs.map(doc => doc.data());
};

export const getLabelFirestore = async (
  userId: string,
  groupId: string,
  labelId: string
): Promise<LabelModel | undefined | null> => {
  const group = getGroupFirestore(userId, groupId);
  if (!group) {
    throw new Error('Group not found');
  }

  const doc = await getFirebaseAdminFirestore()
    .doc(FirestorePath.label(groupId, labelId))
    .withConverter(labelConverter)
    .get();

  return doc.data();
};

export const addLabelFirestore = async (
  userId: string,
  groupId: string,
  label: Partial<LabelModel>
) => {
  const group = getGroupFirestore(userId, groupId);
  if (!group) {
    throw new Error('Group not found');
  }

  const labelToAdd = {
    ...label,
    createdAt: new Date(),
    createdBy: userId,
    updatedAt: new Date(),
    updatedBy: userId
  } as LabelModel;

  const obj = await getFirebaseAdminFirestore()
    .collection(FirestorePath.labels(groupId))
    .add(labelToAdd);
  const doc = await obj.get();
  return doc.data();
};

export const updateLabelFirestore = async (
  userId: string,
  groupId: string,
  label: Partial<LabelModel>
) => {
  const group = getGroupFirestore(userId, groupId);
  if (!group) {
    throw new Error('Group not found');
  }

  const labelToUpdate = {
    ...label,
    updatedAt: new Date(),
    updatedBy: userId
  } as LabelModel;

  const doc = getFirebaseAdminFirestore().doc(FirestorePath.label(groupId, label.id as string));
  await doc.set(labelToUpdate, { merge: true });

  return labelToUpdate;
};

export const deleteLabelFirestore = async (userId: string, groupId: string, labelId: string) => {
  const group = getGroupFirestore(userId, groupId);
  if (!group) {
    throw new Error('Group not found');
  }

  await getFirebaseAdminFirestore().doc(FirestorePath.label(groupId, labelId)).delete();
};
