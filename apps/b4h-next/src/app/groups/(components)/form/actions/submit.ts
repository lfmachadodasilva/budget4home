'use server';

import { ACTION_DONE, ACTION_FAIL, ACTION_INVALID, FETCH_GROUPS } from '@/utils/constants';
import { FormState } from '@/utils/formState';
import { B4hRoutes } from '@/utils/routes';
import { b4hSession } from '@/utils/session';
import { cleanGroupsCache } from '@/utils/session.actions';
import { addGroupFirestore, updateGroupFirestore } from '@b4h/firestore';
import { GroupModel } from '@b4h/models';
import { revalidatePath, revalidateTag } from 'next/cache';
import { GroupFormType, groupFormSchema } from '../schema';

export async function onSubmitAction(
  prevState: FormState,
  data: GroupFormType
): Promise<FormState> {
  const { getUserId } = b4hSession();
  const userId = await getUserId();
  const parsed = groupFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: ACTION_INVALID,
      issues: [...new Set(parsed.error.issues.map(issue => issue.message))]
    };
  }

  revalidatePath(B4hRoutes.labels, 'page');
  revalidateTag(FETCH_GROUPS);

  try {
    const group: Partial<GroupModel> = data;
    if (group.id) {
      await updateGroupFirestore(userId, group);
    } else {
      await addGroupFirestore(userId, group);
    }
    await cleanGroupsCache();

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
