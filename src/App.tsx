import React, { useState } from 'react';
import { StarRating } from './components/StarRating';
import { FeedbackForm } from './components/FeedbackForm';
import { ReviewResponseTemplate } from './components/ReviewResponseTemplate';
import { TrendingUp, MessageSquare } from 'lucide-react';

export default function App() {
  const [rating, setRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [currentView, setCurrentView] = useState<'feedback' | 'responses'>('feedback');

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Navigation */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setCurrentView('feedback')}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
              currentView === 'feedback'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
            }`}
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            Customer Feedback
          </button>
          <button
            onClick={() => setCurrentView('responses')}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
              currentView === 'responses'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
            }`}
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Review Responses
          </button>
        </div>

        {currentView === 'feedback' ? (
          <div>
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
                    <p className="text-gray-600">
                      We'll use your input to improve our service.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <ReviewResponseTemplate />
        )}
      </div>
    </div>
  );
}