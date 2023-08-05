import { ChevronDownIcon } from '@radix-ui/react-icons';

import { DropdownMenu } from '@view/components/DropdownMenu';
import { ExpensesIcon } from '@view/components/icons/ExpensesIcon';
import { IncomeIcon } from '@view/components/icons/IncomeIcon';
import { TransactionsIcon } from '@view/components/icons/TransactionsIcon';

export function TransactionTypeDropdown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button type="button" className="flex items-center gap-2">
          <TransactionsIcon />
          <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
            Transações
          </span>
          <ChevronDownIcon className="text-gray-900" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="z-20">
        <DropdownMenu.Item className="gap-2 px-8">
          <IncomeIcon />
          Receitas
        </DropdownMenu.Item>
        <DropdownMenu.Item className="gap-2 px-8">
          <ExpensesIcon />
          Despesas
        </DropdownMenu.Item>
        <DropdownMenu.Item className="gap-2 px-8">
          <TransactionsIcon />
          Transações
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
