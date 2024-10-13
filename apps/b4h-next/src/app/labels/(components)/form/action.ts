'use server';

import { ACTION_DONE, ACTION_FAIL, ACTION_INVALID } from '@/utils/constants';
import { useB4hSession } from '@/utils/hooks/useB4hSession';
import { addLabelFirestore, deleteLabelFirestore, updateLabelFirestore } from '@b4h/firestore';
import { LabelModel } from '@b4h/models';
import { labelFormSchema, LabelFormType } from './schema';

export type FormState = {
  message: string;
  issues?: string[];
};

export async function onSubmitAction(
  prevState: FormState,
  data: LabelFormType
): Promise<FormState> {
  const { userId, getGroupId } = useB4hSession();
  const parsed = labelFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: ACTION_INVALID,
      issues: [...new Set(parsed.error.issues.map(issue => issue.message))]
    };
  }

  try {
    const groupId = await getGroupId();
    const label: Partial<LabelModel> = data;
    if (label.id) {
      updateLabelFirestore(userId, groupId, label);
    } else {
      addLabelFirestore(userId, groupId, label);
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

export async function onDeleteAction(
  prevState: FormState,
  data: LabelFormType
): Promise<FormState> {
  const { userId, getGroupId } = useB4hSession();
  const groupId = await getGroupId();

  try {
    const label: Partial<LabelModel> = data;
    await deleteLabelFirestore(userId, groupId, label.id as string);

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
