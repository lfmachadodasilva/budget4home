import { B4hButton } from '@b4h/web-components';
import { Link } from 'react-router-dom';
import { B4hLoading } from '../../components/loading/loading';
import { useB4hGroups } from '../../providers/groupsProvider';
import { B4hRoutes } from '../../shared/routes';
import styles from './groupsPage.module.scss';

export const GroupPage = () => {
  const { query, groupId } = useB4hGroups();

  const groups = query?.data;

  if (!groups) {
    return <B4hLoading />;
  }

  return (
    <>
      <title>home | groups</title>

      <div className={styles.container}>
        <div className={styles.header}>
          <h1>groups</h1>
          <Link to={B4hRoutes.groupsAdd}>
            <B4hButton>add</B4hButton>
          </Link>
        </div>

        <div className={styles.items}>
          {groups?.map(group => (
            <Link className={styles.item} key={group.id} to={`${B4hRoutes.groups}/${group.id}`}>
              {groupId === group.id ? '⭐️' : null} {group.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
