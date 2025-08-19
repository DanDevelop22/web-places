import React from 'react';
import { CategoryIconProps } from '@/types';
import { Utensils, Music, Wine } from 'lucide-react';

const CategoryIcon: React.FC<CategoryIconProps> = ({ category, className = '' }) => {
  const iconClasses = `w-6 h-6 ${className}`;

  const icons = {
    restaurant: <Utensils className={iconClasses} />,
    concert: <Music className={iconClasses} />,
    bar: <Wine className={iconClasses} />,
  };

  return icons[category] || icons.restaurant;
};

export default CategoryIcon;
