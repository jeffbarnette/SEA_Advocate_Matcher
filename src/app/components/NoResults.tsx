import React from 'react';

interface NoResultsProps {
  onReset: () => void;
}

export const NoResults = React.memo(({ onReset }: NoResultsProps) => (
  <div className="text-center py-16">
    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Advocates Found</h3>
    <p className="text-gray-600 mb-6 max-w-md mx-auto">
      We couldn't find any advocates matching your current search criteria. Try adjusting your filters or search terms.
    </p>
    <button onClick={onReset} className="btn btn-primary">
      Clear All Filters
    </button>
  </div>
));

NoResults.displayName = 'NoResults';
