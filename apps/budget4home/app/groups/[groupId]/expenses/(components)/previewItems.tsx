import { Expense } from '@budget4home/base';
import { B4hButton } from '@budget4home/ui-components';
import { format } from 'date-fns';

interface ExpensePreviewItemsProps {
  expenses: Expense[];
  onDelete: (expenseId: string) => void;
}

export const ExpensePreviewItems = (props: ExpensePreviewItemsProps) => {
  return (
    <ul>
      {props.expenses.map((expense: Expense) => {
        return (
          <li key={expense.id}>
            <label>{format(new Date(expense.date), 'yyyy-MM-dd')}</label>
            {' - '}
            <label>{expense.name}</label> - <label>{(expense.value / 100).toFixed(2)}</label>
            {' - '}
            <label>{expense.label?.name}</label>
            {' - '}
            <B4hButton onClick={() => props.onDelete(expense.id)}>Delete</B4hButton>
          </li>
        );
      })}
    </ul>
  );
};
