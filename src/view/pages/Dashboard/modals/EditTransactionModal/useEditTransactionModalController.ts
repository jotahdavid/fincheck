import { useMemo } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useBankAccounts } from '@app/hooks/useBankAccounts';
import { useCategories } from '@app/hooks/useCategories';
import { Transaction } from '@app/entities/Transaction';
import { delay } from '@app/utils/delay';
import { transactionsService } from '@app/services/transactionsService';
import { TransactionEditParams } from '@app/services/transactionsService/edit';
import { currencyRealToNumber } from '@app/utils/currencyRealToNumber';
import { toast } from 'react-hot-toast';

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
      value: String(transaction?.value),
      name: transaction?.name,
      categoryId: transaction?.categoryId,
      bankAccountId: transaction?.bankAccountId,
      date: transaction?.date ? new Date(transaction?.date) : undefined,
    },
  });

  const { accounts } = useBankAccounts();
  const { categories } = useCategories();

  const filteredCategories = useMemo(() => (
    categories.filter((category) => category.type === transaction?.type)
  ), [categories, transaction?.type]);

  const queryClient = useQueryClient();
  const { isLoading, mutateAsync: updateTransaction } = useMutation({
    mutationFn: async (data: TransactionEditParams) => {
      await delay();
      return transactionsService.edit(data);
    },
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
      onClose?.();
    } catch (err) {
      toast.error(
        `Erro ao cadastrar a ${transaction.type === 'EXPENSE' ? 'despesa' : 'receita'}.`,
      );
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    control,
    accounts,
    categories: filteredCategories,
    isLoadingEdit: isLoading,
  };
}
