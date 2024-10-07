'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { B4hForm } from '../../components/ui/form/form';
import { useRouter } from 'next/navigation';
import { HTMLProps } from 'react';
import { ExpenseModel, ExpenseType, LabelModel } from '@b4h/models';
import { B4hButton } from '../../components/ui/button/button';
import { format } from 'date-fns';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { B4hRoutes } from '../../utils/routes';
import styles from './expenses.module.scss';

type ExpenseForm = {
  type: typeof ExpenseType;
  name: string;
  value: number;
  date: Date;
  label: string;
  comments?: string;
};

interface B4hExpensesFormProps extends HTMLProps<HTMLDivElement> {
  expense?: Partial<ExpenseModel>;
  labels: LabelModel[];
}

export const B4hExpensesForm = (props: B4hExpensesFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ExpenseForm>();

  const { push } = useRouter();

  const onSubmit: SubmitHandler<ExpenseForm> = async (data, event) => {
    event?.preventDefault();

    // TODO
    // push(B4hRoutes.home);
    console.log(data);
  };

  const title = props.expense ? 'update expense' : 'add expense';

  return (
    <>
      <B4hForm.Title>
        <B4hForm.Return href={B4hRoutes.expenses} />
        {title}
      </B4hForm.Title>
      <B4hForm.Root onSubmit={handleSubmit(onSubmit)}>
        <B4hForm.Field>
          <B4hForm.Label htmlFor="type">type</B4hForm.Label>
          <B4hForm.Select defaultValue={ExpenseType.outcoming} {...register('type')}>
            <B4hForm.Option value={ExpenseType.outcoming}>{ExpenseType.outcoming}</B4hForm.Option>
            <B4hForm.Option value={ExpenseType.incoming}>{ExpenseType.incoming}</B4hForm.Option>
          </B4hForm.Select>
        </B4hForm.Field>

        <B4hForm.Field>
          <B4hForm.Label htmlFor="name">name</B4hForm.Label>
          <B4hForm.Input
            type="text"
            defaultValue={props.expense?.name}
            {...register('name', {
              required: 'value is required',
              minLength: { value: 4, message: 'name is too short. min 4 characters' },
              maxLength: { value: 256, message: 'name is too long. max 256 characters' }
            })}
          />
          {errors.name && <B4hForm.LabelError>{errors.name.message}</B4hForm.LabelError>}
        </B4hForm.Field>

        <B4hForm.Field>
          <B4hForm.Label htmlFor="value">value</B4hForm.Label>
          <B4hForm.Input
            type="text"
            defaultValue={props.expense?.value}
            {...register('value', {
              required: 'value is required',
              min: { value: 0.1, message: 'value must be greater than 0' }
            })}
          />
          {errors.value && <B4hForm.LabelError>{errors.value.message}</B4hForm.LabelError>}
        </B4hForm.Field>

        <B4hForm.Field>
          <B4hForm.Label htmlFor="date">date</B4hForm.Label>
          <B4hForm.Input
            type="datetime-local"
            defaultValue={format(
              props.expense?.date ? new Date(props.expense?.date) : new Date(),
              "yyyy-MM-dd'T'HH:mm"
            )}
            {...register('date')}
          />
        </B4hForm.Field>

        <B4hForm.Field>
          <B4hForm.Label htmlFor="label">label</B4hForm.Label>
          <B4hForm.Select defaultValue={ExpenseType.outcoming} {...register('label')}>
            {props.labels?.map(label => (
              <B4hForm.Option key={label.id} value={label.id}>
                {label.icon} {label.name}
              </B4hForm.Option>
            ))}
          </B4hForm.Select>
        </B4hForm.Field>

        <B4hForm.Field>
          <B4hForm.Label htmlFor="comments">comments</B4hForm.Label>
          <B4hForm.TextArea
            rows={5}
            defaultValue={props.expense?.comments}
            {...register('comments')}
          />
        </B4hForm.Field>

        <B4hForm.Actions>
          <B4hButton type="submit" loading={isSubmitting}>
            {title}
          </B4hButton>
        </B4hForm.Actions>
      </B4hForm.Root>
    </>
  );
};
