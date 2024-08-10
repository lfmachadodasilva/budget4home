'use client';

import { useB4hAuth } from '@/providers/authProvider';
import { B4hDrawer, B4hDrawerBody, B4hDrawerHeader, useDisclosure } from '@b4h/web-components';
import { FaRegCircleUser } from 'react-icons/fa6';

import Link from 'next/link';
import styles from './headerUser.module.scss';

export const B4hHeaderUser = () => {
  const menu = useDisclosure();
  const { isAuth, user } = useB4hAuth();

  return (
    <>
      {user?.photoURL ? (
        <img className={styles.avatar} src={user?.photoURL} onClick={menu.onOpen} />
      ) : (
        <FaRegCircleUser size={24} onClick={menu.onOpen} />
      )}
      <B4hDrawer key="user-drawer" open={menu.isOpen} onClose={menu.onClose} direction="right">
        <B4hDrawerHeader>{user?.displayName ?? ''}</B4hDrawerHeader>
        <B4hDrawerBody>
          {!isAuth && (
            <Link href="/login" onClick={menu.onClose}>
              Login
            </Link>
          )}
          {!isAuth && (
            <Link href="/register" onClick={menu.onClose}>
              Register
            </Link>
          )}
          {isAuth && (
            <Link href="/logout" onClick={menu.onClose}>
              Logout
            </Link>
          )}
        </B4hDrawerBody>
      </B4hDrawer>
    </>
  );
};
