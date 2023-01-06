import Link from 'next/link';
import { getUserId } from '../../util/getUserId';
import { groupRepository } from '../../util/repositories';
import { B4hRoutes } from '../../util/routes';
import { GroupActions } from './(components)/actions';

export default async function () {
  const userId = await getUserId();

  const groups = await groupRepository.getAll(userId);

  return (
    <>
      <h3>groups</h3>
      <Link href={B4hRoutes.groupAdd}>add</Link>
      <ul>
        {groups.map(group => {
          return (
            <li key={group.id}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <label>{group.name}</label>
                <GroupActions groupId={group.id} />
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
