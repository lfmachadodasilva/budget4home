'use client';

import { B4hLoadingLogo } from '@/components/loading';
import { B4hAuthProvider, useB4hAuth } from '@b4h/firebase';
import { ReactNode } from 'react';

export const Providers = ({ children }: { children: ReactNode }) => (
  <B4hAuthProvider>
    <WaitFirebase>{children}</WaitFirebase>
  </B4hAuthProvider>
);

export const WaitFirebase = ({ children }: { children: ReactNode }) => {
  const { loading } = useB4hAuth();

  if (loading) {
    return <B4hLoadingLogo />;
  }
  return <>{children}</>;
};
