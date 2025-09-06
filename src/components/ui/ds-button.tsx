import React, { forwardRef } from 'react';
import { cn } from './utils';

export interface DSButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const DSButton = forwardRef<HTMLButtonElement, DSButtonProps>(({
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    primary: 'bg-green-800 text-white hover:bg-green-700 focus-visible:ring-green-600 active:bg-green-900',
    secondary: 'border border-green-800 text-green-800 hover:bg-green-50 focus-visible:ring-green-600 active:bg-green-100',
    tertiary: 'text-green-800 hover:bg-green-50 focus-visible:ring-green-600 active:bg-green-100',
    ghost: 'text-gray-600 hover:bg-gray-100 focus-visible:ring-gray-400 active:bg-gray-200',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 active:bg-red-800'
  };

  const sizes = {
    sm: 'h-8 px-3 text-sm gap-1.5',
    md: 'h-10 px-4 gap-2',
    lg: 'h-12 px-6 text-lg gap-2.5',
    icon: 'h-10 w-10 p-0'
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        isLoading && 'pointer-events-none opacity-70',
        className
      )}
      ref={ref}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {!isLoading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      {children && <span className={size === 'icon' ? 'sr-only' : ''}>{children}</span>}
      {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
});

DSButton.displayName = 'DSButton';

export { DSButton };