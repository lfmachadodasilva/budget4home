import { fetchExpenses } from '@/clients/expenses';
import { fetchLabels } from '@/clients/labels';
import { B4hFade } from '@/components/ui/fade';
import { B4hItem } from '@/components/ui/item/item';
import styles from '@/components/ui/item/item.module.scss';
import { ANIMATION_DELAY } from '@/utils/constants';
import {
  B4hExpenseHeaderType,
  expenseQueryParams,
  expensesByDate,
  expensesByLabel,
  formatValue,
  formatValues
} from '@/utils/expenses';
import { labelsById } from '@/utils/label';
import { B4hRoutes } from '@/utils/routes';
import { b4hSession } from '@/utils/session';
import { ExpenseType } from '@b4h/models';
import Link from 'next/link';
import { B4hExpensesByChart } from './byChart';
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
    !props.viewBy || props.viewBy === 'byDate'
      ? expensesByDate(expenses ?? [])
      : expensesByLabel(expenses ?? [], labelById);
  let item = 1;

  const queryParams = expenseQueryParams(props);

  return (
    <>
      <B4hFade key="summary" delay={item++ * ANIMATION_DELAY}>
        <B4hExpenseSummary expenses={expenses ?? []} />
      </B4hFade>
      {props.viewBy === 'byChart' && <B4hExpensesByChart expenseByLabel={expenseBy} />}
      {props.viewBy !== 'byChart' &&
        Object.entries(expenseBy).map(([key, expenses]) => (
          <B4hItem.Group key={key}>
            <B4hFade key={key + 'animation'} delay={item++ * ANIMATION_DELAY}>
              <B4hItem.GroupTitle>
                <p data-testid="expense-group-header-key">{key}</p>
                <p data-testid="expense-group-header-value">{formatValues(expenses ?? [])}</p>
              </B4hItem.GroupTitle>
            </B4hFade>

            <B4hItem.Items>
              {expenses.map(expense => (
                <B4hFade key={expense.id + 'animation'} delay={item++ * ANIMATION_DELAY}>
                  <Link
                    href={`${B4hRoutes.expenses}/${expense.id}${queryParams}`}
                    key={expense.id}
                    data-testid={`${expense.id}-link`}
                  >
                    <B4hItem.Item>
                      <p>
                        {labelById[expense.label]?.icon} {expense.name}{' '}
                        {expense.scheduled && (
                          <small className={styles.small}>{expense.scheduled}</small>
                        )}
                      </p>

                      <p data-testid={`${expense.id}-value`}>
                        {expense.type === ExpenseType.incoming ? '+' : '-'}
                        {formatValue(expense.value)}
                      </p>
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
