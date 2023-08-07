export type BankAccountType = 'CHECKING' | 'INVESTMENT' | 'CASH';

export interface BankAccount {
  id: string;
  name: string;
  initialBalance: number;
  type: BankAccountType;
  color: string;
  currentBalance: number;
}
