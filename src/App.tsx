import React, { useState, useEffect } from 'react';
import { StarRating } from './components/StarRating';
import { FeedbackForm } from './components/FeedbackForm';
import { TrendingUp, Star } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Stars */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 opacity-60" />
          </div>
        ))}
        
        {/* Floating Orbs */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 blur-xl animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${100 + Math.random() * 200}px`,
              height: `${100 + Math.random() * 200}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        {/* Header Section */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center justify-center p-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl mb-8 shadow-2xl animate-pulse">
            <TrendingUp className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white animate-slide-up">
            Asset Growth Associates
          </h1>
          <p className="text-2xl md:text-3xl text-purple-200 mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Rate us on Yelp!
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-12 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="flex flex-col items-center space-y-8">
            {!rating && (
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Help Us Shape the Future
                </h2>
                <p className="text-xl text-purple-200 mb-8">
                  Rate your current financial service experience
                </p>
                <StarRating onRate={handleRating} />
                <p className="mt-6 text-sm text-purple-300">
                  Your feedback drives our innovation
                </p>
              </div>
            )}

            {rating && rating < 5 && !submitted && (
              <div className="w-full">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                  Your Voice Matters
                </h2>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                  <FeedbackForm onSubmit={handleFeedbackSubmit} />
                </div>
              </div>
            )}

            {submitted && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-6 mx-auto animate-pulse">
                  <Star className="w-10 h-10 text-white fill-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Thank You for Your Vision!
                </h2>
                <p className="text-xl text-purple-200 mb-8">
                  Your insights are shaping the future of financial services.
                </p>
                <div className="bg-gradient-to-r from-purple-800/50 to-blue-800/50 backdrop-blur-lg border border-white/20 rounded-2xl p-6 mt-8">
                  <p className="text-yellow-400 text-lg mb-4">
                    Redirecting to our universe in <span className="font-bold text-2xl text-yellow-300">{countdown}</span> seconds...
                  </p>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-1000 ease-linear shadow-lg"
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