import { Label } from './label';

export const ExpenseType = {
  incoming: 'incoming',
  outcoming: 'outcoming'
};

export interface Expense {
  id: string;
  type: string;
  name: string;
  value: number;
  date: string;
  label?: Label;
  groupId: string;
}
