'use client';

import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { firebaseAuth } from '../../util/firebase';
import { B4hRoutes } from '../../util/routes';

export default function () {
  const { push } = useRouter();

  useEffect(() => {
    signOut(firebaseAuth).finally(() => {
      push(B4hRoutes.login);
    });
  });

  return <>Logout...</>;
}
