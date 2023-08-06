import { Controller } from 'react-hook-form';

import { Modal } from '@view/components/Modal';
import { InputCurrency } from '@view/components/InputCurrency';
import { Input } from '@view/components/Input';
import { Select } from '@view/components/Select';
import { ColorsDropdownInput } from '@view/components/ColorsDropdownInput';
import { Button } from '@view/components/Button';
import { cn } from '@app/utils/cn';

import { useNewAccountModalController } from './useNewAccountModalController';

export function NewAccountModal() {
  const {
    isNewAccountModalOpen,
    closeNewAccountModal,
    register,
    control,
    handleSubmit,
    errors,
  } = useNewAccountModalController();

  return (
    <Modal
      open={isNewAccountModalOpen}
      title="Nova Conta"
      onClose={closeNewAccountModal}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span
            className={cn(
              'text-gray-600 tracking-[-0.5px] text-sm block',
              errors.initialBalance && '-mb-5',
            )}
          >
            Saldo inicial
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <Controller
              control={control}
              name="initialBalance"
              defaultValue="0,00"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  className={cn(
                    errors.initialBalance && 'mt-5',
                  )}
                  error={errors.initialBalance?.message}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <Input
            type="text"
            placeholder="Nome da Conta"
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Tipo"
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
                error={errors.type?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <ColorsDropdownInput
                error={errors.color?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>

        <Button type="submit" className="w-full mt-6">
          Criar
        </Button>
      </form>
    </Modal>
  );
}
