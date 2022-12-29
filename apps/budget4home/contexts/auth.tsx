import { User } from 'firebase/auth';
// import { cookies } from 'next/headers';
import { usePathname, useRouter } from 'next/navigation';

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
  const { push } = useRouter();
  const pathname = usePathname();
  // const nextCookies = cookies();
  const [user, loading, error] = useAuthState(firebaseAuth);
  const [token, setToken] = useState<string>();

  useEffect(() => {
    user?.getIdToken(true).then(token => {
      setToken(token);
      nookies.set(undefined, 'uid', user.uid, { path: '/' });
      nookies.set(undefined, 'token', token, { path: '/' });
      // nextCookies.set({
      //   name: 'uid',
      //   value: user?.uid
      // });
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
