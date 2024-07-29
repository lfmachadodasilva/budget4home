import { GroupModel } from '@b4h/models';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getGroupsFetch } from '../clients/groups';
import { LoadingData } from '../components/loadingData';
import { useAuth } from './authProvider';

interface GlobalProviderProps {
  children: ReactNode | ReactNode[];
}

interface GlobalContextProps {
  groups?: GroupModel[];
  group?: GroupModel;
  isLoading: boolean;
}

export const GlobalContext = createContext<GlobalContextProps>({
  groups: undefined,
  group: undefined,

  isLoading: false
});

export function GlobalProvider(props: GlobalProviderProps) {
  const { user } = useAuth();
  const [groups, setGroups] = useState<GroupModel[]>();
  const [group, setGroup] = useState<GroupModel>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!user) return;

    setIsLoading(true);
    getGroupsFetch()
      .then(groups => {
        setGroups(groups);
        if (groups.length > 0) {
          const groupId = localStorage.getItem('groupId') ?? groups[0].id;
          localStorage.setItem('groupId', groupId);
          setGroup(groups.find(g => g.id === groupId));
        }
      })
      .finally(() => setIsLoading(false));
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        groups,
        group,
        isLoading: isLoading
      }}
    >
      {isLoading && <LoadingData isLoading={false} />}
      {!isLoading && props.children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}
