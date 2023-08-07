import { useQuery } from '@tanstack/react-query';

import { transactionsService } from '@app/services/transactionsService';
import { delay } from '@app/utils/delay';

export function useTransactions() {
  const { data = [], isFetching, isInitialLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      await delay();
      const date = new Date();
      return transactionsService.getAll({
        month: date.getMonth(),
        year: date.getFullYear(),
      });
    },
  });

  return {
    transactions: data,
    isInitialLoading,
    isLoading: isFetching,
  };
}
