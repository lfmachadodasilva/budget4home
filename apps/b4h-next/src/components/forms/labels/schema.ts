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
  icon: z
    .string()
    .trim()
    .emoji()
    .min(1, {
      message: 'icon is required'
    })
    .max(100, { message: 'icon is too long, max 100 characters' })
});

export type LabelFormType = z.output<typeof labelFormSchema>;
