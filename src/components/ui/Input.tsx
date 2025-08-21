import React from 'react';
import { combineClasses } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  errorMessage?: string;
  helpText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, labelText, errorMessage, helpText, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full">
        {labelText && (
          <label className="block text-sm font-medium text-gray-900 mb-1">
            {labelText}
          </label>
        )}
        <input
          type={type}
          className={combineClasses(
            'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            errorMessage && 'border-red-500 focus-visible:ring-red-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {errorMessage && (
          <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
        )}
        {helpText && !errorMessage && (
          <p className="mt-1 text-sm text-gray-600">{helpText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
