import { B4hNotFound } from '@/components/notFound';
import { useB4hSession } from '@/utils/hooks/useB4hSession';
import { getExpenseFirebase, getGroupsFirestore, getLabelsFirestore } from '@b4h/firestore';
import { B4hExpensesForm } from '../(components)/form';

export const metadata = {
  title: 'update expense | budget4home'
};

export default async function ExpesesUpdate({ params }: { params: { id: string } }) {
  const { id } = params;
  const { userId } = useB4hSession();
  const groups = await getGroupsFirestore(userId);
  const [labels, expense] = await Promise.all([
    getLabelsFirestore(userId, groups[0].id),
    getExpenseFirebase(userId, groups[0].id, id)
  ]);

  if (!expense) {
    return <B4hNotFound />;
  }

  return <B4hExpensesForm labels={labels} expense={expense} />;
}
