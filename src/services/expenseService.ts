import { ExpenseModel } from '../models/expenseModel';
import { GET, POST } from './baseService';

export const getAllExpenses = async (group: number, month: number, year: number): Promise<ExpenseModel[]> => {
  return GET<ExpenseModel[]>('/api/expense', { group, month, year });
};

export const getAllExpensesByGroup = async (group: number): Promise<ExpenseModel[]> => {
  return GET<ExpenseModel[]>('/api/expense', { group });
};

export const addExpense = async (group: number, expense: ExpenseModel): Promise<number> => {
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
      schedule: expense.scheduleTotal
    }
  );
};
