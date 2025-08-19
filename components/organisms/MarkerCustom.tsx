'use client';

import React, { useEffect, useRef } from 'react';
import { MarkerCustomProps } from '@/types';
import CategoryIcon from '@/components/atoms/CategoryIcon';
import { clsx } from 'clsx';

const MarkerCustom: React.FC<MarkerCustomProps> = ({ place, onClick, isSelected }) => {
  const markerRef = useRef<HTMLDivElement>(null);

  const categoryColors = {
    restaurant: 'bg-brand-primary',
    concert: 'bg-brand-secondary',
    bar: 'bg-brand-accent',
  };

  const selectedColors = {
    restaurant: 'bg-brand-primary-dark',
    concert: 'bg-brand-secondary-dark',
    bar: 'bg-brand-accent',
  };

  const handleClick = () => {
    onClick(place);
  };

  return (
    <div
      ref={markerRef}
      onClick={handleClick}
      className={clsx(
        'relative cursor-pointer transform transition-all duration-200 hover:scale-110',
        isSelected && 'z-50'
      )}
    >
      {/* Marker background */}
      <div
        className={clsx(
          'w-12 h-12 rounded-full border-2 border-white shadow-brand flex items-center justify-center transition-all duration-200',
          isSelected
            ? selectedColors[place.category]
            : categoryColors[place.category],
          isSelected && 'scale-125 shadow-brand-xl'
        )}
      >
        <CategoryIcon
          category={place.category}
          className="text-white w-6 h-6"
        />
      </div>

      {/* Pulse animation for selected marker */}
      {isSelected && (
        <div className="absolute inset-0 rounded-full bg-brand-primary animate-ping opacity-75" />
      )}

      {/* Tooltip */}
      <div
        className={clsx(
          'absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-brand-dark-900 text-white text-sm rounded-brand whitespace-nowrap opacity-0 transition-opacity duration-200 pointer-events-none',
          isSelected && 'opacity-100'
        )}
      >
        {place.name}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-brand-dark-900" />
      </div>
    </div>
  );
};

export default MarkerCustom;
