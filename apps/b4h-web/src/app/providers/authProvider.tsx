import { getFirebaseAuth } from '@b4h/firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthProviderProps {
  children: ReactNode | ReactNode[];
}

interface AuthContextProps {
  isAuth: boolean;
  user?: User | null;
  loading: boolean;
  token?: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuth: false,
  user: undefined,
  loading: false,
  token: undefined,
  login: async (email: string, password: string) => {},
  logout: async () => {},
  register: async (email: string, password: string) => {},
  resetPassword: async (email: string) => {}
});

export function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<User | null>();
  const [token, setToken] = useState<string>();
  const [loading1, setLoading1] = useState<boolean>(true);
  const [loading2, setLoading2] = useState<boolean>(true);

  useEffect(() => {
    setLoading1(true);
    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), u => {
      setUser(u);
      setLoading1(false);
      setLoading2(true);
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

  useEffect(() => {
    setLoading2(true);
    if (user) {
      user
        .getIdToken()
        .then(value => setToken(value))
        .finally(() => setLoading2(false));
    } else {
      setLoading2(false);
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        isAuth: !!user,
        user,
        loading: loading1 || loading2,
        token,
        login,
        logout,
        register,
        resetPassword
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
