import { ExpenseForm } from '../(components)/form';
import { CacheKeys, getFromCache } from '../../../../../util/cache';
import { getUserId } from '../../../../../util/getUserId';
import { expenseRepository, labelRepository } from '../../../../../util/repositories';

export default async function ({ params }: any) {
  const userId = await getUserId();
  const groupId = params.groupId as string;

  const expensePromise = expenseRepository.get(userId, groupId, params.expenseId);
  const labelsPromise = getFromCache(CacheKeys.labels(groupId), () =>
    labelRepository.getAll(userId, groupId)
  );

  const [expense, labels] = await Promise.all([expensePromise, labelsPromise]);

  return (
    <>
      <ExpenseForm expense={expense} labels={labels} groupId={groupId} />
    </>
  );
}
