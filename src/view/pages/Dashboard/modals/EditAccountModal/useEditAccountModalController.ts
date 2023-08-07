import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { delay } from '@app/utils/delay';
import { bankAccountsService } from '@app/services/bankAccountsService';
import { BankAccountEditParams } from '@app/services/bankAccountsService/edit';
import { currencyRealToNumber } from '@app/utils/currencyRealToNumber';

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
      initialBalance: String(accountBeingEdited?.initialBalance ?? '0,00'),
    },
  });

  const queryClient = useQueryClient();
  const { isLoading, mutateAsync } = useMutation(async (data: BankAccountEditParams) => {
    await delay();
    return bankAccountsService.edit(data);
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!accountBeingEdited) return;

    try {
      await mutateAsync({
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

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isLoading,
  };
}
