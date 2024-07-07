import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getFirebaseAuth } from './firebase';

interface AuthProviderProps {
  children: ReactNode | ReactNode[];
}

interface AuthContextProps {
  loading: boolean;
  token?: string | null;
}

export const AuthContext = createContext<AuthContextProps>({
  loading: false,
  token: null
});

export function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<User | null>();
  const [token, setToken] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), u => setUser(u));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setLoading(true);
    user
      ?.getIdToken()
      .then(value => setToken(value))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        loading: loading,
        token: token
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
