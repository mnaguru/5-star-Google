import React, { useState, useEffect } from 'react';
import { StarRating } from './components/StarRating';
import { FeedbackForm } from './components/FeedbackForm';
import { TrendingUp } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl mb-4 shadow-lg">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How was your experience with Asset Growth Associates?
          </h1>
          <p className="text-lg text-gray-600">
            Your feedback helps us improve our financial services for everyone
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
          <div className="flex flex-col items-center space-y-8">
            {!rating && (
              <div className="text-center">
                <StarRating onRate={handleRating} />
                <p className="mt-4 text-sm text-gray-500">
                  Click to rate your experience
                </p>
              </div>
            )}

            {rating && rating < 5 && !submitted && (
              <div className="w-full">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                  We'd love to hear more
                </h2>
                <FeedbackForm onSubmit={handleFeedbackSubmit} />
              </div>
            )}

            {submitted && (
              <div className="text-center py-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Thank you for your feedback!
                </h2>
                <p className="text-gray-600 mb-4">
                  We'll use your input to improve our service.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <p className="text-blue-800 text-sm">
                    Redirecting to our website in <span className="font-bold text-blue-900">{countdown}</span> seconds...
                  </p>
                  <div className="w-full bg-blue-200 rounded-full h-2 mt-3">
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
    </div>
  );
}