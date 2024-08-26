import styles from './page.module.scss';

import { firebase } from '@b4h/firebase';
import { firebaseAdmin } from '@b4h/firebase-admin';
import { models } from '@b4h/models';
import { WebComponents } from '@b4h/web-components';

export default function Index() {
  return (
    <div className={styles.page}>
      {firebase()}
      {firebaseAdmin()}
      {models()}
      <WebComponents />
    </div>
  );
}
