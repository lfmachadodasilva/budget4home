import { B4hSpinner } from '@b4h/web-components';
import styles from './loading.module.scss';

export const B4hLoading = () => {
  return (
    <div className={styles.container}>
      <B4hSpinner size={48} />
    </div>
  );
};
