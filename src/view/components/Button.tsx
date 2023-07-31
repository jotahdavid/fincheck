import { ComponentProps } from 'react';

import { cn } from '../../app/utils/cn';
import { Spinner } from './Spinner';

interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean;
}

export function Button({
  className, isLoading, disabled, type, children, ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      type={type === 'button' ? 'button' : 'submit'}
      className={cn(
        'bg-teal-900 hover:bg-teal-800 px-4 h-12 rounded-2xl font-medium text-white disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed active:bg-teal-950 transition',
        'flex justify-center items-center gap-2',
        className,
      )}
    >
      {isLoading && <Spinner size="sm" />}
      {children}
    </button>
  );
}

Button.defaultProps = {
  isLoading: false,
};
