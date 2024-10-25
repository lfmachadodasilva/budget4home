'use server';

import { ACTION_DONE, ACTION_FAIL, ACTION_INVALID } from '@/utils/constants';
import { FormState } from '@/utils/formState';
import { b4hSession } from '@/utils/session';
import { cleanGroupsCache } from '@/utils/session.actions';
import { addGroupFirestore, updateGroupFirestore } from '@b4h/firestore';
import { GroupModel } from '@b4h/models';
import { GroupFormType, groupFormSchema } from '../schema';

export async function onSubmitAction(
  prevState: FormState,
  data: GroupFormType
): Promise<FormState> {
  const { getUserId } = b4hSession();
  const userId = getUserId();

  const parsed = groupFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: ACTION_INVALID,
      issues: [...new Set(parsed.error.issues.map(issue => issue.message))]
    };
  }

  try {
    const group: Partial<GroupModel> = data;
    if (group.id) {
      await updateGroupFirestore(userId, group);
    } else {
      await addGroupFirestore(userId, group);
    }
    await cleanGroupsCache();
    // revalidatePath(B4hRoutes.groups, 'page');

    return {
      message: ACTION_DONE
    };
  } catch (err) {
    console.error(err);
    return {
      message: ACTION_FAIL
    } as FormState;
  }
}