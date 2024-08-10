'use client';

import { useB4hAuth } from '@/providers/authProvider';
import { useDisclosure } from '@b4h/web-components';
import { FaRegCircleUser } from 'react-icons/fa6';

import styles from './headerUser.module.scss';
import { B4hHeaderUserDrawer } from './headerUserDrawer/headerUserDrawer';

export const B4hHeaderUser = () => {
  const { user } = useB4hAuth();
  const userMenu = useDisclosure();

  return (
    <>
      {user?.photoURL ? (
        <img
          className={styles.avatar}
          width={24}
          height={24}
          src={user?.photoURL}
          onClick={userMenu.onOpen}
        />
      ) : (
        <FaRegCircleUser size={24} onClick={userMenu.onOpen} />
      )}

      <B4hHeaderUserDrawer {...userMenu} />
    </>
  );
};
