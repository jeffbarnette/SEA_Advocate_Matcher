import React from 'react';

interface ErrorMessageProps {
  error: string;
  onRetry: () => void;
}

export const ErrorMessage = React.memo(({ error, onRetry }: ErrorMessageProps) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    </div>
    <h3 className="text-xl font-semibold text-red-900 mb-2">Unable to Load Advocates</h3>
    <p className="text-red-700 mb-6">{error}</p>
    <button onClick={onRetry} className="btn bg-red-600 text-white hover:bg-red-700">
      Try Again
    </button>
  </div>
));

ErrorMessage.displayName = 'ErrorMessage';
