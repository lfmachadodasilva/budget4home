import { Expense } from '@budget4home/models';
import { Firestore } from './base';

export class ExpenseFirestore implements Firestore<Expense> {
  getAll(
    userId: string,
    groupId: string,
    from: Date,
    to: Date
  ): Promise<Expense[]> {
    throw new Error('Method not implemented.');
  }

  get(userId: string, groupId: string, id: string): Promise<Expense> {
    throw new Error('Method not implemented.');
  }

  addOrUpdate(
    userId: string,
    groupId: string,
    expense: Expense
  ): Promise<Expense> {
    throw new Error('Method not implemented.');
  }

  delete(userId: string, groupId: string, id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
