'use client';

import { GroupModel, UserModel } from '@b4h/models';
import { SubmitHandler, useForm } from 'react-hook-form';
import { B4hForm } from '../../components/ui/form/form';
import { B4hRoutes } from '../../utils/routes';
import { B4hButton } from '../../components/ui/button/button';
import { useRouter } from 'next/navigation';

export interface B4hGroupFormProps {
  group?: GroupModel | null;
  users: UserModel[];
}

type GroupForm = {
  name: string;
  userIds: string[];
};

export const B4hGroupForm = (props: B4hGroupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<GroupForm>();
  const { push } = useRouter();

  const onSubmit: SubmitHandler<GroupForm> = async (data, event) => {
    event?.preventDefault();

    // TODO

    console.log(data);
    push(B4hRoutes.groups);
  };

  const title = props.group ? 'update group' : 'add group';
  return (
    <>
      <B4hForm.Root onSubmit={handleSubmit(onSubmit)}>
        <B4hForm.Title>
          <B4hForm.Return href={B4hRoutes.groups} />
          {title}
        </B4hForm.Title>
        <B4hForm.Field>
          <B4hForm.Label htmlFor="name">name</B4hForm.Label>
          <B4hForm.Input
            type="text"
            defaultValue={props.group?.name}
            {...register('name', {
              required: 'value is required',
              minLength: { value: 4, message: 'name is too short. min 4 characters' },
              maxLength: { value: 256, message: 'name is too long. max 256 characters' }
            })}
          />
          {errors.name && <B4hForm.LabelError>{errors.name.message}</B4hForm.LabelError>}
        </B4hForm.Field>
        <B4hForm.Field>
          <B4hForm.Label htmlFor="userIds">users</B4hForm.Label>
          <B4hForm.Select
            multiple
            rows={5}
            defaultValue={props.group?.userIds}
            {...register('userIds', { required: 'value is required' })}
          >
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
