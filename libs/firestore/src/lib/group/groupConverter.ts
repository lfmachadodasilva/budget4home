import { FirestoreDataConverter } from '@b4h/firebase-admin';
import { GroupModel } from '@b4h/models';

class GroupConverter implements FirestoreDataConverter<GroupModel> {
  toFirestore(modelObject: GroupModel): FirebaseFirestore.DocumentData {
    const { id, ...model } = modelObject;
    return model;
  }
  fromFirestore(
    snapshot: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
  ): GroupModel {
    const data = snapshot.data() as any;
    return {
      ...data,
      createdAt: data.createdAt && new Date(data.createdAt.toDate()),
      updatedAt: data.updatedAt && new Date(data.updatedAt.toDate()),
      id: snapshot.id
    } as GroupModel;
  }
}
export const groupConverter = new GroupConverter();
