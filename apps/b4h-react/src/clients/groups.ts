import { GroupModel } from '@b4h/models';

const baseUrl = 'http://localhost:3000';

export const getGroups = async (token: string): Promise<GroupModel[]> =>
  fetch(baseUrl + '/api/groups', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    cache: 'no-cache'
  }).then(res => res.json());
