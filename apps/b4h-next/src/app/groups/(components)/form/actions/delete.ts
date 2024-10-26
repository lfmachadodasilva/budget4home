'use server';

import { ACTION_DONE, ACTION_FAIL } from '@/utils/constants';
import { FormState } from '@/utils/formState';
import { b4hSession } from '@/utils/session';
import { cleanGroupsCache, setFavoriteGroupIdSession } from '@/utils/session.actions';
import { deleteGroupFirestore } from '@b4h/firestore';
import { GroupModel } from '@b4h/models';
import { GroupFormType } from '../schema';

export async function onDeleteAction(
  prevState: FormState,
  data: GroupFormType
): Promise<FormState> {
  const { getFavoriteGroupId } = b4hSession();
  const { userId, groupId } = await getFavoriteGroupId();

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
  // revalidatePath(B4hRoutes.groups, 'page');

  if (groupId === group.id) {
    await setFavoriteGroupIdSession(null);
  }

  return {
    message: ACTION_DONE
  } as FormState;
}
