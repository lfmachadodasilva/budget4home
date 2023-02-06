'use client';

import { B4hDropdown } from '@budget4home/ui-components';
import { signOut } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';
import { useAuth } from '../../contexts/auth';
import { getLocale } from '../../locales';
import { getDefaultOrFirstGroupId } from '../../util/defaultOrFirstGroupClient';
import { firebaseAuth } from '../../util/firebase';
import { B4hRoutes } from '../../util/routes';

import styles from './index.module.scss';

export const HeaderClient = () => {
  const locale = getLocale();
  const { user, getUserName } = useAuth();

  const groupId = getDefaultOrFirstGroupId();

  const { push } = useRouter();

  const handleOnChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case locale.header.logout:
        await signOut(firebaseAuth);
        break;
      case locale.header.settings:
        push(B4hRoutes.settings);
        break;
    }
  };

  const trigger = user?.photoURL ? (
    <div className={styles.settingTrigger}>
      <Image alt="avatar" src={user.photoURL} className={styles.avatar} width={32} height={32} />
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
        <Image src="/logo32.png" className={styles.logo} alt="logo" width={32} height={32} />
      </Link>
      {user && (
        <div className={styles.menu}>
          <Link href={groupUrl}>groups</Link>
          <Link href={labeslUrl}>labels</Link>
          <Link href={expensesUrl}>expenses</Link>
        </div>
      )}
      {user && (
        <B4hDropdown
          onChange={handleOnChange}
          options={[
            { key: locale.header.settings, value: locale.header.settings },
            { key: locale.header.logout, value: locale.header.logout }
          ]}
        >
          {trigger}
        </B4hDropdown>
      )}
    </div>
  );
};
