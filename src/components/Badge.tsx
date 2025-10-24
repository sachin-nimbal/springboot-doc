import React from 'react';
import { cn } from '../utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const badgeVariants = {
  default: "bg-primary text-primary-foreground hover:bg-primary/80",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  success: "bg-success text-success-foreground hover:bg-success/80",
  warning: "bg-warning text-warning-foreground hover:bg-warning/80",
  error: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
};

const badgeSizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-0.5 text-sm",
  lg: "px-3 py-1 text-sm",
};

export function Badge({ 
  variant = 'default', 
  size = 'md',
  className, 
  children, 
  ...props 
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        badgeVariants[variant],
        badgeSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// HTTP Method specific badges
interface MethodBadgeProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  className?: string;
}

export function MethodBadge({ method, className }: MethodBadgeProps) {
  const methodStyles = {
    GET: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    POST: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    PUT: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
    DELETE: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
    PATCH: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
  };

  return (
    <Badge 
      className={cn(
        "font-mono font-bold",
        methodStyles[method],
        className
      )}
      size="sm"
    >
      {method}
    </Badge>
  );
}