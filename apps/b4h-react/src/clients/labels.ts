import { LabelModel } from '@b4h/models';

const baseUrl = (process.env['API_URL'] as string) ?? 'http://localhost:3000/api';

export const getLabels = async (token: string, groupId: string): Promise<LabelModel[]> =>
  fetch(
    baseUrl +
      `/api/labels?` +
      new URLSearchParams({
        groupId: groupId
      }),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      cache: 'no-cache'
    }
  ).then(res => res.json());
