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
    <div className="flex justify-center">
      <div className="flex gap-2" role="group" aria-label="Rate your experience">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`transition-all duration-300 hover:scale-125 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 rounded-full p-2 backdrop-blur-sm
              ${hover >= star || rating >= star
                ? 'text-yellow-400 bg-yellow-400/20'
                : 'text-white/40 bg-white/5 hover:bg-white/10'}`}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => handleRate(star)}
            aria-label={`Rate ${star} stars`}
          >
            <Star
              className={`w-12 h-12 transition-all duration-300 ${
                hover >= star || rating >= star 
                  ? 'fill-yellow-400 drop-shadow-lg' 
                  : 'hover:text-white/60'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}