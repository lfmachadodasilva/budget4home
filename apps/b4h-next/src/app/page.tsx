import { B4hButton } from '@/components/ui/button/button';
import { B4hFade } from '@/components/ui/fade';
import { B4hRoutes } from '@/utils/routes';
import { b4hSession } from '@/utils/session';
import { getExpensesFirebase } from '@b4h/firestore';
import { ExpenseModel } from '@b4h/models';
import { ListBulletIcon, PlusIcon } from '@radix-ui/react-icons';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { B4hExpenseSummary } from './expenses/(components)/summary';
import styles from './page.module.scss';

export const metadata = {
  title: 'budget4home'
};

export default async function Home() {
  const { getUserId, getFavoriteGroupId } = b4hSession();

  let expenses: ExpenseModel[] | undefined | null;

  const userId = getUserId();
  if (userId) {
    try {
      const groupId = await getFavoriteGroupId();
      if (groupId) {
        expenses = await getExpensesFirebase(userId, groupId);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.page}>
      <h1>home</h1>
      <p>welcome to budget4home!</p>
      <br />
      <AnimatePresence>
        {expenses && (
          <B4hFade>
            <p>summary of your ⭐️ group</p>
            <B4hExpenseSummary expenses={expenses} />
          </B4hFade>
        )}
      </AnimatePresence>
      <br />
      {userId && <Shortcuts />}
    </div>
  );
}

const Shortcuts = () => {
  let item = 1;
  const delay = 0.5;
  return (
    <>
      <p>shortcuts:</p>
      <div className={styles.shortcuts}>
        <B4hFade key={B4hRoutes.expensesAdd} delay={item++ * delay}>
          <Link href={B4hRoutes.expensesAdd}>
            <B4hButton buttonType="secondary" className={styles.buttom}>
              <PlusIcon />
              add expenses
            </B4hButton>
          </Link>
        </B4hFade>

        <B4hFade key={B4hRoutes.expenses} delay={item++ * delay}>
          <Link href={B4hRoutes.expenses}>
            <B4hButton buttonType="secondary" className={styles.buttom}>
              <ListBulletIcon />
              expenses
            </B4hButton>
          </Link>
        </B4hFade>

        <B4hFade key={B4hRoutes.expensesByLabel} delay={item++ * delay}>
          <Link href={B4hRoutes.expensesByLabel}>
            <B4hButton buttonType="secondary" className={styles.buttom}>
              <ListBulletIcon />
              expenses by label
            </B4hButton>
          </Link>
        </B4hFade>
      </div>
    </>
  );
};
