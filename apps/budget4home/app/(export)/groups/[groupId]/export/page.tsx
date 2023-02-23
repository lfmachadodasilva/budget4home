import { B4hForm, B4hTextarea } from '@budget4home/ui-components';
import { CopyToClipboardButton } from '../../../../../components/copyToClipboardButton';
import { expensesToJson } from '../../../../../util/expenses';
import { getUserId } from '../../../../../util/getUserId';
import {
  expenseRepository,
  groupRepository,
  labelRepository
} from '../../../../../util/repositories';

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
