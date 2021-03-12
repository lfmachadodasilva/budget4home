import { GroupModel } from '../models/groupModel';
import { GET } from './baseService';

export const getAllUsers = async (): Promise<GroupModel[]> => {
  return GET<GroupModel[]>('/api/groups');
};
