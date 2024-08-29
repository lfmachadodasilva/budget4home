import { BaseModel } from './base';
import { LabelModel } from './label';

export const ExpenseType = {
  incoming: 'incoming',
  outcoming: 'outcoming'
};

export interface ExpenseModel extends BaseModel {
  type: string;
  value: number;
  date: Date;
  label: LabelModel | string;
  comments?: string;
  parent: ExpenseModel | string;
  scheduled?: string;
}
