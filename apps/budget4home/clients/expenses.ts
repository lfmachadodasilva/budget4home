import { Expense } from '@budget4home/base';
import { B4hRoutes } from '../util/routes';
import { BaseClient } from './base';

export class ExpenseClient extends BaseClient {
  private static url = B4hRoutes.api + B4hRoutes.expenses;

  static add = async (token: string, expense: Partial<Expense>) => {
    return await this.fetch<Expense>(this.url, token, 'POST', expense);
  };

  static edit = async (token: string, expense: Partial<Expense>) => {
    return this.fetch<Expense>(this.url, token, 'PUT', expense);
  };

  static delete = async (token: string, expense: Partial<Expense>) => {
    return await this.fetch<void>(this.url, token, 'DELETE', expense);
  };
}
