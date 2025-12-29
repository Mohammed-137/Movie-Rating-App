import React, { useState } from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ initialRating = 0, onRate, readOnly = false, size = 24 }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleClick = (value) => {
    if (!readOnly) {
      setRating(value);
      if (onRate) onRate(value);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => {
        const value = index + 1;
        return (
          <button
            key={index}
            type="button"
            className={`${readOnly ? 'cursor-default' : 'cursor-pointer'} transition-colors duration-200 focus:outline-none`}
            onClick={() => handleClick(value)}
            onMouseEnter={() => !readOnly && setHover(value)}
            onMouseLeave={() => !readOnly && setHover(0)}
            disabled={readOnly}
          >
            <Star
              size={size}
              className={`${
                value <= (hover || rating)
                  ? 'text-imdb-yellow fill-imdb-yellow'
                  : 'text-gray-500'
              }`}
            />
          </button>
        );
      })}
      {readOnly && <span className="text-white ml-2 text-sm">({rating}/5)</span>}
    </div>
  );
};

export default StarRating;
