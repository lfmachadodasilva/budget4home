import { ExpenseModel } from '@b4h/models';

const baseUrl = (process.env['API_URL'] as string) ?? 'http://localhost:3000/api';

export const getExpenses = async (token: string, groupId: string): Promise<ExpenseModel[]> =>
  fetch(baseUrl + `/api/groups/${groupId}/expenses`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    cache: 'no-cache'
  }).then(res => res.json());
