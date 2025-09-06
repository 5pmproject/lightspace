import React, { forwardRef } from 'react';
import { cn } from './utils';

export interface DSInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'search';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  label?: string;
  helperText?: string;
}

const DSInput = forwardRef<HTMLInputElement, DSInputProps>(({
  className,
  variant = 'default',
  leftIcon,
  rightIcon,
  error,
  label,
  helperText,
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseStyles = 'w-full rounded-xl border-0 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200';
  
  const variants = {
    default: 'shadow-sm',
    search: 'shadow-lg'
  };

  const containerStyles = 'relative flex items-center';
  const iconStyles = 'absolute z-10 flex items-center justify-center text-gray-400 pointer-events-none';
  const leftIconStyles = cn(iconStyles, 'left-3');
  const rightIconStyles = cn(iconStyles, 'right-3');

  return (
    <div className="space-y-1">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      
      <div className={containerStyles}>
        {leftIcon && (
          <div className={leftIconStyles}>
            {leftIcon}
          </div>
        )}
        
        <input
          id={inputId}
          ref={ref}
          className={cn(
            baseStyles,
            variants[variant],
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            error && 'ring-2 ring-red-300 focus:ring-red-400',
            className
          )}
          {...props}
        />
        
        {rightIcon && (
          <div className={rightIconStyles}>
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-600">
          {helperText}
        </p>
      )}
    </div>
  );
});

DSInput.displayName = 'DSInput';

export { DSInput };