import { Expense } from '@budget4home/base';
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
    const toDate = new Date(searchParams.to);

    const labels = await labelRepository.getAll(userId, groupId);
    expenses = await expenseRepository.getByDateRange(userId, groupId, fromDate, toDate, labels);
  }

  return (
    <>
      <SummaryHeaderClient groupId={groupId} />
      <SummaryItems groupId={groupId} expenses={expenses} />
    </>
  );
}
