'use server';

import { addGroupFirestore, deleteGroupFirestore, updateGroupFirestore } from '@b4h/firestore';
import { GroupModel } from '@b4h/models';
import { ACTION_DONE, ACTION_FAIL, ACTION_INVALID } from '../../../../utils/constants';
import { useB4hSession } from '../../../../utils/hooks/useB4hSession';
import { groupFormSchema, GroupFormType } from './schema';

export type FormState = {
  message: string;
  issues?: string[];
};

export async function onSubmitAction(
  prevState: FormState,
  data: GroupFormType
): Promise<FormState> {
  const { userId } = useB4hSession();

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
      updateGroupFirestore(userId, group);
    } else {
      addGroupFirestore(userId, group);
    }
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

export async function onDeleteAction(
  prevState: FormState,
  data: GroupFormType
): Promise<FormState> {
  const { userId } = useB4hSession();

  try {
    const group: Partial<GroupModel> = data;
    await deleteGroupFirestore(userId, group.id as string);

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
