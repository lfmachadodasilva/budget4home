import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { B4hAuthProvider } from './authProvider';
import { B4hExpesesProvider } from './expensesProvider';
import { B4hGroupsProvider } from './groupsProvider';
import { B4hLabelsProvider } from './labelsProvider';
import { B4hUsersProvider } from './usersProvider';

const queryClient = new QueryClient();

export function B4hProvider({ children }: { children: ReactNode | ReactNode[] }) {
  return (
    <QueryClientProvider client={queryClient}>
      <B4hAuthProvider>
        <B4hGroupsProvider>
          <B4hUsersProvider>
            <B4hLabelsProvider>
              <B4hExpesesProvider>{children}</B4hExpesesProvider>
            </B4hLabelsProvider>
          </B4hUsersProvider>
        </B4hGroupsProvider>
      </B4hAuthProvider>
    </QueryClientProvider>
  );
}
