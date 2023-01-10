import { getUserId } from '../../../../util/getUserId';

import { expenseRepository, groupRepository } from '../../../../util/repositories';
import { ExportUi } from './(components)/ui';

export default async function ({ params }: any) {
  const userId = await getUserId();

  const groupPromise = groupRepository.get(userId, params.groupId);
  const expensesPromise = expenseRepository.getAll(userId, params.groupId);

  const [group, expenses] = await Promise.all([groupPromise, expensesPromise]);

  return <ExportUi expenses={expenses} group={group} />;
}
