import { addMinutes, addMonths, addYears } from 'date-fns';

import { ExpenseModel } from '@budget4home/models';
import { RulesTestEnvironment, initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { Firestore } from 'firebase-admin/firestore';
import { FirestoreCollections } from '../collections';
import { expenseConverter } from './expenseConverter';
import { addOrUpdateExpense, getAllExpenses, getExpense } from './expenseRepository';

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
  createdBy: 'user1',
  updateBy: 'user1',

  id: 'expense1',
  name: 'Expense 1',
  date: new Date(),
  groupId: 'group1',
  labelId: 'label1',
  type: 'out',
  value: 10,
  parentId: null,
  scheduled: null
};

describe('expenseRepository', () => {
  let firebaseMock: RulesTestEnvironment;
  let firestoreMock: Firestore;

  beforeAll(async () => {
    firebaseMock = await getMockFirebase();
    firestoreMock = firebaseMock.unauthenticatedContext().firestore() as any;
  });
  afterAll(async () => {
    firebaseMock.clearFirestore();
  });

  beforeEach(async () => {
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
  afterEach(async () => {
    // firebaseMock.clearFirestore();
  });

  test('get all expenses', async () => {
    const models = await getAllExpenses(
      firestoreMock,
      'user1',
      'group1',
      addMinutes(new Date(), -1),
      addMinutes(new Date(), 1)
    );
    expect(models).toHaveLength(1);
  });

  test('get expense by id', async () => {
    const model = await getExpense(firestoreMock, 'expense1', 'user1', 'group1');
    expect(model).toBeDefined();
    expect(model?.id).toBe('expense1');
  });

  test('add expense', async () => {
    const modelAdd = await addOrUpdateExpense(
      firestoreMock,
      { ...mockExpense, id: 'expense3', date: addYears(new Date(), 1) },
      'user1',
      'group1'
    );
    expect(modelAdd).toBeDefined();

    const modelGet = await getExpense(firestoreMock, 'expense3', 'user1', 'group1');
    expect(modelGet).toBeDefined();
    expect(modelGet?.id).toBe('expense3');
  });

  test('update expense', async () => {
    const modelUpdate = await addOrUpdateExpense(
      firestoreMock,
      { ...mockExpense, name: 'Expense 2' },
      'user1',
      'group1'
    );
    expect(modelUpdate).toBeDefined();

    const modelGet = await getExpense(firestoreMock, 'expense1', 'user1', 'group1');
    expect(modelGet).toBeDefined();
    expect(modelGet?.name).toBe('Expense 2');
  });
});
