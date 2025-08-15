import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const stars = Array.from({ length: maxRating }, (_, index) => {
    const starValue = index + 1;
    const isFilled = starValue <= rating;
    const isHalfFilled = starValue - 0.5 <= rating && starValue > rating;

    return (
      <Star
        key={index}
        className={`${sizeClasses[size]} ${
          isFilled
            ? 'fill-yellow-400 text-yellow-400'
            : isHalfFilled
            ? 'fill-yellow-400/50 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    );
  });

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex">{stars}</div>
      {showValue && (
        <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;
