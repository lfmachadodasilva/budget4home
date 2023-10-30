import { GroupModel } from '@budget4home/models';
import { FirestoreDataConverter } from 'firebase-admin/firestore';

class GroupConverter implements FirestoreDataConverter<GroupModel> {
  toFirestore(
    modelObject: FirebaseFirestore.WithFieldValue<GroupModel>
  ): FirebaseFirestore.DocumentData;
  toFirestore(
    modelObject: FirebaseFirestore.PartialWithFieldValue<GroupModel>,
    options: FirebaseFirestore.SetOptions
  ): FirebaseFirestore.DocumentData;
  toFirestore(modelObject: unknown): FirebaseFirestore.DocumentData {
    const model = modelObject as GroupModel;
    return model;
  }
  fromFirestore(
    snapshot: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
  ): GroupModel {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = snapshot.data() as any;
    return {
      ...data,
      createdAt: new Date(data.createdAt.toDate()),
      updatedAt: new Date(data.updatedAt.toDate())
    } as GroupModel;
  }
}
export const groupConverter = new GroupConverter();
