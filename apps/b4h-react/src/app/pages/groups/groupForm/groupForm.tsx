import { GroupModel } from '@b4h/models';
import { B4hButton, B4hForm, B4hInput, B4hSelect } from '@b4h/web-components';
import { FormEvent } from 'react';

import { useB4hAuth } from '../../../providers/authProvider';
import { useB4hGroups } from '../../../providers/groupsProvider';
import { useB4hUsers } from '../../../providers/usersProvider';

export const B4hGroupForm = ({
  group,
  onDone
}: {
  group?: GroupModel | null;
  onDone: () => void;
}) => {
  const { setGroupId } = useB4hGroups();
  const { user } = useB4hAuth();
  const { query } = useB4hUsers();

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // const newGroup = {
    //   ...group,
    //   name: formData.get('name') as string,
    //   userIds: formData.getAll('userIds') as string[]
    // };
    // try {
    //   group ? await updateGroup(userId, newGroup) : await addGroup(userId, newGroup);
    //   navigate(B4hRoutes.groups);
    // } catch (err) {
    //   console.error('GroupForm', err);
    // }
    onDone();
  };

  const handleGroupFav = () => {
    setGroupId(group?.id as string);
    onDone();
  };

  const handleOnDelete = async () => {
    // await deleteGroup(group?.id as string);
    onDone();
  };

  const users = query?.data ?? [];

  return (
    <>
      <B4hForm onSubmit={handleOnSubmit}>
        <label htmlFor="name">name</label>
        <B4hInput type="text" id="name" name="name" defaultValue={group?.name} />
        <label htmlFor="name">users</label>
        <B4hSelect
          multiple
          size={10}
          id="userIds"
          name="userIds"
          defaultValue={[user?.uid as string, ...(group?.userIds ?? [])]}
        >
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.displayName ?? user.email}
            </option>
          ))}
        </B4hSelect>
        <B4hButton type="submit">{group ? 'update' : 'add'}</B4hButton>
        {group && (
          <>
            <B4hButton buttonType="delete" widthFit onClick={handleOnDelete}>
              delete
            </B4hButton>
            <B4hButton buttonType="secondary" widthFit onClick={handleGroupFav}>
              ⭐️
            </B4hButton>
          </>
        )}
      </B4hForm>
    </>
  );
};
