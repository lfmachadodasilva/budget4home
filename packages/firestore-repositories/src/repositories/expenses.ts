import { Expense, IExpenseRepository, IGroupRepository, Label } from '@budget4home/base';
import { addMonths, startOfMonth } from 'date-fns';
import { Firestore, Timestamp } from 'firebase-admin/firestore';
import { FirestoreCollections } from './collections';
import { getAddFirebaseData, getUpdateFirebaseData } from './util';

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
        return await this.expenseToModel(doc, groupId);
      })
    );
  };

  getThisMonth = async (userId: string, groupId: string, date?: Date, labels?: Label[]) => {
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
        return await this.expenseToModel(doc, groupId, labels);
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

    return await this.expenseToModel(doc, groupId, null, true, true);
  };

  add = async (userId: string, groupId: string, expense: Partial<Expense>) => {
    if (await this.groupRepository.isInvalidGroup(userId, groupId)) {
      // TODO throw ex
      return null;
    }

    const obj = await this.expenseToFirestore(userId, groupId, expense as Expense);
    const col = await this.firestore.collection(FirestoreCollections.expeses(groupId)).add({
      ...obj,
      ...getAddFirebaseData(expense as Expense, userId)
    });

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

    const obj = await this.expenseToFirestore(userId, groupId, expense as Expense);
    const doc = await this.firestore.doc(FirestoreCollections.expese(groupId, expense.id)).set(
      {
        ...obj,
        ...getUpdateFirebaseData(expense as Expense, userId)
      },
      { merge: true }
    );

    return {
      ...expense,
      groupId: groupId
    } as Expense;
  };

  editByParent = async (
    userId: string,
    groupId: string,
    parentId: string,
    expense: Partial<Expense>
  ) => {
    if (await this.groupRepository.isInvalidGroup(userId, groupId)) {
      // TODO throw ex
      return null;
    }

    const col = await this.firestore
      .collection(FirestoreCollections.expeses(groupId))
      .where('parentRef', '==', this.firestore.doc(FirestoreCollections.expese(groupId, parentId)))
      .get();

    const ids = [...col.docs.map(x => x.id), parentId];

    for (let i = 0; i < ids.length; i++) {
      const data = {
        name: expense.name,
        type: expense.type,
        value: expense.value,
        labelRef: this.firestore.doc(FirestoreCollections.label(groupId, expense.label?.id)),
        comments: expense.comments?.length > 0 ? expense.comments.length : null,
        ...getUpdateFirebaseData(expense as Expense, userId)
      };

      await this.firestore
        .doc(FirestoreCollections.expese(groupId, ids[i]))
        .set(data, { merge: true });
    }

    return Promise.resolve();
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

  deleteByParent = async (userId: string, groupId: string, parentId: string) => {
    if (await this.groupRepository.isInvalidGroup(userId, groupId)) {
      // TODO throw ex
      return null;
    }

    const col = await this.firestore
      .collection(FirestoreCollections.expeses(groupId))
      .where('parentRef', '==', this.firestore.doc(FirestoreCollections.expese(groupId, parentId)))
      .get();

    await Promise.all([
      // delete all children
      ...col.docs.map(x => x.ref.delete()),
      // delete the parent
      this.delete(userId, groupId, parentId)
    ]);

    return Promise.resolve();
  };

  private expenseToModel = async (
    doc: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>,
    groupId: string,
    labels?: Label[],
    loadLabel: boolean = false,
    loadParent: boolean = false
  ): Promise<Expense> => {
    const data = doc.data();

    // fetch from labels params
    let labelRef: Label = null;
    if (labels && labels.length > 0) {
      const labelId = data.labelRef.id;
      labelRef = labels.find(x => x.id === labelId);
    }

    // if didn't fetch from labels params, fetch from firebase
    if (!labelRef && loadLabel && data.labelRef) {
      const labelDoc = await data.labelRef.get();
      const labelData = labelDoc.data();
      labelRef = {
        id: labelDoc.id,
        name: labelData.name,
        icon: labelData.icon
      } as Label;
    }

    if (!labelRef) {
      labelRef = {
        id: data.labelRef.id
      } as Label;
    }

    let parentRef: Expense = null;
    if (loadParent && data.parentRef) {
      const parentData = await data.parentRef.get();
      parentRef = await this.expenseToModel(parentData, groupId, null, false, false);
    } else if (data.parentRef) {
      parentRef = {
        id: data.parentRef
      } as Expense;
    }

    return {
      id: doc.id,
      name: data.name,
      type: data.type,
      date: new Date(data.date.toDate()).toISOString(),
      value: data.value,
      comments: data.comments,
      label: labelRef,
      parent: parentRef,
      scheduled: data.scheduled
    } as Expense;
  };

  private expenseToFirestore = async (userId: string, groupId: string, model: Expense) => {
    return {
      name: model.name.trim(),
      type: model.type,
      date: Timestamp.fromDate(new Date(model.date)),
      value: +model.value,
      comments: model.comments?.length > 0 ? model.comments.trim() : null,
      labelRef: this.firestore.doc(FirestoreCollections.label(groupId, model.label?.id)),
      parentRef: model.parent?.id
        ? this.firestore.doc(FirestoreCollections.expese(groupId, model.parent?.id))
        : null,
      scheduled: model.scheduled ?? null
    };
  };
}
