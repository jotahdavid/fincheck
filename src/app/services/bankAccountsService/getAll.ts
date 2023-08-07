import { BankAccount } from '@app/entities/BankAccount';
import httpClient from '@app/services/httpClient';

type BankAccountGetAllResponse = BankAccount[];

export async function getAll() {
  const { data } = await httpClient.get<BankAccountGetAllResponse>('/bank-accounts');
  return data;
}
