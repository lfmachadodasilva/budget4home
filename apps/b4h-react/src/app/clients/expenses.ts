import { ExpenseModel } from '@b4h/models';
import { getHeaders } from '../shared/header';

const baseUrl = (process.env['API_URL'] as string) ?? 'http://localhost:3000';

export const getExpenses = async (token: string, groupId: string): Promise<ExpenseModel[]> =>
  fetch(
    baseUrl +
      `/api/expenses?` +
      new URLSearchParams({
        groupId: groupId
      }),
    {
      method: 'GET',
      headers: getHeaders(token),
      cache: 'no-cache'
    }
  ).then(res => res.json());

export const addExpense = async (
  token: string,
  groupId: string,
  expense: ExpenseModel
): Promise<ExpenseModel> =>
  fetch(baseUrl + '/api/expenses', {
    method: 'POST',
    headers: getHeaders(token, { groupId, ...expense }),
    cache: 'no-cache'
  }).then(res => res.json());

export const updateExpense = async (
  token: string,
  groupId: string,
  expense: ExpenseModel
): Promise<ExpenseModel> =>
  fetch(baseUrl + '/api/expenses', {
    method: 'PUT',
    headers: getHeaders(token, { groupId, ...expense }),
    cache: 'no-cache'
  }).then(res => res.json());
