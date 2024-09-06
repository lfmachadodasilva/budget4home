'use client';

import { UserModel } from '@b4h/models';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { createContext, ReactNode, useContext } from 'react';
import { getUsers } from '../clients/users';
import { useB4hAuth } from './authProvider';
import { useB4hGroups } from './groupsProvider';

interface B4hUsersContextProps {
  query?: UseQueryResult<UserModel[], Error>;
}

export const B4hUsersContext = createContext<B4hUsersContextProps>({
  query: undefined
});

export function B4hUsersProvider({ children }: { children: ReactNode | ReactNode[] }) {
  const { groupId } = useB4hGroups();
  const { token } = useB4hAuth();

  const query = useQuery<UserModel[]>({
    queryKey: ['users', token],
    queryFn: () => getUsers(token as string),
    enabled: !!token && !!groupId,
    retry: 3
  });

  return (
    <B4hUsersContext.Provider
      value={{
        query: query
      }}
    >
      {children}
    </B4hUsersContext.Provider>
  );
}

export function useB4hUsers() {
  return useContext(B4hUsersContext);
}
