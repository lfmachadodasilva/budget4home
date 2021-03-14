import { UserModel } from '../models/userModel';
import { GET } from './baseService';

export const getAllUsers = async (): Promise<UserModel[]> => {
  return GET<UserModel[]>('/api/user');
};
