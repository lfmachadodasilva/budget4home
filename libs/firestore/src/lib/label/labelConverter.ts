import { LabelModel } from '@budget4home/models';
import { FirestoreDataConverter } from 'firebase-admin/firestore';

class LabelConverter implements FirestoreDataConverter<LabelModel> {
  toFirestore(
    modelObject: FirebaseFirestore.WithFieldValue<LabelModel>
  ): FirebaseFirestore.DocumentData;
  toFirestore(
    modelObject: FirebaseFirestore.PartialWithFieldValue<LabelModel>,
    options: FirebaseFirestore.SetOptions
  ): FirebaseFirestore.DocumentData;
  toFirestore(modelObject: unknown): FirebaseFirestore.DocumentData {
    const model = modelObject as LabelModel;
    return model;
  }
  fromFirestore(
    snapshot: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
  ): LabelModel {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = snapshot.data() as any;
    return {
      ...data,
      createdAt: new Date(data.createdAt.toDate()),
      updatedAt: new Date(data.updatedAt.toDate())
    } as LabelModel;
  }
}
export const labelConverter = new LabelConverter();
