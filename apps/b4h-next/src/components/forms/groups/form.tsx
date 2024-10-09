'use client';

import { GroupModel, UserModel } from '@b4h/models';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFormState } from 'react-dom';
import { B4hForm } from '../../ui/form/form';
import { B4hRoutes } from '../../../utils/routes';
import { B4hButton } from '../../ui/button/button';
import { useRouter } from 'next/navigation';
import { groupFormSchema, GroupFormType } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { onSubmitAction } from './action';

export interface B4hGroupFormProps {
  group?: GroupModel | null;
  users: UserModel[];
}

export const B4hGroupForm = (props: B4hGroupFormProps) => {
  const [state, formAction] = useFormState(onSubmitAction, {
    message: ''
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register
  } = useForm<GroupFormType>({
    resolver: zodResolver(groupFormSchema),
    defaultValues: {
      name: props.group?.name ?? '',
      userIds: props.group?.userIds ?? []
    }
  });
  const { push } = useRouter();

  console.log('state:', { state });

  const onSubmit: SubmitHandler<GroupFormType> = async (data, event) => {
    event?.preventDefault();
    formAction(data);
  };

  const title = props.group ? 'update group' : 'add group';
  return (
    <>
      <B4hForm.Root onSubmit={handleSubmit(onSubmit)}>
        {state?.issues && (
          <div className="text-red-500">
            <ul>
              {state.issues.map(issue => (
                <li key={issue} className="flex gap-1">
                  <B4hForm.LabelError>{issue}</B4hForm.LabelError>
                </li>
              ))}
            </ul>
          </div>
        )}
        <B4hForm.Title>
          <B4hForm.Return href={B4hRoutes.groups} />
          {title}
        </B4hForm.Title>

        <B4hForm.Field>
          <B4hForm.Label htmlFor="name">name</B4hForm.Label>
          <B4hForm.Input type="text" {...register('name')} />
          {errors.name && <B4hForm.LabelError>{errors.name.message}</B4hForm.LabelError>}
        </B4hForm.Field>

        <B4hForm.Field>
          <B4hForm.Label htmlFor="userIds">users</B4hForm.Label>
          <B4hForm.Select multiple rows={5} {...register('userIds')}>
            {props.users.map(user => (
              <B4hForm.Option key={user.id} value={user.id}>
                {user.displayName ?? user.email}
              </B4hForm.Option>
            ))}
          </B4hForm.Select>
          {errors.userIds && <B4hForm.LabelError>{errors.userIds.message}</B4hForm.LabelError>}
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
