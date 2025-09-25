import React from 'react';

interface SolaceLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'text';
  className?: string;
}

export const SolaceLogo = React.memo(({ 
  size = 'md', 
  variant = 'full', 
  className = '' 
}: SolaceLogoProps) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  // Solace logo using the actual image
  const SolaceImageLogo = ({ size }: { size: string }) => {
    const heightClasses = {
      sm: 'h-6',
      md: 'h-8', 
      lg: 'h-10',
      xl: 'h-12'
    };
    
    return (
      <img 
        src="/solace-logo.png" 
        alt="Solace" 
        className={`${heightClasses[size as keyof typeof heightClasses]} object-contain`}
        style={{ height: 'auto' }}
      />
    );
  };

  if (variant === 'icon') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <SolaceImageLogo size={sizeClasses[size]} />
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={`flex items-center ${className}`}>
        <SolaceImageLogo size={textSizeClasses[size]} />
      </div>
    );
  }

  // Full logo with image and subtitle
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <SolaceImageLogo size={size} />
      <span className={`text-gray-500 font-medium ${size === 'sm' ? 'text-2xl' : size === 'md' ? 'text-3xl' : 'text-4xl'} leading-none`}>
        Advocates
      </span>
    </div>
  );
});

SolaceLogo.displayName = 'SolaceLogo';
