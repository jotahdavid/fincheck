import {
  ReactNode, createContext, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { LocalStorageKeys } from '@app/config/LocalStorageKeys';
import { usersService } from '@app/services/usersService';
import { LaunchScreen } from '@view/components/LaunchScreen';
import { User } from '@app/entities/User';

interface AuthProviderValue {
  signedIn: boolean;
  user?: User;
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
    data,
    isError,
    isFetching,
    isSuccess,
    remove,
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
    user: data,
    signedIn: isSuccess && signedIn,
    signIn,
    signOut,
  }), [data, isSuccess, signedIn, signIn, signOut]);

  return (
    <AuthContext.Provider value={authProviderValue}>
      <LaunchScreen isLoading={isFetching} />

      {!isFetching && children}
    </AuthContext.Provider>
  );
}
