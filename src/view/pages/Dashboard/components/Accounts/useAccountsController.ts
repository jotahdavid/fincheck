import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useWindowWidth } from '@app/hooks/useWindowWidth';
import { bankAccountsService } from '@app/services/bankAccountsService';
import { delay } from '@app/utils/delay';

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

  const { data = [], isFetching } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: async () => {
      await delay();
      return bankAccountsService.getAll();
    },
  });

  const currentBalance = useMemo(() => {
    if (!data) return 0;
    return data.reduce((total, account) => account.currentBalance + total, 0);
  }, [data]);

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValueVisibility,
    isLoading: isFetching,
    accounts: data,
    openNewAccountModal,
    currentBalance,
    openEditAccountModal,
  };
}
