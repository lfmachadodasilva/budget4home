import { BaseModel } from './base';

export interface GroupModel extends BaseModel {
  userIds: string[];
}
