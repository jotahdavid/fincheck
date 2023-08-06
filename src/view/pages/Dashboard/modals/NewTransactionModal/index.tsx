import { Modal } from '@view/components/Modal';
import { InputCurrency } from '@view/components/InputCurrency';

import { Input } from '@view/components/Input';
import { Select } from '@view/components/Select';
import { Button } from '@view/components/Button';
import { DatePickerInput } from '@view/components/DatePickerInput';

import { useNewTransactionModalController } from './useNewTransactionModalController';

export function NewTransactionModal() {
  const {
    isNewTransactionModalOpen,
    newTransactionType,
    closeNewTransactionModal,
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === 'EXPENSE';

  return (
    <Modal
      open={isNewTransactionModalOpen}
      title={isExpense ? 'Nova Despesa' : 'Nova Receita'}
      onClose={closeNewTransactionModal}
    >
      <form onSubmit={(event) => event.preventDefault()}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-sm">
            Valor
            {' '}
            {isExpense ? 'da despesa' : 'da receita'}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <InputCurrency defaultValue="0,00" />
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <Input
            type="text"
            name="name"
            placeholder={isExpense ? 'Nome da Despesa' : 'Nome da Receita'}
          />

          <Select
            options={[
              {
                value: 'CHECKING',
                label: 'Conta Corrente',
              },
              {
                value: 'INVESTMENT',
                label: 'Investimento',
              },
              {
                value: 'CASH',
                label: 'Dinheiro',
              },
            ]}
            placeholder="Categoria"
          />

          <Select
            options={[
              {
                value: 'CHECKING',
                label: 'Conta Corrente',
              },
              {
                value: 'INVESTMENT',
                label: 'Investimento',
              },
              {
                value: 'CASH',
                label: 'Dinheiro',
              },
            ]}
            placeholder={isExpense ? 'Pagar com' : 'Receber com'}
          />

          <DatePickerInput />
        </div>

        <Button type="submit" className="w-full mt-6">
          Criar
        </Button>
      </form>
    </Modal>
  );
}
