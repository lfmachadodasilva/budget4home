import { createContext, memo, PropsWithChildren, useEffect, useState } from 'react';
import { defaultGlobalModel, GlobalModel } from '../models/globalModels';
import { defaultGroupModel, GroupModel } from '../models/groupModel';

export const GlobalContext = createContext<GlobalModel>(defaultGlobalModel);

export const GlobalContextProvider = memo((props: PropsWithChildren<unknown>) => {
  const [isLoading, setLoading] = useState(true);

  const today = new Date();
  const [group, setGroup] = useState<number>(defaultGlobalModel.group);
  const [month, setMonth] = useState<number>(defaultGlobalModel.month);
  const [year, setYear] = useState<number>(defaultGlobalModel.year);

  const [groups, setGroups] = useState<GroupModel[]>(defaultGroupModel);
  const [years, setYears] = useState<number[]>([2021, 2020, 2019]);

  useEffect(() => {
    try {
      // get all groups
      // define current group
      // get all years
      // define current year
      // define current month
    } catch {
      // show error
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <GlobalContext.Provider value={{ ...defaultGlobalModel, groups, years, group, month, year }}>
      {props.children}
    </GlobalContext.Provider>
  );
});
