import { FirestoreDataConverter, Timestamp } from '@b4h/firebase-admin';
import { BaseModel } from '@b4h/models';

export class B4hFirestoreConverter<T extends BaseModel> implements FirestoreDataConverter<T> {
  toFirestore(modelObject: T): FirebaseFirestore.DocumentData {
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
  ): T {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = snapshot.data() as any;

    return {
      ...data,
      createdAt: new Date(data.createdAt.toDate()),
      updatedAt: new Date(data.updatedAt.toDate()),
      id: snapshot.id
    } as T;
  }
}
