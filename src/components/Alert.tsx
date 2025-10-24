import React from 'react';
import { 
  InformationCircleIcon, 
  ExclamationTriangleIcon, 
  CheckCircleIcon, 
  XCircleIcon 
} from '@heroicons/react/24/outline';
import { cn } from '../utils/cn';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'info' | 'warning' | 'success' | 'error';
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ 
  children, 
  variant = 'info', 
  className 
}) => {
  const variants = {
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400',
      icon: InformationCircleIcon,
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-400',
      icon: ExclamationTriangleIcon,
    },
    success: {
      container: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400',
      icon: CheckCircleIcon,
    },
    error: {
      container: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400',
      icon: XCircleIcon,
    },
  };

  const Icon = variants[variant].icon;

  return (
    <div className={cn(
      'flex items-start space-x-3 p-4 border rounded-lg',
      variants[variant].container,
      className
    )}>
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1 text-sm">
        {children}
      </div>
    </div>
  );
};

interface AlertTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const AlertTitle: React.FC<AlertTitleProps> = ({ children, className }) => {
  return (
    <h4 className={cn('font-semibold mb-1', className)}>
      {children}
    </h4>
  );
};

interface AlertDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const AlertDescription: React.FC<AlertDescriptionProps> = ({ children, className }) => {
  return (
    <div className={cn('text-sm', className)}>
      {children}
    </div>
  );
};
