'use server';

import { ACTION_DONE, ACTION_FAIL } from '@/utils/constants';
import { FormState } from '@/utils/formState';
import { b4hSession } from '@/utils/session';
import { getAllExpensesFirebase, getLabelsFirestore } from '@b4h/firestore';
import { ExportFormType } from '../schema';

export async function onSubmitAction(
  prevState: FormState,
  data: ExportFormType
): Promise<FormState> {
  const { getUserId } = b4hSession();
  const userId = await getUserId();
  const groupId = data.group;

  try {
    const [labels, expenses] = await Promise.all([
      getLabelsFirestore(userId, groupId),
      getAllExpensesFirebase(userId, groupId)
    ]);

    return {
      message: ACTION_DONE,
      data: {
        labels,
        expenses
      }
    } as FormState;
  } catch (err) {
    console.error(err);
    return {
      message: ACTION_FAIL
    } as FormState;
  }
}
