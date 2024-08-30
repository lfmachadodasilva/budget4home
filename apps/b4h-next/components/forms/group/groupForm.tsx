import { getGroupId, setGroupId } from '@/shared/groupId';
import { B4hRoutes } from '@/shared/routes';
import { addGroup, getGroup, getUsers, updateGroup } from '@b4h/firestore';
import { B4hButton, B4hForm, B4hInput, B4hSelect } from '@b4h/web-components';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const GroupForm = async ({ userId, groupId }: { userId: string; groupId?: string }) => {
  const group = groupId ? await getGroup(userId, groupId) : null;
  const users = await getUsers();
  const groupIdFav = await getGroupId(userId);

  const handleOnSubmit = async (formData: FormData) => {
    'use server';

    const newGroup = {
      ...group,
      name: formData.get('name') as string,
      userIds: formData.getAll('userIds') as string[]
    };

    try {
      group ? await updateGroup(userId, newGroup) : await addGroup(userId, newGroup);
      redirect(B4hRoutes.groups);
    } catch (err) {
      console.error('GroupForm', err);
    }
  };

  const handleGroupFav = async () => {
    'use server';

    setGroupId(group?.id as string);
    redirect(B4hRoutes.groups);
  };

  return (
    <>
      <B4hForm action={handleOnSubmit}>
        <label htmlFor="name">name</label>
        <B4hInput type="text" id="name" name="name" defaultValue={group?.name} />
        <label htmlFor="name">users</label>
        <B4hSelect multiple size={10} id="userIds" name="userIds" defaultValue={group?.userIds}>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.displayName ?? user.email}
            </option>
          ))}
        </B4hSelect>
        <B4hButton type="submit">{group ? 'update' : 'add'}</B4hButton>
        <Link href={B4hRoutes.groups}>
          <B4hButton buttonType="secondary" widthFit>
            cancel
          </B4hButton>
        </Link>
      </B4hForm>
      {group && group.id !== groupIdFav && (
        <B4hForm action={handleGroupFav}>
          <B4hButton type="submit" buttonType="secondary" widthFit>
            ⭐️
          </B4hButton>
        </B4hForm>
      )}
    </>
  );
};
