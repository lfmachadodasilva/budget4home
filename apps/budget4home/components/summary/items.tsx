import { Expense } from '@budget4home/base';
import { expensesByLabel } from '../../util/expenses';
import { SummaryItem } from '../item/summary';

export interface SummaryItemsProps {
  groupId: string;
  expenses: Expense[];
  operation?: 'sum' | 'avg';
}

export const SummaryItems = (props: SummaryItemsProps) => {
  const byLabel = expensesByLabel(props.expenses, props.operation ?? 'sum');

  return (
    <div style={{ marginTop: 'var(--size-l)' }}>
      {byLabel.map(obj => {
        if (!obj.labelId) {
          return <></>;
        }

        return <SummaryItem groupId={props.groupId} label={obj.label} total={obj.total} />;
      })}
    </div>
  );
};
