import { BaseEntity } from './base';

export interface GroupEntity extends BaseEntity {
  userIds: string[];
}
