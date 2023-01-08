import { Expense } from '@budget4home/base';
import { format } from 'date-fns';
import Link from 'next/link';
import { B4hRoutes } from '../../../../../util/routes';

interface ExpenseItemProps {
  expense: Expense;
  groupId: string;
}

export const ExpenseItem = (props: ExpenseItemProps) => {
  return (
    <>
      <label>{props.expense.type}</label>
      {' - '}
      <label>{format(new Date(props.expense.date), 'yyyy-MM-dd')}</label>
      {' - '}
      <label>{props.expense.name}</label> - <label>{(props.expense.value / 100).toFixed(2)}</label>
      {' - '}
      <label>{props.expense.label?.name}</label>
      {' - '}
      <Link href={`${B4hRoutes.groups}/${props.groupId}${B4hRoutes.expenses}/${props.expense.id}`}>
        edit
      </Link>
    </>
  );
};
