import { Outlet } from 'react-router-dom';

import { Logo } from '@view/components/Logo';
import illustrationSrc from '@assets/illustration.png';

export function AuthLayout() {
  return (
    <div className="flex w-full h-full">
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center">
        <Logo className="text-gray-500 h-6" />

        <div className="max-w-[504px] mt-16 w-full p-2">
          <Outlet />
        </div>
      </div>

      <div className="hidden w-1/2 h-full lg:flex justify-center items-center p-8 relative">
        <img
          src={illustrationSrc}
          className="object-cover w-full h-full max-w-[656px] max-h-[960px] select-none rounded-[32px]"
          alt="Demonstração do Fincheck"
        />

        <div className="max-w-[656px] bg-white p-10 absolute inset-8 top-auto rounded-b-[32px]">
          <Logo className="text-teal-900 h-8" />

          <p className="text-gray-700 font-medium text-xl mt-6">
            Gerencie suas finanças pessoais de uma forma simples com o fincheck, e o melhor,
            totalmente de graça!
          </p>
        </div>
      </div>
    </div>
  );
}
