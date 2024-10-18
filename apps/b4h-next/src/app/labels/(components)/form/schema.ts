import { FORM_MAX_LENGTH, FORM_MAX_LONG_LENGTH, FORM_MIN_LENGTH } from '@/utils/constants';
import { z } from 'zod';

export const labelFormSchema = z.object({
  name: z
    .string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string'
    })
    .trim()
    .min(FORM_MIN_LENGTH, `name is too short, min ${FORM_MIN_LENGTH} characters`)
    .max(FORM_MAX_LENGTH, `name is too long, max ${FORM_MAX_LENGTH} characters`),
  icon: z
    .string({
      required_error: 'icon is required',
      invalid_type_error: 'icon must be a emoji'
    })
    .emoji('icon must be a emoji'),
  keys: z
    .string()
    .max(FORM_MAX_LONG_LENGTH, `key is too long, max ${FORM_MAX_LONG_LENGTH} characters`)
    .optional()
});

export type LabelFormType = z.output<typeof labelFormSchema>;
