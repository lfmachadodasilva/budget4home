import { ExpenseModel, GroupModel, LabelModel } from '@budget4home/models';
import { RulesTestEnvironment, initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { EXPENSE, GROUP, USER1, USER2 } from './contants';

export async function getMockFirebase(
  projectId: string = 'test-project'
): Promise<RulesTestEnvironment> {
  const app = await initializeTestEnvironment({
    projectId: projectId,
    firestore: { host: '127.0.0.1', port: 8080 }
  });
  return app;
}

export const mockExpense: ExpenseModel = {
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: USER1,
  updatedBy: USER1,

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

export const mockLabel: LabelModel = {
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: USER1,
  updatedBy: USER1,

  id: EXPENSE,
  name: 'Label 1',
  groupId: GROUP
};

export const mockGroup: GroupModel = {
  id: GROUP,

  name: 'Group 1',
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: USER1,
  updatedBy: USER1,

  userIds: [USER1, USER2]
};
