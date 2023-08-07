import { useState } from 'react';

import { useBankAccounts } from '@app/hooks/useBankAccounts';

export function useFiltersModal() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<string | undefined>();
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  const { accounts } = useBankAccounts();

  function handleSelectBankAccount(bankAccountId: string) {
    setSelectedBankAccountId(
      (prevState) => (prevState !== bankAccountId ? bankAccountId : undefined),
    );
  }

  function handleChangeYear(step: number) {
    setSelectedYear((prevState) => prevState + step);
  }

  return {
    selectedBankAccountId,
    handleSelectBankAccount,
    selectedYear,
    handleChangeYear,
    accounts,
  };
}
