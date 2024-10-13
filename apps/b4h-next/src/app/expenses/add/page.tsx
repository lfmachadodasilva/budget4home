import { b4hSession } from '@/utils/session';
import { getLabelsFirestore } from '@b4h/firestore';
import { B4hExpensesForm } from '../(components)/form';

export const metadata = {
  title: 'add expense | budget4home'
};

export default async function ExpesesAdd() {
  const { userId, getFavoriteGroupId } = b4hSession();
  const groupId = await getFavoriteGroupId();
  const labels = await getLabelsFirestore(userId, groupId);

  return <B4hExpensesForm labels={labels} />;
}
