import { ExpenseType } from '@b4h/models';
import { date, z } from 'zod';

export const expenseFormSchema = z.object({
  type: z.enum([ExpenseType.incoming, ExpenseType.outcoming]),
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
  value: z.number().min(1, {
    message: "value can't be zero"
  }),
  date: z.date(),
  label: z.string().uuid(),
  comments: z.string().optional()
});

export type ExpenseFormType = z.output<typeof expenseFormSchema>;
