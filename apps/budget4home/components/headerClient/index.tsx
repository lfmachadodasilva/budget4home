'use client';

import { B4hDropdown } from '@budget4home/ui-components';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';
import { useAuth } from '../../contexts/auth';
import { useTranslation } from '../../i18n/client';
import { LocaleNamespaces } from '../../i18n/locales/namespaces';
import { getDefaultOrFirstGroupId } from '../../util/defaultOrFirstGroupClient';
import { firebaseAuth } from '../../util/firebase';
import { B4hRoutes } from '../../util/routes';

import styles from './index.module.scss';

export const HeaderClient = () => {
  const { t } = useTranslation(LocaleNamespaces.base);
  const { user, getUserName } = useAuth();

  const groupId = getDefaultOrFirstGroupId();

  const { push } = useRouter();

  const handleOnChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case 'logout':
        await signOut(firebaseAuth);
        break;
      case 'settings':
        push(B4hRoutes.settings);
        break;
    }
  };

  const trigger = user?.photoURL ? (
    <div className={styles.settingTrigger}>
      <img alt="avatar" src={user.photoURL} className={styles.avatar} />
    </div>
  ) : (
    <label style={{ cursor: 'pointer' }}>{getUserName()}</label>
  );

  const groupUrl = B4hRoutes.groups;
  const labeslUrl = groupId
    ? `${B4hRoutes.groups}/${groupId}/${B4hRoutes.labels}`
    : B4hRoutes.labels;
  const expensesUrl = groupId
    ? `${B4hRoutes.groups}/${groupId}/${B4hRoutes.expenses}`
    : B4hRoutes.expenses;

  return (
    <div className={styles.container}>
      <Link href={B4hRoutes.home}>
        <img src="/logo32.png" className={styles.logo} alt="logo" />
      </Link>
      {user && (
        <div className={styles.menu}>
          <Link href={groupUrl}>{t('header.groups')}</Link>
          <Link href={labeslUrl}>{t('header.labels')}</Link>
          <Link href={expensesUrl}>{t('header.expenses')}</Link>
        </div>
      )}
      {user && (
        <B4hDropdown
          onChange={handleOnChange}
          options={[
            { key: 'logout', value: t('header.logout') },
            { key: 'settings', value: t('header.settings') }
          ]}
        >
          {trigger}
        </B4hDropdown>
      )}
    </div>
  );
};
