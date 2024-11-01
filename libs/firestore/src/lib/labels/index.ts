import { FirestoreDataConverter, getFirebaseAdminFirestore, Timestamp } from '@b4h/firebase-admin';
import { LabelModel } from '@b4h/models';
import { deleteExpensesByLabelFirebase } from '../expenses';
import { tryGroupIsValidFirestore } from '../groups';
import { FirestorePath } from '../path';

class LabelConverter implements FirestoreDataConverter<LabelModel> {
  toFirestore(modelObject: LabelModel): FirebaseFirestore.DocumentData {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...model } = modelObject;
    return {
      ...model,
      createdAt: Timestamp.fromDate(new Date(model.createdAt)),
      updatedAt: Timestamp.fromDate(new Date(model.updatedAt))
    };
  }
  fromFirestore(
    snapshot: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
  ): LabelModel {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = snapshot.data() as any;

    return {
      ...data,
      createdAt: new Date(data.createdAt.toDate()),
      updatedAt: new Date(data.updatedAt.toDate()),
      id: snapshot.id
    } as LabelModel;
  }
}
const labelConverter = new LabelConverter();

export const getLabelsFirestore = async (userId: string, groupId: string) => {
  await tryGroupIsValidFirestore(userId, groupId);

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
  await tryGroupIsValidFirestore(userId, groupId);

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
    .add(labelToAdd);
  const doc = await obj.get();
  return doc.data();
};

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

  const doc = getFirebaseAdminFirestore().doc(FirestorePath.label(groupId, label.id as string));
  await doc.set(labelToUpdate, { merge: true });

  return labelToUpdate;
};

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

    const doc = getFirebaseAdminFirestore()
      .doc(FirestorePath.label(groupId, label.id as string))
      .withConverter(labelConverter);
    batch.set(doc, toUpdate, { merge: true });
  });

  await batch.commit();
};

export const deleteLabelFirestore = async (userId: string, groupId: string, labelId: string) => {
  await tryGroupIsValidFirestore(userId, groupId);
  await Promise.all([
    getFirebaseAdminFirestore().doc(FirestorePath.label(groupId, labelId)).delete(),
    deleteExpensesByLabelFirebase(userId, groupId, labelId)
  ]);
};
