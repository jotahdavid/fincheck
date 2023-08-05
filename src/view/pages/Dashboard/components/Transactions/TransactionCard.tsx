import { cn } from '@app/utils/cn';
import { formatCurrency } from '@app/utils/formatCurrency';
import { CategoryIcon } from '@view/components/icons/categories/CategoryIcon';

interface TransactionCardProps {
  name: string;
  date: string;
  type: 'income' | 'expense';
  value: number;
}

export function TransactionCard({
  name, date, type, value,
}: TransactionCardProps) {
  return (
    <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
      <div className="flex-1 flex items-center gap-3">
        <CategoryIcon type={type} />

        <div>
          <strong className="font-bold tracking-[-0.5px] block">
            {name}
          </strong>
          <span className="text-sm text-gray-600">
            {date}
          </span>
        </div>
      </div>

      <span className={cn(
        'tracking-[-0.5px] font-medium',
        type === 'income' ? 'text-green-800' : 'text-red-800',
      )}
      >
        {type === 'expense' && '- '}
        {formatCurrency(value)}
      </span>
    </div>
  );
}
