import { defaultUserModel, UserModel } from './userModel';

export interface GroupModel {
  id: number;
  name: string;

  /** relations */
  users: string[];
}

export interface GroupFullModel {
  id: number;
  name: string;

  /** relations */
  users: UserModel[];
}

export const defaultGroupModel: GroupModel[] = [
  {
    id: 1,
    name: 'Test 1',
    users: ['user 1', 'user 2']
  },
  {
    id: 2,
    name: 'Test 2',
    users: ['user 1', 'user 2']
  },
  {
    id: 3,
    name: 'Test 3',
    users: ['user 1', 'user 2']
  }
];

export const defaultGroupFullModel: GroupFullModel[] = [
  {
    id: 1,
    name: 'Test 1',
    users: defaultUserModel
  },
  {
    id: 2,
    name: 'Test 2',
    users: defaultUserModel
  },
  {
    id: 3,
    name: 'Test 3',
    users: defaultUserModel
  }
];
