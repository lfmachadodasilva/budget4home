'use client';

import { B4hButton } from '@/components/ui/button/button';
import { B4hForm } from '@/components/ui/form/form';
import { ACTION_DELETE, ACTION_DONE, ACTION_SUBMIT } from '@/utils/constants';
import { B4hRoutes } from '@/utils/routes';
import { LabelModel } from '@b4h/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { onDeleteAction, onSubmitAction } from './action';
import { labelFormSchema, LabelFormType } from './schema';

export interface B4hLabelFormProps {
  label?: LabelModel;
}

export const B4hLabelForm = (props: B4hLabelFormProps) => {
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
  } = useForm<LabelFormType>({
    resolver: zodResolver(labelFormSchema),
    defaultValues: {
      name: props.label?.name ?? '',
      icon: props.label?.icon ?? ''
    }
  });

  const onSubmit: SubmitHandler<LabelFormType> = async (data, event) => {
    const submitter = (event?.nativeEvent as SubmitEvent)?.submitter as HTMLButtonElement;

    event?.preventDefault();

    switch (submitter.name) {
      case ACTION_SUBMIT:
        formAction({ ...props.label, ...data });
        break;

      case ACTION_DELETE:
        if (confirm('are you sure?')) {
          deleteFormAction({ ...props.label, ...data });
        }
        break;

      default:
        console.error('invalid submit action');
        break;
    }
  };

  useEffect(() => {
    if (state.message === ACTION_DONE || deleteState.message === ACTION_DONE) {
      push(B4hRoutes.labels);
    }
  }, [state, deleteState, push]);

  const title = props.label ? 'update label' : 'add label';
  return (
    <>
      <B4hForm.Root onSubmit={handleSubmit(onSubmit)}>
        <B4hForm.Title>
          <B4hForm.Return href={B4hRoutes.labels} />
          {title}
        </B4hForm.Title>
        <B4hForm.Field>
          <B4hForm.Label htmlFor="name">name</B4hForm.Label>
          <B4hForm.Input type="text" {...register('name')} />
          {errors.name && <B4hForm.LabelError>{errors.name.message}</B4hForm.LabelError>}
        </B4hForm.Field>

        <B4hForm.Field>
          <B4hForm.Label htmlFor="icon">icon</B4hForm.Label>
          <B4hForm.Input type="text" defaultValue={props.label?.icon} {...register('icon')} />
          {errors.icon && <B4hForm.LabelError>{errors.icon.message}</B4hForm.LabelError>}
        </B4hForm.Field>

        <B4hForm.Actions>
          <B4hButton type="submit" loading={isSubmitting}>
            {title}
          </B4hButton>
          {props.label && (
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
