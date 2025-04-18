'use server';

import { ACTION_DONE, ACTION_FAIL, ACTION_INVALID, FETCH_LABELS } from '@/utils/constants';
import { FormState } from '@/utils/formState';
import { B4hRoutes } from '@/utils/routes';
import { b4hSession } from '@/utils/session';
import { addLabelFirestore, updateLabelFirestore } from '@b4h/firestore';
import { LabelModel } from '@b4h/models';
import { revalidatePath, revalidateTag } from 'next/cache';
import { LabelFormType, labelFormSchema } from '../schema';

export async function onSubmitAction(
  prevState: FormState,
  data: LabelFormType
): Promise<FormState> {
  const { getFavoriteGroupId } = b4hSession();

  const { userId, groupId } = await getFavoriteGroupId();
  const parsed = labelFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: ACTION_INVALID,
      issues: [...new Set(parsed.error.issues.map(issue => issue.message))]
    };
  }

  revalidatePath(B4hRoutes.labels, 'page');

  try {
    const label: Partial<LabelModel> = data;
    if (label.id) {
      await updateLabelFirestore(userId, groupId, label);
    } else {
      await addLabelFirestore(userId, groupId, label);
    }
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
