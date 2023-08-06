import { useAuth } from '@app/hooks/useAuth';
import { Logo } from '@view/components/Logo';
import { UserMenu } from '@view/components/UserMenu';

import { DashboardProvider } from './components/DashboardContext';
import { Accounts } from './components/Accounts';
import { Transactions } from './components/Transactions';
import { Fab } from './components/Fab';
import { NewAccountModal } from './modals/NewAccountModal';
import { NewTransactionModal } from './modals/NewTransactionModal';

export function Dashboard() {
  useAuth();

  return (
    <DashboardProvider>
      <div className="w-full h-full p-4 pb-0 md:px-8 md:pt-6 flex flex-col gap-4">
        <header className="h-12 flex items-center justify-between ">
          <Logo className="h-6 text-teal-900" />
          <UserMenu />
        </header>

        <main className="flex-1 flex flex-col md:flex-row gap-y-8 gap-x-4 pb-4 md:pb-8 min-h-[600px] max-h-full">
          <section className="w-full md:w-1/2 flex-1">
            <Accounts />
          </section>

          <section className="w-full md:w-1/2 flex-1">
            <Transactions />
          </section>
        </main>

        <Fab />

        <NewAccountModal />

        <NewTransactionModal />
      </div>
    </DashboardProvider>
  );
}
