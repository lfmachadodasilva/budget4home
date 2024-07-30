import { GroupModel } from '@b4h/models';
import { useQuery } from '@tanstack/react-query';
import { createContext, ReactNode, useContext } from 'react';
import { getGroupsFetch } from '../clients/groups';
import { LoadingData } from '../components/loadingData';
import { useAuth } from './authProvider';

interface GlobalProviderProps {
  children: ReactNode | ReactNode[];
}

interface GlobalContextProps {
  groups?: GroupModel[];
  group?: GroupModel;
  loading: boolean;
}

export const GlobalContext = createContext<GlobalContextProps>({
  groups: undefined,
  group: undefined,

  loading: false
});

export function GlobalProvider(props: GlobalProviderProps) {
  const { loading: authLoading, token } = useAuth();

  const getQuery = useQuery<GroupModel[], Error>({
    queryKey: ['getGroups'],
    queryFn: () => getGroupsFetch(token as string),
    enabled: !!token || !authLoading
  });

  console.log('GlobalProvider', { getQuery });

  const loading = getQuery.isPending || getQuery.isFetching;
  const groups = getQuery?.data;
  let group: GroupModel | undefined | null = undefined;

  if (groups && groups?.length > 0) {
    const groupId = localStorage.getItem('groupId') ?? groups[0].id;
    localStorage.setItem('groupId', groupId);
    group = groups.find(g => g.id === groupId);
  }

  return (
    <GlobalContext.Provider
      value={{
        groups: groups,
        group: group,
        loading: loading
      }}
    >
      {loading && <LoadingData isLoading={false} />}
      {!loading && props.children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}
