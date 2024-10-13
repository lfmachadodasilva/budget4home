'use client';

import { B4hButton } from '@/components/ui/button/button';
import { B4hForm } from '@/components/ui/form/form';
import { ACTION_DELETE, ACTION_DONE, ACTION_SUBMIT, DATE_TIME_FORMAT } from '@/utils/constants';
import { B4hRoutes } from '@/utils/routes';
import { ExpenseModel, ExpenseType, LabelModel } from '@b4h/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { HTMLProps, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { onDeleteAction, onSubmitAction } from './action';
import { expenseFormSchema, ExpenseFormType } from './schema';

interface B4hExpensesFormProps extends HTMLProps<HTMLDivElement> {
  expense?: ExpenseModel | null;
  labels: LabelModel[];
}

export const B4hExpensesForm = (props: B4hExpensesFormProps) => {
  const { push } = useRouter();
  const [state, formAction] = useFormState(onSubmitAction, {
    message: ''
  });
  const [deleteState, deleteFormAction] = useFormState(onDeleteAction, {
    message: ''
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ExpenseFormType>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      name: props.expense?.name ?? '',
      type: props.expense?.type ?? ExpenseType.outcoming,
      value: props.expense?.value,
      label: props.expense?.label ?? props.labels[0].id,
      comments: props.expense?.comments
    }
  });

  const onSubmit: SubmitHandler<ExpenseFormType> = async (data, event) => {
    const submitter = (event?.nativeEvent as SubmitEvent)?.submitter as HTMLButtonElement;

    event?.preventDefault();

    switch (submitter.name) {
      case ACTION_SUBMIT: {
        formAction({ ...props.expense, ...data });
        break;
      }
      case ACTION_DELETE:
        if (confirm('are you sure?')) {
          deleteFormAction({ ...props.expense, ...data });
        }
        break;
      default:
        console.error('invalid submit action');
        break;
    }
  };

  useEffect(() => {
    if (state.message === ACTION_DONE || deleteState.message === ACTION_DONE) {
      push(B4hRoutes.expenses);
    }
  }, [state, deleteState]);

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
          {errors.type && <B4hForm.LabelError>{errors.type.message}</B4hForm.LabelError>}
        </B4hForm.Field>

        <B4hForm.Field>
          <B4hForm.Label htmlFor="name">name</B4hForm.Label>
          <B4hForm.Input type="text" defaultValue={props.expense?.name} {...register('name')} />
          {errors.name && <B4hForm.LabelError>{errors.name.message}</B4hForm.LabelError>}
        </B4hForm.Field>

        <B4hForm.Field>
          <B4hForm.Label htmlFor="value">value</B4hForm.Label>
          <B4hForm.Input
            type="number"
            min={1}
            {...register('value', {
              setValueAs: value => (value === '' ? undefined : parseInt(value, 10))
            })}
          />
          {errors.value && <B4hForm.LabelError>{errors.value.message}</B4hForm.LabelError>}
        </B4hForm.Field>

        <B4hForm.Field>
          <B4hForm.Label htmlFor="date">date</B4hForm.Label>
          <B4hForm.Input
            type="datetime-local"
            {...register('date')}
            defaultValue={format(
              props.expense?.date ? new Date(props.expense?.date) : new Date(),
              DATE_TIME_FORMAT
            )}
          />
          {errors.date && <B4hForm.LabelError>{errors.date.message}</B4hForm.LabelError>}
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
          {errors.label && <B4hForm.LabelError>{errors.label.message}</B4hForm.LabelError>}
        </B4hForm.Field>

        <B4hForm.Field>
          <B4hForm.Label htmlFor="comments">comments</B4hForm.Label>
          <B4hForm.TextArea type="text" rows={2} {...register('comments')} />
        </B4hForm.Field>

        <B4hForm.Actions>
          <B4hButton type="submit" name={ACTION_SUBMIT} loading={isSubmitting}>
            {title}
          </B4hButton>
          {!props.expense && (
            <B4hButton type="submit" buttonType="secondary" name="pile" loading={isSubmitting}>
              pile
            </B4hButton>
          )}
          {props.expense && (
            <B4hButton
              type="submit"
              buttonType="delete"
              name={ACTION_DELETE}
              loading={isSubmitting}
            >
              delete
            </B4hButton>
          )}
        </B4hForm.Actions>
      </B4hForm.Root>
    </>
  );
};
