'use client';

import { useB4hAuth } from '@/providers/authProvider';
import { B4hDropdown } from '@b4h/web-components';
import { useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';
import { FaRegCircleUser } from 'react-icons/fa6';
import { GiHamburgerMenu } from 'react-icons/gi';

import { logoutFetch } from '@/clients/auth';
import { B4hRoutes } from '@/shared/routes';
import Link from 'next/link';
import styles from './header.module.scss';

export const B4hHeader = () => {
  const { user, logout } = useB4hAuth();
  const { push, refresh } = useRouter();

  const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
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
      default:
        push(event.target.value);
        break;
    }
  };

  return (
    <div className={styles.container}>
      <B4hDropdown autoReset onChange={handleOnChange}>
        <GiHamburgerMenu size={24} />
        <option value={B4hRoutes.groups}>groups</option>
        <option value={B4hRoutes.labels}>labels</option>
        <option value={B4hRoutes.expenses}>expenses</option>
      </B4hDropdown>
      <Link href={B4hRoutes.home}>budget4home</Link>
      {user?.photoURL ? (
        <B4hDropdown autoReset onChange={handleOnChange}>
          <img alt="avatar" className={styles.avatar} src={user?.photoURL} />
          <option value={B4hRoutes.logout}>logout</option>
        </B4hDropdown>
      ) : (
        <B4hDropdown autoReset onChange={handleOnChange}>
          <FaRegCircleUser size={24} />
          <option value={B4hRoutes.login}>login</option>
          <option value={B4hRoutes.register}>register</option>
          <option value={B4hRoutes.forgot}>forgot password</option>
        </B4hDropdown>
      )}
    </div>
  );
};
