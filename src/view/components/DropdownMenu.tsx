import { ReactNode } from 'react';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';

import { cn } from '@app/utils/cn';

function DropdownMenuRoot({ children }: { children: ReactNode }) {
  return (
    <RadixDropdownMenu.Root>
      {children}
    </RadixDropdownMenu.Root>
  );
}

function DropdownMenuTrigger({ children }: { children: ReactNode }) {
  return (
    <RadixDropdownMenu.Trigger className="outline-none">
      {children}
    </RadixDropdownMenu.Trigger>
  );
}

interface DropdownMenuContentProps {
  children: ReactNode;
  className?: string;
}

function DropdownMenuContent({ children, className }: DropdownMenuContentProps) {
  return (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.Content
        className={cn(
          'bg-white p-2 rounded-2xl space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] data-[side=bottom]:animate-slide-up-and-fade data-[side=top]:animate-slide-down-and-fade',
          className,
        )}
      >
        {children}
      </RadixDropdownMenu.Content>
    </RadixDropdownMenu.Portal>
  );
}

DropdownMenuContent.defaultProps = {
  className: '',
};

interface DropdownMenuItemProps {
  children: ReactNode;
  className?: string;
  onSelect?: () => void;
}

function DropdownMenuItem({ children, className, onSelect }: DropdownMenuItemProps) {
  return (
    <RadixDropdownMenu.Item
      className={cn(
        'min-h-[48px] outline-none flex items-center p-4 text-gray-800 text-sm data-[highlighted]:bg-gray-50 rounded-2xl transition-colors cursor-pointer',
        className,
      )}
      onSelect={onSelect}
    >
      {children}
    </RadixDropdownMenu.Item>
  );
}

DropdownMenuItem.defaultProps = {
  className: '',
  onSelect: () => {},
};

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
};
