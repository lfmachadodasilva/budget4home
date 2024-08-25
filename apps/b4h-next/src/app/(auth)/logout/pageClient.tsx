'use client';

import { logoutFetch } from '@/clients/auth';
import { B4hRoutes } from '@/config/routes';
import { useB4hAuth } from '@/providers/authProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LogoutPageClient() {
  const { logout } = useB4hAuth();
  const { push, refresh } = useRouter();

  useEffect(() => {
    logout()
      .then(async () => {
        await logoutFetch();
      })
      .finally(() => {
        push(B4hRoutes.login);
        refresh();
      });
  });

  return null;
}
