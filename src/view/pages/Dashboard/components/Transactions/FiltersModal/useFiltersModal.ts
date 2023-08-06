import { useState } from 'react';

export function useFiltersModal() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  function handleSelectBankAccount(bankAccountId: string) {
    setSelectedBankAccountId((prevState) => (prevState !== bankAccountId ? bankAccountId : null));
  }

  function handleChangeYear(step: number) {
    setSelectedYear((prevState) => prevState + step);
  }

  return {
    selectedBankAccountId,
    handleSelectBankAccount,
    selectedYear,
    handleChangeYear,
  };
}
