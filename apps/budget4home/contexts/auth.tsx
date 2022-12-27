import { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { ComponentPropsWithoutRef, createContext, useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { firebaseAuth } from '../util/firebase';
import { B4hRoutes } from '../util/routes';

type AuthContextProps = {
  user: User;
  token?: string;
};

interface AuthProps extends ComponentPropsWithoutRef<'div'> {}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  token: null
});

export function AuthProvider(props: any) {
  const { push, pathname } = useRouter();
  const [user, loading, error] = useAuthState(firebaseAuth);
  const [token, setToken] = useState<string>();

  useEffect(() => {
    user?.getIdToken(true).then(token => {
      setToken(token);
      nookies.set(undefined, 'token', token, { path: '/' });
    });
  }, [user]);

  if (loading) {
    return <></>;
  }
  if (error) {
    return <>fail {error}</>;
  }
  if (!user && pathname !== B4hRoutes.login) {
    push(B4hRoutes.login);
    return <></>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
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
