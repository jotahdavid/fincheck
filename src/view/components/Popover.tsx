import { ReactNode } from 'react';
import * as RadixPopover from '@radix-ui/react-popover';

import { cn } from '@app/utils/cn';

function PopoverRoot({ children }: { children: ReactNode }) {
  return (
    <RadixPopover.Root>
      {children}
    </RadixPopover.Root>
  );
}

function PopoverTrigger({ children }: { children: ReactNode }) {
  return (
    <RadixPopover.Trigger asChild>
      {children}
    </RadixPopover.Trigger>
  );
}

interface PopoverContentProps {
  children: ReactNode;
  className?: string;
}

function PopoverContent({ children, className }: PopoverContentProps) {
  return (
    <RadixPopover.Portal>
      <RadixPopover.Content
        className={cn(
          'bg-white p-2 rounded-2xl space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] data-[side=bottom]:animate-slide-up-and-fade data-[side=top]:animate-slide-down-and-fade',
          className,
        )}
      >
        {children}
      </RadixPopover.Content>
    </RadixPopover.Portal>
  );
}

PopoverContent.defaultProps = {
  className: '',
};

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
};
