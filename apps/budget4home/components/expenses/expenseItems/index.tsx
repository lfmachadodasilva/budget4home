import { Expense } from '@budget4home/base';
import { ExpensesByChart } from './byChart';
import { ExpensesByDate } from './byDate';
import { ExpensesByLabel } from './byLabel';

interface ExpenseItemProps {
  groupId: string;
  expenses: Expense[];
  viewBy?: string;
}

export const ExpenseItems = (props: ExpenseItemProps) => {
  if (props.viewBy === 'label') {
    return <ExpensesByLabel expenses={props.expenses} groupId={props.groupId} />;
  }
  if (props.viewBy === 'chart') {
    return <ExpensesByChart expenses={props.expenses} groupId={props.groupId} />;
  }

  return <ExpensesByDate expenses={props.expenses} groupId={props.groupId} />;
};
