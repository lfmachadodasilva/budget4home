import { Expense } from "../models/expense";

export interface IExpenseRepository {
  getAll: (userId: string, groupId: string) => Promise<Expense[]>;
  getThisMonth: (
    userId: string,
    groupId: string,
    date?: Date
  ) => Promise<Expense[]>;
  get: (userId: string, groupId: string, expenseId: string) => Promise<Expense>;
  add: (
    userId: string,
    groupId: string,
    expense: Partial<Expense>
  ) => Promise<Expense>;
  edit: (
    userId: string,
    groupId: string,
    expense: Partial<Expense>
  ) => Promise<Expense>;
  delete: (userId: string, groupId: string, expenseId: string) => Promise<void>;
  deleteByLabel: (
    userId: string,
    groupId: string,
    labelId: string
  ) => Promise<void>;
}
