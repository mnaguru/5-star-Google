import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  onRate: (rating: number) => void;
}

export function StarRating({ onRate }: StarRatingProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleRate = (value: number) => {
    setRating(value);
    onRate(value);
    if (value === 5) {
      window.location.href = 'https://www.yelp.com/biz/asset-growth-associates-beaumont-2';
    }
  };

  return (
    <div className="flex justify-center gap-1" role="group" aria-label="Rate your experience">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`transition-colors duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded
            ${hover >= star || rating >= star
              ? 'text-yellow-400'
              : 'text-gray-300 hover:text-yellow-300'}`}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => handleRate(star)}
          aria-label={`Rate ${star} stars`}
        >
          <Star
            className={`w-8 h-8 ${
              hover >= star || rating >= star ? 'fill-current' : ''
            }`}
          />
        </button>
      ))}
    </div>
  );
}