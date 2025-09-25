import React from 'react';

export const Footer = React.memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500">
            © {currentYear} Find Solace, Inc. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a 
              href="https://app.solace.health/terms-of-service" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-primary transition-colors"
            >
              Terms of Service
            </a>
            <a 
              href="https://app.solace.health/privacy-policy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
