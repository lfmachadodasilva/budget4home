'use client';

import { useB4hAuth } from '@/providers/authProvider';
import { B4hDrawer, B4hDrawerBody, B4hDrawerHeader, UseDisclosureProps } from '@b4h/web-components';
import Link from 'next/link';

export interface B4hUserDrawerProps extends UseDisclosureProps {}

export const B4hHeaderUserDrawer = (props: UseDisclosureProps) => {
  const { user } = useB4hAuth();

  return (
    <B4hDrawer open={props.isOpen} onClose={props.onClose} direction="right">
      <B4hDrawerHeader>{user?.displayName ?? ''}</B4hDrawerHeader>
      <B4hDrawerBody>
        {!user && (
          <Link href="/login" onClick={props.onClose}>
            Login
          </Link>
        )}
        {!user && (
          <Link href="/register" onClick={props.onClose}>
            Register
          </Link>
        )}
        {user && (
          <Link href="/logout" onClick={props.onClose}>
            Logout
          </Link>
        )}
      </B4hDrawerBody>
    </B4hDrawer>
  );
};
