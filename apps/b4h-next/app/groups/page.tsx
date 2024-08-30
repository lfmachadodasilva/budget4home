import { useB4hSession } from '@/hooks/useB4hSession';
import { getGroupId } from '@/shared/groupId';
import { B4hRoutes } from '@/shared/routes';
import { getGroups } from '@b4h/firestore';
import { B4hButton } from '@b4h/web-components';
import Link from 'next/link';
import styles from './page.module.scss';

export const metadata = {
  title: 'groups | budget4home'
};

export default async function GroupsPage() {
  const { userId } = useB4hSession();
  const groups = await getGroups(userId);
  const groupId = await getGroupId(userId);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>groups</h1>
        <Link href={B4hRoutes.groupsAdd}>
          <B4hButton>add</B4hButton>
        </Link>
      </div>

      <div className={styles.items}>
        {groups.map(group => (
          <Link className={styles.item} key={group.id} href={`${B4hRoutes.groups}/${group.id}`}>
            {groupId === group.id ? '⭐️' : null} {group.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
