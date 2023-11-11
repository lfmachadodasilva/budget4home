import { addMinutes, addMonths, addYears } from 'date-fns';

import { RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { Firestore } from 'firebase-admin/firestore';
import { FirestoreCollections } from '../collections';
import { EXPENSE, GROUP, ID_MATCH, USER1, USER2 } from '../contants';
import { groupConverter } from '../group/groupConverter';
import { getMockFirebase, mockExpense, mockGroup } from '../mock';
import { expenseConverter } from './expenseConverter';
import {
  addOrUpdateExpense,
  deleteExpense,
  deleteExpenseByLabel,
  getAllExpenses,
  getExpense
} from './expenseRepository';

describe('expense repository', () => {
  let firebaseMock: RulesTestEnvironment;
  let firestoreMock: Firestore;

  beforeAll(async () => {
    firebaseMock = await getMockFirebase('expenses-tests');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    firestoreMock = firebaseMock.unauthenticatedContext().firestore() as any;

    await Promise.all([
      firestoreMock
        .doc(FirestoreCollections.group(mockGroup.id))
        .withConverter(groupConverter)
        .set(mockGroup),
      firestoreMock
        .doc(FirestoreCollections.expese(GROUP, mockExpense.id))
        .withConverter(expenseConverter)
        .set(mockExpense),
      firestoreMock
        .doc(FirestoreCollections.expese(GROUP, 'expense3'))
        .withConverter(expenseConverter)
        .set({ ...mockExpense, id: 'expense3', date: addMonths(new Date(), -1) }),
      firestoreMock
        .doc(FirestoreCollections.expese(GROUP, 'expense4'))
        .withConverter(expenseConverter)
        .set({ ...mockExpense, id: 'expense4', date: addMonths(new Date(), 1) })
    ]);
  });
  afterAll(async () => {
    firebaseMock.clearFirestore();
  });

  beforeEach(async () => {
    // empty
  });
  afterEach(async () => {
    // empty
  });

  describe('get all expenses', () => {
    test('success', async () => {
      // arrange
      // act
      const models = await getAllExpenses(
        firestoreMock,
        GROUP,
        USER1,
        addMinutes(new Date(), -1),
        addMinutes(new Date(), 1)
      );

      // assert
      expect(models).toHaveLength(1);
    });

    test('with invalid user', async () => {
      // arrange
      // act
      const models = await getAllExpenses(
        firestoreMock,
        GROUP,
        USER1 + 'invalid',
        addMinutes(new Date(), -1),
        addMinutes(new Date(), 1)
      );

      // assert
      expect(models).toHaveLength(0);
    });

    test('with invalid group', async () => {
      // arrange
      // act
      const models = await getAllExpenses(
        firestoreMock,
        GROUP + 'invalid',
        USER1,
        addMinutes(new Date(), -1),
        addMinutes(new Date(), 1)
      );

      // assert
      expect(models).toHaveLength(0);
    });
  });

  test('get expense by id', async () => {
    // arrange
    // act
    const model = await getExpense(firestoreMock, EXPENSE, GROUP, USER1);

    // assert
    expect(model).toBeDefined();
    expect(model?.id).toBe(EXPENSE);
  });

  test('add expense', async () => {
    // arrange
    // act
    const modelAdd = await addOrUpdateExpense(
      firestoreMock,
      { ...mockExpense, date: addYears(new Date(), 1), id: undefined },
      GROUP,
      USER1
    );

    // assert
    expect(modelAdd).toBeDefined();

    const docRef = await firestoreMock
      .doc(FirestoreCollections.expese(GROUP, modelAdd?.id ?? ''))
      .withConverter(expenseConverter)
      .get();
    expect(docRef.exists).toBeTruthy();

    const doc = docRef.data();
    expect(doc?.id).toMatch(ID_MATCH);
    expect(doc?.createdAt).toEqual(doc?.updatedAt);
    expect(doc?.createdBy).toEqual(USER1);
    expect(doc?.updatedBy).toEqual(USER1);
  });

  test('update expense', async () => {
    // arrange
    // act
    const modelUpdate = await addOrUpdateExpense(
      firestoreMock,
      { ...mockExpense, name: 'Expense name updated', date: new Date() },
      GROUP,
      USER2
    );

    // assert
    expect(modelUpdate).toBeDefined();

    const docRef = await firestoreMock
      .doc(FirestoreCollections.expese(GROUP, mockExpense.id))
      .withConverter(expenseConverter)
      .get();
    expect(docRef.exists).toBeTruthy();

    const doc = docRef.data();
    expect(doc?.name).toBe('Expense name updated');

    expect(doc?.createdAt).not.toEqual(doc?.updatedAt);
    expect(doc?.createdBy).toEqual(USER1);
    expect(doc?.updatedBy).toEqual(USER2);
  });

  describe('delete expense', () => {
    test('success', async () => {
      // arrange
      await firestoreMock
        .doc(FirestoreCollections.expese(GROUP, 'expenseToDelete'))
        .withConverter(expenseConverter)
        .set({ ...mockExpense, id: 'expenseToDelete' });

      // act
      await deleteExpense(firestoreMock, 'expenseToDelete', GROUP, USER1);

      // assert
      const docRef = await firestoreMock
        .doc(FirestoreCollections.expese(GROUP, 'expenseToDelete'))
        .withConverter(expenseConverter)
        .get();
      expect(docRef.exists).toBeFalsy();
    });

    test('success by label', async () => {
      // arrange
      const labelId = 'labelToDelete';
      Promise.all([
        await firestoreMock
          .doc(FirestoreCollections.expese(GROUP, 'expenseToDelete1'))
          .withConverter(expenseConverter)
          .set({ ...mockExpense, id: 'expenseToDelete1', labelId: labelId }),
        await firestoreMock
          .doc(FirestoreCollections.expese(GROUP, 'expenseToDelete2'))
          .withConverter(expenseConverter)
          .set({ ...mockExpense, id: 'expenseToDelete2', labelId: labelId }),
        await firestoreMock
          .doc(FirestoreCollections.expese(GROUP, 'expenseToDelete2'))
          .withConverter(expenseConverter)
          .set({ ...mockExpense, id: 'expenseToDelete2', labelId: labelId })
      ]);

      // act
      await deleteExpenseByLabel(firestoreMock, labelId, GROUP, USER1);

      // assert
      const docs = await firestoreMock
        .collection(FirestoreCollections.expeses(GROUP))
        .where('labelId', '==', labelId)
        .get();
      expect(docs.docs).toHaveLength(0);
    });

    test('with invalid user', async () => {
      // arrange
      const id = 'expenseToDeleteInvalidUser';
      await firestoreMock
        .doc(FirestoreCollections.expese(GROUP, id))
        .withConverter(expenseConverter)
        .set({ ...mockExpense, id: id });

      // act
      await deleteExpense(firestoreMock, id, GROUP, USER1 + 'invalid');

      // assert
      const docRef = await firestoreMock
        .doc(FirestoreCollections.expese(GROUP, id))
        .withConverter(expenseConverter)
        .get();
      expect(docRef.exists).toBeTruthy();
    });

    test('with invalid group', async () => {
      // arrange
      const id = 'expenseToDeleteInvalidGroup';
      await firestoreMock
        .doc(FirestoreCollections.expese(GROUP, id))
        .withConverter(expenseConverter)
        .set({ ...mockExpense, id: id });

      // act
      await deleteExpense(firestoreMock, id, GROUP, USER1 + 'invalid');

      // assert
      const docRef = await firestoreMock
        .doc(FirestoreCollections.expese(GROUP, id))
        .withConverter(expenseConverter)
        .get();
      expect(docRef.exists).toBeTruthy();
    });
  });
});
