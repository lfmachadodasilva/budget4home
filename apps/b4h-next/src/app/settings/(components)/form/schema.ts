import { FORM_MAX_LENGTH, FORM_MIN_LENGTH } from '@/utils/constants';
import { z } from 'zod';

export const labelFormSchema = z.object({
  id: z.string().optional().nullable(),
  email: z.string().email().optional().nullable(),
  name: z
    .string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string'
    })
    .trim()
    .min(FORM_MIN_LENGTH, `name is too short, min ${FORM_MIN_LENGTH} characters`)
    .max(FORM_MAX_LENGTH, `name is too long, max ${FORM_MAX_LENGTH} characters`)
    .optional()
    .nullable(),
  photoUrl: z
    .string({
      required_error: 'photo url is required',
      invalid_type_error: 'photo url must be a emoji'
    })
    .url('photo url must be a url')
    .nullable()
    .optional()
});

export type LabelFormType = z.output<typeof labelFormSchema>;
