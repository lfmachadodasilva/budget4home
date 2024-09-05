const baseUrl = 'http://localhost:3000/api';

export const getGroups = async (token: string) =>
  fetch(baseUrl + '/api/groups', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    cache: 'no-cache'
  }).then(res => res.json());
