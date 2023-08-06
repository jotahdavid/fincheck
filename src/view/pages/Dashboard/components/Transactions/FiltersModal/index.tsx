import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

import { cn } from '@app/utils/cn';
import { Modal } from '@view/components/Modal';
import { Button } from '@view/components/Button';

import { useFiltersModal } from './useFiltersModal';

interface FiltersModalProps {
  open: boolean;
  onClose: () => void;
}

const mockedBankAccounts = [
  {
    id: '123',
    name: 'Nubank',
  },
  {
    id: '456',
    name: 'XP Investimentos',
  },
  {
    id: '789',
    name: 'Dinheiro',
  },
];

export function FiltersModal({ open, onClose }: FiltersModalProps) {
  const {
    selectedBankAccountId,
    handleSelectBankAccount,
    selectedYear,
    handleChangeYear,
  } = useFiltersModal();

  return (
    <Modal open={open} title="Filtros" onClose={onClose}>
      <div>
        <span className="text-lg tracking-[-1px] font-bold text-gray-800">
          Conta
        </span>

        <div className="space-y-2 mt-2">
          {mockedBankAccounts.map((bankAccount) => (
            <button
              type="button"
              className={cn(
                'w-full p-2 rounded-2xl hover:bg-gray-50 transition-colors text-left text-gray-800',
                bankAccount.id === selectedBankAccountId && '!bg-gray-200',
              )}
              onClick={() => handleSelectBankAccount(bankAccount.id)}
              key={bankAccount.id}
            >
              {bankAccount.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 text-gray-800">
        <span className="text-lg tracking-[-1px] font-bold">
          Ano
        </span>

        <div className="mt-2 w-52 flex items-center">
          <button
            type="button"
            className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => handleChangeYear(-1)}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <span className="block flex-1 text-center text-sm font-medium tracking-[-0.5px]4">
            {selectedYear}
          </span>
          <button
            type="button"
            className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => handleChangeYear(1)}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <Button className="w-full mt-10">
        Aplicar filtros
      </Button>
    </Modal>
  );
}
