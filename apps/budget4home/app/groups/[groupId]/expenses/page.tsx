import { Expense, ExpenseType } from '@budget4home/base';
import { sum } from 'lodash';
import Link from 'next/link';
import { ExpenseItems } from '../../../../components/expenses/expenseItems';
import { getUserId } from '../../../../util/getUserId';
import { expenseRepository, labelRepository } from '../../../../util/repositories';
import { B4hRoutes } from '../../../../util/routes';
import { formatValue } from '../../../../util/util';
import { ExpensesDate } from './(components)/date';

export default async function ({ params, searchParams }: any) {
  const userId = await getUserId();
  const groupId = params?.groupId as string;

  const date = new Date();
  date.setDate(1);
  searchParams.year && date.setFullYear(+searchParams?.year);
  searchParams.month && date.setMonth(+searchParams?.month - 1);

  let expenses: Expense[] = [];

  const labels = await labelRepository.getAll(userId, groupId);
  if (labels.length === 0) {
    return (
      <>
        <h4>
          You don't have any label yet. Click{' '}
          <Link href={`${B4hRoutes.groups}/${groupId}${B4hRoutes.labelAdd}`}>here</Link> to create
          one
        </h4>
      </>
    );
  }

  try {
    expenses = await expenseRepository.getThisMonth(userId, groupId, date, labels);
  } catch (err) {
    console.error(err);
    return <div className="error">something went wrong</div>;
  }

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
      <Link href={`${B4hRoutes.groups}/${groupId}${B4hRoutes.expenseAdd}`}>add</Link>
      <br />
      <br />

      {expenses.length <= 0 ? (
        <h4>Empty list of expenses.</h4>
      ) : (
        <>
          <ExpensesDate />
          <h4>
            <strong>Total used:</strong> {formatValue(totalOutcoming)}
          </h4>
          <h4 className={totalLeft <= 0 ? 'error' : ''}>
            <strong>Total left:</strong> {formatValue(totalLeft)}{' '}
            {totalIncoming > 0 && (
              <small>{formatValue((totalLeft / totalIncoming) * 100 * 100)}%</small>
            )}
          </h4>
          <ExpenseItems groupId={groupId} expenses={expenses} />
        </>
      )}
    </>
  );
}
