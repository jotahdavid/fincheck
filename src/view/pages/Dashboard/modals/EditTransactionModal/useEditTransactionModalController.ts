import { useMemo, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { useBankAccounts } from '@app/hooks/useBankAccounts';
import { useCategories } from '@app/hooks/useCategories';
import { Transaction } from '@app/entities/Transaction';
import { transactionsService } from '@app/services/transactionsService';
import { TransactionEditParams } from '@app/services/transactionsService/edit';
import { currencyRealToNumber } from '@app/utils/currencyRealToNumber';
import { formatCurrency } from '@app/utils/formatCurrency';

const schema = z.object({
  value: z.string().nonempty('Informe o valor'),
  name: z.string().nonempty('Informe o nome'),
  categoryId: z.string().nonempty('Informe a categoria'),
  bankAccountId: z.string().nonempty('Informe a conta'),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose?: () => void,
) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: formatCurrency(transaction?.value ?? 0),
      name: transaction?.name,
      categoryId: transaction?.categoryId,
      bankAccountId: transaction?.bankAccountId,
      date: transaction?.date ? new Date(transaction?.date) : undefined,
    },
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { accounts } = useBankAccounts();
  const { categories } = useCategories();

  const filteredCategories = useMemo(() => (
    categories.filter((category) => category.type === transaction?.type)
  ), [categories, transaction?.type]);

  const queryClient = useQueryClient();
  const { isLoading, mutateAsync: updateTransaction } = useMutation({
    mutationFn: (data: TransactionEditParams) => transactionsService.edit(data),
  });

  const {
    isLoading: isLoadingDelete,
    mutateAsync: removeTransaction,
  } = useMutation({
    mutationFn: (transactionId: string) => transactionsService.remove(transactionId),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!transaction) return;

    try {
      await updateTransaction({
        ...data,
        id: transaction.id,
        date: data.date.toISOString(),
        type: transaction.type,
        value: currencyRealToNumber(data.value),
      });

      toast.success(
        `${transaction.type === 'EXPENSE' ? 'Despesa' : 'Receita'} atualizada com sucesso!`,
      );
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      onClose?.();
    } catch (err) {
      toast.error(
        `Erro ao cadastrar a ${transaction.type === 'EXPENSE' ? 'despesa' : 'receita'}.`,
      );
    }
  };

  async function handleDeleteTransaction() {
    if (!transaction) return;

    try {
      await removeTransaction(transaction.id);

      toast.success(
        `${transaction.type === 'EXPENSE' ? 'Despesa' : 'Receita'} excluída com sucesso!`,
      );
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      onClose?.();
    } catch (err) {
      toast.error(
        `Erro ao excluir ${transaction.type === 'EXPENSE' ? 'despesa' : 'receita'}.`,
      );
    }
  }

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    control,
    accounts,
    categories: filteredCategories,
    isLoading,
    isDeleteModalOpen,
    handleDeleteTransaction,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    isLoadingDelete,
  };
}
