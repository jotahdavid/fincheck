import { useState } from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { ChevronDownIcon, ChevronUpIcon, CrossCircledIcon } from '@radix-ui/react-icons';

import { cn } from '@app/utils/cn';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value?: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
}

export function Select({
  value,
  options,
  error,
  placeholder,
  className,
  onChange,
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState<string>(value ?? '');

  function handleSelect(newSelectedValue: string) {
    setSelectedValue(newSelectedValue);
    onChange?.(newSelectedValue);
  }

  return (
    <div>
      <div className="relative">
        <span
          className={cn(
            'z-20 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none select-none text-gray-700',
            selectedValue && 'text-xs left-[13px] top-2 translate-y-0 transition-all',
          )}
        >
          {placeholder}
        </span>

        <RadixSelect.Root value={value} onValueChange={handleSelect}>
          <RadixSelect.Trigger
            className={cn(
              'w-full bg-white rounded-lg border border-gray-500 px-3 pt-4 h-[52px] text-gray-800 focus:border-gray-800 outline-none transition-all text-left relative',
              error && '!border-red-900',
              className,
            )}
          >
            <RadixSelect.Value />
            <RadixSelect.Icon>
              <ChevronDownIcon className="w-6 h-6 text-gray-800 absolute top-1/2 -translate-y-1/2 right-3" />
            </RadixSelect.Icon>
          </RadixSelect.Trigger>
          <RadixSelect.Portal>
            <RadixSelect.Content className="z-20 overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]">
              <RadixSelect.ScrollUpButton
                className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default"
              >
                <ChevronUpIcon />
              </RadixSelect.ScrollUpButton>
              <RadixSelect.Viewport className="p-2">
                {options.map((option) => (
                  <RadixSelect.Item
                    className="p-2 text-sm text-gray-800 rounded-xl data-[state=checked]:font-bold cursor-pointer data-[highlighted]:bg-gray-50 transition-colors outline-none"
                    value={option.value}
                    key={option.value}
                  >
                    <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                  </RadixSelect.Item>
                ))}
              </RadixSelect.Viewport>
              <RadixSelect.ScrollDownButton
                className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default"
              >
                <ChevronDownIcon />
              </RadixSelect.ScrollDownButton>
            </RadixSelect.Content>
          </RadixSelect.Portal>
        </RadixSelect.Root>
      </div>

      {error && (
        <div className="flex gap-1.5 items-center mt-1.5 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}

Select.defaultProps = {
  value: null,
  error: '',
  placeholder: '',
  className: '',
  onChange: null,
};
