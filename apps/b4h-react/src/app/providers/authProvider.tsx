import {
  createUserWithEmailAndPassword,
  getFirebaseAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  User
} from '@b4h/firebase';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

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
  login: async (email: string, password: string) => {},
  logout: async () => {},
  register: async (email: string, password: string) => {},
  resetPassword: async (email: string) => {}
});

export function B4hAuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<{ user: User | null; token: string | null | undefined }>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(
      getFirebaseAuth(),
      async userCred => {
        if (!userCred) {
          setUser({ user: null, token: null });
          return;
        }

        const token = await userCred?.getIdToken();

        setUser({ user: userCred, token: token });
        setLoading(false);
      },
      error => console.error(error),
      () => {
        console.log('B4hAuthProvider', 'completed');
      }
    );

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
