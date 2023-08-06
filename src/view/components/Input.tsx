import { ComponentProps, forwardRef, useId } from 'react';
import { CrossCircledIcon } from '@radix-ui/react-icons';

import { cn } from '@app/utils/cn';

interface InputProps extends ComponentProps<'input'> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className, placeholder, id, error, ...props
    },
    ref,
  ) => {
    const randomId = useId();

    return (
      <div className="relative">
        <input
          {...props}
          id={id ?? randomId}
          placeholder={placeholder}
          className={cn(
            'w-full bg-white rounded-lg border border-gray-500 px-3 pt-4 h-[52px] text-gray-800 placeholder:text-transparent placeholder-shown:pt-0 focus:pt-4 peer focus:border-gray-800 outline-none transition-all',
            className,
            error && 'border-red-900 focus:border-red-900',
          )}
          ref={ref}
        />

        <label
          htmlFor={id ?? randomId}
          className={cn(
            'absolute text-xs left-[13px] top-1.5 pointer-events-none text-gray-700 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs transition-all select-none',
            error && 'text-red-900 opacity-80',
          )}
        >
          {placeholder}
        </label>

        {error && (
          <div className="flex gap-1.5 items-center mt-1.5 text-red-900">
            <CrossCircledIcon />
            <span className="text-xs">{error}</span>
          </div>
        )}
      </div>
    );
  },
);

Input.defaultProps = {
  error: '',
};

Input.displayName = 'Input';
