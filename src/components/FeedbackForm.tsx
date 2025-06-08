import React from 'react';
import { Send, Sparkles } from 'lucide-react';

interface FeedbackFormProps {
  onSubmit: (data: {
    name: string;
    phone: string;
    feedback: string;
    email: string;
  }) => void;
}

export function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      feedback: formData.get('feedback') as string,
      email: formData.get('email') as string,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-lg font-medium text-white mb-3">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="w-full py-4 px-6 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-lg font-medium text-white mb-3">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          required
          className="w-full py-4 px-6 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300"
          placeholder="Your phone number"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-lg font-medium text-white mb-3">
          Email <span className="text-purple-300 text-base">(optional)</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="w-full py-4 px-6 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="feedback" className="block text-lg font-medium text-white mb-3">
          Your Vision for the Future
        </label>
        <textarea
          name="feedback"
          id="feedback"
          required
          rows={4}
          className="w-full py-4 px-6 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300 resize-none"
          placeholder="Share your thoughts on how we can revolutionize financial services..."
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-xl rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-yellow-400/25 group"
      >
        <Sparkles className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
        Share Your Vision
        <Send className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    </form>
  );
}