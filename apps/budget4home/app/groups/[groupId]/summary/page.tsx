import { Expense } from '@budget4home/base';
import { addDays } from 'date-fns';
import { SummaryItems } from '../../../../components/summary/items';
import { SummaryHeaderClient } from '../../../../components/summary/summaryHeaderClient';
import { getUserId } from '../../../../util/getUserId';
import { expenseRepository, labelRepository } from '../../../../util/repositories';

export default async function ({ params, searchParams }: any) {
  const groupId = params?.groupId as string;
  const userId = await getUserId();

  let expenses: Expense[] = [];
  if (searchParams.from && searchParams.to) {
    const fromDate = new Date(searchParams.from);
    const toDate = addDays(new Date(searchParams.to), 1);

    const labels = await labelRepository.getAll(userId, groupId);
    expenses = await expenseRepository.getByDateRange(userId, groupId, fromDate, toDate, labels);
  }

  return (
    <>
      <SummaryHeaderClient groupId={groupId} from={searchParams.from} to={searchParams.to} />
      <SummaryItems groupId={groupId} expenses={expenses} operation={searchParams.operation} />
    </>
  );
}
