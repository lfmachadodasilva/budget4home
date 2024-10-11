import { getExpensesFirebase, getGroupsFirestore, getLabelsFirestore } from '@b4h/firestore';
import { B4hExpensesForm } from '../../../components/forms/expenses';
import { useB4hSession } from '../../../utils/hooks/useB4hSession';

export const metadata = {
  title: 'update expense | budget4home'
};

export default async function ExpesesUpdate({ params }: { params: { id: string } }) {
  const { id } = params;
  const { userId } = useB4hSession();
  const groups = await getGroupsFirestore(userId);
  const labels = await getLabelsFirestore(userId, groups[0].id);
  const expenses = await getExpensesFirebase(userId, groups[0].id);

  return <B4hExpensesForm labels={labels} expense={expenses.find(expense => expense.id === id)} />;
}
