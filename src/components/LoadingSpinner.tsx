import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'spin' | 'pulse' | 'dots';
  color?: 'sage' | 'dusty-rose' | 'mocha' | 'cream';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  variant = 'spin',
  color = 'sage', 
  className = '' 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const dotSizes = {
    small: 'w-1.5 h-1.5',
    medium: 'w-2.5 h-2.5',
    large: 'w-3 h-3'
  };

  const dotSpacing = {
    small: 'space-x-1',
    medium: 'space-x-2',
    large: 'space-x-3'
  };

  // Render different spinner variants
  if (variant === 'dots') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className={`flex ${dotSpacing[size]}`}>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`${dotSizes[size]} rounded-full bg-${color}`}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <motion.div
          className={`${sizeClasses[size]} rounded-full bg-${color}/80`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>
    );
  }

  // Default spin variant
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-${color}/30 border-t-${color}`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
