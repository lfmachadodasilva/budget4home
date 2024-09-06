import { UserModel } from '@b4h/models';
import { getHeaders } from '../shared/header';

const baseUrl = (process.env['API_URL'] as string) ?? 'http://localhost:3000';

export const getUsers = async (token: string): Promise<UserModel[]> =>
  fetch(baseUrl + '/api/users', {
    method: 'GET',
    headers: getHeaders(token),
    cache: 'no-cache'
  }).then(res => res.json());
