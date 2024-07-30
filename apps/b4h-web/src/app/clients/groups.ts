import { GroupModel } from '@b4h/models';
import { B4hApiRoutes } from '../config/routes';
import { defaultHeaders } from './shared';

export const getGroupsFetch = (token: string): Promise<GroupModel[]> => {
  // if (token) {
  //   headers = { ...headers, authorization: token as string };
  // }

  return fetch(B4hApiRoutes.groups(), {
    method: 'GET',
    headers: { ...defaultHeaders, authorization: token as string }
  }).then(res => res.json());
};
