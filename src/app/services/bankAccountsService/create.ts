import { BankAccountType } from '@app/entities/BankAccount';
import httpClient from '@app/services/httpClient';

export interface BankAccountCreateParams {
  name: string;
  initialBalance: number;
  color: string;
  type: BankAccountType;
}

interface BankAccountCreateResponse {}

export async function create(params: BankAccountCreateParams) {
  const { data } = await httpClient.post<BankAccountCreateResponse>('/bank-accounts', params);
  return data;
}
