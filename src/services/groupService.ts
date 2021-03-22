import { DELETE, GET, POST, PUT } from './baseService';
import { GroupFullModel, GroupModel } from '../models/groupModel';

export const getAllGroups = async (): Promise<GroupModel[]> => {
  return GET<GroupModel[]>('/api/group');
};

export const getFullAllGroups = async (): Promise<GroupFullModel[]> => {
  return GET<GroupFullModel[]>('/api/full/group');
};

export const getGroup = async (id: number): Promise<GroupModel> => {
  return GET<GroupModel>('/api/group/' + id);
};

export const addGroup = async (group: GroupModel): Promise<number> => {
  return POST<number>(
    '/api/group',
    {},
    {
      name: group.name,
      users: group.users
    }
  );
};

export const editGroup = async (group: GroupModel): Promise<number> => {
  return PUT<number>(
    '/api/group',
    {},
    {
      id: group.id,
      name: group.name,
      users: group.users
    }
  );
};

export const deleteGroup = async (id: number): Promise<number> => {
  return DELETE<number>('/api/group/' + id);
};
