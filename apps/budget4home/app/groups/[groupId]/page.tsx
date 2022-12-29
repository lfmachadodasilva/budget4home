import { cookies } from 'next/headers';
import { GroupForm } from '../(components)/form';
import { getGroup } from '../../../repositories/groups';
import { getAllUsers } from '../../../repositories/users';
import { firebaseAdminFirestore } from '../../../util/firebaseAdmin';

export default async function ({ params }: any) {
  const nextCookies = cookies();
  const userId = nextCookies.get('uid');

  const groupPromise = getGroup(firebaseAdminFirestore, userId.value, params.groupId);
  const usersPromise = getAllUsers();

  const [group, users] = await Promise.all([groupPromise, usersPromise]);

  return (
    <>
      <h3>group</h3>
      <GroupForm users={users} group={group} />
    </>
  );
}
