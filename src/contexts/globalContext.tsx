import { head } from 'lodash';
import { createContext, memo, PropsWithChildren, useEffect, useState } from 'react';
import { defaultGlobalModel, GlobalModel } from '../models/globalModels';
import { GroupModel } from '../models/groupModel';
import { getAllGroups } from '../services/groupService';

export const GlobalContext = createContext<GlobalModel>(defaultGlobalModel);

export interface GlobalContextProviderProps {
  isReady: boolean;
}

export const GlobalContextProvider = memo((props: PropsWithChildren<GlobalContextProviderProps>) => {
  const { isReady } = props;
  const [isLoading, setLoading] = useState(true);

  const today = new Date();
  const [group, setGroup] = useState<number>(defaultGlobalModel.group);
  const [month, setMonth] = useState<number>(defaultGlobalModel.month);
  const [year, setYear] = useState<number>(defaultGlobalModel.year);

  const [groups, setGroups] = useState<GroupModel[]>([]);
  const [years, setYears] = useState<number[]>([2021, 2020, 2019]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const runAsync = async () => {
      try {
        // get all groups
        try {
          const gs = await getAllGroups();
          setGroups(gs);
          setGroup(head(gs)?.id || 0);
        } catch (error) {}
        // define current group
        // get all years
        // define current year
        // define current month
      } catch {
        // show error
      } finally {
        setLoading(false);
      }
    };
    runAsync();
  }, [isReady]);

  return (
    <GlobalContext.Provider value={{ ...defaultGlobalModel, groups, years, group, month, year }}>
      {props.children}
    </GlobalContext.Provider>
  );
});
