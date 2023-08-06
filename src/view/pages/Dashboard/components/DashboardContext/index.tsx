import { LocalStorageKeys } from '@app/config/LocalStorageKeys';
import {
  ReactNode, createContext, useCallback, useMemo, useState,
} from 'react';

interface DashboardContextValue {
  areValuesVisible: boolean;
  isNewAccountModalOpen: boolean;
  isNewTransactionModalOpen: boolean;
  newTransactionType: 'INCOME' | 'EXPENSE' | null;
  toggleValueVisibility: () => void;
  openNewAccountModal: () => void;
  closeNewAccountModal: () => void;
  openNewTransactionModal: (type: 'INCOME' | 'EXPENSE') => void;
  closeNewTransactionModal: () => void;
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
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  const [newTransactionType, setNewTransactionType] = useState<'INCOME' | 'EXPENSE' | null>(null);

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

  const openNewTransactionModal = useCallback((type: 'INCOME' | 'EXPENSE') => {
    setNewTransactionType(type);
    setIsNewTransactionModalOpen(true);
  }, []);

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null);
    setIsNewTransactionModalOpen(false);
  }, []);

  const dashboardProviderValue = useMemo(
    () => ({
      areValuesVisible,
      toggleValueVisibility,
      isNewAccountModalOpen,
      openNewAccountModal,
      closeNewAccountModal,
      isNewTransactionModalOpen,
      openNewTransactionModal,
      closeNewTransactionModal,
      newTransactionType,
    }),
    [
      areValuesVisible,
      toggleValueVisibility,
      isNewAccountModalOpen,
      openNewAccountModal,
      closeNewAccountModal,
      isNewTransactionModalOpen,
      openNewTransactionModal,
      closeNewTransactionModal,
      newTransactionType,
    ],
  );

  return (
    <DashboardContext.Provider value={dashboardProviderValue}>
      {children}
    </DashboardContext.Provider>
  );
}
