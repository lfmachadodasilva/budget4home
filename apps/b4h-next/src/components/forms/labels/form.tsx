'use client';

import { LabelModel } from '@b4h/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormState } from 'react-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { B4hRoutes } from '../../../utils/routes';
import { B4hButton } from '../../ui/button/button';
import { B4hForm } from '../../ui/form/form';
import { onSubmitAction } from './action';
import { labelFormSchema, LabelFormType } from './schema';

export interface B4hLabelFormProps {
  label?: LabelModel;
}

export const B4hLabelForm = (props: B4hLabelFormProps) => {
  const [state, formAction] = useFormState(onSubmitAction, {
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
    event?.preventDefault();
    formAction({ ...props.label, ...data });
  };

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
        </B4hForm.Actions>
      </B4hForm.Root>
    </>
  );
};
