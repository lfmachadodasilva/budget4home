import { BaseEntity } from './base';
import { LabelEntity } from './label';

export const ExpenseType = {
  incoming: 'incoming',
  outcoming: 'outcoming'
};

export interface ExpenseEntity extends BaseEntity {
  type: string;
  value: number;
  date: string;
  label?: LabelEntity;
  comments?: string;
  parent?: ExpenseEntity;
  scheduled?: string;
}
