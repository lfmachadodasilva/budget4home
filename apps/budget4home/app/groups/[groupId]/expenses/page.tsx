import { ExpenseType } from '@budget4home/base';
import { format } from 'date-fns';
import { sum } from 'lodash';
import Link from 'next/link';
import { getUserId } from '../../../../util/getUserId';
import { expenseRepository } from '../../../../util/repositories';
import { B4hRoutes } from '../../../../util/routes';
import { ExpensesDate } from './(components)/date';

export default async function ({ params, searchParams }: any) {
  const userId = await getUserId();

  const date = new Date();
  date.setDate(1);
  searchParams.year && date.setFullYear(+searchParams?.year);
  searchParams.month && date.setMonth(+searchParams?.month - 1);

  const expenses = await expenseRepository.getThisMonth(userId, params?.groupId, date);

  const totalUsed = sum(expenses.filter(x => x.type === ExpenseType.outcoming).map(x => x.value));
  const totalLeft =
    sum(expenses.filter(x => x.type === ExpenseType.incoming).map(x => x.value)) - totalUsed;
  return (
    <>
      <h3>Expenses</h3>
      <Link href={`${B4hRoutes.groups}/${params.groupId}${B4hRoutes.expenseAdd}`}>add</Link>

      <ExpensesDate />

      <p>
        <strong>Total used:</strong> {(totalUsed / 100).toFixed(2)}
      </p>
      <p>
        <strong>Total left:</strong> {(totalLeft / 100).toFixed(2)}
      </p>

      {expenses.length <= 0 && <h4>Empty list of expenses.</h4>}
      <ul>
        {expenses.map(expense => {
          return (
            <li key={expense.id}>
              <label>{expense.type}</label>
              {' - '}
              <label>{format(new Date(expense.date), 'yyyy-MM-dd')}</label>
              {' - '}
              <label>{expense.name}</label> - <label>{(expense.value / 100).toFixed(2)}</label>
              {' - '}
              <label>{expense.label?.name}</label>
              {' - '}
              <Link
                href={`${B4hRoutes.groups}/${params.groupId}${B4hRoutes.expenses}/${expense.id}`}
              >
                edit
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
