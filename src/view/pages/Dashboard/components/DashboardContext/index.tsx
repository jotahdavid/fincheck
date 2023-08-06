import { LocalStorageKeys } from '@app/config/LocalStorageKeys';
import {
  ReactNode, createContext, useCallback, useMemo, useState,
} from 'react';

interface DashboardContextValue {
  areValuesVisible: boolean;
  isNewAccountModalOpen: boolean;
  toggleValueVisibility: () => void;
  openNewAccountModal: () => void;
  closeNewAccountModal: () => void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

interface DashboardProviderProps {
  children: ReactNode;
}

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [areValuesVisible, setAreValuesVisible] = useState<boolean>(() => {
    const areValuesVisibleStoraged = localStorage.getItem(LocalStorageKeys.ARE_VALUES_VISIBLE);
    return areValuesVisibleStoraged !== 'false';
  });

  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(true);

  const toggleValueVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => {
      localStorage.setItem(LocalStorageKeys.ARE_VALUES_VISIBLE, String(!prevState));
      return !prevState;
    });
  }, []);

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true);
  }, []);

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false);
  }, []);

  const dashboardProviderValue = useMemo(
    () => ({
      areValuesVisible,
      toggleValueVisibility,
      isNewAccountModalOpen,
      openNewAccountModal,
      closeNewAccountModal,
    }),
    [
      areValuesVisible,
      toggleValueVisibility,
      isNewAccountModalOpen,
      openNewAccountModal,
      closeNewAccountModal,
    ],
  );

  return (
    <DashboardContext.Provider value={dashboardProviderValue}>
      {children}
    </DashboardContext.Provider>
  );
}
