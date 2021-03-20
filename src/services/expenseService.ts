import { ExpenseManageModel, ExpenseModel } from '../models/expenseModel';
import { DELETE, GET, POST, PUT } from './baseService';

export const getAllExpenses = async (group: number, month: number, year: number): Promise<ExpenseModel[]> => {
  return GET<ExpenseModel[]>('/api/expense', { group, month, year });
};

export const getAllExpensesByGroup = async (group: number): Promise<ExpenseModel[]> => {
  return GET<ExpenseModel[]>('/api/expense', { group });
};

export const getExpense = async (id: number): Promise<ExpenseModel> => {
  return GET<ExpenseModel>('/api/expense/' + id);
};

export const addExpense = async (group: number, expense: ExpenseManageModel): Promise<number> => {
  return POST<number>(
    '/api/expense',
    {},
    {
      groupId: group,
      labelId: expense.labelId,
      name: expense.name,
      type: expense.type,
      value: expense.value,
      date: expense.date,
      comments: expense.comments,
      schedule: expense.schedule
    }
  );
};

export const editExpense = async (group: number, expense: ExpenseManageModel): Promise<number> => {
  return PUT<number>(
    '/api/expense',
    {},
    {
      id: expense.id,
      groupId: group,
      labelId: expense.labelId,
      name: expense.name,
      type: expense.type,
      value: expense.value,
      date: expense.date,
      comments: expense.comments,
      schedule: expense.schedule
    }
  );
};

export const deleteExpense = async (id: number): Promise<number> => {
  return DELETE<number>('/api/expense/' + id);
};
