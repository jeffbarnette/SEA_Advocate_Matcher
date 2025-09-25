import React from 'react';

export const LoadingSpinner = React.memo(() => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
    </div>
    <p className="mt-4 text-lg text-gray-600 font-medium">Loading advocates...</p>
    <p className="mt-2 text-sm text-gray-500">Finding the best healthcare advocates for you</p>
  </div>
));

LoadingSpinner.displayName = 'LoadingSpinner';
