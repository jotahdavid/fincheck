import { useAuth } from '../../../app/hooks/useAuth';
import { Logo } from '../../components/Logo';
import { UserMenu } from '../../components/UserMenu';
import { Accounts } from './components/Accounts';
import { Transactions } from './components/Transactions';

export function Dashboard() {
  useAuth();

  return (
    <div className="w-full h-full p-4 md:px-8 md:pb-8 md:pt-6 flex flex-col gap-4">
      <header className="h-12 flex items-center justify-between ">
        <Logo className="h-6 text-teal-900" />
        <UserMenu />
      </header>

      <main className="flex-1 flex flex-col md:flex-row gap-y-8 gap-x-4">
        <section className="w-full md:w-1/2 flex-1">
          <Accounts />
        </section>

        <section className="w-full md:w-1/2 flex-1">
          <Transactions />
        </section>
      </main>
    </div>
  );
}
