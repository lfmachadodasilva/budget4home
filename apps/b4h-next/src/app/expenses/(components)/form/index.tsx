'use client';

import { B4hButton } from '@/components/ui/button/button';
import { B4hForm } from '@/components/ui/form/form';
import { ACTION_DELETE, ACTION_DONE, ACTION_SUBMIT, DATE_TIME_FORMAT } from '@/utils/constants';
import { selectLabelByExpenseName } from '@/utils/label';
import { B4hRoutes } from '@/utils/routes';
import { ExpenseModel, ExpenseType, LabelModel } from '@b4h/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { addMonths, format } from 'date-fns';
import { PrefetchKind } from 'next/dist/client/components/router-reducer/router-reducer-types';
import { useRouter } from 'next/navigation';
import { HTMLProps, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { B4hExpensePreview } from '../preview/preview';
import { onDeleteAction, onSubmitAction } from './actions';
import { expenseFormSchema, ExpenseFormType, expenseTypeToModel } from './schema';

interface B4hExpensesFormProps extends HTMLProps<HTMLDivElement> {
  expense?: ExpenseModel | null;
  labels: LabelModel[];
}

export const B4hExpensesForm = (props: B4hExpensesFormProps) => {
  const { push, prefetch } = useRouter();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [state, formAction] = useFormState(onSubmitAction, {
    message: ''
  });
  const [deleteState, deleteFormAction] = useFormState(onDeleteAction, {
    message: ''
  });
  const [preview, setPreview] = useState<ExpenseModel[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<ExpenseFormType>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      ...props.expense,
      type: props.expense?.type ?? ExpenseType.outcoming,
      label: props.expense?.label ?? props.labels[0]?.id,
      scheduled: props.expense?.scheduled ? parseInt(props.expense?.scheduled.split('/')[1], 10) : 1
    }
  });

  const onSubmit: SubmitHandler<ExpenseFormType> = async (data, event) => {
    const submitter = (event?.nativeEvent as SubmitEvent)?.submitter as HTMLButtonElement;

    event?.preventDefault();

    let expenses: ExpenseModel[] = [];

    switch (submitter.name) {
      case ACTION_SUBMIT:
        setIsLoading(ACTION_SUBMIT);
        formAction({ id: props.expense?.id, ...data });
        break;

      case ACTION_DELETE:
        if (confirm('are you sure?')) {
          setIsLoading(ACTION_DELETE);
          deleteFormAction({ ...props.expense, ...data });
        }
        break;

      case 'pile':
        if (data.scheduled > 1) {
          // create temporary id
          data.id = Math.random().toString();

          const parentExpense = expenseTypeToModel(data);
          // create schedule expenses
          expenses = Array.from(Array(data.scheduled - 1).keys()).map((_, index) => {
            return {
              ...parentExpense,
              date: addMonths(data.date, index + 1),
              scheduled: `${index + 2}/${data.scheduled}`,
              parent: data.id
            } as ExpenseModel;
          });
        }

        setPreview(x => {
          x = [...x, expenseTypeToModel(data), ...expenses];
          return x;
        });
        break;

      default:
        console.error('invalid submit action');
        break;
    }
  };

  useEffect(() => {
    setIsLoading(null);
    if (state.message === ACTION_DONE || deleteState.message === ACTION_DONE) {
      prefetch(B4hRoutes.expenses, {
        kind: PrefetchKind.FULL
      });
      push(B4hRoutes.expenses);
    }
  }, [state, deleteState, push, prefetch]);

  useEffect(() => {
    // update label by expense name
    const subscription = watch((value, { name }) => {
      if (name === 'name' && value.name && value.name.length > 3) {
        const label = selectLabelByExpenseName(props.labels, value.name);
        if (label) {
          setValue('label', label.id);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, props.labels, setValue]);

  const title = props.expense ? 'update expense' : 'add expense';
  const scheduled = Array.from(Array(12).keys()).map((_, index) => {
    index++;
    return {
      key: index,
      value: `${index} month${index === 1 ? '' : 's'}`
    };
  });

  return (
    <>
      <B4hForm.Title>
        <B4hForm.Return href={B4hRoutes.expenses} />
        {title}
      </B4hForm.Title>
      <B4hForm.Root onSubmit={handleSubmit(onSubmit)}>
        <B4hForm.Field>
          <B4hForm.Label htmlFor="type">type</B4hForm.Label>
          <B4hForm.Select {...register('type')} disabled={!!isLoading}>
            <B4hForm.Option value={ExpenseType.outcoming}>{ExpenseType.outcoming}</B4hForm.Option>
            <B4hForm.Option value={ExpenseType.incoming}>{ExpenseType.incoming}</B4hForm.Option>
          </B4hForm.Select>
          <B4hForm.LabelError>{errors?.type?.message}</B4hForm.LabelError>
        </B4hForm.Field>

        <B4hForm.Field>
          <B4hForm.Label htmlFor="name">name</B4hForm.Label>
          <B4hForm.Input type="text" {...register('name')} disabled={!!isLoading} />
          <B4hForm.LabelError>{errors?.name?.message}</B4hForm.LabelError>
        </B4hForm.Field>

        <B4hForm.Field>
          <B4hForm.Label htmlFor="value">value</B4hForm.Label>
          <B4hForm.Input
            type="number"
            min={1}
            {...register('value', {
              setValueAs: value => (value === '' ? undefined : parseInt(value, 10))
            })}
            disabled={!!isLoading}
          />
          <B4hForm.LabelError>{errors?.value?.message}</B4hForm.LabelError>
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
            disabled={!!isLoading}
          />
          <B4hForm.LabelError>{errors?.date?.message}</B4hForm.LabelError>
        </B4hForm.Field>

        <B4hForm.Field>
          <B4hForm.Label htmlFor="label">label</B4hForm.Label>
          <B4hForm.Select {...register('label')} disabled={!!isLoading}>
            {props.labels?.map(label => (
              <B4hForm.Option key={label.id} value={label.id}>
                {label.icon} {label.name}
              </B4hForm.Option>
            ))}
          </B4hForm.Select>
          <B4hForm.LabelError>{errors?.label?.message}</B4hForm.LabelError>
        </B4hForm.Field>

        <B4hForm.Field>
          <B4hForm.Label htmlFor="comments">comments</B4hForm.Label>
          <B4hForm.TextArea type="text" rows={2} {...register('comments')} disabled={!!isLoading} />
          <B4hForm.LabelError>{errors?.comments?.message}</B4hForm.LabelError>
        </B4hForm.Field>

        {!props?.expense?.id && (
          <B4hForm.Field>
            <B4hForm.Label htmlFor="type">scheduled</B4hForm.Label>
            <B4hForm.Select {...register('scheduled')} disabled={!!isLoading}>
              {scheduled.map(x => (
                <B4hForm.Option key={x.key} value={x.key}>
                  {x.value}
                </B4hForm.Option>
              ))}
            </B4hForm.Select>
            <B4hForm.LabelError>{errors?.scheduled?.message}</B4hForm.LabelError>
          </B4hForm.Field>
        )}

        <B4hForm.Actions>
          {preview.length === 0 && (
            <B4hButton type="submit" name={ACTION_SUBMIT} loading={isLoading === ACTION_SUBMIT}>
              {title}
            </B4hButton>
          )}
          {!props.expense && (
            <B4hButton
              type="submit"
              buttonType={preview.length === 0 ? 'secondary' : 'primary'}
              name="pile"
              widthFit={preview.length > 0}
            >
              {preview.length === 0 ? 'pile' : 'add'}
            </B4hButton>
          )}
          {props.expense && (
            <B4hButton
              type="submit"
              buttonType="delete"
              name={ACTION_DELETE}
              loading={isLoading === ACTION_DELETE}
            >
              delete
            </B4hButton>
          )}
        </B4hForm.Actions>
      </B4hForm.Root>
      <B4hExpensePreview expenses={preview} labels={props.labels} />
    </>
  );
};
