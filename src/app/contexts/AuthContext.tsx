import {
  ReactNode, createContext, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { LocalStorageKeys } from '../config/LocalStorageKeys';
import { usersService } from '../services/usersService';

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

  const { isError } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => usersService.me(),
    enabled: signedIn,
  });

  const signIn = useCallback((newAccessToken: string) => {
    localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, newAccessToken);
    setSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
    setSignedIn(false);
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou!');
      signOut();
    }
  }, [isError, signOut]);

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
