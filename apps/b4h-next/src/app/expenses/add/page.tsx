import { useB4hSession } from '@/utils/hooks/useB4hSession';
import { getGroupsFirestore, getLabelsFirestore } from '@b4h/firestore';
import { B4hExpensesForm } from '../(components)/form';

export const metadata = {
  title: 'add expense | budget4home'
};

export default async function ExpesesAdd() {
  const { userId } = useB4hSession();
  const groups = await getGroupsFirestore(userId);
  const labels = await getLabelsFirestore(userId, groups[0].id);

  return <B4hExpensesForm labels={labels} />;
}
