import { useQuery } from '@tanstack/react-query';

import { transactionsService } from '@app/services/transactionsService';
import { TransactionFilters } from '@app/services/transactionsService/getAll';

export function useTransactions(filters: TransactionFilters) {
  const {
    data = [],
    isFetching,
    isInitialLoading,
    refetch,
  } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => transactionsService.getAll(filters),
  });

  return {
    transactions: data,
    isInitialLoading,
    isLoading: isFetching,
    refetchTransactions: refetch,
  };
}
