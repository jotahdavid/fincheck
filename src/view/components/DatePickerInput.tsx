import { useState } from 'react';
import { CrossCircledIcon } from '@radix-ui/react-icons';

import { cn } from '@app/utils/cn';
import { formatDate } from '@app/utils/formatDate';

import { Popover } from './Popover';
import { DatePicker } from './DatePicker';

interface DatePickerInputProps {
  error?: string;
  className?: string;
}

export function DatePickerInput({ error, className }: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button
            type="button"
            className={cn(
              'w-full bg-white rounded-lg border border-gray-500 px-3 pt-4 h-[52px] text-gray-800 focus:border-gray-800 outline-none transition-all text-left relative',
              error && '!border-red-900',
              className,
            )}
          >
            <span
              className={cn(
                'absolute text-xs left-[13px] top-1.5 pointer-events-none text-gray-700 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs transition-all select-none',
                error && 'text-red-900 opacity-80',
              )}
            >
              Data
            </span>

            <span>
              {formatDate(selectedDate)}
            </span>
          </button>
        </Popover.Trigger>

        <Popover.Content className="z-20 p-4">
          <DatePicker
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
          />
        </Popover.Content>
      </Popover.Root>

      {error && (
        <div className="flex gap-1.5 items-center mt-1.5 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}

DatePickerInput.defaultProps = {
  error: '',
  className: '',
};
