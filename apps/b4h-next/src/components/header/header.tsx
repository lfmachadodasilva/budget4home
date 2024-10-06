import styles from './header.module.scss';
import { B4hMenuMain } from './menuMain';
import { B4hMenuUser } from './menuUser';

export const B4hHeader = () => {
  return (
    <div className={styles.container}>
      <B4hMenuMain />
      <h1 className={styles.title}>budget4home</h1>
      <B4hMenuUser />
    </div>
  );
};
