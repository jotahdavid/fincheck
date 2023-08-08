import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { bankAccountsService } from '@app/services/bankAccountsService';
import { BankAccountEditParams } from '@app/services/bankAccountsService/edit';
import { currencyRealToNumber } from '@app/utils/currencyRealToNumber';
import { formatCurrency } from '@app/utils/formatCurrency';

import { useDashboard } from '../../components/DashboardContext/useDashboard';

const schema = z.object({
  initialBalance: z.string().nonempty('Saldo inicial é obrigatório'),
  name: z.string().nonempty('Nome da Conta é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH'], { required_error: 'Tipo da Conta é obrigatório' }),
  color: z.string().nonempty('Cor é obrigatória'),
});

type FormData = z.infer<typeof schema>;

export function useEditAccountModalController() {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
    accountBeingEdited,
  } = useDashboard();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountBeingEdited?.color,
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type,
      initialBalance: accountBeingEdited ? formatCurrency(accountBeingEdited.initialBalance) : '0,00',
    },
  });

  const queryClient = useQueryClient();
  const {
    isLoading,
    mutateAsync: updateAccount,
  } = useMutation((data: BankAccountEditParams) => bankAccountsService.edit(data));

  const {
    isLoading: isLoadingDelete,
    mutateAsync: removeAccount,
  } = useMutation((bankAccountId: string) => bankAccountsService.remove(bankAccountId));

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!accountBeingEdited) return;

    try {
      await updateAccount({
        ...data,
        id: accountBeingEdited.id,
        initialBalance: currencyRealToNumber(data.initialBalance),
      });

      toast.success('Conta atualizada com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      closeEditAccountModal();
    } catch (err) {
      toast.error('Erro ao salvar as alterações');
    }
  };

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteAccount() {
    if (!accountBeingEdited) return;

    try {
      await removeAccount(accountBeingEdited.id);

      toast.success('Conta excluída com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      closeEditAccountModal();
    } catch (err) {
      toast.error('Erro ao excluir a conta');
    }
  }

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isLoading,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
    isLoadingDelete,
  };
}
