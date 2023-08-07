import { useMemo } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useBankAccounts } from '@app/hooks/useBankAccounts';
import { useCategories } from '@app/hooks/useCategories';

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
    // reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: '0,00',
      date: new Date(),
    },
  });

  const { accounts } = useBankAccounts();

  const { categories } = useCategories();

  const filteredCategories = useMemo(() => (
    categories.filter((category) => category.type === newTransactionType)
  ), [categories, newTransactionType]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
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
  };
}
