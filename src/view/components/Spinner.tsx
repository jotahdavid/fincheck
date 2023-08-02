import { cn } from '../../app/utils/cn';

const spinnerSizes = {
  sm: 'h-4 w-4',
  md: 'h-7 w-7',
};

interface SpinnerProps {
  size: 'sm' | 'md';
  className?: string;
}

export function Spinner({ className, size }: SpinnerProps) {
  return (
    <div
      className={cn(
        'inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
        spinnerSizes[size],
        className,
      )}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]" />
    </div>
  );
}

Spinner.defaultProps = {
  className: '',
};
