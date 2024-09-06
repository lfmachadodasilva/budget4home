'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { B4hAuthProvider } from './authProvider';
import { B4hGroupsProvider } from './groupsProvider';

const queryClient = new QueryClient();

export function B4hProvider({ children }: { children: ReactNode | ReactNode[] }) {
  console.log('B4hProvider');
  return (
    <QueryClientProvider client={queryClient}>
      {/* 
        <B4hLabelsProvider>
          <B4hExpesesProvider>{children}</B4hExpesesProvider>
        </B4hLabelsProvider>
      </B4hGroupsProvider> */}
      <B4hAuthProvider>
        <B4hGroupsProvider>{children}</B4hGroupsProvider>
      </B4hAuthProvider>
    </QueryClientProvider>
  );
}
