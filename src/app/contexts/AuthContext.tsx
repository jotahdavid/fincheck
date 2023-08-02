import {
  ReactNode, createContext, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { LocalStorageKeys } from '../config/LocalStorageKeys';
import { usersService } from '../services/usersService';
import { LaunchScreen } from '../../view/components/LaunchScreen';

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

  const {
    isError, isFetching, isSuccess, remove,
  } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  });

  const signIn = useCallback((newAccessToken: string) => {
    localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, newAccessToken);
    setSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
    remove();
    setSignedIn(false);
  }, [remove]);

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou!');
      signOut();
    }
  }, [isError, signOut]);

  const authProviderValue = useMemo(() => ({
    signedIn: isSuccess && signedIn,
    signIn,
    signOut,
  }), [isSuccess, signedIn, signIn, signOut]);

  return (
    <AuthContext.Provider value={authProviderValue}>
      <LaunchScreen isLoading={isFetching} />

      {!isFetching && children}
    </AuthContext.Provider>
  );
}
