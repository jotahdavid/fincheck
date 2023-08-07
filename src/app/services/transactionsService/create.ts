import { TransactionType } from '@app/entities/Transaction';
import httpClient from '@app/services/httpClient';

export interface TransactionCreateParams {
  name: string;
  value: number;
  bankAccountId: string;
  categoryId: string;
  date: string;
  type: TransactionType;
}

interface TransactionCreateResponse {}

export async function create(params: TransactionCreateParams) {
  const { data } = await httpClient.post<TransactionCreateResponse>('/transactions', params);
  return data;
}
