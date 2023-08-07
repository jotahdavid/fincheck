import { useEffect, useState } from 'react';

import { useTransactions } from '@app/hooks/useTransactions';
import { TransactionFilters } from '@app/services/transactionsService/getAll';

import { useDashboard } from '../DashboardContext/useDashboard';

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  const [filters, setFilters] = useState<TransactionFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const {
    transactions,
    isLoading,
    isInitialLoading,
    refetchTransactions,
  } = useTransactions(filters);

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  useEffect(() => {
    refetchTransactions();
  }, [refetchTransactions, filters]);

  function handleChangeFilter<TFilter extends keyof TransactionFilters>(filterName: TFilter) {
    return (value: TransactionFilters[TFilter]) => {
      if (value === filters[filterName]) return;

      setFilters((prevState) => ({
        ...prevState,
        [filterName]: value,
      }));
    };
  }

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  return {
    areValuesVisible,
    transactions,
    isInitialLoading,
    isLoading,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleChangeFilter,
    transactionFilters: filters,
  };
}
