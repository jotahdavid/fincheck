import httpClient from '@app/services/httpClient';

interface BankAccountEditResponse {}

export async function remove(bankAccountId: string) {
  const { data } = await httpClient.delete<BankAccountEditResponse>(`/bank-accounts/${bankAccountId}`);
  return data;
}
