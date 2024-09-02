import { FirestoreDataConverter } from '@b4h/firebase-admin';
import { ExpenseModel } from '@b4h/models';

class ExpenseConverter implements FirestoreDataConverter<ExpenseModel> {
  toFirestore(
    modelObject: FirebaseFirestore.WithFieldValue<ExpenseModel>
  ): FirebaseFirestore.DocumentData;
  toFirestore(
    modelObject: FirebaseFirestore.PartialWithFieldValue<ExpenseModel>,
    options: FirebaseFirestore.SetOptions
  ): FirebaseFirestore.DocumentData;
  toFirestore(modelObject: unknown): FirebaseFirestore.DocumentData {
    const { id, ...model } = modelObject as ExpenseModel;
    return {
      ...model
    };
  }
  fromFirestore(
    snapshot: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
  ): ExpenseModel {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = snapshot.data() as any;

    return {
      ...data,
      createdAt: data.createdAt && new Date(data.createdAt.toDate()),
      updatedAt: data.updatedAt && new Date(data.updatedAt.toDate()),
      date: data.date && new Date(data.date.toDate()),
      label: data.labelRef?.id ?? data.label?.id,
      id: snapshot.id
    } as ExpenseModel;
  }
}
export const expenseConverter = new ExpenseConverter();
