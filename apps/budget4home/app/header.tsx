'use client';

import { B4hDropdown } from '@budget4home/ui-components';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';
import { useAuth } from '../contexts/auth';
import { firebaseAuth } from '../util/firebase';

import { B4hRoutes } from '../util/routes';

export const Header = () => {
  const { user, getUserName } = useAuth();

  const { push } = useRouter();

  const handleOnChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case 'logout':
        await signOut(firebaseAuth);
        break;
      case 'settings':
        push(B4hRoutes.settings);
        break;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '8px'
      }}
    >
      <Link href={B4hRoutes.home}>
        <img src="/logo32.png" style={{ width: '32px', height: '32px' }} />
      </Link>
      {user && (
        <div
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center'
          }}
        >
          <Link href={B4hRoutes.groups}>groups</Link>
          <Link href={B4hRoutes.labels}>labels</Link>
          <Link href={B4hRoutes.expenses}>expenses</Link>
        </div>
      )}
      {user && (
        <B4hDropdown
          onChange={handleOnChange}
          options={[
            { key: '', value: '' },
            { key: 'logout', value: 'logout' },
            { key: 'settings', value: 'settings' }
          ]}
          trigger={
            user.photoURL ? (
              <div
                style={{
                  height: '32px',
                  width: '32px',
                  cursor: 'pointer',
                  clipPath: 'circle()',
                  display: 'inline-block',
                  verticalAlign: 'middle'
                }}
              >
                <img
                  src={user.photoURL}
                  style={{
                    width: '100%',
                    cursor: 'pointer'
                  }}
                />
              </div>
            ) : (
              <label style={{ cursor: 'pointer' }}>{getUserName()}</label>
            )
          }
        />
      )}
    </div>
  );
};
