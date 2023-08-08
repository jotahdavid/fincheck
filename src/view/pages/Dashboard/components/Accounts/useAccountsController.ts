import { useEffect, useMemo, useState } from 'react';

import { useWindowWidth } from '@app/hooks/useWindowWidth';
import { useBankAccounts } from '@app/hooks/useBankAccounts';

import { useDashboard } from '../DashboardContext/useDashboard';

interface SlideState {
  isBeginning: boolean | null;
  isEnd: boolean | null;
}

export function useAccountsController() {
  const windowWidth = useWindowWidth();
  const {
    areValuesVisible,
    toggleValueVisibility,
    openNewAccountModal,
    openEditAccountModal,
  } = useDashboard();

  const [sliderState, setSliderState] = useState<SlideState>({
    isBeginning: null,
    isEnd: null,
  });

  const { accounts, isFetching } = useBankAccounts();

  useEffect(() => {
    if (isFetching) {
      setSliderState({
        isBeginning: null,
        isEnd: null,
      });
    }
  }, [isFetching]);

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
