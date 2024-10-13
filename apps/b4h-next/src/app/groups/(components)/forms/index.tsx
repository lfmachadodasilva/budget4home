'use client';

import { GroupModel, UserModel } from '@b4h/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { B4hButton } from '../../../../components/ui/button/button';
import { B4hForm } from '../../../../components/ui/form/form';
import { ACTION_DELETE, ACTION_DONE, ACTION_SUBMIT } from '../../../../utils/constants';
import { B4hRoutes } from '../../../../utils/routes';
import { onDeleteAction, onSubmitAction } from './action';
import { groupFormSchema, GroupFormType } from './schema';

export interface B4hGroupFormProps {
  group?: GroupModel | null;
  users: UserModel[];
}

export const B4hGroupForm = (props: B4hGroupFormProps) => {
  const { push } = useRouter();
  const [state, formAction] = useFormState(onSubmitAction, {
    message: ''
  });
  const [deleteState, deleteFormAction] = useFormState(onDeleteAction, {
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

  const onSubmit: SubmitHandler<GroupFormType> = async (data, event) => {
    const submitter = (event?.nativeEvent as SubmitEvent)?.submitter as HTMLButtonElement;

    event?.preventDefault();

    switch (submitter.name) {
      case ACTION_SUBMIT: {
        formAction({ ...props.group, ...data });
        break;
      }
      case ACTION_DELETE: {
        if (confirm('are you sure?')) {
          deleteFormAction({ ...props.group, ...data });
        }
        break;
      }
      default:
        console.error('invalid submit action');
        break;
    }
  };

  useEffect(() => {
    if (state.message === ACTION_DONE || deleteState.message === ACTION_DONE) {
      push(B4hRoutes.groups);
    }
  }, [state, deleteState]);

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
          <B4hButton type="submit" loading={isSubmitting} name={ACTION_SUBMIT}>
            {title}
          </B4hButton>
          {props.group && (
            <B4hButton
              type="submit"
              buttonType="delete"
              loading={isSubmitting}
              name={ACTION_DELETE}
            >
              delete
            </B4hButton>
          )}
        </B4hForm.Actions>
      </B4hForm.Root>
    </>
  );
};
