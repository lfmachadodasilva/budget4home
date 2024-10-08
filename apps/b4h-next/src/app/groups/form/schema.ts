import { z } from 'zod';

export const groupFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, {
      message: 'name is required'
    })
    .min(4, {
      message: 'name is too short, min 4 characters'
    })
    .max(100, {
      message: 'name is too long, max 100 characters'
    }),
  userIds: z
    .array(
      z
        .string()
        .trim()
        .min(4, { message: 'user is too short, min 4 characters' })
        .max(256, { message: 'user is too long, max 256 characters' })
    )
    .nonempty({ message: 'at least one user is required' })
});

export type GroupFormType = z.output<typeof groupFormSchema>;
