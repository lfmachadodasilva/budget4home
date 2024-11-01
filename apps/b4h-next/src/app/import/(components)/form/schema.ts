import { FORM_MAX_LENGTH, FORM_MIN_LENGTH } from '@/utils/constants';
import { z } from 'zod';

export const importFormSchema = z.object({
  group: z
    .string({
      required_error: 'group is required',
      invalid_type_error: 'group must be a string'
    })
    .trim()
    .min(FORM_MIN_LENGTH, `group is too short, min ${FORM_MIN_LENGTH} characters`)
    .max(FORM_MAX_LENGTH, `group is too long, max ${FORM_MAX_LENGTH} characters`),
  file: z
    .instanceof(File)
    .refine(
      file => ['application/json', 'text/csv'].includes(file.type),
      'Only JSON or CSV files are allowed'
    ),

  format: z.enum(['budget4home', 'csv'])
});

export type ImportFormType = z.output<typeof importFormSchema>;
