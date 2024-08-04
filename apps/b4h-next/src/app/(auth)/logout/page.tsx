'use client';

import { useRouter } from 'next/navigation';
import { B4hRoutes } from '../../../config/routes';
import { useB4hAuth } from '../../../providers/authProvider';

export default function LoginPage() {
  const { logout } = useB4hAuth();
  const { push } = useRouter();

  logout().then(() => {
    push(B4hRoutes.login);
  });

  return null;
}
