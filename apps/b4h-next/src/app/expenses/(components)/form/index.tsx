'use client';

import { B4hButton } from '@/components/ui/button/button';
import { B4hForm } from '@/components/ui/form/form';
import {
  ACTION_DELETE,
  ACTION_DELETE_ALL,
  ACTION_DONE,
  ACTION_SUBMIT,
  ACTION_SUBMIT_ALL,
  DATE_TIME_FORMAT
} from '@/utils/constants';
import { B4hExpenseHeaderType, expenseQueryParams } from '@/utils/expenses';
import { defaultFormState } from '@/utils/formState';
import { selectLabelByExpenseName } from '@/utils/label';
import { B4hRoutes } from '@/utils/routes';
import { ExpenseModel, ExpenseType, LabelModel } from '@b4h/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { addMonths, format } from 'date-fns';
import { PrefetchKind } from 'next/dist/client/components/router-reducer/router-reducer-types';
import { useRouter } from 'next/navigation';
import { HTMLProps, startTransition, useActionState, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { B4hExpensePreview } from '../preview/preview';
import { onDeleteAction, onDeleteAllAction, onSubmitAction, onUpdateAllAction } from './actions';
import { expenseFormSchema, ExpenseFormType, expenseTypeToModel } from './schema';

interface B4hExpensesFormProps extends HTMLProps<HTMLDivElement> {
  expense?: ExpenseModel | null;
  labels: LabelModel[];
  searchParams: B4hExpenseHeaderType;
}

export const B4hExpensesForm = (props: B4hExpensesFormProps) => {
  const { push, prefetch } = useRouter();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [state, formAction] = useActionState(onSubmitAction, defaultFormState);
  const [updateAllState, updateAllformAction] = useActionState(onUpdateAllAction, defaultFormState);
  const [deleteState, deleteFormAction] = useActionState(onDeleteAction, defaultFormState);
  const [deleteAllState, deleteAllFormAction] = useActionState(onDeleteAllAction, defaultFormState);
  const [preview, setPreview] = useState<ExpenseModel[]>([]);
  const searchParams = expenseQueryParams(props.searchParams);

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
      date: format(props.expense?.date ?? new Date(), DATE_TIME_FORMAT),
      type: props.expense?.type ?? ExpenseType.outcoming,
      label: props.expense?.label ?? props.labels[0]?.id,
      scheduled: props.expense?.scheduled
        ? parseInt(props.expense?.scheduled.split('/')[1], 10)
        : 1,
      parent: props.expense?.parent
    }
  });

  const onSubmit: SubmitHandler<ExpenseFormType> = async (data, event) => {
    const submitter = (event?.nativeEvent as SubmitEvent)?.submitter as HTMLButtonElement;

    event?.preventDefault();

    let expenses: ExpenseModel[] = [];

    console.log('onSubmit', { data });

    switch (submitter.name) {
      case ACTION_SUBMIT:
        setIsLoading(ACTION_SUBMIT);
        startTransition(() => {
          formAction({ id: props.expense?.id, ...data });
        });
        break;
      case ACTION_SUBMIT_ALL:
        if (confirm('update all. are you sure?')) {
          setIsLoading(ACTION_SUBMIT_ALL);
          startTransition(() => {
            updateAllformAction({ id: props.expense?.id, ...data });
          });
        }
        break;

      case ACTION_DELETE:
        if (confirm('are you sure?')) {
          setIsLoading(ACTION_DELETE);
          startTransition(() => {
            deleteFormAction({ ...props.expense, ...data });
          });
        }
        break;
      case ACTION_DELETE_ALL:
        if (confirm('delete all. are you sure?')) {
          setIsLoading(ACTION_DELETE_ALL);
          startTransition(() => {
            deleteAllFormAction({ ...props.expense, ...data });
          });
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
    if (
      [state.message, updateAllState.message, deleteState.message, deleteAllState.message].includes(
        ACTION_DONE
      )
    ) {
      prefetch(B4hRoutes.expenses, {
        kind: PrefetchKind.FULL
      });
      push(B4hRoutes.expenses + searchParams);
    }
  }, [state, updateAllState, deleteState, deleteAllState, push, prefetch, searchParams]);

  useEffect(() => {
    // update label by expense name
    const subscription = watch((value, { name }) => {
      if (name === 'name' && value.name && value.name.length > 2) {
        const label = selectLabelByExpenseName(props.labels, value.name);
        if (label) {
          setValue('label', label.id);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, props.labels, setValue]);

  const isAdd = !props.expense?.id;
  const isUpdate = !!props.expense?.id;
  const title = isUpdate ? 'update expense' : 'add expense';
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
        <B4hForm.Return
          href={B4hRoutes.expenses + searchParams}
          aria-label="return to expenses page"
        />
        {title}
      </B4hForm.Title>
      <B4hForm.Root onSubmit={handleSubmit(onSubmit)}>
        <B4hForm.Field>
          <B4hForm.Label id="type" htmlFor="type">
            type
          </B4hForm.Label>
          <B4hForm.Select {...register('type')} disabled={!!isLoading} aria-labelledby="type">
            <B4hForm.Option value={ExpenseType.outcoming}>{ExpenseType.outcoming}</B4hForm.Option>
            <B4hForm.Option value={ExpenseType.incoming}>{ExpenseType.incoming}</B4hForm.Option>
          </B4hForm.Select>
          <B4hForm.LabelError>{errors?.type?.message}</B4hForm.LabelError>
        </B4hForm.Field>

        <B4hForm.Field>
          <B4hForm.Label htmlFor="name" id="type">
            name
          </B4hForm.Label>
          <B4hForm.Input
            type="text"
            {...register('name')}
            disabled={!!isLoading}
            aria-labelledby="name"
          />
          <B4hForm.LabelError>{errors?.name?.message}</B4hForm.LabelError>
        </B4hForm.Field>

        <B4hForm.Field>
          <B4hForm.Label htmlFor="value" id="value">
            value
          </B4hForm.Label>
          <B4hForm.Input
            aria-labelledby="value"
            type="number"
            min={1}
            {...register('value', {
              setValueAs: value => (value === '' ? undefined : parseInt(value, 10))
            })}
            disabled={!!isLoading}
            placeholder="example: 100 means 1.00"
          />
          <B4hForm.LabelError>{errors?.value?.message}</B4hForm.LabelError>
        </B4hForm.Field>

        <B4hForm.Field>
          <B4hForm.Label htmlFor="date" id="date">
            date
          </B4hForm.Label>
          <B4hForm.Input
            type="datetime-local"
            {...register('date')}
            disabled={!!isLoading}
            aria-labelledby="date"
          />
          <B4hForm.LabelError>{errors?.date?.message}</B4hForm.LabelError>
        </B4hForm.Field>

        <B4hForm.Field>
          <B4hForm.Label htmlFor="label" id="label">
            label
          </B4hForm.Label>
          <B4hForm.Select {...register('label')} disabled={!!isLoading} aria-labelledby="label">
            {props.labels?.map(label => (
              <B4hForm.Option key={label.id} value={label.id}>
                {label.icon} {label.name}
              </B4hForm.Option>
            ))}
          </B4hForm.Select>
          <B4hForm.LabelError>{errors?.label?.message}</B4hForm.LabelError>
        </B4hForm.Field>

        <B4hForm.Field>
          <B4hForm.Label htmlFor="comments" id="comments">
            comments
          </B4hForm.Label>
          <B4hForm.TextArea
            type="text"
            rows={2}
            {...register('comments')}
            disabled={!!isLoading}
            aria-labelledby="comments"
          />
          <B4hForm.LabelError>{errors?.comments?.message}</B4hForm.LabelError>
        </B4hForm.Field>

        {!props?.expense?.id && (
          <B4hForm.Field>
            <B4hForm.Label htmlFor="scheduled" id="scheduled">
              scheduled
            </B4hForm.Label>
            <B4hForm.Select
              {...register('scheduled')}
              disabled={!!isLoading}
              aria-labelledby="scheduled"
            >
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
            <div className="flex gap-s">
              <B4hButton
                type="submit"
                name={ACTION_SUBMIT}
                loading={isLoading === ACTION_SUBMIT}
                widthFit
              >
                {title}
              </B4hButton>
              {props.expense?.scheduled && (
                <B4hButton type="submit" name={ACTION_SUBMIT_ALL} buttonType="secondary">
                  all
                </B4hButton>
              )}
            </div>
          )}
          {isAdd && (
            <B4hButton
              type="submit"
              buttonType={preview.length === 0 ? 'secondary' : 'primary'}
              name="pile"
              widthFit={preview.length > 0}
            >
              {preview.length === 0 ? 'pile' : 'add'}
            </B4hButton>
          )}
          {isUpdate && (
            <div className="flex gap-s">
              <B4hButton
                type="submit"
                buttonType="delete"
                name={ACTION_DELETE}
                loading={isLoading === ACTION_DELETE}
                widthFit
              >
                delete
              </B4hButton>
              {props.expense?.scheduled && (
                <B4hButton type="submit" name={ACTION_DELETE_ALL} buttonType="delete">
                  all
                </B4hButton>
              )}
            </div>
          )}
        </B4hForm.Actions>
      </B4hForm.Root>
      <B4hExpensePreview expenses={preview} labels={props.labels} />
    </>
  );
};
