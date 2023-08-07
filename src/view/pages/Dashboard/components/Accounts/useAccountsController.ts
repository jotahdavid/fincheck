import { useMemo, useState } from 'react';

import { useWindowWidth } from '@app/hooks/useWindowWidth';
import { useBankAccounts } from '@app/hooks/useBankAccounts';

import { useDashboard } from '../DashboardContext/useDashboard';

export function useAccountsController() {
  const windowWidth = useWindowWidth();
  const {
    areValuesVisible,
    toggleValueVisibility,
    openNewAccountModal,
    openEditAccountModal,
  } = useDashboard();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const { accounts, isFetching } = useBankAccounts();

  const currentBalance = useMemo(() => (
    accounts.reduce((total, account) => account.currentBalance + total, 0)
  ), [accounts]);

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValueVisibility,
    isLoading: isFetching,
    accounts,
    openNewAccountModal,
    currentBalance,
    openEditAccountModal,
  };
}
