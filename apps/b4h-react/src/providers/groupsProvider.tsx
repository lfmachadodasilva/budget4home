'use client';

import { GroupModel } from '@b4h/models';
import { useQuery } from '@tanstack/react-query';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getGroups } from '../clients/groups';
import { useB4hAuth } from './authProvider';

interface B4hGroupsContextProps {
  groups?: GroupModel[] | null;
  isPending?: boolean | null;
  error?: Error | null;

  groupId?: string | null;
  setGroupId?: (groupId: string) => void;
}

export const B4hAuthContext = createContext<B4hGroupsContextProps>({
  groups: undefined,
  isPending: undefined,
  error: undefined
});

export function B4hGroupsProvider({ children }: { children: ReactNode | ReactNode[] }) {
  const { token } = useB4hAuth();
  const [groupId, setGroupId] = useState<string | null>(null);

  const {
    isPending,
    error,
    data: groups
  } = useQuery<GroupModel[]>({
    queryKey: ['groups', token],
    queryFn: () => getGroups(token as string),
    enabled: !!token,
    retry: 3
  });

  useEffect(() => {
    const lsGroupId = localStorage.getItem('groupId');
    if (lsGroupId && groups?.find(group => group.id === lsGroupId)) {
      setGroupId(lsGroupId);
    } else {
      setGroupId(groups?.[0]?.id ?? null);
    }
  }, [groups]);

  return (
    <B4hAuthContext.Provider
      value={{
        groups: groups,
        isPending: isPending,
        error: error,
        groupId: groupId,
        setGroupId: setGroupId
      }}
    >
      {children}
    </B4hAuthContext.Provider>
  );
}

export function useB4hGroups() {
  return useContext(B4hAuthContext);
}
