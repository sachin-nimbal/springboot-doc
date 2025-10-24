import { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { 
  InformationCircleIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  XCircleIcon 
} from '@heroicons/react/24/outline';

interface AlertProps {
  children: ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  className?: string;
  icon?: boolean;
}

/**
 * Alert component for displaying important messages and notifications
 * Supports multiple variants with icons
 */
export default function Alert({ 
  children, 
  variant = 'info', 
  title,
  className,
  icon = true 
}: AlertProps) {
  const icons = {
    info: InformationCircleIcon,
    success: CheckCircleIcon,
    warning: ExclamationTriangleIcon,
    danger: XCircleIcon,
  };

  const Icon = icons[variant];

  return (
    <div
      role="alert"
      className={cn(
        'rounded-lg border p-4',
        {
          'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/30 dark:border-blue-800 dark:text-blue-100': 
            variant === 'info',
          'bg-green-50 border-green-200 text-green-900 dark:bg-green-950/30 dark:border-green-800 dark:text-green-100': 
            variant === 'success',
          'bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-950/30 dark:border-yellow-800 dark:text-yellow-100': 
            variant === 'warning',
          'bg-red-50 border-red-200 text-red-900 dark:bg-red-950/30 dark:border-red-800 dark:text-red-100': 
            variant === 'danger',
        },
        className
      )}
    >
      <div className="flex gap-3">
        {icon && (
          <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
        )}
        <div className="flex-1">
          {title && (
            <h5 className="font-semibold mb-1">
              {title}
            </h5>
          )}
          <div className="text-sm [&_p]:leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
