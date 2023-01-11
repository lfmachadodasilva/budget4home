import { Expense } from '@budget4home/base';
import { format } from 'date-fns';
import Link from 'next/link';
import { B4hRoutes } from '../../../../../util/routes';

interface ExpenseItemProps {
  expenses: Expense[];
  groupId: string;
}

export const ExpenseItems = (props: ExpenseItemProps) => {
  return (
    <ul>
      {props.expenses.map(expense => {
        return (
          <li key={expense.id}>
            <label>{format(new Date(expense.date), 'yyyy-MM-dd')}</label>
            {' - '}
            <label>
              {expense.name} {expense.scheduled && <small>{expense.scheduled}</small>}
            </label>
            {' - '}
            <label>{(expense.value / 100).toFixed(2)}</label>
            {' - '}
            <label>{expense.label?.icon ?? expense.label?.name}</label>
            {' - '}
            <Link href={`${B4hRoutes.groups}/${props.groupId}${B4hRoutes.expenses}/${expense.id}`}>
              edit
            </Link>{' '}
          </li>
        );
      })}
    </ul>
  );
};
