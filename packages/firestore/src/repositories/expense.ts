import { addMonths, startOfMonth } from 'date-fns';
import { Timestamp } from 'firebase-admin/firestore';

import { firebaseAdminFirestore } from '@budget4home/firebase';
import { FirestoreCollections } from './collections';
import { ExpenseEntity, LabelEntity } from '../entities';
import { getAddFirebaseData, getUpdateFirebaseData } from './utils';

export const getAllExpenses = async (userId: string, groupId: string): Promise<ExpenseEntity[]> => {
  const col = await firebaseAdminFirestore
    .collection(FirestoreCollections.expeses(groupId))
    .orderBy('date', 'desc')
    .get();

  return await Promise.all(
    col.docs.map(async doc => {
      return await expenseToModel(doc, groupId);
    })
  );
};

export const getThisMonthExpenses = async (
  userId: string,
  groupId: string,
  date?: Date,
  labels?: LabelEntity[]
) => {
  const now = date ?? new Date();
  const from = startOfMonth(now);
  const to = addMonths(from, 1);

  return getByDateRangeExpenses(userId, groupId, from, to, labels);
};

export const getByDateRangeExpenses = async (
  userId: string,
  groupId: string,
  from: Date,
  to: Date,
  labels?: LabelEntity[]
): Promise<ExpenseEntity[]> => {
  const col = await firebaseAdminFirestore
    .collection(FirestoreCollections.expeses(groupId))
    .where('date', '>=', Timestamp.fromDate(from))
    .where('date', '<', Timestamp.fromDate(to))
    .orderBy('date', 'desc')
    .get();

  return await Promise.all(
    col.docs.map(async doc => {
      return await expenseToModel(doc, groupId, labels);
    })
  );
};

export const getExpense = async (userId: string, groupId: string, expenseId: string) => {
  const doc = await firebaseAdminFirestore
    .doc(FirestoreCollections.expese(groupId, expenseId))
    .get();
  const data = doc.data();

  if (!data) {
    return null;
  }

  return await expenseToModel(doc, groupId, null, true, true);
};

export const addExpense = async (userId: string, groupId: string, expense: ExpenseEntity) => {
  const obj = await expenseToFirestore(userId, groupId, expense);
  const col = await firebaseAdminFirestore.collection(FirestoreCollections.expeses(groupId)).add({
    ...obj,
    ...getAddFirebaseData(expense, userId)
  });

  return {
    ...expense,
    id: col.id,
    groupId: groupId
  } as ExpenseEntity;
};

export const editExpense = async (userId: string, groupId: string, expense: ExpenseEntity) => {
  const obj = await expenseToFirestore(userId, groupId, expense);
  const doc = await firebaseAdminFirestore
    .doc(FirestoreCollections.expese(groupId, expense.id))
    .set(
      {
        ...obj,
        ...getUpdateFirebaseData(expense, userId)
      },
      { merge: true }
    );

  return {
    ...expense,
    groupId: groupId
  } as ExpenseEntity;
};

export const editByParentExpense = async (
  userId: string,
  groupId: string,
  parentId: string,
  expense: ExpenseEntity
) => {
  const col = await firebaseAdminFirestore
    .collection(FirestoreCollections.expeses(groupId))
    .where(
      'parentRef',
      '==',
      firebaseAdminFirestore.doc(FirestoreCollections.expese(groupId, parentId))
    )
    .get();

  const ids = [...col.docs.map(x => x.id), parentId];

  for (let i = 0; i < ids.length; i++) {
    const data = {
      name: expense.name,
      type: expense.type,
      value: expense.value,
      labelRef: expense.label?.id
        ? firebaseAdminFirestore.doc(FirestoreCollections.label(groupId, expense.label?.id))
        : null,
      comments: expense.comments,
      ...getUpdateFirebaseData(expense, userId)
    };

    await firebaseAdminFirestore
      .doc(FirestoreCollections.expese(groupId, ids[i]))
      .set(data, { merge: true });
  }

  return Promise.resolve();
};

export const deleteExpense = async (userId: string, groupId: string, expenseId: string) => {
  const doc = await firebaseAdminFirestore
    .doc(FirestoreCollections.expese(groupId, expenseId))
    .delete();
  return Promise.resolve();
};

export const deleteByLabel = async (userId: string, groupId: string, labelId: string) => {
  const col = await firebaseAdminFirestore
    .collection(FirestoreCollections.expeses(groupId))
    .where(
      'labelRef',
      '==',
      firebaseAdminFirestore.doc(FirestoreCollections.label(groupId, labelId))
    )
    .get();

  await Promise.all(col.docs.map(x => x.ref.delete()));

  return Promise.resolve();
};

export const deleteByParent = async (userId: string, groupId: string, parentId: string) => {
  const col = await firebaseAdminFirestore
    .collection(FirestoreCollections.expeses(groupId))
    .where(
      'parentRef',
      '==',
      firebaseAdminFirestore.doc(FirestoreCollections.expese(groupId, parentId))
    )
    .get();

  await Promise.all([
    // delete all children
    ...col.docs.map(x => x.ref.delete()),
    // delete the parent
    deleteExpense(userId, groupId, parentId)
  ]);

  return Promise.resolve();
};

const expenseToModel = async (
  doc: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>,
  groupId: string,
  labels?: LabelEntity[] | null,
  loadLabel: boolean = false,
  loadParent: boolean = false
): Promise<ExpenseEntity> => {
  const data = doc.data();

  if (!data) {
    throw new Error('Expense not found in the database');
  }

  // fetch from labels params
  let labelRef: LabelEntity | null | undefined = null;
  if (labels && labels.length > 0) {
    const labelId = data.labelRef.id;
    labelRef = labels.find(x => x.id === labelId);
  }

  // if didn't fetch from labels params, fetch from firebase
  if (!labelRef && loadLabel === true && data.labelRef) {
    const labelDoc = await data.labelRef.get();
    const labelData = labelDoc.data();
    labelRef = {
      id: labelDoc.id,
      name: labelData.name,
      icon: labelData.icon
    } as LabelEntity;
  }

  if (!labelRef) {
    labelRef = {
      id: data.labelRef.id
    } as LabelEntity;
  }

  let parentRef: ExpenseEntity | null | undefined = null;
  if (loadParent === true && data.parentRef) {
    const parentData = await data.parentRef.get();
    parentRef = await expenseToModel(parentData, groupId, null, false, false);
  } else if (data.parentRef) {
    parentRef = {
      id: data.parentRef.id
    } as ExpenseEntity;
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
  } as ExpenseEntity;
};

const expenseToFirestore = async (userId: string, groupId: string, model: ExpenseEntity) => {
  return {
    name: model.name.trim(),
    type: model.type,
    date: Timestamp.fromDate(new Date(model.date)),
    value: +model.value,
    comments: model?.comments?.trim(),
    labelRef: model.label?.id
      ? firebaseAdminFirestore.doc(FirestoreCollections.label(groupId, model.label.id))
      : null,
    parentRef: model.parent?.id
      ? firebaseAdminFirestore.doc(FirestoreCollections.expese(groupId, model.parent.id))
      : null,
    scheduled: model.scheduled ?? null
  };
};
