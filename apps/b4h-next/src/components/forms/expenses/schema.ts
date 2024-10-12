import { ExpenseType } from '@b4h/models';
import { z } from 'zod';

export const expenseFormSchema = z.object({
  type: z
    .string()
    .trim()
    .refine(val => val !== ExpenseType.incoming || val !== ExpenseType.outcoming, {
      message: 'type is invalid'
    }),
  name: z
    .string()
    .trim()
    .min(1, {
      message: 'name is required'
    })
    .min(3, {
      message: 'name is too short, min 3 characters'
    })
    .max(100, {
      message: 'name is too long, max 100 characters'
    }),
  value: z
    .number({
      message: 'value is required'
    })
    .min(1, {
      message: 'value is too short, min 1'
    }),
  date: z.coerce.date(),
  label: z.string().trim().min(1, { message: 'label is required' }),
  comments: z.string().trim().optional()
});

export type ExpenseFormType = z.output<typeof expenseFormSchema>;
