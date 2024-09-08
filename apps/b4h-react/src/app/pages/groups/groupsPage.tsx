import {
  B4hButton,
  B4hPageLayout,
  B4hPageLayoutActions,
  B4hPageLayoutContent,
  B4hPageLayoutTitle
} from '@b4h/web-components';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { B4hLoading } from '../../components/loading/loading';
import { B4hPageTitle } from '../../components/pageTitle';
import { useB4hGroups } from '../../providers/groupsProvider';
import { B4hRoutes } from '../../shared/routes';
import styles from './groupsPage.module.scss';

export const GroupPage = () => {
  const { query, groupId } = useB4hGroups();
  const { t } = useTranslation();

  const groups = query?.data;

  if (!groups) {
    return <B4hLoading />;
  }

  return (
    <>
      <B4hPageTitle>{t('groups.browserTitle')}</B4hPageTitle>
      <B4hPageLayout>
        <B4hPageLayoutTitle>{t('groups.pageTitle')}</B4hPageLayoutTitle>
        <B4hPageLayoutActions>
          <Link to={B4hRoutes.groupsAdd}>
            <B4hButton>{t('groups.action')}</B4hButton>
          </Link>
        </B4hPageLayoutActions>
        <B4hPageLayoutContent className={styles.items}>
          {groups?.map(group => (
            <Link className={styles.item} key={group.id} to={`${B4hRoutes.groups}/${group.id}`}>
              <p>
                {groupId === group.id ? '⭐️' : null} {group.name}
              </p>
            </Link>
          ))}
        </B4hPageLayoutContent>
      </B4hPageLayout>
    </>
  );
};
