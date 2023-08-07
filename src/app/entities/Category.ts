import { TransactionType } from './Transaction';

export interface Category {
  id: string;
  name: string;
  icon: string;
  type: TransactionType;
}
