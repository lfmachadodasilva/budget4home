import { Expense } from '@budget4home/base';
import { B4hRoutes } from '../util/routes';
import { BaseClient } from './base';

export class ExpenseClient extends BaseClient {
  private static url = B4hRoutes.api + B4hRoutes.expenses;

  static add = async (token: string, groupId: string, expense: Partial<Expense>) => {
    return await this.fetch<Expense>(
      `${B4hRoutes.api}${B4hRoutes.groups}/${groupId}${B4hRoutes.expenses}`,
      token,
      'POST',
      expense
    );
  };

  static edit = async (token: string, groupId: string, expense: Partial<Expense>) => {
    return await this.fetch<Expense>(
      `${B4hRoutes.api}${B4hRoutes.groups}/${groupId}${B4hRoutes.expenses}`,
      token,
      'PUT',
      expense
    );
  };

  static editByParent = async (token: string, groupId: string, expense: Partial<Expense>) => {
    return await this.fetch<Expense>(
      `${B4hRoutes.api}${B4hRoutes.groups}/${groupId}${B4hRoutes.expenses}` + '/parent',
      token,
      'PUT',
      expense
    );
  };

  static delete = async (token: string, groupId: string, expense: Partial<Expense>) => {
    return await this.fetch<void>(
      `${B4hRoutes.api}${B4hRoutes.groups}/${groupId}${B4hRoutes.expenses}`,
      token,
      'DELETE',
      expense
    );
  };

  static deleteByParent = async (token: string, groupId: string, expense: Partial<Expense>) => {
    return await this.fetch<void>(
      `${B4hRoutes.api}${B4hRoutes.groups}/${groupId}${B4hRoutes.expenses}` + '/parent',
      token,
      'DELETE',
      expense
    );
  };
}
