import httpClient from '@app/services/httpClient';

interface BankAccountRemoveResponse {}

export async function remove(bankAccountId: string) {
  const { data } = await httpClient.delete<BankAccountRemoveResponse>(`/bank-accounts/${bankAccountId}`);
  return data;
}
