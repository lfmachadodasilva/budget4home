import { ExpenseForm } from '@/components/forms/expense/expenseForm';
import { useB4hSession } from '@/hooks/useB4hSession';
import { getGroupId } from '@/shared/groupId';
import { getExpense, getLabels } from '@b4h/firestore';
import styles from './page.module.scss';

export const metadata = {
  title: 'expense | budget4home'
};

export default async function UpdateExpensePage({ params }: { params: { expenseId: string } }) {
  const { expenseId } = params;
  const { userId } = useB4hSession();
  const groupId = await getGroupId(userId);
  const [expense, labels] = await Promise.all([
    getExpense(groupId, userId, expenseId),
    getLabels(groupId, userId)
  ]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>expense</h1>
      <ExpenseForm userId={userId} groupId={groupId} expense={expense} labels={labels} />
    </div>
  );
}
