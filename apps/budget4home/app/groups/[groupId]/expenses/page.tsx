import { ExpenseType } from '@budget4home/base';
import { sum } from 'lodash';
import Link from 'next/link';
import { ExpenseItems } from '../../../../components/expenseItems';
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

  const totalOutcoming = sum(
    expenses.filter(x => x.type === ExpenseType.outcoming).map(x => x.value)
  );
  const totalIncoming = sum(
    expenses.filter(x => x.type === ExpenseType.incoming).map(x => x.value)
  );
  const totalLeft = totalIncoming - totalOutcoming;

  return (
    <>
      <h3>Expenses</h3>
      <Link href={`${B4hRoutes.groups}/${params.groupId}${B4hRoutes.expenseAdd}`}>add</Link>

      <ExpensesDate />

      <h4>
        <strong>Total used:</strong> {(totalOutcoming / 100).toFixed(2)}
      </h4>
      <h4 className={totalLeft <= 0 ? 'error' : ''}>
        <strong>Total left:</strong> {(totalLeft / 100).toFixed(2)}{' '}
        {totalIncoming > 0 && <small>{((totalLeft / totalIncoming) * 100).toFixed(0)}%</small>}
      </h4>

      {expenses.length <= 0 && <h4>Empty list of expenses.</h4>}

      <ExpenseItems expenses={expenses} />
    </>
  );
}
