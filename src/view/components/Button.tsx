import { ComponentProps } from 'react';

import { cn } from '../../app/utils/cn';

interface ButtonProps extends ComponentProps<'button'> {}

export function Button({ className, type, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      type={type === 'button' ? 'button' : 'submit'}
      className={cn(
        'bg-teal-900 hover:bg-teal-800 px-4 h-12 rounded-2xl font-medium text-white disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed active:bg-teal-950 transition',
        className,
      )}
    />
  );
}
