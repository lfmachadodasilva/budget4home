import { FirestoreDataConverter } from '@b4h/firebase-admin';
import { LabelModel } from '@b4h/models';

class LabelConverter implements FirestoreDataConverter<LabelModel> {
  toFirestore(
    modelObject: FirebaseFirestore.WithFieldValue<LabelModel>
  ): FirebaseFirestore.DocumentData;
  toFirestore(
    modelObject: FirebaseFirestore.PartialWithFieldValue<LabelModel>,
    options: FirebaseFirestore.SetOptions
  ): FirebaseFirestore.DocumentData;
  toFirestore(modelObject: unknown): FirebaseFirestore.DocumentData {
    const { id, ...model } = modelObject as LabelModel;
    return {
      ...model
    };
  }
  fromFirestore(
    snapshot: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
  ): LabelModel {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
