import { FORM_MAX_LENGTH, FORM_MIN_LENGTH } from '@/utils/constants';
import { z } from 'zod';

export const groupFormSchema = z.object({
  name: z
    .string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string'
    })
    .trim()
    .min(FORM_MIN_LENGTH, `name is too short, min ${FORM_MIN_LENGTH} characters`)
    .max(FORM_MAX_LENGTH, `name is too long, max ${FORM_MAX_LENGTH} characters`),
  userIds: z
    .array(
      z
        .string()
        .trim()
        .min(FORM_MIN_LENGTH, `user is too short, min ${FORM_MIN_LENGTH} characters`)
        .max(FORM_MAX_LENGTH, `user is too long, max ${FORM_MAX_LENGTH} characters`)
    )
    .nonempty('at least one user is required')
});

export type GroupFormType = z.output<typeof groupFormSchema>;
