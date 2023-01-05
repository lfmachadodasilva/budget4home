import { GroupForm } from '../(components)/form';
import { getUserId } from '../../../util/getUserId';
import { groupRepository, userRepository } from '../../../util/repositories';

export default async function ({ params }: any) {
  const userId = await getUserId();

  const groupPromise = groupRepository.get(userId, params.groupId);
  const usersPromise = userRepository.getAll();

  const [group, users] = await Promise.all([groupPromise, usersPromise]);

  return (
    <>
      <h3>group</h3>
      <GroupForm users={users} group={group} />
    </>
  );
}
