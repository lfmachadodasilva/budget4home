'use client';

import { B4hRoutes } from '@/config/routes';
import { useB4hAuth } from '@/providers/authProvider';
import { B4hDropdown } from '@b4h/web-components';
import { useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';
import { FaRegCircleUser } from 'react-icons/fa6';

import styles from './userHeader.module.scss';

export const B4hUserHeader = () => {
  const { push } = useRouter();
  const { user } = useB4hAuth();

  const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.target.value && push(event.target.value);
  };

  return (
    <B4hDropdown onChange={handleOnChange}>
      {user?.photoURL ? (
        <img className={styles.avatar} width={24} height={24} src={user?.photoURL} />
      ) : (
        <FaRegCircleUser size={24} />
      )}
      {!user && (
        <option key={B4hRoutes.login} value={B4hRoutes.login}>
          Login
        </option>
      )}
      {user && (
        <option key={B4hRoutes.logout} value={B4hRoutes.logout}>
          Logout
        </option>
      )}
    </B4hDropdown>
  );
};
