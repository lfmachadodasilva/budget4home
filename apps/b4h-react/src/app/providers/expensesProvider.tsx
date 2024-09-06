import { ExpenseModel } from '@b4h/models';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { createContext, ReactNode, useContext } from 'react';
import { getExpenses } from '../clients/expenses';
import { useB4hAuth } from './authProvider';
import { useB4hGroups } from './groupsProvider';

interface B4hExpesesContextProps {
  query?: UseQueryResult<ExpenseModel[], Error>;
}

export const B4hExpensesContext = createContext<B4hExpesesContextProps>({
  query: undefined
});

export function B4hExpesesProvider({ children }: { children: ReactNode | ReactNode[] }) {
  const { groupId } = useB4hGroups();
  const { token } = useB4hAuth();

  const query = useQuery<ExpenseModel[]>({
    queryKey: ['expenses', token],
    queryFn: () => getExpenses(token as string, groupId as string),
    enabled: !!token && !!groupId,
    retry: 3
  });

  return (
    <B4hExpensesContext.Provider
      value={{
        query: query
      }}
    >
      {children}
    </B4hExpensesContext.Provider>
  );
}

export function useB4hExpeses() {
  return useContext(B4hExpensesContext);
}
