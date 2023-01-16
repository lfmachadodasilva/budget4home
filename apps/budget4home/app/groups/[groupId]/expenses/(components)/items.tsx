import { Expense } from '@budget4home/base';
import { groupBy } from 'lodash';
import { ExpenseItem } from '../../../../../components/expenseItem';

interface ExpenseItemProps {
  expenses: Expense[];
  groupId: string;
}

export const ExpenseItems = (props: ExpenseItemProps) => {
  var groups = groupBy(props.expenses, function (expense) {
    return new Date(expense.date).getDate();
  });

  return (
    <>
      {Object.keys(groups).map(day => {
        return (
          <>
            {day} <br />
            {groups[day].map(expense => (
              <ExpenseItem expense={expense} />
            ))}
          </>
        );
      })}
    </>
  );
};
