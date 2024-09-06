import { LabelModel } from '@b4h/models';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { createContext, ReactNode, useContext } from 'react';
import { getLabels } from '../clients/labels';
import { useB4hAuth } from './authProvider';
import { useB4hGroups } from './groupsProvider';

interface B4hLabelsContextProps {
  query?: UseQueryResult<LabelModel[], Error>;
}

export const B4hAuthContext = createContext<B4hLabelsContextProps>({
  query: undefined
});

export function B4hLabelsProvider({ children }: { children: ReactNode | ReactNode[] }) {
  const { groupId } = useB4hGroups();
  const { token } = useB4hAuth();

  const query = useQuery<LabelModel[]>({
    queryKey: ['labels', token, groupId],
    queryFn: () => getLabels(token as string, groupId as string),
    enabled: !!groupId && !!token,
    retry: 3
  });

  return (
    <B4hAuthContext.Provider
      value={{
        query: query
      }}
    >
      {children}
    </B4hAuthContext.Provider>
  );
}

export function useB4hLabels() {
  return useContext(B4hAuthContext);
}
