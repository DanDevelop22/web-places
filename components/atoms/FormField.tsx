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
  className?: string;
  required?: boolean;
}

export default function FormField({
  name,
  label,
  type = 'text',
  placeholder,
  as,
  rows,
  icon,
  className,
  required = false
}: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <Field
          id={name}
          name={name}
          type={type}
          as={as}
          rows={rows}
          className={clsx(
            'w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors',
            icon ? 'pl-10 pr-3' : 'px-3',
            'py-2',
            'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
          )}
          placeholder={placeholder}
        />
      </div>
      <ErrorMessage name={name} component="p" className="text-red-600 dark:text-red-400 text-sm mt-1" />
    </div>
  );
}
