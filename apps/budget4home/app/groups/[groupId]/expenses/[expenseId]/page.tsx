import { ExpenseForm } from '../(components)/form';
import { getUserId } from '../../../../../util/getUserId';
import { expenseRepository, labelRepository } from '../../../../../util/repositories';

export default async function ({ params }: any) {
  const userId = await getUserId();

  const expensePromise = expenseRepository.get(userId, params.groupId, params.expenseId);

  const labelsPromise = labelRepository.getAll(userId, params.groupId);

  const [expense, labels] = await Promise.all([expensePromise, labelsPromise]);

  return (
    <>
      <ExpenseForm expense={expense} labels={labels} groupId={params.groupId} />
    </>
  );
}
