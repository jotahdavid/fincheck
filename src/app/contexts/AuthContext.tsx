import {
  ReactNode, createContext, useCallback, useMemo, useState,
} from 'react';

import { LocalStorageKeys } from '../config/LocalStorageKeys';

interface AuthProviderValue {
  signedIn: boolean;
  signIn: (accessToken: string) => void;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthProviderValue);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
    return Boolean(storedAccessToken);
  });

  const signIn = useCallback((newAccessToken: string) => {
    localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, newAccessToken);
    setSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
    setSignedIn(false);
  }, []);

  const authProviderValue = useMemo(() => ({
    signedIn,
    signIn,
    signOut,
  }), [signedIn, signIn, signOut]);

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  );
}
