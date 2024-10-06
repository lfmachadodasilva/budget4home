import { BaseModel } from './base';

export const ExpenseType = {
  incoming: 'incoming',
  outcoming: 'outcoming'
};

export interface ExpenseModel extends BaseModel {
  type: string;
  value: number;
  date: Date;
  label: string;
  comments?: string;
  parent: string;
  scheduled?: string;
}
