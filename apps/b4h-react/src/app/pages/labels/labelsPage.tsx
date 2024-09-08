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
import { useB4hLabels } from '../../providers/labelsProvider';
import { B4hRoutes } from '../../shared/routes';
import styles from './labelsPage.module.scss';

export const LabelPage = () => {
  const { query } = useB4hLabels();

  const labels = query?.data;

  if (!labels) {
    return <B4hLoading />;
  }

  return (
    <>
      <B4hPageTitle>home | labels</B4hPageTitle>

      <B4hPageLayout>
        <B4hPageLayoutTitle>labels</B4hPageLayoutTitle>
        <B4hPageLayoutActions>
          <Link to={B4hRoutes.labelsAdd}>
            <B4hButton>add</B4hButton>
          </Link>
        </B4hPageLayoutActions>
        <B4hPageLayoutContent>
          {labels?.map(label => (
            <Link to={`${B4hRoutes.labels}/${label.id}`} key={label.id}>
              <div className={styles.item}>
                <p>
                  {label.icon} {label.name}
                </p>
              </div>
            </Link>
          ))}
        </B4hPageLayoutContent>
      </B4hPageLayout>
    </>
  );
};
