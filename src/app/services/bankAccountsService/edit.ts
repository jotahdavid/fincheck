import httpClient from '@app/services/httpClient';
import { BankAccountType } from '@app/entities/BankAccount';

export interface BankAccountEditParams {
  id: string;
  name: string;
  initialBalance: number;
  color: string;
  type: BankAccountType;
}

interface BankAccountEditResponse {}

export async function edit(params: BankAccountEditParams) {
  const { data } = await httpClient.put<BankAccountEditResponse>(`/bank-accounts/${params.id}`, params);
  return data;
}
