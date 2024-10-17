import { removeNullAndUndefined } from '@/utils/transform';
import { ExpenseModel, ExpenseType } from '@b4h/models';
import { toNumber } from 'lodash';
import { z } from 'zod';

export const expenseFormSchema = z.object({
  id: z.string().nullable().optional(),
  type: z
    .string()
    .trim()
    .refine(val => val !== ExpenseType.incoming || val !== ExpenseType.outcoming, {
      message: 'type is invalid'
    }),
  name: z
    .string()
    .trim()
    .min(1, 'name is required')
    .min(3, 'name is too short, min 3 characters')
    .max(100, 'name is too long, max 100 characters'),
  value: z
    .number({
      required_error: 'value is required',
      invalid_type_error: 'value must be a number'
    })
    .positive()
    .min(1, 'value is too short, min 1'),
  date: z.coerce.date(),
  label: z.string().trim().min(1, 'label is required'),
  comments: z.string().trim().optional(),
  scheduled: z.preprocess(x => parseInt(x as string, 10), z.number().positive().min(1).max(12))
});

export type ExpenseFormType = z.output<typeof expenseFormSchema>;

export const expenseTypeToModel = (type: ExpenseFormType): ExpenseModel => {
  const model = {
    ...type,
    scheduled: type.scheduled === 1 ? undefined : `1/${type.scheduled}`
  } as ExpenseModel;
  return removeNullAndUndefined(model);
};

export const expenseModelToType = (model: ExpenseModel): ExpenseFormType => {
  return {
    id: model.id,
    name: model.name,
    value: model.value,
    date: model.date,
    label: model.label,
    comments: model.comments,
    scheduled: toNumber(model.scheduled?.split('/')[1])
  } as ExpenseFormType;
};
