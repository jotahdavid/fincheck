import { formatCurrency } from '@app/utils/formatCurrency';
import { BankAccountTypeIcon } from '@view/components/BankAccountTypeIcon';
import { cn } from '@app/utils/cn';
import { BankAccount } from '@app/entities/BankAccount';

import { useDashboard } from '../DashboardContext/useDashboard';

interface AccountCardProps {
  bankAccount: BankAccount;
}

export function AccountCard({ bankAccount }: AccountCardProps) {
  const { areValuesVisible, openEditAccountModal } = useDashboard();

  return (
    <button
      type="button"
      className="w-full p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-4 border-b-teal-950 text-left"
      style={{ borderBottomColor: bankAccount.color }}
      onClick={() => openEditAccountModal(bankAccount)}
    >
      <header>
        <BankAccountTypeIcon type={bankAccount.type} />

        <span className="text-gray-800 font-medium tracking-[-0.5px] block mt-4">
          {bankAccount.name}
        </span>
      </header>

      <div>
        <span className={cn(
          'text-gray-800 font-medium tracking-[-0.5px] block',
          !areValuesVisible && 'blur-[8px] select-none',
        )}
        >
          {formatCurrency(bankAccount.currentBalance)}
        </span>
        <small className="text-gray-600 text-sm">
          Saldo atual
        </small>
      </div>
    </button>
  );
}
