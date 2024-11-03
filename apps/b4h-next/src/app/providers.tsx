'use client';

import { B4hLoading } from '@/components/loading';
import { BASE_URL } from '@/utils/config';
import { B4hAuthProvider, useB4hAuth } from '@b4h/firebase';
import { ReactNode } from 'react';

export const Providers = ({ children }: { children: ReactNode }) => (
  <B4hAuthProvider baseUrl={BASE_URL}>
    <WaitFirebase>{children}</WaitFirebase>
  </B4hAuthProvider>
);

export const WaitFirebase = ({ children }: { children: ReactNode }) => {
  const { loading } = useB4hAuth();

  if (loading) {
    return <B4hLoading />;
  }
  return <>{children}</>;
};
