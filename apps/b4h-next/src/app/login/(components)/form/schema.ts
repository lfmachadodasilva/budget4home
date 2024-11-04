import { FORM_MAX_LENGTH, FORM_MIN_LENGTH } from '@/utils/constants';
import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z
    .string({
      required_error: 'email is required',
      invalid_type_error: 'email must be a string'
    })
    .min(FORM_MIN_LENGTH, `name is too short, min ${FORM_MIN_LENGTH} characters`)
    .max(FORM_MAX_LENGTH, `name is too long, max ${FORM_MAX_LENGTH} characters`),
  password: z
    .string({
      required_error: 'password is required',
      invalid_type_error: 'password must be a string'
    })
    .min(FORM_MIN_LENGTH, `name is too short, min ${FORM_MIN_LENGTH} characters`)
    .max(FORM_MAX_LENGTH, `name is too long, max ${FORM_MAX_LENGTH} characters`)
});

export type LoginFormType = z.output<typeof loginFormSchema>;
