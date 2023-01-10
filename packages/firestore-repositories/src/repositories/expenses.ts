import { Expense, IExpenseRepository, IGroupRepository, Label } from '@budget4home/base';
import { addMonths, startOfMonth } from 'date-fns';
import { Firestore, Timestamp } from 'firebase-admin/firestore';
import { FirestoreCollections } from './collections';

export class ExpenseRepository implements IExpenseRepository {
  constructor(private firestore: Firestore, private groupRepository: IGroupRepository) {}

  getAll = async (userId: string, groupId: string): Promise<Expense[]> => {
    if (await this.groupRepository.isInvalidGroup(userId, groupId)) {
      // TODO throw ex
      return null;
    }

    const col = await this.firestore
      .collection(FirestoreCollections.expeses(groupId))
      .orderBy('date', 'desc')
      .get();

    return await Promise.all(
      col.docs.map(async doc => {
        return await this.expenseToModel(doc);
      })
    );
  };

  getThisMonth = async (userId: string, groupId: string, date?: Date) => {
    if (await this.groupRepository.isInvalidGroup(userId, groupId)) {
      // TODO throw ex
      return null;
    }

    const now = date ?? new Date();
    const startDay = startOfMonth(now);
    const endDay = addMonths(startDay, 1);

    const col = await this.firestore
      .collection(FirestoreCollections.expeses(groupId))
      .where('date', '>=', Timestamp.fromDate(startDay))
      .where('date', '<', Timestamp.fromDate(endDay))
      .orderBy('date', 'desc')
      .get();

    return await Promise.all(
      col.docs.map(async doc => {
        return await this.expenseToModel(doc);
      })
    );
  };

  get = async (userId: string, groupId: string, expenseId: string) => {
    if (await this.groupRepository.isInvalidGroup(userId, groupId)) {
      // TODO throw ex
      return null;
    }

    const doc = await this.firestore.doc(FirestoreCollections.expese(groupId, expenseId)).get();
    const data = doc.data();

    if (!data) {
      return null;
    }

    return await this.expenseToModel(doc);
  };

  add = async (userId: string, groupId: string, expense: Partial<Expense>) => {
    if (await this.groupRepository.isInvalidGroup(userId, groupId)) {
      // TODO throw ex
      return null;
    }

    const obj = await this.expenseToFirestore(userId, expense as Expense);
    const col = await this.firestore.collection(FirestoreCollections.expeses(groupId)).add(obj);

    return {
      ...expense,
      id: col.id,
      groupId: groupId
    } as Expense;
  };

  edit = async (userId: string, groupId: string, expense: Partial<Expense>) => {
    if (await this.groupRepository.isInvalidGroup(userId, groupId)) {
      // TODO throw ex
      return null;
    }

    const obj = await this.expenseToFirestore(userId, expense as Expense);
    const doc = await this.firestore
      .doc(FirestoreCollections.expese(groupId, expense.id))
      .set(obj, { merge: true });

    return {
      ...expense,
      groupId: groupId
    } as Expense;
  };

  delete = async (userId: string, groupId: string, expenseId: string) => {
    if (await this.groupRepository.isInvalidGroup(userId, groupId)) {
      // TODO throw ex
      return null;
    }

    const doc = await this.firestore.doc(FirestoreCollections.expese(groupId, expenseId)).delete();

    return Promise.resolve();
  };

  deleteByLabel = async (userId: string, groupId: string, labelId: string) => {
    if (await this.groupRepository.isInvalidGroup(userId, groupId)) {
      // TODO throw ex
      return null;
    }

    const col = await this.firestore
      .collection(FirestoreCollections.expeses(groupId))
      .where('labelRef', '==', this.firestore.doc(FirestoreCollections.label(groupId, labelId)))
      .get();

    await Promise.all(col.docs.map(x => x.ref.delete()));

    return Promise.resolve();
  };

  private expenseToModel = async (
    doc: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
  ): Promise<Expense> => {
    const data = doc.data();

    let labelRef: Label = null;
    if (data.labelRef) {
      const labelDoc = await data.labelRef.get();
      const labelData = labelDoc.data();
      labelRef = {
        id: labelDoc.id,
        name: labelData.name,
        icon: labelData.icon
      } as Label;
    }

    return {
      id: doc.id,
      name: data.name,
      type: data.type,
      date: new Date(data.date.toDate()).toISOString(),
      value: data.value,
      comments: data.comments,
      label: labelRef
    } as Expense;
  };

  private expenseToFirestore = async (userId: string, model: Expense) => {
    return {
      name: model.name,
      type: model.type,
      date: Timestamp.fromDate(new Date(model.date)),
      value: +model.value,
      comments: model.comments ?? null,
      labelRef: this.firestore.doc(FirestoreCollections.label(model.groupId, model.label?.id)),

      createdBy: userId,
      createdAt: Timestamp.fromDate(new Date()),
      updatedby: userId,
      updatedAt: Timestamp.fromDate(new Date())
    };
  };
}
