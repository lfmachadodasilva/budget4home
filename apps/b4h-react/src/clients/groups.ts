import { GroupModel } from '@b4h/models';
import { getHeaders } from '../shared/header';

const baseUrl = (process.env['API_URL'] as string) ?? 'http://localhost:3000';

export const getGroups = async (token: string): Promise<GroupModel[]> =>
  fetch(baseUrl + '/api/groups', {
    method: 'GET',
    headers: getHeaders(token),
    cache: 'no-cache'
  }).then(res => res.json());

export const addGroup = async (token: string, group: GroupModel): Promise<GroupModel> =>
  fetch(baseUrl + '/api/groups', {
    method: 'POST',
    headers: getHeaders(token, group),
    cache: 'no-cache'
  }).then(res => res.json());
