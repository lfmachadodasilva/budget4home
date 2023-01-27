import Link from 'next/link';
import { GroupItem } from '../../components/groups/item';
import { getUserId } from '../../util/getUserId';
import { groupRepository } from '../../util/repositories';
import { B4hRoutes } from '../../util/routes';

export default async function () {
  const userId = await getUserId();

  const groups = await groupRepository.getAll(userId);

  return (
    <>
      <h3>groups</h3>
      <Link href={B4hRoutes.groupAdd}>add</Link>
      {groups.length <= 0 && <h4>Empty list of group.</h4>}

      {groups.map(group => (
        <GroupItem group={group} />
      ))}

      {/* <GroupItems groups={groups} /> */}
    </>
  );
}
