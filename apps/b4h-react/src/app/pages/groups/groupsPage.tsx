import {
  B4hButton,
  B4hPageLayout,
  B4hPageLayoutActions,
  B4hPageLayoutContent,
  B4hPageLayoutTitle
} from '@b4h/web-components';
import { Link } from 'react-router-dom';
import { B4hLoading } from '../../components/loading/loading';
import { B4hPageTitle } from '../../components/pageTitle';
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
      <B4hPageTitle>home | groups</B4hPageTitle>
      <B4hPageLayout>
        <B4hPageLayoutTitle>groups</B4hPageLayoutTitle>
        <B4hPageLayoutActions>
          <Link to={B4hRoutes.groupsAdd}>
            <B4hButton>add</B4hButton>
          </Link>
        </B4hPageLayoutActions>
        <B4hPageLayoutContent className={styles.items}>
          {groups?.map(group => (
            <Link className={styles.item} key={group.id} to={`${B4hRoutes.groups}/${group.id}`}>
              {groupId === group.id ? '⭐️' : null} {group.name}
            </Link>
          ))}
        </B4hPageLayoutContent>
      </B4hPageLayout>
    </>
  );
};
