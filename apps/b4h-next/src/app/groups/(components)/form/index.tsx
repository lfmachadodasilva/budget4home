'use client';

import { B4hButton } from '@/components/ui/button/button';
import { B4hForm } from '@/components/ui/form/form';
import { ACTION_DELETE, ACTION_DONE, ACTION_FAVORITE, ACTION_SUBMIT } from '@/utils/constants';
import { B4hRoutes } from '@/utils/routes';
import { GroupModel, UserModel } from '@b4h/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { PrefetchKind } from 'next/dist/client/components/router-reducer/router-reducer-types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { onDeleteAction, onFavoriteAction, onSubmitAction } from './action';
import { groupFormSchema, GroupFormType } from './schema';

export interface B4hGroupFormProps {
  group?: GroupModel | null;
  users: UserModel[];
}

export const B4hGroupForm = (props: B4hGroupFormProps) => {
  const { push, prefetch } = useRouter();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [state, formAction] = useFormState(onSubmitAction, {
    message: ''
  });
  const [deleteState, deleteFormAction] = useFormState(onDeleteAction, {
    message: ''
  });
  const [favoriteState, favoriteFormAction] = useFormState(onFavoriteAction, {
    message: ''
  });
  const {
    handleSubmit,
    formState: { errors },
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
      case ACTION_SUBMIT:
        setIsLoading(ACTION_SUBMIT);
        formAction({ ...props.group, ...data });
        break;

      case ACTION_DELETE:
        if (confirm('are you sure?')) {
          setIsLoading(ACTION_DELETE);
          deleteFormAction({ ...props.group, ...data });
        }
        break;

      case ACTION_FAVORITE:
        setIsLoading(ACTION_FAVORITE);
        favoriteFormAction({ ...props.group, ...data });
        break;

      default:
        console.error('invalid submit action');
        break;
    }
  };

  useEffect(() => {
    setIsLoading(null);
    if ([state.message, deleteState.message, favoriteState.message].includes(ACTION_DONE)) {
      prefetch(B4hRoutes.groups, {
        kind: PrefetchKind.FULL
      });
      push(B4hRoutes.groups);
    }
  }, [state, deleteState, favoriteState, push, prefetch]);

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
          <B4hForm.Input type="text" {...register('name')} disabled={!!isLoading} />
          <B4hForm.LabelError>{errors?.name?.message}</B4hForm.LabelError>
        </B4hForm.Field>

        <B4hForm.Field>
          <B4hForm.Label htmlFor="userIds">users</B4hForm.Label>
          <B4hForm.Select multiple rows={5} {...register('userIds')} disabled={!!isLoading}>
            {props.users.map(user => (
              <B4hForm.Option key={user.id} value={user.id}>
                {user.displayName ?? user.email}
              </B4hForm.Option>
            ))}
          </B4hForm.Select>
          <B4hForm.LabelError>{errors?.userIds?.message}</B4hForm.LabelError>
        </B4hForm.Field>

        <B4hForm.Actions>
          <B4hButton type="submit" loading={isLoading === ACTION_SUBMIT} name={ACTION_SUBMIT}>
            {title}
          </B4hButton>
          {props.group && (
            <B4hButton
              type="submit"
              buttonType="delete"
              loading={isLoading === ACTION_DELETE}
              name={ACTION_DELETE}
            >
              delete
            </B4hButton>
          )}
          {props.group && (
            <B4hButton
              type="submit"
              buttonType="secondary"
              name={ACTION_FAVORITE}
              loading={isLoading === ACTION_FAVORITE}
            >
              ⭐️
            </B4hButton>
          )}
        </B4hForm.Actions>
      </B4hForm.Root>
    </>
  );
};
