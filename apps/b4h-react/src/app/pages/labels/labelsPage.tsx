import { LabelModel } from '@b4h/models';
import { B4hButton, B4hDialog, B4hPageLayout } from '@b4h/web-components';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { B4hLoading } from '../../components/loading/loading';
import { B4hPageTitle } from '../../components/pageTitle';
import { useB4hLabels } from '../../providers/labelsProvider';
import { B4hRoutes } from '../../shared/routes';
import { B4hLabelForm } from './labelForm/labelForm';
import styles from './labelsPage.module.scss';

export const LabelPage = () => {
  const { query } = useB4hLabels();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDialog, setOpenDialog] = useState<{ open: boolean; label: LabelModel | null }>({
    open: false,
    label: null
  });

  const labels = query?.data;

  if (!labels) {
    return <B4hLoading />;
  }

  useEffect(() => {
    if (searchParams.has('label')) {
      const labelId = searchParams.get('label');
      const label = labels.find(label => label.id === labelId);
      if (label) {
        setOpenDialog({ open: true, label });
      }
    }
  }, [searchParams]);
  const handleOpenDialog = () => {
    setOpenDialog({ open: true, label: null });
  };
  const handleCloseDialog = (open?: boolean) => {
    if (open === false || open === undefined || open === null) {
      setOpenDialog({ open: false, label: null });
      setSearchParams({});
    }
  };

  return (
    <>
      <B4hPageTitle>home | labels</B4hPageTitle>

      <B4hPageLayout.Root>
        <B4hPageLayout.Title>labels</B4hPageLayout.Title>
        <B4hPageLayout.Actions>
          <B4hButton onClick={handleOpenDialog}>add</B4hButton>
        </B4hPageLayout.Actions>
        <B4hPageLayout.Content>
          {labels?.map(label => (
            <Link to={`${B4hRoutes.labels}?label=${label.id}`} key={label.id}>
              <div className={styles.item}>
                <p>
                  {label.icon} {label.name}
                </p>
              </div>
            </Link>
          ))}
        </B4hPageLayout.Content>
      </B4hPageLayout.Root>
      <B4hDialog
        open={openDialog.open}
        onOpenChange={handleCloseDialog}
        title={openDialog.label ? 'update label' : 'add label'}
        description={openDialog.label ? 'update label' : 'add label'}
      >
        <B4hLabelForm label={openDialog.label} onDone={handleCloseDialog} />
      </B4hDialog>
    </>
  );
};
