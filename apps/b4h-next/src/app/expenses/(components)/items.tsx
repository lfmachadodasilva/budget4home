import { fetchExpenses } from '@/clients/expenses';
import { fetchLabels } from '@/clients/labels';
import { B4hFade } from '@/components/ui/fade';
import { B4hItem } from '@/components/ui/item/item';
import styles from '@/components/ui/item/item.module.scss';
import { ANIMATION_DELAY } from '@/utils/constants';
import Link from 'next/link';
import {
  B4hExpenseHeaderType,
  expensesByDate,
  expensesByLabel,
  formatValue
} from '../../../utils/expenses';
import { labelsById } from '../../../utils/label';
import { B4hRoutes } from '../../../utils/routes';
import { b4hSession } from '../../../utils/session';
import { B4hExpenseSummary } from './summary';

export const B4hExpensesItems = async (props: B4hExpenseHeaderType) => {
  const { getFavoriteGroupId } = b4hSession();

  // fetch data
  const { groupId } = await getFavoriteGroupId();

  const [labels, expenses] = await Promise.all([
    fetchLabels(groupId),
    fetchExpenses(groupId, props.month, props.year)
  ]);

  // format data
  const labelById = labelsById(labels ?? []);
  const expenseBy =
    props.viewBy === 'byLabel'
      ? expensesByLabel(expenses ?? [], labelById)
      : expensesByDate(expenses ?? []);
  let item = 1;
  const reduceDelay = 0.5;

  return (
    <>
      <B4hFade key="summary" delay={item++ * ANIMATION_DELAY}>
        <B4hExpenseSummary expenses={expenses ?? []} />
      </B4hFade>
      {Object.entries(expenseBy).map(([key, expenses]) => (
        <B4hItem.Group key={key}>
          <B4hFade key={key + 'animation'} delay={item++ * ANIMATION_DELAY * reduceDelay}>
            <B4hItem.GroupTitle>
              <p>{key}</p>
              <p>{formatValue(expenses.reduce((acc, expense) => acc + expense.value, 0))}</p>
            </B4hItem.GroupTitle>
          </B4hFade>

          <B4hItem.Items>
            {expenses.map(expense => (
              <B4hFade
                key={expense.id + 'animation'}
                delay={item++ * ANIMATION_DELAY * reduceDelay}
              >
                <Link href={`${B4hRoutes.expenses}/${expense.id}`} key={expense.id}>
                  <B4hItem.Item>
                    <p>
                      {labelById[expense.label]?.icon} {expense.name}{' '}
                      {expense.scheduled && (
                        <small className={styles.small}>{expense.scheduled}</small>
                      )}
                    </p>

                    <p>{formatValue(expense.value)}</p>
                  </B4hItem.Item>
                </Link>
              </B4hFade>
            ))}
          </B4hItem.Items>
        </B4hItem.Group>
      ))}
    </>
  );
};
