import httpClient from '@app/services/httpClient';

interface TransactionRemoveResponse {}

export async function remove(transactionId: string) {
  const { data } = await httpClient.delete<TransactionRemoveResponse>(`/transactions/${transactionId}`);
  return data;
}
