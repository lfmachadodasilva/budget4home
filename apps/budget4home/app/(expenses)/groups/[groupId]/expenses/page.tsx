import { Expense } from '@budget4home/base';
import { B4hButtonLink } from '@budget4home/ui-components';
import Link from 'next/link';
import { Balance } from '../../../../../components/expenses/balance';
import { ExpenseItems } from '../../../../../components/expenses/expenseItems';
import { ExpensesFilterByDate } from '../../../../../components/expenses/filterByDate';
import { ExpenseViewBy } from '../../../../../components/expenses/viewBy';
import { SubHeader } from '../../../../../components/subheader';
import { getUserId } from '../../../../../util/getUserId';
import { expenseRepository, labelRepository } from '../../../../../util/repositories';
import { B4hRoutes } from '../../../../../util/routes';

export default async function ({ params, searchParams }: any) {
  const userId = await getUserId();
  const groupId = params?.groupId as string;

  const date = new Date();
  date.setDate(1);
  searchParams.year && date.setFullYear(+searchParams?.year);
  searchParams.month && date.setMonth(+searchParams?.month - 1);

  const viewBy = searchParams?.viewBy as string;

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

  return (
    <>
      <SubHeader
        label="Expenses"
        action={
          <B4hButtonLink href={`${B4hRoutes.groups}/${groupId}${B4hRoutes.expenseAdd}`}>
            add
          </B4hButtonLink>
        }
      />

      {expenses.length <= 0 ? (
        <h4>Empty list of expenses.</h4>
      ) : (
        <>
          <ExpensesFilterByDate />
          {/* <Suspense fallback={<B4hLoading />}> */}
          {/* @ts-ignore */}
          <Balance groupId={groupId} expenses={expenses} />
          <br></br>
          <ExpenseViewBy groupId={groupId} />
          <ExpenseItems groupId={groupId} expenses={expenses} viewBy={viewBy} />
          {/* </Suspense> */}
        </>
      )}
    </>
  );
}
