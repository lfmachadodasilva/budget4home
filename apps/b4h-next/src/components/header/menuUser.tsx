'use client';

import { PersonIcon } from '@radix-ui/react-icons';
import { B4hDropdown } from '../ui/dropdown/dropdown';
import styles from './header.module.scss';
import { ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { B4hApiRoutes, B4hRoutes } from '../../utils/routes';
import { useB4hAuth } from '@b4h/firebase';

const baseUrl = (process.env['NEXT_PUBLIC_API_URL'] as string) ?? 'http://localhost:3000';
export const logoutFetch = async () =>
  fetch(new URL(B4hApiRoutes.login, baseUrl), {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
    cache: 'no-cache'
  });

export const B4hMenuUser = () => {
  const { push } = useRouter();
  const { user, logout } = useB4hAuth();

  const handleOnChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case B4hRoutes.logout:
        await logout()
          .then(async () => {
            await logoutFetch();
          })
          .finally(() => {
            push(B4hRoutes.login);
            // refresh();
          });
        break;
      default:
        push(event.target.value);
        break;
    }
  };

  return (
    <B4hDropdown.Root
      autoReset
      onChange={handleOnChange}
      trigger={
        user?.photoURL ? (
          <img alt="avatar" className={styles.avatar} src={user?.photoURL} />
        ) : (
          <PersonIcon className={styles.icon} />
        )
      }
    >
      {user && (
        <>
          <B4hDropdown.Option value={B4hRoutes.logout}>logout</B4hDropdown.Option>
        </>
      )}
      {!user && (
        <>
          <B4hDropdown.Option value={B4hRoutes.login}>login</B4hDropdown.Option>
        </>
      )}
    </B4hDropdown.Root>
  );
};
