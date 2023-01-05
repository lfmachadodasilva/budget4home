import { User } from '../models/user';

export interface IUserRepository {
  getAll: (nextPageToken?: string) => Promise<User[]>;
}
