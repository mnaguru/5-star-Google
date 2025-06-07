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
      window.location.href = 'https://www.google.com/maps/place/Asset+Growth+Associates/@33.9301043,-116.9773788,17z/data=!4m8!3m7!1s0x80dcb7c4b3b3b3b3:0x1234567890abcdef!8m2!3d33.9301043!4d-116.9773788!9m1!1b1!16s%2Fg%2F11c0qwerty?entry=ttu&g_ep=EgoyMDI0MTIwNC4wIKXMDSoASAFQAw%3D%3D';
    }
  };

  return (
    <div className="flex gap-1" role="group" aria-label="Rate your experience">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-1
            ${hover >= star || rating >= star
              ? 'text-yellow-400'
              : 'text-gray-300'}`}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => handleRate(star)}
          aria-label={`Rate ${star} stars`}
        >
          <Star
            className={`w-8 h-8 ${
              hover >= star || rating >= star ? 'fill-yellow-400' : ''
            }`}
          />
        </button>
      ))}
    </div>
  );
}