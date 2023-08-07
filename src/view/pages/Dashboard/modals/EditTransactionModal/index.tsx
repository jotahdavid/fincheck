import { Controller } from 'react-hook-form';

import { Modal } from '@view/components/Modal';
import { InputCurrency } from '@view/components/InputCurrency';
import { Input } from '@view/components/Input';
import { Select } from '@view/components/Select';
import { Button } from '@view/components/Button';
import { DatePickerInput } from '@view/components/DatePickerInput';
import { cn } from '@app/utils/cn';
import { Transaction } from '@app/entities/Transaction';
import { ConfirmDeleteModal } from '@view/components/ConfirmDeleteModal';
import { TrashIcon } from '@view/components/icons/TrashIcon';

import { useEditTransactionModalController } from './useEditTransactionModalController';

interface EditTransactionModalProps {
  transaction?: Transaction;
  open: boolean;
  onClose?: () => void;
}

export function EditTransactionModal({
  transaction,
  open,
  onClose,
}: EditTransactionModalProps) {
  const {
    register,
    handleSubmit,
    control,
    errors,
    accounts,
    categories,
    handleDeleteTransaction,
    isDeleteModalOpen,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    isLoading,
    isLoadingDelete,
  } = useEditTransactionModalController(transaction ?? null, onClose);

  const isExpense = transaction?.type === 'EXPENSE';

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        open={isDeleteModalOpen}
        onConfirm={handleDeleteTransaction}
        onClose={handleCloseDeleteModal}
        title="Tem certeza que deseja excluir esta despesa?"
        isLoading={isLoadingDelete}
      />
    );
  }

  return (
    <Modal
      open={open}
      title={isExpense ? 'Editar Despesa' : 'Editar Receita'}
      onClose={onClose}
      rightAction={(
        <button
          type="button"
          className="stroke-black p-3 rounded-full hover:bg-red-100 transition-colors"
          onClick={handleOpenDeleteModal}
        >
          <TrashIcon className="w-6 h-6" />
        </button>
      )}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span
            className={cn(
              'text-gray-600 tracking-[-0.5px] text-sm block',
              errors.value && '-mb-5',
            )}
          >
            Valor
            {' '}
            {isExpense ? 'da despesa' : 'da receita'}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <Controller
              control={control}
              name="value"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  className={cn(
                    errors.value && 'mt-5',
                  )}
                  error={errors.value?.message}
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
            placeholder={isExpense ? 'Nome da Despesa' : 'Nome da Receita'}
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name="categoryId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Categoria"
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                error={errors.categoryId?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="bankAccountId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder={isExpense ? 'Pagar com' : 'Receber com'}
                options={accounts.map((account) => ({
                  value: account.id,
                  label: account.name,
                }))}
                error={errors.bankAccountId?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, value } }) => (
              <DatePickerInput
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>

        <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
          Salvar
        </Button>
      </form>
    </Modal>
  );
}

EditTransactionModal.defaultProps = {
  transaction: undefined,
  onClose: null,
};
