import { B4hButton } from '@b4h/web-components';
import { Link } from 'react-router-dom';
import { B4hLoading } from '../../components/loading/loading';
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
      <title>home | labels</title>

      <div className={styles.container}>
        <div className={styles.header}>
          <h1>labels</h1>
          <Link to={B4hRoutes.labelsAdd}>
            <B4hButton>add</B4hButton>
          </Link>
        </div>
        {labels?.map(label => (
          <Link to={`${B4hRoutes.labels}/${label.id}`} key={label.id}>
            <div className={styles.item}>
              <label className={styles.itemLabel}>{label.icon}</label>
              <p className={styles.itemTxt}>{label.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
