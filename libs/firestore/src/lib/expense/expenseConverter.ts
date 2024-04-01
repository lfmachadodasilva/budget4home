import { ExpenseModel } from '@budget4home/models';
import { FirestoreDataConverter } from 'firebase-admin/firestore';

class ExpenseConverter implements FirestoreDataConverter<ExpenseModel> {
  toFirestore(
    modelObject: FirebaseFirestore.WithFieldValue<ExpenseModel>
  ): FirebaseFirestore.DocumentData;
  toFirestore(
    modelObject: FirebaseFirestore.PartialWithFieldValue<ExpenseModel>,
    options: FirebaseFirestore.SetOptions
  ): FirebaseFirestore.DocumentData;
  toFirestore(modelObject: unknown): FirebaseFirestore.DocumentData {
    const model = modelObject as ExpenseModel;
    return {
      ...model,
    };
  }
  fromFirestore(
    snapshot: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
  ): ExpenseModel {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = snapshot.data() as any;
    return {
      ...data,
      createdAt: new Date(data.createdAt.toDate()),
      updatedAt: new Date(data.updatedAt.toDate()),
      date: new Date(data.date.toDate()),
    } as ExpenseModel;
  }
}
export const expenseConverter = new ExpenseConverter();
