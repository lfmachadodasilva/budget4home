import { B4hSeparator } from '@/components/separator';
import { B4hButton } from '@/components/ui/button/button';
import { B4hFade } from '@/components/ui/fade';
import { ANIMATION_DELAY } from '@/utils/constants';
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
  return (
    <div className={styles.page}>
      <h2>welcome to budget4home!</h2>

      <GroupExpenseSummary />
      <Shortcuts />
    </div>
  );
}

const GroupExpenseSummary = async () => {
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
  } else {
    return null;
  }

  return (
    <AnimatePresence>
      <p>summary of your ⭐️ group</p>
      {expenses && (
        <B4hFade>
          <B4hExpenseSummary expenses={expenses} />
        </B4hFade>
      )}
    </AnimatePresence>
  );
};

const Shortcuts = () => {
  const { getUserId } = b4hSession();

  const userId = getUserId();
  if (!userId) {
    return null;
  }

  let itemAnimation = 1;
  return (
    <>
      <B4hSeparator />
      <p>shortcuts:</p>
      <div className={styles.shortcuts}>
        <B4hFade key={B4hRoutes.expensesAdd} delay={itemAnimation++ * ANIMATION_DELAY}>
          <Link href={B4hRoutes.expensesAdd}>
            <B4hButton buttonType="secondary" className={styles.buttom}>
              <PlusIcon />
              add expenses
            </B4hButton>
          </Link>
        </B4hFade>

        <B4hFade key={B4hRoutes.expenses} delay={itemAnimation++ * ANIMATION_DELAY}>
          <Link href={B4hRoutes.expenses}>
            <B4hButton buttonType="secondary" className={styles.buttom}>
              <ListBulletIcon />
              view expenses
            </B4hButton>
          </Link>
        </B4hFade>
      </div>
    </>
  );
};
