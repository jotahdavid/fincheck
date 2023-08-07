import { ChevronDownIcon } from '@radix-ui/react-icons';

import { DropdownMenu } from '@view/components/DropdownMenu';
import { ExpensesIcon } from '@view/components/icons/ExpensesIcon';
import { IncomeIcon } from '@view/components/icons/IncomeIcon';
import { TransactionsIcon } from '@view/components/icons/TransactionsIcon';

interface TransactionTypeDropdownProps {
  selectedType?: 'INCOME' | 'EXPENSE';
  onSelect?: (value?: 'INCOME' | 'EXPENSE') => void;
}

export function TransactionTypeDropdown({ selectedType, onSelect }: TransactionTypeDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button type="button" className="flex items-center gap-2">
          {selectedType === 'INCOME' && <IncomeIcon />}
          {selectedType === 'EXPENSE' && <ExpensesIcon />}
          {!selectedType && <TransactionsIcon />}

          <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
            {selectedType === 'INCOME' && 'Receitas'}
            {selectedType === 'EXPENSE' && 'Despesas'}
            {!selectedType && 'Transações'}
          </span>
          <ChevronDownIcon className="text-gray-900" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="z-20">
        <DropdownMenu.Item className="gap-2 px-8" onSelect={() => onSelect?.('INCOME')}>
          <IncomeIcon />
          Receitas
        </DropdownMenu.Item>
        <DropdownMenu.Item className="gap-2 px-8" onSelect={() => onSelect?.('EXPENSE')}>
          <ExpensesIcon />
          Despesas
        </DropdownMenu.Item>
        <DropdownMenu.Item className="gap-2 px-8" onSelect={() => onSelect?.()}>
          <TransactionsIcon />
          Transações
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

TransactionTypeDropdown.defaultProps = {
  onSelect: null,
  selectedType: null,
};
