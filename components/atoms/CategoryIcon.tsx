import React from 'react';
import { CategoryIconProps } from '@/types';

const CategoryIcon: React.FC<CategoryIconProps> = ({ category, className = '' }) => {
  const iconClasses = `w-6 h-6 ${className}`;

  const icons = {
    restaurant: (
      <svg className={iconClasses} fill="currentColor" viewBox="0 0 24 24">
        <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
      </svg>
    ),
    concert: (
      <svg className={iconClasses} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
      </svg>
    ),
    bar: (
      <svg
        className={iconClasses}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 22h8" />
        <path d="M7 10h10" />
        <path d="M12 15v7" />
        <path d="M19 4h-3V2H8v2H5v6a7 7 0 1 0 14 0V4Z" />
      </svg>
    ),
  };

  return icons[category] || icons.restaurant;
};

export default CategoryIcon;
