import styles from './page.module.scss';

import { models } from '@b4h/models';
import { WebComponents } from '@b4h/web-components';

export default function Index() {
  return (
    <div className={styles.page}>
      {models()}
      <WebComponents />
    </div>
  );
}
