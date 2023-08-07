import { ExitIcon } from '@radix-ui/react-icons';

import { useAuth } from '@app/hooks/useAuth';
import { getNameInitialLetters } from '@app/utils/getNameInitialLetters';

import { DropdownMenu } from './DropdownMenu';

export function UserMenu() {
  const { user, signOut } = useAuth();

  const initialLetters = getNameInitialLetters(user?.name ?? '');

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button
          type="button"
          className="bg-teal-0 rounded-full w-12 h-12 flex items-center justify-center border border-teal-100"
        >
          <span className="text-sm tracking-[-0.5px] text-teal-900 font-medium">
            {initialLetters}
          </span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-32 mr-4">
        <DropdownMenu.Item
          className="flex items-center justify-between"
          onSelect={signOut}
        >
          Sair
          <ExitIcon className="w-4 h-4" />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
