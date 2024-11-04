import { B4hExpenseHeaderType } from '@/utils/expenses';
import { b4hSession } from '@/utils/session';
import { getLabelsFirestore } from '@b4h/firestore';
import { B4hExpensesForm } from '../(components)/form';
import { AddExpenseAnalytics } from '../analytics';

export const metadata = {
  title: 'add expense | budget4home'
};

export default async function ExpesesAdd({
  searchParams
}: {
  searchParams: Promise<B4hExpenseHeaderType>;
}) {
  const { getFavoriteGroupId } = b4hSession();

  const { userId, groupId } = await getFavoriteGroupId();
  const labels = await getLabelsFirestore(userId, groupId);

  return (
    <>
      <AddExpenseAnalytics />
      <B4hExpensesForm labels={labels} searchParams={await searchParams} />
    </>
  );
}
