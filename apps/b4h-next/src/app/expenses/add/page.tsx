import { b4hSession } from '@/utils/session';
import { getLabelsFirestore } from '@b4h/firestore';
import { B4hExpensesForm } from '../(components)/form';

export const metadata = {
  title: 'add expense | budget4home'
};

export default async function ExpesesAdd() {
  const { getUserUid, getFavoriteGroupId } = b4hSession();

  const userId = getUserUid();
  const groupId = await getFavoriteGroupId(false);
  const labels = await getLabelsFirestore(userId, groupId);

  return <B4hExpensesForm labels={labels} />;
}
