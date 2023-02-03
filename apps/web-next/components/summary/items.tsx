import { Expense } from '@budget4home/base';
import { groupBy, sum } from 'lodash';
import { SummaryItem } from '../item/summary';

export interface SummaryItemsProps {
  groupId: string;
  expenses: Expense[];
}

export const SummaryItems = (props: SummaryItemsProps) => {
  var groupsByLabel = groupBy(props.expenses, function (expense) {
    return expense.label.id;
  });

  return (
    <div style={{ marginTop: 'var(--size-l)' }}>
      {Object.keys(groupsByLabel).map(labelId => {
        if (groupsByLabel[labelId].length <= 0) {
          return <></>;
        }

        const label = groupsByLabel[labelId].at(0).label;
        const total = sum(groupsByLabel[labelId].map(x => x.value));
        return <SummaryItem groupId={props.groupId} label={label} total={total} />;
      })}
    </div>
  );
};
