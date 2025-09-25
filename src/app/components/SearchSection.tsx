import React from 'react';

interface SearchSectionProps {
  className?: string;
}

export const SearchSection = React.memo(({ className = '' }: SearchSectionProps) => {
  return (
    <section className={`bg-white py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What can we help you with today?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our advocates specialize in various areas of healthcare. Find the right advocate for your specific needs.
          </p>
        </div>

        {/* Search categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="card p-6 text-center hover:shadow-lg transition-all cursor-pointer group">
            <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-colors">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Navigate a new diagnosis</h3>
            <p className="text-gray-600 text-sm">Get expert guidance on understanding your diagnosis and next steps</p>
          </div>

          <div className="card p-6 text-center hover:shadow-lg transition-all cursor-pointer group">
            <div className="w-16 h-16 bg-secondary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-colors">
              <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Care for your loved ones</h3>
            <p className="text-gray-600 text-sm">Support for family members navigating healthcare challenges</p>
          </div>

          <div className="card p-6 text-center hover:shadow-lg transition-all cursor-pointer group">
            <div className="w-16 h-16 bg-accent bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-colors">
              <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Find a doctor or facility</h3>
            <p className="text-gray-600 text-sm">Connect with the right healthcare providers in your area</p>
          </div>

          <div className="card p-6 text-center hover:shadow-lg transition-all cursor-pointer group">
            <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-colors">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Take control of chronic illness</h3>
            <p className="text-gray-600 text-sm">Manage ongoing conditions with expert support and guidance</p>
          </div>

          <div className="card p-6 text-center hover:shadow-lg transition-all cursor-pointer group">
            <div className="w-16 h-16 bg-secondary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-colors">
              <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Better care coordination</h3>
            <p className="text-gray-600 text-sm">Ensure all your providers work together for optimal care</p>
          </div>

          <div className="card p-6 text-center hover:shadow-lg transition-all cursor-pointer group">
            <div className="w-16 h-16 bg-accent bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-colors">
              <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Get the answers you need</h3>
            <p className="text-gray-600 text-sm">Ask questions and get clear, expert answers about your health</p>
          </div>
        </div>

        {/* Search CTA */}
        <div className="text-center">
          <button className="btn btn-primary text-lg px-8 py-4">
            Browse All Advocates
          </button>
        </div>
      </div>
    </section>
  );
});

SearchSection.displayName = 'SearchSection';
