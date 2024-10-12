'use client';

import { useB4hAuth } from '@b4h/firebase';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useCallback } from 'react';
import { B4hRoutes } from '../../utils/routes';
import { B4hDropdown } from '../ui/dropdown/dropdown';
import styles from './header.module.scss';

export const B4hMenuMain = () => {
  const { user } = useB4hAuth();
  const { push } = useRouter();

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      if (user) {
        push(event.target.value);
      } else {
        push(B4hRoutes.login);
      }
    },
    [user]
  );

  return (
    <B4hDropdown.Root
      autoReset
      onChange={handleOnChange}
      trigger={<HamburgerMenuIcon className={styles.icon} />}
    >
      <B4hDropdown.Option value={B4hRoutes.groups}>groups</B4hDropdown.Option>
      <B4hDropdown.Option value={B4hRoutes.labels}>labels</B4hDropdown.Option>
      <B4hDropdown.Option value={B4hRoutes.expenses}>expenses</B4hDropdown.Option>
    </B4hDropdown.Root>
  );
};
