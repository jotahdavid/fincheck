import { formatCurrency } from '@app/utils/formatCurrency';
import { BankAccountTypeIcon } from '@view/components/BankAccountTypeIcon';
import { cn } from '@app/utils/cn';

import { useDashboard } from '../DashboardContext/useDashboard';

interface AccountCardProps {
  color: string;
  name: string;
  balance: number;
  type: 'CASH' | 'CHECKING' | 'INVESTMENT';
}

export function AccountCard({
  color, name, balance, type,
}: AccountCardProps) {
  const { areValuesVisible } = useDashboard();

  return (
    <div
      className="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-4 border-b-teal-950"
      style={{ borderBottomColor: color }}
    >
      <header>
        <BankAccountTypeIcon type={type} />

        <span className="text-gray-800 font-medium tracking-[-0.5px] block mt-4">
          {name}
        </span>
      </header>

      <div>
        <span className={cn(
          'text-gray-800 font-medium tracking-[-0.5px] block',
          !areValuesVisible && 'blur-[8px] select-none',
        )}
        >
          {formatCurrency(balance)}
        </span>
        <small className="text-gray-600 text-sm">
          Saldo atual
        </small>
      </div>
    </div>
  );
}
