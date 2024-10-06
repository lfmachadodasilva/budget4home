'use client';

import { PersonIcon } from '@radix-ui/react-icons';
import { B4hDropdown } from '../ui/dropdown/dropdown';
import styles from './header.module.scss';
import { ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { B4hRoutes } from '../../utils/routes';

export const B4hMenuUser = () => {
  const { push } = useRouter();

  const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      // case B4hRoutes.logout:
      //   logout()
      //     .then(async () => {
      //       await logoutFetch();
      //     })
      //     .finally(() => {
      //       push(B4hRoutes.login);
      //       refresh();
      //     });
      //   break;
      default:
        push(event.target.value);
        break;
    }
  };

  return (
    <B4hDropdown.Root
      autoReset
      onChange={handleOnChange}
      trigger={<PersonIcon className={styles.icon} />}
    >
      <B4hDropdown.Option value={B4hRoutes.login}>login</B4hDropdown.Option>
      <B4hDropdown.Option value={B4hRoutes.logout}>logout</B4hDropdown.Option>
    </B4hDropdown.Root>
  );
};
