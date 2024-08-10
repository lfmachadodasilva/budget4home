'use client';

import { B4hRoutes } from '@/config/routes';
import { RxHamburgerMenu } from 'react-icons/rx';

import { B4hDrawer, B4hDrawerBody, B4hDrawerHeader, useDisclosure } from '@b4h/web-components';
import Link from 'next/link';
import styles from './headerMenu.module.scss';

export const B4hHeaderMenu = () => {
  const menu = useDisclosure();

  return (
    <>
      <RxHamburgerMenu className={styles.icon} onClick={menu.onOpen} />
      <B4hDrawer key="menu" open={menu.isOpen} onClose={menu.onClose} direction="left">
        <B4hDrawerHeader>budget4home</B4hDrawerHeader>
        <B4hDrawerBody>
          <Link href={B4hRoutes.groups} onClick={menu.onClose}>
            Groups
          </Link>
          <Link href={B4hRoutes.labels} onClick={menu.onClose}>
            Labels
          </Link>
          <Link href={B4hRoutes.expenses} onClick={menu.onClose}>
            Expenses
          </Link>
        </B4hDrawerBody>
      </B4hDrawer>
    </>
  );
};
