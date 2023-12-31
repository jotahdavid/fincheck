import { PlusIcon } from '@radix-ui/react-icons';

import { DropdownMenu } from '@view/components/DropdownMenu';
import { BankAccountIcon } from '@view/components/icons/BankAccountIcon';
import { CategoryIcon } from '@view/components/icons/categories/CategoryIcon';
import { useBankAccounts } from '@app/hooks/useBankAccounts';

import { useDashboard } from '../DashboardContext/useDashboard';

export function Fab() {
  const { openNewAccountModal, openNewTransactionModal } = useDashboard();
  const { accounts, isFetching } = useBankAccounts();

  return (
    <div className="fixed right-4 bottom-4 z-10">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button
            type="button"
            className="text-white bg-teal-900 rounded-full w-12 h-12 flex items-center justify-center hover:bg-teal-800 transition-colors"
          >
            <PlusIcon className="w-6 h-6" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="mr-4" container={document.getElementById('radix-root')}>
          <DropdownMenu.Item
            className="gap-2"
            onSelect={() => openNewTransactionModal('EXPENSE')}
            disabled={accounts.length === 0 || isFetching}
          >
            <CategoryIcon type="expense" />
            Nova Despesa
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="gap-2"
            onSelect={() => openNewTransactionModal('INCOME')}
            disabled={accounts.length === 0 || isFetching}
          >
            <CategoryIcon type="income" />
            Nova Receita
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="gap-2"
            onSelect={openNewAccountModal}
          >
            <BankAccountIcon />
            Nova Conta
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
