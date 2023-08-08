import { useMemo } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { useBankAccounts } from '@app/hooks/useBankAccounts';
import { useCategories } from '@app/hooks/useCategories';
import { transactionsService } from '@app/services/transactionsService';
import { TransactionCreateParams } from '@app/services/transactionsService/create';
import { currencyRealToNumber } from '@app/utils/currencyRealToNumber';

import { useDashboard } from '../../components/DashboardContext/useDashboard';

const schema = z.object({
  value: z.string().nonempty('Informe o valor'),
  name: z.string().nonempty('Informe o nome'),
  categoryId: z.string().nonempty('Informe a categoria'),
  bankAccountId: z.string().nonempty('Informe a conta'),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboard();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: '0,00',
      date: new Date(),
    },
  });

  const { accounts } = useBankAccounts();
  const { categories } = useCategories();

  const queryClient = useQueryClient();
  const {
    isLoading: isLoadingCreate,
    mutateAsync: createTransaction,
  } = useMutation({
    mutationFn: (data: TransactionCreateParams) => transactionsService.create(data),
  });

  const filteredCategories = useMemo(() => (
    categories.filter((category) => category.type === newTransactionType)
  ), [categories, newTransactionType]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!newTransactionType) return;

    try {
      await createTransaction({
        ...data,
        date: data.date.toISOString(),
        type: newTransactionType,
        value: currencyRealToNumber(data.value),
      });

      toast.success(
        `${newTransactionType === 'EXPENSE' ? 'Despesa' : 'Receita'} cadastrada com sucesso!`,
      );
      reset();
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      closeNewTransactionModal();
    } catch (err) {
      toast.error(
        `Erro ao cadastrar a ${newTransactionType === 'EXPENSE' ? 'despesa' : 'receita'}.`,
      );
    }
  };

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    control,
    accounts,
    categories: filteredCategories,
    isLoadingCreate,
  };
}
