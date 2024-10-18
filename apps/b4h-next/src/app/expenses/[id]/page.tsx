import { B4hNotFound } from '@/components/notFound';
import { b4hSession } from '@/utils/session';
import { getExpenseFirebase, getLabelsFirestore } from '@b4h/firestore';
import { B4hExpensesForm } from '../(components)/form';

export const metadata = {
  title: 'update expense | budget4home'
};

export default async function ExpesesUpdate({ params }: { params: { id: string } }) {
  const { id } = params;
  const { getUserId, getFavoriteGroupId } = b4hSession();

  const userId = getUserId();
  const groupId = await getFavoriteGroupId();

  const [labels, expense] = await Promise.all([
    getLabelsFirestore(userId, groupId),
    getExpenseFirebase(userId, groupId, id)
  ]);

  if (!expense) {
    return <B4hNotFound />;
  }

  return <B4hExpensesForm labels={labels} expense={expense} />;
}
