import { LabelModel } from '@b4h/models';
import { getHeaders } from '../shared/header';

const baseUrl = (process.env['API_URL'] as string) ?? 'http://localhost:3000';

export const getLabels = async (token: string, groupId: string): Promise<LabelModel[]> =>
  fetch(
    baseUrl +
      '/api/labels?' +
      new URLSearchParams({
        groupId: groupId
      }),
    {
      method: 'GET',
      headers: getHeaders(token),
      cache: 'no-cache'
    }
  ).then(res => res.json());

export const addLabel = async (
  token: string,
  groupId: string,
  label: LabelModel
): Promise<LabelModel> =>
  fetch(baseUrl + '/api/labels', {
    method: 'POST',
    headers: getHeaders(token, { groupId, ...label }),
    cache: 'no-cache'
  }).then(res => res.json());
