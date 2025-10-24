import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Badge component for labels, status indicators, and method tags
 * Supports multiple color variants and sizes
 */
export default function Badge({ 
  children, 
  variant = 'default', 
  size = 'md',
  className 
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold rounded-md border transition-colors',
        {
          // Size variants
          'px-2 py-0.5 text-xs': size === 'sm',
          'px-2.5 py-1 text-xs': size === 'md',
          'px-3 py-1.5 text-sm': size === 'lg',
          
          // Color variants
          'bg-muted border-border text-foreground': variant === 'default',
          'bg-primary border-primary text-primary-foreground': variant === 'primary',
          'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400': variant === 'success',
          'bg-yellow-500/10 border-yellow-500/30 text-yellow-600 dark:text-yellow-400': variant === 'warning',
          'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400': variant === 'danger',
          'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400': variant === 'info',
          'bg-secondary border-border text-secondary-foreground': variant === 'secondary',
        },
        className
      )}
    >
      {children}
    </span>
  );
}

interface MethodBadgeProps {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  className?: string;
}

/**
 * Specialized badge for HTTP methods with appropriate colors
 */
export function MethodBadge({ method, className }: MethodBadgeProps) {
  const variantMap: Record<string, 'success' | 'info' | 'warning' | 'danger'> = {
    GET: 'success',
    POST: 'info',
    PUT: 'warning',
    PATCH: 'warning',
    DELETE: 'danger',
  };

  return (
    <Badge variant={variantMap[method]} size="sm" className={cn('font-bold uppercase', className)}>
      {method}
    </Badge>
  );
}
