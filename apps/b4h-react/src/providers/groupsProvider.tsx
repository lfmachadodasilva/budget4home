'use client';

import { GroupModel } from '@b4h/models';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { getGroups } from '../clients/groups';
import { LocalStorageKeys } from '../shared/localStorage';
import { useB4hAuth } from './authProvider';

interface B4hGroupsContextProps {
  query?: UseQueryResult<GroupModel[], Error>;

  groupId?: string | null;
  setGroupId: (groupId: string) => void;
}

export const B4hGroupContext = createContext<B4hGroupsContextProps>({
  query: undefined,

  groupId: null,
  setGroupId: () => {}
});

export function B4hGroupsProvider({ children }: { children: ReactNode | ReactNode[] }) {
  const { token } = useB4hAuth();
  const [groupId, setGroupId] = useState<string | null>(null);

  const query = useQuery<GroupModel[]>({
    queryKey: ['groups', token],
    queryFn: () => getGroups(token as string),
    enabled: !!token,
    retry: 3
  });

  const { data: groups } = query;

  useEffect(() => {
    const lsGroupId = localStorage.getItem(LocalStorageKeys.groupId);
    if (lsGroupId && groups?.find(group => group.id === lsGroupId)) {
      setGroupId(lsGroupId);
    } else {
      setGroupId(groups?.[0]?.id ?? null);
      localStorage.setItem(LocalStorageKeys.groupId, groups?.[0]?.id ?? '');
    }
  }, [groups]);

  const handleSetGroupId = useCallback(
    (groupId: string) => {
      if (groups?.find(group => group.id === groupId)) {
        setGroupId(groupId);
        localStorage.setItem(LocalStorageKeys.groupId, groupId);
      } else {
        setGroupId(groups?.[0]?.id ?? null);
        localStorage.setItem(LocalStorageKeys.groupId, groups?.[0]?.id ?? '');
      }
    },
    [groups]
  );

  return (
    <B4hGroupContext.Provider
      value={{
        query: query,
        groupId: groupId,
        setGroupId: handleSetGroupId
      }}
    >
      {children}
    </B4hGroupContext.Provider>
  );
}

export function useB4hGroups() {
  return useContext(B4hGroupContext);
}
