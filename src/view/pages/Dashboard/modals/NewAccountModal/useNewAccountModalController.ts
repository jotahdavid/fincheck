import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

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
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
  };

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
    register,
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors,
  };
}
