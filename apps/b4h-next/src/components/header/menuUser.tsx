'use client';

import { PersonIcon } from '@radix-ui/react-icons';
import { B4hDropdown } from '../dropdown/dropdown';
import styles from './header.module.scss';
import { ChangeEvent } from 'react';

export const B4hMenuUser = () => {
  const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {};

  return (
    <B4hDropdown.Root
      autoReset
      onChange={handleOnChange}
      trigger={<PersonIcon className={styles.icon} />}
    >
      <B4hDropdown.Option>Option 1</B4hDropdown.Option>
      <B4hDropdown.Option>Option 2</B4hDropdown.Option>
      <B4hDropdown.Option>Option 3</B4hDropdown.Option>
    </B4hDropdown.Root>
  );
};
