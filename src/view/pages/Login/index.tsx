import { Link } from 'react-router-dom';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export function Login() {
  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold tracking-[-1px]">
          Entre em sua conta
        </h1>

        <p className="space-x-2">
          <span className="tracking-[-0.5px] text-gray-700">
            Novo por aqui?
          </span>
          <Link
            to="/register"
            className="tracking-[-0.5px] font-medium text-teal-900"
          >
            Crie uma conta
          </Link>
        </p>
      </header>

      <form className="w-full mt-[60px] flex flex-col gap-4">
        <Input type="email" placeholder="E-mail" />
        <Input type="password" placeholder="Senha" />

        <Button type="submit">
          Entrar
        </Button>
      </form>
    </>
  );
}
