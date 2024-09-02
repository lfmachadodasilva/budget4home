import { FirestoreDataConverter, WithFieldValue } from '@b4h/firebase-admin';
import { ExpenseModel } from '@b4h/models';

class ExpenseConverter implements FirestoreDataConverter<ExpenseModel> {
  toFirestore(modelObject: WithFieldValue<ExpenseModel>): FirebaseFirestore.DocumentData {
    const { id, ...model } = modelObject;
    return {
      ...model,
      value: Number(model.value) ?? 0
    };
  }
  fromFirestore(
    snapshot: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
  ): ExpenseModel {
    const { labelRef, ...data } = snapshot.data() as any;

    return {
      ...data,
      createdAt: data.createdAt && new Date(data.createdAt.toDate()),
      updatedAt: data.updatedAt && new Date(data.updatedAt.toDate()),
      date: data.date && new Date(data.date.toDate()),
      label: labelRef?.id ?? data.label?.id,
      id: snapshot.id
    } as ExpenseModel;
  }
}
export const expenseConverter = new ExpenseConverter();
