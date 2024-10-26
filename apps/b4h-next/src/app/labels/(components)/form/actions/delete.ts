'use server';

import { ACTION_DONE, ACTION_FAIL } from '@/utils/constants';
import { FormState } from '@/utils/formState';
import { b4hSession } from '@/utils/session';
import { deleteLabelFirestore } from '@b4h/firestore';
import { LabelModel } from '@b4h/models';
import { LabelFormType } from '../schema';

export async function onDeleteAction(
  prevState: FormState,
  data: LabelFormType
): Promise<FormState> {
  const { getFavoriteGroupId } = b4hSession();
  const { userId, groupId } = await getFavoriteGroupId();

  try {
    const label: Partial<LabelModel> = data;
    await deleteLabelFirestore(userId, groupId, label.id as string);
    // revalidatePath(B4hRoutes.labels, 'page');

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
