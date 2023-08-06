import { NumericFormat } from 'react-number-format';

import { cn } from '@app/utils/cn';

interface InputCurrencyProps {
  defaultValue?: string | number | null;
  className?: string;
}

export function InputCurrency({ defaultValue, className }: InputCurrencyProps) {
  return (
    <NumericFormat
      thousandSeparator="."
      decimalSeparator=","
      className={cn(
        'text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none w-full',
        className,
      )}
      defaultValue={defaultValue}
      decimalScale={2}
    />
  );
}

InputCurrency.defaultProps = {
  defaultValue: null,
  className: '',
};
