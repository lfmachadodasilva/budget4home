import { addMinutes, addMonths, addYears } from 'date-fns';

import { ExpenseModel } from '@budget4home/models';
import { RulesTestEnvironment, initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { Firestore } from 'firebase-admin/firestore';
import { FirestoreCollections } from '../collections';
import { EXPENSE, GROUP, USER } from '../contants';
import { expenseConverter } from './expenseConverter';
import { addOrUpdateExpense, deleteExpense, getAllExpenses, getExpense } from './expenseRepository';

// Helper function to set up the test db instance
async function getMockFirebase(): Promise<RulesTestEnvironment> {
  const app = await initializeTestEnvironment({
    projectId: 'test-project',
    firestore: { host: 'localhost', port: 8080 }
  });
  return app;
}

const mockExpense: ExpenseModel = {
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: USER,
  updatedBy: USER,

  id: EXPENSE,
  name: 'Expense 1',
  date: new Date(),
  groupId: GROUP,
  labelId: 'label1',
  type: 'out',
  value: 10,
  parentId: null,
  scheduled: null
};

describe('expense repository', () => {
  let firebaseMock: RulesTestEnvironment;
  let firestoreMock: Firestore;

  beforeAll(async () => {
    firebaseMock = await getMockFirebase();
    firestoreMock = firebaseMock.unauthenticatedContext().firestore() as any;

    await firestoreMock
      .doc(FirestoreCollections.expese(mockExpense.groupId, mockExpense.id))
      .withConverter(expenseConverter)
      .set(mockExpense);
    await firestoreMock
      .doc(FirestoreCollections.expese(mockExpense.groupId, 'expense3'))
      .withConverter(expenseConverter)
      .set({ ...mockExpense, date: addMonths(new Date(), -1) });
    await firestoreMock
      .doc(FirestoreCollections.expese(mockExpense.groupId, 'expense4'))
      .withConverter(expenseConverter)
      .set({ ...mockExpense, date: addMonths(new Date(), 1) });
  });
  afterAll(async () => {
    firebaseMock.clearFirestore();
  });

  beforeEach(async () => {});
  afterEach(async () => {});

  test('get all expenses', async () => {
    // arrange
    // act
    const models = await getAllExpenses(
      firestoreMock,
      USER,
      GROUP,
      addMinutes(new Date(), -1),
      addMinutes(new Date(), 1)
    );

    // assert
    expect(models).toHaveLength(1);
  });

  test('get expense by id', async () => {
    // arrange
    // act
    const model = await getExpense(firestoreMock, EXPENSE, USER, mockExpense.groupId);

    // assert
    expect(model).toBeDefined();
    expect(model?.id).toBe(EXPENSE);
  });

  test('add expense', async () => {
    // arrange
    // act
    const modelAdd = await addOrUpdateExpense(
      firestoreMock,
      { ...mockExpense, date: addYears(new Date(), 1), id: 'newExpense' },
      USER,
      mockExpense.groupId
    );

    // assert
    expect(modelAdd).toBeDefined();

    var docRef = await firestoreMock
      .doc(FirestoreCollections.expese(mockExpense.groupId, 'newExpense'))
      .withConverter(expenseConverter)
      .get();
    expect(docRef.exists).toBeTruthy();

    var doc = docRef.data();
    expect(doc?.id).toMatch('newExpense');
    expect(doc?.createdAt).toEqual(doc?.updatedAt);
    expect(doc?.createdBy).toEqual(USER);
    expect(doc?.updatedBy).toEqual(USER);
  });

  test('update expense', async () => {
    // arrange
    // act
    const modelUpdate = await addOrUpdateExpense(
      firestoreMock,
      { ...mockExpense, name: 'Expense name updated', date: new Date() },
      'user2',
      mockExpense.groupId
    );

    // assert
    expect(modelUpdate).toBeDefined();

    var docRef = await firestoreMock
      .doc(FirestoreCollections.expese(mockExpense.groupId, mockExpense.id))
      .withConverter(expenseConverter)
      .get();
    expect(docRef.exists).toBeTruthy();

    var doc = docRef.data();
    expect(doc?.name).toBe('Expense name updated');

    expect(doc?.createdAt).not.toEqual(doc?.updatedAt);
    expect(doc?.createdBy).toEqual(USER);
    expect(doc?.updatedBy).toEqual('user2');
  });

  test('delete expense', async () => {
    // arrange
    await firestoreMock
      .doc(FirestoreCollections.expese(mockExpense.groupId, 'expenseToDelete'))
      .withConverter(expenseConverter)
      .set({ ...mockExpense, id: 'expenseToDelete' });

    // act
    await deleteExpense(firestoreMock, 'expenseToDelete', USER, mockExpense.groupId);

    // assert
    var docRef = await firestoreMock
      .doc(FirestoreCollections.expese(mockExpense.groupId, 'expenseToDelete'))
      .withConverter(expenseConverter)
      .get();
    expect(docRef.exists).toBeFalsy();
  });
});
