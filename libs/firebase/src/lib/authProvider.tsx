'use client';

import React, { useMemo } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

import { firebaseAuth } from './firebase';

type AuthContextProps = {
  user?: User;
  userName?: string;
  token?: string;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextProps>({
  token: undefined,
  user: undefined,
  userName: undefined,
  loading: true,
});

export function AuthProvider(props: any) {
  const [value, setValue] = useState<AuthContextProps>({
    loading: true,
  });

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user: User | null) => {
      user?.getIdToken(true).then((token) => {
        setValue({
          user,
          token,
          loading: false,
          userName:
            user?.displayName?.split(' ')?.at(0) ??
            user?.email?.split('@').at(0) ??
            '',
        });
      });
    });
  }, []);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
