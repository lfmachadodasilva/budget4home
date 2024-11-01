'use server';

import { ACTION_DONE, ACTION_FAIL } from '@/utils/constants';
import { FormState } from '@/utils/formState';
import { b4hSession } from '@/utils/session';
import { updateExpensesFirebase, updateLabelsFirebase } from '@b4h/firestore';
import { ExpenseModel, LabelModel } from '@b4h/models';
import { ImportFormType } from '../schema';

type ImportData = { labels: LabelModel[]; expenses: ExpenseModel[] };

export async function onSubmitAction(
  prevState: FormState,
  data: ImportFormType
): Promise<FormState> {
  const { getUserId } = b4hSession();
  const userId = await getUserId();
  const groupId = data.group;

  try {
    const { labels, expenses } = convert(data.format, data.fileData);

    if (labels?.length > 0 && expenses?.length > 0) {
      await Promise.all([
        updateExpensesFirebase(userId, groupId, expenses),
        updateLabelsFirebase(userId, groupId, labels)
      ]);
    } else {
      console.error('onSubmitAction: no data to import');
    }

    return {
      message: ACTION_DONE
    } as FormState;
  } catch (err) {
    console.error(err);
    return {
      message: ACTION_FAIL
    } as FormState;
  }
}

const convert = (format: string, data?: string | null): ImportData => {
  switch (format) {
    case 'budget4home':
      return convertFromBudget4HomeFormat(data);
    case 'monzo':
      return convertFromMonzoFormat(data);
    case 'revolut':
      return convertFromRevolutFormat(data);
    default:
      return {} as ImportData;
  }
};
const convertFromBudget4HomeFormat = (data?: string | null): ImportData =>
  JSON.parse(data as string);
const convertFromMonzoFormat = (data?: string | null): ImportData => {
  throw new Error('Not implemented');
};
const convertFromRevolutFormat = (data?: string | null): ImportData => {
  throw new Error('Not implemented');
};
