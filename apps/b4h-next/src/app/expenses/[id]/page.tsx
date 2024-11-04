import { B4hNotFound } from '@/components/notFound';
import { B4hExpenseHeaderType } from '@/utils/expenses';
import { b4hSession } from '@/utils/session';
import { getExpenseFirebase, getLabelsFirestore } from '@b4h/firestore';
import { B4hExpensesForm } from '../(components)/form';
import { UpdateExpenseAnalytics } from '../analytics';

export const metadata = {
  title: 'update expense | budget4home'
};

export default async function ExpesesUpdate({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<B4hExpenseHeaderType>;
}) {
  const { id } = await params;
  const { getFavoriteGroupId } = b4hSession();

  const { userId, groupId } = await getFavoriteGroupId();
  const [labels, expense] = await Promise.all([
    getLabelsFirestore(userId, groupId),
    getExpenseFirebase(userId, groupId, id)
  ]);

  if (!expense) {
    return <B4hNotFound />;
  }

  return (
    <>
      <UpdateExpenseAnalytics />
      <B4hExpensesForm labels={labels} expense={expense} searchParams={await searchParams} />
    </>
  );
}
