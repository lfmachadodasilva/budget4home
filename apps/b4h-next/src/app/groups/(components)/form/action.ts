'use server';

import { ACTION_DONE, ACTION_FAIL, ACTION_INVALID } from '@/utils/constants';
import { b4hSession } from '@/utils/session';
import { addGroupFirestore, deleteGroupFirestore, updateGroupFirestore } from '@b4h/firestore';
import { GroupModel } from '@b4h/models';
import { groupFormSchema, GroupFormType } from './schema';

export type FormState = {
  message: string;
  issues?: string[];
};

export async function onSubmitAction(
  prevState: FormState,
  data: GroupFormType
): Promise<FormState> {
  const { getUserUid, cleanGroupsCache } = b4hSession();
  const userId = getUserUid();

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
    cleanGroupsCache();

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
  const { getUserUid, cleanGroupsCache, getFavoriteGroupId, setFavoriteGroupId } = b4hSession();
  const userId = getUserUid();
  const groupId = await getFavoriteGroupId();

  try {
    const group: Partial<GroupModel> = data;

    await deleteGroupFirestore(userId, group.id as string);
    cleanGroupsCache();

    if (groupId === group.id) {
      setFavoriteGroupId(null);
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

export async function onFavoriteAction(
  prevState: FormState,
  data: GroupFormType
): Promise<FormState> {
  const { setFavoriteGroupId } = b4hSession();

  try {
    const group: Partial<GroupModel> = data;
    await setFavoriteGroupId(group.id as string);

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
