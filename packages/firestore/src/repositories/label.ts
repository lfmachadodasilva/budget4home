import { firebaseAdminFirestore } from '@budget4home/firebase';
import { FirestoreCollections } from './collections';
import { LabelEntity } from '../entities';
import { getAddFirebaseData } from './utils';

export const getAllLabels = async (userId: string, groupId: string) => {
  const docs = await firebaseAdminFirestore
    .collection(FirestoreCollections.labels(groupId))
    .orderBy('name', 'asc')
    .get();

  return docs.docs.map(doc => labelToModel(doc));
};

export const getLabel = async (userId: string, groupId: string, labelId: string) => {
  const doc = await firebaseAdminFirestore.doc(FirestoreCollections.label(groupId, labelId)).get();
  return labelToModel(doc);
};

export const addLabel = async (userId: string, groupId: string, label: Partial<LabelEntity>) => {
  const model = labelToFirestore(userId, label as LabelEntity);
  const doc = await firebaseAdminFirestore.collection(FirestoreCollections.labels(groupId)).add({
    ...model,
    ...getAddFirebaseData(label as LabelEntity, userId)
  });

  return {
    ...model,
    id: doc.id,
    groupId: groupId
  } as LabelEntity;
};

const labelToModel = (doc: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>) => {
  const data = doc.data();
  return {
    id: doc.id,
    name: data?.name,
    icon: data?.icon
  } as LabelEntity;
};

const labelToFirestore = (userId: string, entity: LabelEntity) => {
  return {
    name: entity.name.trim(),
    icon: entity.icon?.trim()
  } as LabelEntity;
};
