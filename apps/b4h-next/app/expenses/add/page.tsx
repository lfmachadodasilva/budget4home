import { ExpenseForm } from '@/components/forms/expense/expenseForm';
import { useB4hSession } from '@/hooks/useB4hSession';
import { getGroupId } from '@/shared/groupId';
import { B4hRoutes } from '@/shared/routes';
import { getLabels } from '@b4h/firestore';
import Link from 'next/link';
import { MdOutlineArrowBackIos } from 'react-icons/md';
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
      <h1 className={styles.title}>
        <Link href={B4hRoutes.expenses}>
          <MdOutlineArrowBackIos size={24} />
        </Link>{' '}
        add expense
      </h1>
      <ExpenseForm userId={userId} groupId={groupId} labelsJson={JSON.stringify(labels)} />
    </div>
  );
}
