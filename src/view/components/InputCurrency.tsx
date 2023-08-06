import { NumericFormat } from 'react-number-format';
import { CrossCircledIcon } from '@radix-ui/react-icons';

import { cn } from '@app/utils/cn';

interface InputCurrencyProps {
  value?: string | number | null;
  defaultValue?: string | number | null;
  error?: string;
  className?: string;
  onChange?: (value: string) => void;
}

export function InputCurrency({
  value, error, defaultValue, className, onChange,
}: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        thousandSeparator="."
        decimalSeparator=","
        className={cn(
          'text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none w-full',
          error && 'text-red-500',
          className,
        )}
        value={value}
        defaultValue={defaultValue}
        decimalScale={2}
        onChange={(event) => onChange?.(event.target.value)}
      />

      {error && (
        <div className="flex gap-1.5 items-center mt-1.5 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}

InputCurrency.defaultProps = {
  value: null,
  defaultValue: null,
  error: '',
  className: '',
  onChange: null,
};
