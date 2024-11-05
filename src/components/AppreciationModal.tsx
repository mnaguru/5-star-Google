import React from 'react';
import { Heart } from 'lucide-react';

interface AppreciationModalProps {
  onClose: () => void;
}

export function AppreciationModal({ onClose }: AppreciationModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl transform transition-all">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-rose-100 mb-4">
            <Heart className="h-6 w-6 text-rose-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Thank You for Your Support!
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            We're thrilled that you're enjoying our service. Your satisfaction means everything to us!
          </p>
          <button
            onClick={onClose}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}