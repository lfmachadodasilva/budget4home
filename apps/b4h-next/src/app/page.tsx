import { fetchExpenses } from '@/clients/expenses';
import { fetchLabels } from '@/clients/labels';
import { B4hSeparator } from '@/components/separator';
import { B4hButton } from '@/components/ui/button/button';
import { B4hFade } from '@/components/ui/fade';
import { ANIMATION_DELAY } from '@/utils/constants';
import { expensesByLabel } from '@/utils/expenses';
import { labelsById } from '@/utils/label';
import { B4hRoutes } from '@/utils/routes';
import { b4hSession } from '@/utils/session';
import { ExpenseModel } from '@b4h/models';
import { ListBulletIcon, PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { B4hExpensesByChart } from './expenses/(components)/byChart';
import { B4hExpenseSummary } from './expenses/(components)/summary';

export const metadata = {
  title: 'budget4home'
};

export default async function Home() {
  return (
    <div className="flex flex-col gap-sm">
      <h2>welcome to budget4home!</h2>

      <GroupExpenseSummary />
      <Shortcuts />
    </div>
  );
}

const GroupExpenseSummary = async () => {
  const { getFavoriteGroupId, getUserId } = b4hSession();

  let expenses: ExpenseModel[] | undefined | null;
  let byLabel: Record<string, ExpenseModel[]> | undefined | null;

  const userId = await getUserId();
  if (!userId) {
    return null;
  }

  try {
    const { groupId } = await getFavoriteGroupId();
    if (groupId) {
      expenses = await fetchExpenses(groupId);
      if (expenses && expenses?.length > 0) {
        const labels = await fetchLabels(groupId);
        byLabel = expensesByLabel(expenses, labelsById(labels ?? []));
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }

  return (
    <>
      <p>summary of your ⭐️ group</p>
      {expenses && (
        <B4hFade key="GroupExpenseSummary">
          <B4hExpenseSummary expenses={expenses} />
        </B4hFade>
      )}
      {byLabel && (
        <B4hFade key="ExpenseByLabel">
          <B4hExpensesByChart expenseByLabel={byLabel} />
        </B4hFade>
      )}
    </>
  );
};

const Shortcuts = async () => {
  const { getUserId } = b4hSession();

  const userId = await getUserId();
  if (!userId) {
    return null;
  }

  let itemAnimation = 1;
  return (
    <>
      <B4hSeparator />
      <p>shortcuts:</p>
      <div className="flex flex-wrap gap-m">
        <B4hFade key={B4hRoutes.expensesAdd} delay={itemAnimation++ * ANIMATION_DELAY}>
          <Link href={B4hRoutes.expensesAdd}>
            <B4hButton buttonType="secondary" style={{ height: 'var(--size-xxl)' }}>
              <PlusIcon />
              add expenses
            </B4hButton>
          </Link>
        </B4hFade>

        <B4hFade key={B4hRoutes.expenses} delay={itemAnimation++ * ANIMATION_DELAY}>
          <Link href={B4hRoutes.expenses}>
            <B4hButton buttonType="secondary" style={{ height: 'var(--size-xxl)' }}>
              <ListBulletIcon />
              view expenses
            </B4hButton>
          </Link>
        </B4hFade>
      </div>
    </>
  );
};
