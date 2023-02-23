import { GroupForm } from '../../../components/groups/form';
import { userRepository } from '../../../util/repositories';

export default async function () {
  const users = await userRepository.getAll();

  return (
    <>
      <GroupForm users={users} />
    </>
  );
}
