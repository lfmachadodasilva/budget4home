const baseUrl = (process.env['API_URL'] as string) ?? 'http://localhost:3000/api';

export const getLabels = async (token: string, groupId: string) =>
  fetch(baseUrl + `/api/groups/${groupId}/expenses`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    cache: 'no-cache'
  }).then(res => res.json());
