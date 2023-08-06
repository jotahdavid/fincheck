import httpClient from '@app/services/httpClient';

export interface BankAccountParams {
  name: string;
  initialBalance: number;
  color: string;
  type: 'CHECKING' | 'INVESTMENT' | 'CASH';
}

interface BankAccountResponse {}

export async function create(params: BankAccountParams) {
  const { data } = await httpClient.post<BankAccountResponse>('/bank-accounts', params);
  return data;
}
