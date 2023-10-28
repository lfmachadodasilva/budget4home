import { BaseModel } from './base';

export interface ExpenseModel extends BaseModel {
  type: 'in' | 'out';
  date: Date;
  value: number;
  parentId?: string | null;
  scheduled?: string | null;

  groupId: string;
  labelId: string;
}
