import React from 'react';
import { clsx } from 'clsx';

interface FormButtonProps {
  type?: 'submit' | 'button' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function FormButton({
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  onClick,
  className
}: FormButtonProps) {
  const baseClasses = 'font-semibold rounded-brand transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105';
  
  const variantClasses = {
    primary: 'btn-brand',
    secondary: 'btn-brand-secondary',
    danger: 'bg-brand-error hover:bg-brand-error/80 text-white focus:ring-brand-error shadow-brand'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="brand-spinner"></div>
          Cargando...
        </div>
      ) : (
        children
      )}
    </button>
  );
}
