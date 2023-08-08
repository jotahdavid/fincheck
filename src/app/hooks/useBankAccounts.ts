import { useQuery } from '@tanstack/react-query';

import { bankAccountsService } from '@app/services/bankAccountsService';

export function useBankAccounts() {
  const { data = [], isFetching } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: async () => bankAccountsService.getAll(),
    staleTime: Infinity,
  });

  return {
    accounts: data,
    isFetching,
  };
}
