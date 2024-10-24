'use server';

import { ACTION_DONE, ACTION_FAIL, ACTION_INVALID } from '@/utils/constants';
import { FormState } from '@/utils/formState';
import { b4hSession } from '@/utils/session';
import { addLabelFirestore, deleteLabelFirestore, updateLabelFirestore } from '@b4h/firestore';
import { LabelModel } from '@b4h/models';
import { labelFormSchema, LabelFormType } from './schema';

export async function onSubmitAction(
  prevState: FormState,
  data: LabelFormType
): Promise<FormState> {
  const { getUserId, getFavoriteGroupId } = b4hSession();

  const userId = getUserId();
  const parsed = labelFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: ACTION_INVALID,
      issues: [...new Set(parsed.error.issues.map(issue => issue.message))]
    };
  }

  try {
    const groupId = await getFavoriteGroupId();
    const label: Partial<LabelModel> = data;
    if (label.id) {
      await updateLabelFirestore(userId, groupId, label);
    } else {
      await addLabelFirestore(userId, groupId, label);
    }
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

export async function onDeleteAction(
  prevState: FormState,
  data: LabelFormType
): Promise<FormState> {
  const { getUserId, getFavoriteGroupId } = b4hSession();

  const userId = getUserId();
  const groupId = await getFavoriteGroupId();

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
