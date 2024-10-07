'use client';

import { LabelModel } from '@b4h/models';
import { SubmitHandler, useForm } from 'react-hook-form';
import { B4hForm } from '../../components/ui/form/form';
import { B4hRoutes } from '../../utils/routes';
import { B4hButton } from '../../components/ui/button/button';

export interface B4hLabelFormProps {
  label?: LabelModel;
}

type LabelForm = {
  name: string;
  icon: string;
};

export const B4hLabelForm = (props: B4hLabelFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LabelForm>();

  const onSubmit: SubmitHandler<LabelForm> = async (data, event) => {
    event?.preventDefault();

    // TODO
    // push(B4hRoutes.home);
    console.log(data);
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
          <B4hForm.Input
            type="text"
            defaultValue={props.label?.name}
            {...register('name', {
              required: 'value is required',
              minLength: { value: 4, message: 'name is too short. min 4 characters' },
              maxLength: { value: 256, message: 'name is too long. max 256 characters' }
            })}
          />
          {errors.name && <B4hForm.LabelError>{errors.name.message}</B4hForm.LabelError>}
        </B4hForm.Field>

        <B4hForm.Field>
          <B4hForm.Label htmlFor="name">icon</B4hForm.Label>
          <B4hForm.Input
            type="text"
            defaultValue={props.label?.icon}
            {...register('icon', {
              required: 'value is required',
              maxLength: { value: 256, message: 'name is too long. max 256 characters' }
            })}
          />
          {errors.name && <B4hForm.LabelError>{errors.name.message}</B4hForm.LabelError>}
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
