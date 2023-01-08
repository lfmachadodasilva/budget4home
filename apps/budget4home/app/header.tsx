'use client';

import { B4hButton } from '@budget4home/ui-components';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { useAuth } from '../contexts/auth';
import { firebaseAuth } from '../util/firebase';

import { B4hRoutes } from '../util/routes';

export const Header = () => {
  const { user } = useAuth();

  const handleOnLogout = async () => {
    await signOut(firebaseAuth);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '8px'
      }}
    >
      <img src="/logo32.png" style={{ width: '32px', height: '32px' }} />
      <Link href={B4hRoutes.home}>home</Link>
      <Link href={B4hRoutes.groups}>groups</Link>
      <Link href={B4hRoutes.labels}>labels</Link>
      <Link href={B4hRoutes.expenses}>expenses</Link>
      {user && <B4hButton onClick={handleOnLogout}>Logout</B4hButton>}
    </div>
  );
};
