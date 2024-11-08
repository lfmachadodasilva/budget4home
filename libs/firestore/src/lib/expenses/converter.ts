import { Timestamp } from '@b4h/firebase-admin';
import { ExpenseModel } from '@b4h/models';
import { B4hFirestoreConverter } from '../converter';

export class ExpenseConverter implements B4hFirestoreConverter<ExpenseModel> {
  toFirestore(modelObject: ExpenseModel): FirebaseFirestore.DocumentData {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...model } = modelObject;

    console.log('ExpenseConverter.toFirestore', {
      modelObject,
      model,
      final: {
        ...model,
        value: model.value,
        createdAt: Timestamp.fromDate(new Date(model.createdAt)),
        updatedAt: Timestamp.fromDate(new Date(model.updatedAt)),
        date: Timestamp.fromDate(new Date(model.date))
      }
    });
    return {
      ...model,
      value: model.value,
      createdAt: Timestamp.fromDate(new Date(model.createdAt)),
      updatedAt: Timestamp.fromDate(new Date(model.updatedAt)),
      date: Timestamp.fromDate(new Date(model.date))
    };
  }
  fromFirestore(
    snapshot: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
  ): ExpenseModel {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { labelRef, parentRef, ...data } = snapshot.data() as any;

    return {
      ...data,
      createdAt: data.createdAt && new Date(data.createdAt.toDate()),
      updatedAt: data.updatedAt && new Date(data.updatedAt.toDate()),
      date: data.date && new Date(data.date.toDate()),
      label: labelRef?.id ?? data.label?.id ?? data.label,
      parent: parentRef?.id ?? data.parent?.id ?? data.parent,
      id: snapshot.id
    } as ExpenseModel;
  }
}

export const expenseConverter = new ExpenseConverter();
