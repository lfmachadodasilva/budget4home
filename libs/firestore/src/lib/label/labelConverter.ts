import { FirestoreDataConverter } from '@b4h/firebase-admin';
import { LabelModel } from '@b4h/models';

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
export const labelConverter = new LabelConverter();
