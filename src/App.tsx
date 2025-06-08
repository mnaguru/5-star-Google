import React, { useState, useEffect } from 'react';
import { StarRating } from './components/StarRating';
import { FeedbackForm } from './components/FeedbackForm';
import { Star } from 'lucide-react';

export default function App() {
  const [rating, setRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const handleRating = (value: number) => {
    setRating(value);
  };

  const handleFeedbackSubmit = (data: {
    name: string;
    phone: string;
    feedback: string;
    email: string;
  }) => {
    console.log('Feedback submitted:', data);
    setSubmitted(true);
  };

  // Countdown and redirect effect
  useEffect(() => {
    if (submitted && rating && rating < 5) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            window.location.href = 'https://assetgrowth.associates';
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [submitted, rating]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
            <Star className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Asset Growth Associates
          </h1>
          <p className="text-gray-600">
            How was your experience with us?
          </p>
        </div>

        <div className="space-y-6">
          {!rating && (
            <div className="text-center">
              <p className="text-lg font-medium text-gray-900 mb-4">
                Please rate your experience
              </p>
              <StarRating onRate={handleRating} />
            </div>
          )}

          {rating && rating < 5 && !submitted && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                We'd love to hear your feedback
              </h2>
              <FeedbackForm onSubmit={handleFeedbackSubmit} />
            </div>
          )}

          {submitted && (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Thank you for your feedback!
              </h2>
              <p className="text-gray-600 mb-4">
                We appreciate your input and will use it to improve our services.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-blue-800 text-sm mb-2">
                  Redirecting in <span className="font-bold">{countdown}</span> seconds...
                </p>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}