'use client';

import { User } from 'firebase/auth';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextProps = {
  user?: User;
  getUserName: () => string | undefined;
  token?: string;
};

export const AuthContext = createContext<AuthContextProps>({
  user: undefined,
  getUserName: () => undefined,
  token: undefined
});

export function AuthProvider(props: any) {
  const { push } = useRouter();
  const pathname = usePathname();
  const [token, setToken] = useState<string>();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    user?.getIdToken(true).then((token: string) => {
      setToken(token);
    });
  }, [user]);

  if (loading) {
    return <></>;
  }


  return (
    <AuthContext.Provider
      value={{
        user,
        getUserName: () => {
          if (user?.displayName) {
            return user?.displayName?.split(' ').at(0);
          }
          return user?.email?.split('@').at(0);
        },
        token
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}