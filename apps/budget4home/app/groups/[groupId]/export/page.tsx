import { Expense, Label } from '@budget4home/base';
import { B4hForm, B4hTextarea } from '@budget4home/ui-components';
import { groupBy } from 'lodash';
import { CopyToClipboardButton } from '../../../../components/copyToClipboardButton';
import { getUserId } from '../../../../util/getUserId';

import { expenseRepository, groupRepository, labelRepository } from '../../../../util/repositories';

const expensesToJson = (expenses: Expense[], labels: Label[]) => {
  var groups = groupBy(expenses, function (expense) {
    return expense.label.id;
  });
  var objs = Object.keys(groups).map(labelId => {
    return {
      ...labels.find(x => x.id === labelId),
      expenses: Array.from(groups[labelId])
    };
  });

  return JSON.stringify(objs, null, 2);
};

export default async function ({ params }: any) {
  const userId = await getUserId();

  const groupPromise = groupRepository.get(userId, params.groupId);
  const expensesPromise = expenseRepository.getAll(userId, params.groupId);
  const labelsPromise = labelRepository.getAll(userId, params.groupId);

  const [group, expenses, labels] = await Promise.all([
    groupPromise,
    expensesPromise,
    labelsPromise
  ]);

  const data = expensesToJson(expenses, labels);

  return (
    <B4hForm
      label={`Export - ${group.name}`}
      footer={<CopyToClipboardButton value={data}>Copy to clipboard</CopyToClipboardButton>}
    >
      <B4hTextarea value={data} disabled rows={20} />
    </B4hForm>
  );
}
