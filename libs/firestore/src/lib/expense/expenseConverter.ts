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
  toFirestore(modelObject: unknown, options?: unknown): FirebaseFirestore.DocumentData {
    const model = modelObject as ExpenseModel;
    return {
      ...model,
      createdAt: new Date(model.createdAt),
      updatedAt: new Date(model.updatedAt),
      date: new Date(model.date)
    };
  }
  fromFirestore(
    snapshot: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
  ): ExpenseModel {
    const data = snapshot.data() as any;
    return {
      ...data,
      createdAt: new Date(data.createdAt.toDate()),
      updatedAt: new Date(data.updatedAt.toDate()),
      date: new Date(data.date.toDate())
    } as ExpenseModel;
  }
}
export const expenseConverter = new ExpenseConverter();
