'use server';

import { ACTION_DONE, ACTION_FAIL, FETCH_GROUPS } from '@/utils/constants';
import { FormState } from '@/utils/formState';
import { B4hRoutes } from '@/utils/routes';
import { b4hSession } from '@/utils/session';
import { cleanGroupsCache, setFavoriteGroupIdSession } from '@/utils/session.actions';
import { deleteGroupFirestore } from '@b4h/firestore';
import { GroupModel } from '@b4h/models';
import { revalidatePath, revalidateTag } from 'next/cache';
import { GroupFormType } from '../schema';

export async function onDeleteAction(
  prevState: FormState,
  data: GroupFormType
): Promise<FormState> {
  const { getFavoriteGroupId } = b4hSession();
  const { userId, groupId } = await getFavoriteGroupId();

  revalidatePath(B4hRoutes.groups, 'page');
  revalidateTag(FETCH_GROUPS);

  const group: Partial<GroupModel> = data;

  try {
    await deleteGroupFirestore(userId, group.id as string);
  } catch (err) {
    console.error(err);
    return {
      message: ACTION_FAIL
    } as FormState;
  }
  await cleanGroupsCache();

  if (groupId === group.id) {
    await setFavoriteGroupIdSession(null);
  }

  return {
    message: ACTION_DONE
  } as FormState;
}
