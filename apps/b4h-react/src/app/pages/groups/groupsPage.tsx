import { GroupModel } from '@b4h/models';
import { B4hButton, B4hDialog, B4hPageLayout } from '@b4h/web-components';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import { B4hLoading } from '../../components/loading/loading';
import { B4hPageTitle } from '../../components/pageTitle';
import { useB4hGroups } from '../../providers/groupsProvider';
import { B4hRoutes } from '../../shared/routes';
import { B4hGroupForm } from './groupForm/groupForm';
import styles from './groupsPage.module.scss';

export const GroupPage = () => {
  const { query, groupId } = useB4hGroups();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDialog, setOpenDialog] = useState<{ open: boolean; group: GroupModel | null }>({
    open: false,
    group: null
  });

  const groups = query?.data;

  if (!groups) {
    return <B4hLoading />;
  }

  useEffect(() => {
    if (searchParams.has('group')) {
      const groupId = searchParams.get('group');
      const group = groups.find(group => group.id === groupId);
      if (group) {
        setOpenDialog({ open: true, group });
      }
    }
  }, [searchParams]);
  const handleOpenDialog = () => {
    setOpenDialog({ open: true, group: null });
  };
  const handleCloseDialog = (open?: boolean) => {
    if (open === false || open === undefined || open === null) {
      setOpenDialog({ open: false, group: null });
      setSearchParams({});
    }
  };

  return (
    <>
      <B4hPageTitle>{t('groups.browserTitle')}</B4hPageTitle>
      <B4hPageLayout.Root>
        <B4hPageLayout.Title>{t('groups.pageTitle')}</B4hPageLayout.Title>
        <B4hPageLayout.Actions>
          <B4hButton onClick={handleOpenDialog}>{t('groups.action')}</B4hButton>
        </B4hPageLayout.Actions>
        <B4hPageLayout.Content className={styles.items}>
          {groups?.map(group => (
            <Link
              className={styles.item}
              key={group.id}
              to={`${B4hRoutes.groups}?group=${group.id}`}
            >
              <p>
                {groupId === group.id ? '⭐️' : null} {group.name}
              </p>
            </Link>
          ))}
        </B4hPageLayout.Content>
      </B4hPageLayout.Root>
      <B4hDialog
        open={openDialog.open}
        onOpenChange={handleCloseDialog}
        title={openDialog.group ? 'update group' : 'add group'}
        description={openDialog.group ? 'update group' : 'add group'}
      >
        <B4hGroupForm group={openDialog.group} onDone={handleCloseDialog} />
      </B4hDialog>
    </>
  );
};
