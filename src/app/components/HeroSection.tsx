import React from 'react';

interface HeroSectionProps {
  className?: string;
}

export const HeroSection = React.memo(({ className = '' }: HeroSectionProps) => {
  return (
    <section className={`bg-gradient-to-br from-primary to-primary-dark text-white py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Don't navigate your health alone.
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Find an advocate who will help untangle your healthcare by phone or video—no matter what you need—<strong>covered by Medicare</strong>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4">
              Find an Advocate
            </button>
            <button className="btn btn-outline border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
              See How It Works
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-col items-center">
            <p className="text-blue-100 mb-4 text-sm font-medium">
              COVERED MEMBERS PAY AS LITTLE AS $0
            </p>
            
            {/* Insurance logos placeholder */}
            <div className="flex items-center gap-6 opacity-80">
              <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2 text-sm font-medium">
                Medicare
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2 text-sm font-medium">
                United Healthcare
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2 text-sm font-medium">
                Humana
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2 text-sm font-medium">
                Blue Cross Blue Shield
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
