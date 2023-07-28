import { ComponentProps, useId } from "react";

interface InputProps extends ComponentProps<'input'> {}

export function Input({ className, placeholder, id, ...props }: InputProps) {
  const randomId = useId();

  return (
    <div className="relative">
      <input
        {...props}
        id={id ?? randomId}
        placeholder={placeholder}
        className={`w-full bg-white rounded-lg border border-gray-500 px-3 pt-4 h-[52px] text-gray-800 placeholder:text-transparent placeholder-shown:pt-0 focus:pt-4 peer focus:border-gray-800 outline-none transition-all ${className}`}
      />

      <label
        htmlFor={id ?? randomId}
        className="absolute text-xs left-[13px] top-1.5 pointer-events-none text-gray-700 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs transition-all"
      >
        {placeholder}
      </label>
    </div>
  );
}
