import { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

import { cn } from '@app/utils/cn';

interface ModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose?: () => void;
  rightAction?: ReactNode;
}

export function Modal({
  open, title, children, rightAction, onClose,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            'fixed z-20 inset-0 bg-black/80 backdrop-blur-sm',
            'data-[state=open]:animate-overlay-show',
          )}
        />

        <Dialog.Content
          className={cn(
            'fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 space-y-10 rounded-2xl shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] w-full max-w-[400px]',
            'data-[state=open]:animate-content-show',
          )}
        >
          <header className="h-12 flex items-center justify-between text-gray-800">
            <button
              type="button"
              className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              onClick={onClose}
            >
              <Cross2Icon className="w-6 h-6" />
            </button>

            <span className="text-lg tracking-[-1px] font-bold">
              {title}
            </span>

            <div className="w-12 h-12 flex items-center justify-center">
              {rightAction}
            </div>
          </header>

          <div>
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

Modal.defaultProps = {
  rightAction: null,
  onClose: null,
};
