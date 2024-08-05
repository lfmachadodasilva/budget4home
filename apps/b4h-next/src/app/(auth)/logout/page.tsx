'use client';

import { logoutClient } from '@/clients/auth';
import { B4hRoutes } from '@/config/routes';
import { useB4hAuth } from '@/providers/authProvider';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { logout } = useB4hAuth();
  const { push } = useRouter();

  logout().then(async () => {
    await logoutClient();
    push(B4hRoutes.login);
  });

  return null;
}
