'use server';

import { ACTION_DONE, ACTION_FAIL } from '@/utils/constants';
import { FormState } from '@/utils/formState';
import { setFavoriteGroupIdSession } from '@/utils/session.actions';
import { GroupModel } from '@b4h/models';
import { GroupFormType } from '../schema';

export async function onFavoriteAction(
  prevState: FormState,
  data: GroupFormType
): Promise<FormState> {
  try {
    const group: Partial<GroupModel> = data;
    await setFavoriteGroupIdSession(group.id as string);

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
