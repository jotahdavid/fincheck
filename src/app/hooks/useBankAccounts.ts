import { useQuery } from '@tanstack/react-query';

import { bankAccountsService } from '@app/services/bankAccountsService';
import { delay } from '@app/utils/delay';

export function useBankAccounts() {
  const { data = [], isFetching } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: async () => {
      await delay();
      return bankAccountsService.getAll();
    },
  });

  return {
    accounts: data,
    isFetching,
  };
}
