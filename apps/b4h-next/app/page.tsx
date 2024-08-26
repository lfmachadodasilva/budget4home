import styles from './page.module.scss';

import { WebComponents } from '@b4h/web-components';

export const metadata = {
  title: 'home | budget4home'
};

export default function Index() {
  return (
    <div className={styles.page}>
      <WebComponents />
    </div>
  );
}
