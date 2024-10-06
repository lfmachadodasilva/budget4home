'use client';

import { B4hAuthProvider } from '@b4h/firebase';
import { ReactNode } from 'react';

export const Providers = ({ children }: { children: ReactNode }) => (
  <B4hAuthProvider>{children}</B4hAuthProvider>
);
