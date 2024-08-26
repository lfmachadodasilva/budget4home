'use client';

import { useB4hAuth } from '@/providers/authProvider';
import { B4hDropdown } from '@b4h/web-components';
import { useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';
import { FaRegCircleUser } from 'react-icons/fa6';
import { GiHamburgerMenu } from 'react-icons/gi';

import { logoutFetch } from '@/clients/auth';
import { B4hRoutes } from '@/shared/routes';
import styles from './header.module.scss';

export const B4hHeader = () => {
  const { user, logout } = useB4hAuth();
  const { push, refresh } = useRouter();

  const handleUser = (event: ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case B4hRoutes.login:
        push(B4hRoutes.login);
        break;
      case B4hRoutes.logout:
        logout()
          .then(async () => {
            await logoutFetch();
          })
          .finally(() => {
            push(B4hRoutes.login);
            refresh();
          });
        break;
    }
  };

  return (
    <div className={styles.container}>
      <B4hDropdown autoReset>
        <GiHamburgerMenu />
        <option value={B4hRoutes.groups}>groups</option>
        <option value={B4hRoutes.labels}>labels</option>
        <option value={B4hRoutes.expenses}>expenses</option>
      </B4hDropdown>
      budget4home
      {user?.photoURL ? (
        <B4hDropdown autoReset onChange={handleUser}>
          <img alt="avatar" className={styles.avatar} src={user?.photoURL} />
          <option value={B4hRoutes.logout}>logout</option>
        </B4hDropdown>
      ) : (
        <B4hDropdown autoReset onChange={handleUser}>
          <FaRegCircleUser />
          <option value={B4hRoutes.login}>login</option>
        </B4hDropdown>
      )}
    </div>
  );
};
