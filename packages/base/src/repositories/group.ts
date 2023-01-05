import { Group } from '../models/group';

export interface IGroupRepository {
  getAll: (userId: string) => Promise<Group[]>;
  getFirst: (userId: string) => Promise<Group>;
  get: (userId: string, groupId: string) => Promise<Group>;
  add: (userId: string, group: Partial<Group>) => Promise<Group>;
  edit: (userId: string, group: Partial<Group>) => Promise<Group>;
  delete: (userId: string, groupId: string) => Promise<void>;
  isInvalidGroup: (userId: string, groupId: string) => Promise<boolean>;
}
