import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-brand transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105';
  
  const variantClasses = {
    primary: 'btn-brand',
    secondary: 'btn-brand-secondary',
    outline: 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white focus:ring-brand-primary dark:border-brand-primary dark:text-brand-primary dark:hover:bg-brand-primary dark:hover:text-white',
    ghost: 'text-brand-primary hover:bg-brand-primary/10 focus:ring-brand-primary dark:text-brand-primary dark:hover:bg-brand-primary/20',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
