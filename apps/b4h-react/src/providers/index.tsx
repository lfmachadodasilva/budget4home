'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { B4hGroupsProvider } from './groupsProvider';

const queryClient = new QueryClient();

export function B4hProvider({ children }: { children: ReactNode | ReactNode[] }) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* 
        <B4hLabelsProvider>
          <B4hExpesesProvider>{children}</B4hExpesesProvider>
        </B4hLabelsProvider>
      </B4hGroupsProvider> */}
      <B4hGroupsProvider>{children}</B4hGroupsProvider>
    </QueryClientProvider>
  );
}
