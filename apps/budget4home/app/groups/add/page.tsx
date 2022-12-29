import { GroupForm } from '../(components)/form';
import { getAllUsers } from '../../../repositories/users';

export default async function () {
  const users = await getAllUsers();

  return (
    <>
      <h3>group</h3>
      <GroupForm users={users} />
    </>
  );
}
