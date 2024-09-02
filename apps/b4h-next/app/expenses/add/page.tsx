import { ExpenseForm } from '@/components/forms/expense/expenseForm';
import { useB4hSession } from '@/hooks/useB4hSession';
import { getGroupId } from '@/shared/groupId';
import { getLabels } from '@b4h/firestore';
import styles from './page.module.scss';

export const metadata = {
  title: 'expense | budget4home'
};

export default async function AddExpensePage() {
  const { userId } = useB4hSession();
  const groupId = await getGroupId(userId);
  const labels = await getLabels(groupId, userId);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>add expense</h1>
      <ExpenseForm userId={userId} groupId={groupId} labels={labels} />
    </div>
  );
}
