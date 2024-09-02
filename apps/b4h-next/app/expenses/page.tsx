import { useB4hSession } from '@/hooks/useB4hSession';
import { getGroupId } from '@/shared/groupId';
import { labelsById } from '@/shared/labelUtil';
import { B4hRoutes } from '@/shared/routes';
import { getExpenses, getLabels } from '@b4h/firestore';
import { B4hButton } from '@b4h/web-components';
import { format } from 'date-fns';
import Link from 'next/link';
import styles from './page.module.scss';

export const metadata = {
  title: 'expenses | budget4home'
};

export default async function ExpensesPage() {
  const { userId } = useB4hSession();

  const groupId = await getGroupId(userId);

  const [expenses, labels] = await Promise.all([
    getExpenses(groupId, userId),
    getLabels(groupId, userId)
  ]);

  const labelById = labelsById(labels);

  console.log('expenses', expenses);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>expenses</h1>
        <Link href={B4hRoutes.expensesAdd}>
          <B4hButton>add</B4hButton>
        </Link>
      </div>
      {expenses.map(expense => (
        <Link href={`${B4hRoutes.expenses}/${expense.id}`} key={expense.id}>
          <div className={styles.item}>
            <p className={styles.itemTxt}>{format(expense.date, 'yyyy/MM/dd')}</p>
            <p className={styles.itemTxt}>
              {labelById[expense.label as string]?.icon} {expense.name}
            </p>
            <p className={styles.itemTxt}>{expense.value}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
