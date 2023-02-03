import { GroupForm } from '../(components)/form';
import { getUserId } from '../../../util/getUserId';
import { groupRepository, userRepository } from '../../../util/repositories';

export default async function ({ params }: any) {
  const userId = await getUserId();
  const groupId = params.groupId as string;

  const groupPromise = groupRepository.get(userId, groupId);
  const usersPromise = userRepository.getAll();

  const [group, users] = await Promise.all([groupPromise, usersPromise]);

  return (
    <>
      <GroupForm users={users} group={group} />
    </>
  );
}
