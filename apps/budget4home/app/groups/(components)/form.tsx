'use client';

import { Group, User } from '@budget4home/base';
import { B4hButton, B4hForm, B4hInput } from '@budget4home/ui-components';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useRef, useState } from 'react';
import { GroupClient } from '../../../clients';
import { useAuth } from '../../../contexts/auth';
import { B4hRoutes } from '../../../util/routes';

interface GroupFormProps {
  group?: Group;
  users: User[];
}

export const GroupForm = (props: GroupFormProps) => {
  const { push } = useRouter();
  const { token, user } = useAuth();

  const [loading, setLoading] = useState(false);

  const nameRef = useRef<HTMLInputElement>();
  const userIdsRef = useRef<string[]>(props.group?.userIds ?? [user?.uid]);

  const handleOnManage = async () => {
    // TODO validate name
    // TODO loading state

    setLoading(true);
    try {
      if (!props.group?.id) {
        await GroupClient.add(token, {
          name: nameRef.current.value,
          userIds: userIdsRef.current
        });
      } else {
        await GroupClient.edit(token, {
          id: props.group.id,
          name: nameRef.current.value,
          userIds: userIdsRef.current
        });
      }
      push(B4hRoutes.groups);
    } catch {
      // TODO show error msg
    }
    setLoading(false);
  };

  const handleOnDelete = async () => {
    if (confirm('Are you sure?')) {
      setLoading(true);

      await GroupClient.delete(token, {
        id: props.group.id
      });

      push(B4hRoutes.groups);
      setLoading(false);
    }
  };

  const handleOnChangeUser = async (event: ChangeEvent<{ checked: boolean }>, id: string) => {
    if (event.target.checked) {
      userIdsRef.current.push(id);
    } else {
      userIdsRef.current = userIdsRef.current.filter(x => x !== id);
    }
  };

  const formFooter = (
    <>
      <B4hButton onClick={handleOnManage} disabled={loading}>
        {props.group?.id ? 'Update' : 'Add'}
      </B4hButton>
      {props.group?.id && (
        <B4hButton onClick={handleOnDelete} disabled={loading}>
          Delete
        </B4hButton>
      )}
    </>
  );

  const formLabel = (
    <>
      {props.group?.id && (
        <>
          <h3>Edit group</h3>
        </>
      )}
      {!props.group?.id && (
        <>
          <h3>Add new group</h3>
        </>
      )}
    </>
  );

  return (
    <B4hForm label={formLabel} footer={formFooter}>
      <B4hInput ref={nameRef} defaultValue={props.group?.name} label="Name" />

      {props.users?.map(x => {
        return (
          <div>
            <B4hInput
              id={x.id}
              type={'checkbox'}
              defaultChecked={userIdsRef.current?.includes(x.id) ?? false}
              onChange={event => handleOnChangeUser(event, x.id)}
              label={`${x.displayName ? x.displayName + ' - ' : ''}${x.email}`}
            />
          </div>
        );
      })}
    </B4hForm>
  );
};
