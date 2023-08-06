import { Modal } from '@view/components/Modal';
import { InputCurrency } from '@view/components/InputCurrency';

import { Input } from '@view/components/Input';
import { useNewAccountModalController } from './useNewAccountModalController';
import { Select } from '@view/components/Select';
import { ColorsDropdownInput } from '@view/components/ColorsDropdownInput';
import { Button } from '@view/components/Button';

export function NewAccountModal() {
  const {
    isNewAccountModalOpen,
    closeNewAccountModal,
  } = useNewAccountModalController();

  return (
    <Modal
      open={isNewAccountModalOpen}
      title="Nova Conta"
      onClose={closeNewAccountModal}
    >
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="">
          <span className="text-gray-600 tracking-[-0.5px] text-sm">Saldo</span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <InputCurrency defaultValue="0,00" />
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <Input
            type="text"
            name="name"
            placeholder="Nome da Conta"
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
            placeholder="Tipo"
          />

          <ColorsDropdownInput />
        </div>

        <Button type="submit" className="w-full mt-6">
          Criar
        </Button>
      </form>
    </Modal>
  );
}
