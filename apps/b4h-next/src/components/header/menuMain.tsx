'use client';

import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { B4hDropdown } from '../dropdown/dropdown';
import styles from './header.module.scss';
import { ChangeEvent } from 'react';

export const B4hMenuMain = () => {
  const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {};

  return (
    <B4hDropdown autoReset onChange={handleOnChange}>
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
      <HamburgerMenuIcon className={styles.icon} />
    </B4hDropdown>
  );
};
