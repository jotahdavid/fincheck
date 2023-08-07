import httpClient from '@app/services/httpClient';

type BankAccountGetAllResponse = Array<{
  id: string;
  name: string;
  initialBalance: number;
  type: 'CHECKING' | 'INVESTMENT' | 'CASH';
  color: string;
  currentBalance: number;
}>;

export async function getAll() {
  const { data } = await httpClient.get<BankAccountGetAllResponse>('/bank-accounts');
  return data;
}
