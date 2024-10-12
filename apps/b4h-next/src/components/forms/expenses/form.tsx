'use client';

import { ExpenseModel, ExpenseType, LabelModel } from '@b4h/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { HTMLProps } from 'react';
import { useFormState } from 'react-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { B4hButton } from '../../../components/ui/button/button';
import { B4hForm } from '../../../components/ui/form/form';
import { DATE_TIME_FORMAT } from '../../../utils/constants';
import { B4hRoutes } from '../../../utils/routes';
import { onSubmitAction } from './action';
import { expenseFormSchema, ExpenseFormType } from './schema';

interface B4hExpensesFormProps extends HTMLProps<HTMLDivElement> {
  expense?: ExpenseModel | null;
  labels: LabelModel[];
}

export const B4hExpensesForm = (props: B4hExpensesFormProps) => {
  const [state, formAction] = useFormState(onSubmitAction, {
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
      type: (props.expense?.type as keyof typeof ExpenseType) ?? ExpenseType.outcoming,
      value: props.expense?.value,
      date: format(
        props.expense?.date ? new Date(props.expense?.date) : new Date(),
        DATE_TIME_FORMAT
      ),
      label: props.expense?.label ?? props.labels[0].id,
      comments: props.expense?.comments
    }
  });
  const { push } = useRouter();

  const onSubmit: SubmitHandler<ExpenseFormType> = async (data, event) => {
    // event?.preventDefault();

    // // TODO
    // const submitter = (event?.nativeEvent as SubmitEvent)?.submitter as HTMLButtonElement;

    // console.log({ data, submitterName: submitter?.name });
    // push(B4hRoutes.expenses);
    event?.preventDefault();
    formAction(data);
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
          <B4hForm.Input type="text" defaultValue={props.expense?.name} {...register('name')} />
          {errors.name && <B4hForm.LabelError>{errors.name.message}</B4hForm.LabelError>}
        </B4hForm.Field>

        <B4hForm.Field>
          <B4hForm.Label htmlFor="value">value</B4hForm.Label>
          <B4hForm.Input type="tel" defaultValue={props.expense?.value} {...register('value')} />
          {errors.value && <B4hForm.LabelError>{errors.value.message}</B4hForm.LabelError>}
        </B4hForm.Field>

        <B4hForm.Field>
          <B4hForm.Label htmlFor="date">date</B4hForm.Label>
          <B4hForm.Input type="datetime-local" {...register('date')} />
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
            type="text"
            rows={2}
            defaultValue={props.expense?.comments}
            {...register('comments')}
          />
        </B4hForm.Field>

        <B4hForm.Actions>
          <B4hButton type="submit" name="primary" loading={isSubmitting}>
            {title}
          </B4hButton>
          {!props.expense && (
            <B4hButton type="submit" buttonType="secondary" name="secondary" loading={isSubmitting}>
              pile
            </B4hButton>
          )}
        </B4hForm.Actions>
      </B4hForm.Root>
    </>
  );
};
