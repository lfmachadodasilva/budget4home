import { b4hSession } from '@/utils/session';
import { getExpensesFirebase } from '@b4h/firestore';
import { ExpenseModel } from '@b4h/models';
import { B4hExpenseSummary } from './expenses/(components)/summary';
import styles from './page.module.scss';

export const metadata = {
  title: 'budget4home'
};

export default async function Home() {
  const { userId, getFavoriteGroupId } = b4hSession();

  let expenses: ExpenseModel[] | undefined | null;
  try {
    const groupId = await getFavoriteGroupId(false);
    if (groupId) {
      expenses = await getExpensesFirebase(userId, groupId);
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <div className={styles.page}>
      <h1>home</h1>
      <p>welcome to budget4home!</p>
      <br />
      {expenses && (
        <>
          <p>summary of your ⭐️ group</p>
          <B4hExpenseSummary expenses={expenses} />
        </>
      )}
    </div>
  );
}
