import { head } from 'lodash';
import { createContext, memo, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { defaultGlobalModel, GlobalModel } from '../models/globalModels';
import { GroupModel } from '../models/groupModel';
import { getExpenseYears } from '../services/expenseService';
import { getAllGroups } from '../services/groupService';

export const GlobalContext = createContext<GlobalModel>(defaultGlobalModel);

export interface GlobalContextProviderProps {
  isReady: boolean;
}

export const GlobalContextProvider = memo((props: PropsWithChildren<GlobalContextProviderProps>) => {
  const { isReady } = props;
  const [reload, setReload] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isLoadingGroup, setLoadingGroup] = useState(true);
  const [isLoadingMonth, setLoadingMonth] = useState(true);
  const [isLoadingYear, setLoadingYear] = useState(true);

  const [group, setGroup] = useState<number>(defaultGlobalModel.group);
  const [month, setMonth] = useState<number>(defaultGlobalModel.month);
  const [year, setYear] = useState<number>(defaultGlobalModel.year);

  const [groups, setGroups] = useState<GroupModel[]>([]);
  const [years, setYears] = useState<number[]>([defaultGlobalModel.year]);

  const groupKey = 'group';
  const monthKey = 'month';
  const yearKey = 'year';

  const handleOnChange = useCallback((group: number, month: number, year: number) => {
    setGroup(group);
    setMonth(month);
    setYear(year);
    localStorage.setItem(groupKey, group.toString());
    localStorage.setItem(monthKey, month.toString());
    localStorage.setItem(yearKey, year.toString());
  }, []);

  const handleOnReload = useCallback(() => {
    setReload(!reload);
  }, [reload]);

  // main load - load groups and years
  useEffect(() => {
    if (!isReady) {
      return;
    }

    const runGroupAsync = async () => {
      try {
        // get all groups
        const gs = await getAllGroups();
        setGroups(gs);
      } catch {
        // show error
      } finally {
        setLoading(false);
      }
    };
    const runYearsAsync = async () => {
      // get all years
      try {
        const results = await getExpenseYears();
        setYears(results);
      } catch {
        // show error
      } finally {
        setLoading(false);
      }
    };

    runYearsAsync();
    runGroupAsync();
  }, [isReady, reload]);

  // first load groups
  useEffect(() => {
    const defineTheFirstGroup = () => {
      // first time - select the first form the list
      const id = head(groups)?.id;
      if (!id) {
        // TODO error
        return;
      }
      setGroup(id);
      localStorage.setItem(groupKey, id.toString());
    };

    const localStorageGroup = localStorage.getItem(groupKey);
    if (!localStorageGroup) {
      defineTheFirstGroup();
    } else {
      if (isNaN(+localStorageGroup)) {
        return defineTheFirstGroup();
      }
      const id = groups.find(g => g.id === +localStorageGroup)?.id;
      if (!id) {
        // does not exist any more
        return defineTheFirstGroup();
      }
      setGroup(id);
      localStorage.setItem(groupKey, id.toString());
    }

    setLoadingGroup(false);
  }, [groups]);

  // first load month
  useEffect(() => {
    const defineTheCurrentMonth = () => {
      // first time - select the current month
      setMonth(defaultGlobalModel.month);
      localStorage.setItem(monthKey, defaultGlobalModel.month.toString());
    };

    const localStorageMonth = localStorage.getItem(monthKey);
    if (!localStorageMonth) {
      defineTheCurrentMonth();
    } else {
      if (isNaN(+localStorageMonth)) {
        return defineTheCurrentMonth();
      }
      if (+localStorageMonth < 1 && +localStorageMonth > 12) {
        // does not exist any more
        return defineTheCurrentMonth();
      }
      setMonth(+localStorageMonth);
      localStorage.setItem(monthKey, (+localStorageMonth).toString());
    }

    setLoadingMonth(false);
  }, []);

  // first load year
  useEffect(() => {
    const defineTheCurrentYear = () => {
      // first time - select the first year
      setYear(defaultGlobalModel.year);
      localStorage.setItem(yearKey, defaultGlobalModel.year.toString());
    };

    const localStorageYear = localStorage.getItem(yearKey);
    if (!localStorageYear) {
      defineTheCurrentYear();
    } else {
      if (isNaN(+localStorageYear)) {
        return defineTheCurrentYear();
      }
      const id = years.find(g => g === +localStorageYear);
      if (!id) {
        // does not exist any more
        return defineTheCurrentYear();
      }
      setYear(id);
      localStorage.setItem(yearKey, id.toString());
    }

    setLoadingYear(false);
  }, [years]);

  return (
    <GlobalContext.Provider
      value={{
        ...defaultGlobalModel,
        groups,
        years,
        group,
        month,
        year,
        isLoading: isLoading || isLoadingGroup || isLoadingMonth || isLoadingYear,
        onChange: handleOnChange,
        onReload: handleOnReload
      }}
    >
      {isReady && !isLoading && !isLoadingGroup && !isLoadingMonth && !isLoadingYear ? props.children : <>Loading...</>}
      {/* TODO add loading spinner */}
    </GlobalContext.Provider>
  );
});
