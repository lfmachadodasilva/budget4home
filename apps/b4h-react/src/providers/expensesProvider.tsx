'use client';

import { createContext, ReactNode, useContext } from 'react';

interface B4hExpesesContextProps {}

export const B4hAuthContext = createContext<B4hExpesesContextProps>({});

export function B4hExpesesProvider({ children }: { children: ReactNode | ReactNode[] }) {
  return <B4hAuthContext.Provider value={{}}>{children}</B4hAuthContext.Provider>;
}

export function useB4hExpeses() {
  return useContext(B4hAuthContext);
}
