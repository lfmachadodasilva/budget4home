import { z } from 'zod';

export const labelFormSchema = z.object({
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
  icon: z.string().emoji({ message: 'contains non-emoji characters' })
});

export type LabelFormType = z.output<typeof labelFormSchema>;
