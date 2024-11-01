'use server';

import { ACTION_DONE, ACTION_FAIL } from '@/utils/constants';
import { FormState } from '@/utils/formState';
import { b4hSession } from '@/utils/session';
import { ImportFormType } from '../schema';

export async function onSubmitAction(
  prevState: FormState,
  data: ImportFormType
): Promise<FormState> {
  const { getUserId } = b4hSession();
  const userId = await getUserId();
  const groupId = data.group;

  try {
    console.log('data', data);

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
