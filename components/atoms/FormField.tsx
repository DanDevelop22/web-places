import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { clsx } from 'clsx';

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  as?: string;
  rows?: number;
  icon?: React.ReactNode;
  endAdornment?: React.ReactNode;
  className?: string;
  required?: boolean;
  maxLength?: number;
}

export default function FormField({
  name,
  label,
  type = 'text',
  placeholder,
  as,
  rows,
  icon,
  endAdornment,
  className,
  required = false,
  maxLength
}: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-brand-dark-700 dark:text-brand-dark-300 mb-2">
        {label} {required && <span className="text-brand-error">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-dark-400">
            {icon}
          </div>
        )}
        <Field
          id={name}
          name={name}
          type={type}
          as={as}
          rows={rows}
          maxLength={maxLength}
          className={clsx(
            'input-brand',
            icon ? 'pl-10' : '',
            endAdornment ? 'pr-12' : ''
          )}
          placeholder={placeholder}
        />
        {endAdornment && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {endAdornment}
          </div>
        )}
      </div>
      <ErrorMessage name={name} component="p" className="text-brand-error dark:text-brand-error text-sm mt-1" />
    </div>
  );
}
