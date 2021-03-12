import { GET } from './baseService';
import { GroupFullModel, GroupModel } from '../models/groupModel';

export const getAllGroups = async (): Promise<GroupModel[]> => {
  return GET<GroupModel[]>('/api/group');
};

export const getFullAllGroups = async (): Promise<GroupFullModel[]> => {
  return GET<GroupFullModel[]>('/api/full/group');
};
