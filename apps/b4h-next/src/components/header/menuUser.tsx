'use client';

import { B4hDropdown } from '@/components/ui/dropdown/dropdown';
import { BASE_URL } from '@/utils/config';
import { B4hApiRoutes, B4hRoutes } from '@/utils/routes';
import { useB4hAuth } from '@b4h/firebase';
import { PersonIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';
import styles from './header.module.scss';

export const logoutFetch = async () =>
  fetch(new URL(B4hApiRoutes.login, BASE_URL), {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
    cache: 'no-cache'
  });

export const B4hMenuUser = () => {
  const { push, refresh } = useRouter();
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
            refresh();
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
          // eslint-disable-next-line @next/next/no-img-element
          <img alt="avatar" className={styles.avatar} src={user?.photoURL} />
        ) : (
          <PersonIcon className={styles.icon} />
        )
      }
    >
      {user && (
        <>
          <B4hDropdown.Option value={B4hRoutes.export}>export</B4hDropdown.Option>
          <B4hDropdown.Option value={B4hRoutes.import}>import</B4hDropdown.Option>
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
