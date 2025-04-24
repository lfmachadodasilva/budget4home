import {
  DATE_TIME_FORMAT,
  DATE_TIME_FORMAT_REGEX,
  FORM_MAX_LENGTH,
  FORM_MAX_LONG_LENGTH,
  FORM_MIN_LENGTH
} from '@/utils/constants';
import { removeNullAndUndefined } from '@/utils/transform';
import { ExpenseModel, ExpenseType } from '@b4h/models';
import { format } from 'date-fns';
import { toNumber } from 'lodash';
import { z } from 'zod';

export const expenseFormSchema = z.object({
  id: z.string().nullable().optional(),
  type: z
    .string({
      required_error: 'type is required',
      invalid_type_error: 'type must be a string'
    })
    .trim()
    .refine(val => val !== ExpenseType.incoming || val !== ExpenseType.outcoming, {
      message: 'type is invalid'
    }),
  name: z
    .string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string'
    })
    .trim()
    .min(FORM_MIN_LENGTH, `name is too short, min ${FORM_MIN_LENGTH} characters`)
    .max(FORM_MAX_LENGTH, `name is too long, max ${FORM_MAX_LENGTH} characters`),
  value: z
    .number({
      required_error: 'value is required',
      invalid_type_error: 'value must be a number'
    })
    .positive()
    .min(1, 'value is too short, min 1'),
  date: z
    .string({
      required_error: 'date is required',
      invalid_type_error: 'date must be a string'
    })
    .regex(DATE_TIME_FORMAT_REGEX, { message: `date is invalid. format: ${DATE_TIME_FORMAT}` }),
  label: z.string().trim().min(1, 'label is required'),
  comments: z
    .string()
    .trim()
    .max(FORM_MAX_LONG_LENGTH, `comments is too long, max ${FORM_MAX_LONG_LENGTH} characters`)
    .optional()
    .nullable(),
  scheduled: z.preprocess(
    x => parseInt(x as string, 10),
    z.number().positive().min(1).max(12)
  ) as z.ZodEffects<z.ZodNumber, number, number>,
  parent: z.string().nullable().optional()
});

export type ExpenseFormType = z.output<typeof expenseFormSchema>;

export const expenseTypeToModel = (type: ExpenseFormType): ExpenseModel => {
  const model = {
    ...type,
    date: new Date(type.date),
    scheduled: type.scheduled === 1 ? undefined : `1/${type.scheduled}`
  } as ExpenseModel;
  return removeNullAndUndefined(model);
};

export const expenseModelToType = (model: ExpenseModel): ExpenseFormType => {
  return {
    ...model,
    date: format(model.date, DATE_TIME_FORMAT),
    scheduled: toNumber(model.scheduled?.split('/')[1])
  } as ExpenseFormType;
};
