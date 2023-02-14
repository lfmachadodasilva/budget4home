import { ExpenseForm } from '../../../../../../components/expenses/form';
import { getUserId } from '../../../../../../util/getUserId';
import { expenseRepository, labelRepository } from '../../../../../../util/repositories';

export default async function ({ params }: any) {
  const userId = await getUserId();
  const groupId = params.groupId as string;

  const expensePromise = expenseRepository.get(userId, groupId, params.expenseId);
  const labelsPromise = labelRepository.getAll(userId, groupId);

  const [expense, labels] = await Promise.all([expensePromise, labelsPromise]);

  return (
    <>
      <ExpenseForm expense={expense} labels={labels} groupId={groupId} />
    </>
  );
}
