import { FORM_MAX_LENGTH, FORM_MIN_LENGTH } from '@/utils/constants';
import { z } from 'zod';

export const registerFormSchema = z
  .object({
    email: z
      .string({
        required_error: 'email is required',
        invalid_type_error: 'email must be a string'
      })
      .min(FORM_MIN_LENGTH, `name is too short, min ${FORM_MIN_LENGTH} characters`)
      .max(FORM_MAX_LENGTH, `name is too long, max ${FORM_MAX_LENGTH} characters`),
    password1: z
      .string({
        required_error: 'password is required',
        invalid_type_error: 'password must be a string'
      })
      .min(FORM_MIN_LENGTH, `name is too short, min ${FORM_MIN_LENGTH} characters`)
      .max(FORM_MAX_LENGTH, `name is too long, max ${FORM_MAX_LENGTH} characters`),
    password2: z
      .string({
        required_error: 'password is required',
        invalid_type_error: 'password must be a string'
      })
      .min(FORM_MIN_LENGTH, `name is too short, min ${FORM_MIN_LENGTH} characters`)
      .max(FORM_MAX_LENGTH, `name is too long, max ${FORM_MAX_LENGTH} characters`)
  })
  .refine(data => data.password1 === data.password2, {
    message: 'passwords must match',
    path: ['password2'] // This points to the field causing the error
  });

export type RegisterFormType = z.output<typeof registerFormSchema>;
