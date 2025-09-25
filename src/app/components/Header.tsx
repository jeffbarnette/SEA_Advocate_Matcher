import React from 'react';
import { SolaceLogo } from './SolaceLogo';

interface HeaderProps {
  className?: string;
}

export const Header = React.memo(({ className = '' }: HeaderProps) => {
  return (
    <header className={`bg-white shadow-sm border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <SolaceLogo size="md" variant="full" />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#about" 
              className="text-gray-600 hover:text-primary font-medium transition-colors"
            >
              About
            </a>
            <a 
              href="#specialties" 
              className="text-gray-600 hover:text-primary font-medium transition-colors"
            >
              Specialties
            </a>
            <a 
              href="#locations" 
              className="text-gray-600 hover:text-primary font-medium transition-colors"
            >
              Locations
            </a>
            <a 
              href="#contact" 
              className="text-gray-600 hover:text-primary font-medium transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <button className="btn btn-outline text-sm">
              Sign In
            </button>
            <button className="btn btn-primary text-sm">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-primary">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';
