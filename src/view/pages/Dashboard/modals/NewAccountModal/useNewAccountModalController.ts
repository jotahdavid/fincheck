import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { delay } from '@app/utils/delay';
import { BankAccountCreateParams } from '@app/services/bankAccountsService/create';
import { bankAccountsService } from '@app/services/bankAccountsService';
import { currencyRealToNumber } from '@app/utils/currencyRealToNumber';

import { useDashboard } from '../../components/DashboardContext/useDashboard';

const schema = z.object({
  initialBalance: z.string().nonempty('Saldo inicial é obrigatório'),
  name: z.string().nonempty('Nome da Conta é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH'], { required_error: 'Tipo da Conta é obrigatório' }),
  color: z.string().nonempty('Cor é obrigatória'),
});

type FormData = z.infer<typeof schema>;

export function useNewAccountModalController() {
  const {
    isNewAccountModalOpen,
    closeNewAccountModal,
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
      initialBalance: '0,00',
    },
  });

  const queryClient = useQueryClient();
  const { isLoading, mutateAsync } = useMutation(async (data: BankAccountCreateParams) => {
    await delay();
    return bankAccountsService.create(data);
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyRealToNumber(data.initialBalance),
      });

      toast.success('Conta cadastrada com sucesso!');
      reset();
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      closeNewAccountModal();
    } catch (err) {
      toast.error('Erro ao cadastrar a conta.');
    }
  };

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
    register,
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isLoading,
  };
}
