'use client';

import { AuthProvider } from '../contexts/auth';

export function Providers({ children }: any) {
  return <AuthProvider>{children}</AuthProvider>;
}
