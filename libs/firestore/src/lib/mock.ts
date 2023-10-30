import { ExpenseModel, GroupModel } from '@budget4home/models';
import { RulesTestEnvironment, initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { EXPENSE, GROUP, USER } from './contants';

// Helper function to set up the test db instance
export async function getMockFirebase(): Promise<RulesTestEnvironment> {
  const app = await initializeTestEnvironment({
    projectId: 'test-project',
    firestore: { host: 'localhost', port: 8080 }
  });
  return app;
}

export const mockExpense: ExpenseModel = {
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

export const mockGroup: GroupModel = {
  id: GROUP,

  name: 'Group 1',
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: USER,
  updatedBy: USER,

  userIds: [USER]
};
