import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import authService from '@app/services/authService';
import { SigninParams } from '@app/services/authService/signin';
import { delay } from '@app/utils/delay';
import { useAuth } from '@app/hooks/useAuth';

const schema = z.object({
  email: z.string()
    .nonempty('E-mail é obrigatório')
    .email('Insira um e-mail válido'),
  password: z.string()
    .nonempty('Senha é obrigatória')
    .min(8, 'Senha deve conter pelo menos 8 dígitos'),
});

type FormData = z.infer<typeof schema>;

export function useLoginController() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: async (data: SigninParams) => {
      await delay();
      return authService.signin(data);
    },
  });

  const { signIn } = useAuth();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);
      signIn(accessToken);
      setTimeout(() => {
        toast.success('Você foi autenticado com sucesso!');
      }, 1000);
    } catch {
      toast.error('Credenciais inválidas!');
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isLoading,
  };
}
