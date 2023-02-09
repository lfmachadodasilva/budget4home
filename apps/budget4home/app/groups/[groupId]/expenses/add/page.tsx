import { ExpenseForm } from '../(components)/form';
import { CacheKeys, getFromCache } from '../../../../../util/cache';
import { getUserId } from '../../../../../util/getUserId';
import { labelRepository } from '../../../../../util/repositories';

export default async function ({ params }: any) {
  const groupId = params.groupId as string;
  const userId = await getUserId();

  const labels = await getFromCache(CacheKeys.labels(groupId), () =>
    labelRepository.getAll(userId, groupId)
  );

  return (
    <>
      <ExpenseForm groupId={groupId} labels={labels} />
    </>
  );
}
