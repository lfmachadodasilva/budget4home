import Link from 'next/link';
import { B4hRoutes } from '../../utils/routes';
import styles from './header.module.scss';
import { B4hMenuMain } from './menuMain';
import { B4hMenuUser } from './menuUser';

export const B4hHeader = () => {
  return (
    <div className={styles.container}>
      <B4hMenuMain />
      <Link href={B4hRoutes.home}>
        <h1 className={styles.title}>budget4home</h1>
      </Link>
      <B4hMenuUser />
    </div>
  );
};
