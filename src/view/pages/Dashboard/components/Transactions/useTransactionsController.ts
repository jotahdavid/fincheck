import { useEffect, useState } from 'react';

import { useTransactions } from '@app/hooks/useTransactions';
import { TransactionFilters } from '@app/services/transactionsService/getAll';
import { Transaction } from '@app/entities/Transaction';

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

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transactionBeingEdited, setTransactionBeingEdited] = useState<Transaction | null>(null);

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

  function handleApplyFilters(newFilters: { bankAccountId?: string; year: number; }) {
    handleChangeFilter('bankAccountId')(newFilters.bankAccountId);
    handleChangeFilter('year')(newFilters.year);
    setIsFiltersModalOpen(false);
  }

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleOpenEditModal(transaction: Transaction) {
    setIsEditModalOpen(true);
    setTransactionBeingEdited(transaction);
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false);
    setTransactionBeingEdited(null);
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
    handleApplyFilters,
    isEditModalOpen,
    transactionBeingEdited,
    handleOpenEditModal,
    handleCloseEditModal,
  };
}
