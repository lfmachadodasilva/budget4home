import { ExpenseModel } from '../models/expenseModel';
import { GET } from './baseService';

export const getAllExpenses = async (group: number, month: number, year: number): Promise<ExpenseModel[]> => {
  return GET<ExpenseModel[]>('/api/expense', { group, month, year });
};
