import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getFirebaseAuth } from './firebase';

interface AuthProviderProps {
  children: ReactNode | ReactNode[];
}

interface B4hAuthContextProps {
  isAuth: boolean;
  user?: User | null;
  loading: boolean;
  token?: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export const B4hAuthContext = createContext<B4hAuthContextProps>({
  isAuth: false,
  user: undefined,
  loading: false,
  token: undefined,
  login: async (email: string, password: string) => Promise.resolve(),
  logout: async () => Promise.resolve(),
  register: async (email: string, password: string) => Promise.resolve(),
  resetPassword: async (email: string) => Promise.resolve()
});

const baseUrl = (process.env['NEXT_PUBLIC_API_URL'] as string) ?? 'http://localhost:3000';

const loginFetch = async (token: string) =>
  fetch(new URL('/api/auth/login', baseUrl), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    cache: 'no-cache'
  });

export function B4hAuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<{
    user: User | null;
    token: string | null | undefined;
  }>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), async userCred => {
      if (!userCred) {
        setUser({ user: null, token: null });
        return;
      }

      const token = await userCred?.getIdToken();

      await loginFetch(token)
        .then(async response => {
          if (response.ok) {
            setUser({ user: userCred, token: token });
          } else {
            setUser({ user: null, token: null });
          }
        })
        .catch(err => {
          console.error(err);
          setUser(undefined);
        })
        .finally(() => setLoading(false));
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
  };

  const logout = async () => {
    await signOut(getFirebaseAuth());
  };

  const register = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(getFirebaseAuth(), email, password);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(getFirebaseAuth(), email);
  };

  return (
    <B4hAuthContext.Provider
      value={{
        isAuth: !!user,
        user: user?.user,
        loading: loading,
        token: user?.token,
        login,
        logout,
        register,
        resetPassword
      }}
    >
      {props.children}
    </B4hAuthContext.Provider>
  );
}

export function useB4hAuth() {
  return useContext(B4hAuthContext);
}
