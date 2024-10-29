'use server';

import { ACTION_DONE, ACTION_FAIL, FETCH_LABELS } from '@/utils/constants';
import { FormState } from '@/utils/formState';
import { b4hSession } from '@/utils/session';
import { deleteLabelFirestore } from '@b4h/firestore';
import { LabelModel } from '@b4h/models';
import { revalidateTag } from 'next/cache';
import { LabelFormType } from '../schema';

export async function onDeleteAction(
  prevState: FormState,
  data: LabelFormType
): Promise<FormState> {
  const { getFavoriteGroupId } = b4hSession();
  const { userId, groupId } = await getFavoriteGroupId();
  // revalidatePath(B4hRoutes.labels, 'page');

  try {
    const label: Partial<LabelModel> = data;
    await deleteLabelFirestore(userId, groupId, label.id as string);
  } catch (err) {
    console.error(err);
    return {
      message: ACTION_FAIL
    } as FormState;
  }

  revalidateTag(FETCH_LABELS);

  return {
    message: ACTION_DONE
  } as FormState;
}
