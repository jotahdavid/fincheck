import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';

import authService from '@app/services/authService';
import { SignupParams } from '@app/services/authService/signup';
import { useAuth } from '@app/hooks/useAuth';

const schema = z.object({
  name: z.string().nonempty('Nome é obrigatório'),
  email: z.string()
    .nonempty('E-mail é obrigatório')
    .email('Insira um e-mail válido'),
  password: z.string()
    .nonempty('Senha é obrigatória')
    .min(8, 'Senha deve conter pelo menos 8 dígitos'),
});

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: (data: SignupParams) => authService.signup(data),
  });

  const { signIn } = useAuth();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);
      signIn(accessToken);
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      if (error?.response?.data && error.response?.data.message === 'This e-mail is already in use') {
        setError('email', { message: 'E-mail já utilizado' });
        toast.error('Este e-mail já foi utilizado!');
        return;
      }
      toast.error('Ocorreu um erro ao criar a sua conta!');
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isLoading,
  };
}
