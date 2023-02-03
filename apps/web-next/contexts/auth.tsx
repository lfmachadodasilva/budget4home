import { User } from 'firebase/auth';
import { usePathname, useRouter } from 'next/navigation';
import nookies from 'nookies';
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { firebaseAuth } from '../util/firebase';
import { B4hRoutes } from '../util/routes';

type AuthContextProps = {
  user: User;
  getUserName: () => string;
  token?: string;
};

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  getUserName: () => '',
  token: null
});

export function AuthProvider(props: any) {
  const { push } = useRouter();
  const pathname = usePathname();
  const [user, loading, error] = useAuthState(firebaseAuth);
  const [token, setToken] = useState<string>();

  useEffect(() => {
    user?.getIdToken(true).then((token: string) => {
      setToken(token);
      nookies.set(undefined, 'uid', user.uid, { path: '/' });
      nookies.set(undefined, 'token', token, { path: '/' });
    });
  }, [user]);

  if (loading) {
    return <></>;
  }
  if (error) {
    nookies.set(undefined, 'uid', null, { path: '/' });
    nookies.set(undefined, 'token', null, { path: '/' });
    return <>fail {error}</>;
  }
  if (!user && pathname !== B4hRoutes.login) {
    nookies.set(undefined, 'uid', null, { path: '/' });
    nookies.set(undefined, 'token', null, { path: '/' });
    push(B4hRoutes.login);
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
