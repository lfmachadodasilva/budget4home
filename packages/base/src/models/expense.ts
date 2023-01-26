import { Base } from './base';
import { Label } from './label';

export const ExpenseType = {
  incoming: 'incoming',
  outcoming: 'outcoming'
};

export interface Expense extends Base {
  type: string;
  value: number;
  date: string;
  label?: Label;
  comments?: string;
  // groupId: string;
  parent?: Expense;
  scheduled?: string;
}
