import React from 'react';
import { 
  InformationCircleIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  XCircleIcon 
} from '@heroicons/react/24/outline';
import { cn } from '../utils/cn';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
}

const alertVariants = {
  default: {
    container: "border-primary/20 bg-primary/5 text-primary",
    icon: InformationCircleIcon,
  },
  success: {
    container: "border-success/20 bg-success/5 text-success",
    icon: CheckCircleIcon,
  },
  warning: {
    container: "border-warning/20 bg-warning/5 text-warning",
    icon: ExclamationTriangleIcon,
  },
  error: {
    container: "border-destructive/20 bg-destructive/5 text-destructive",
    icon: XCircleIcon,
  },
};

export function Alert({ 
  variant = 'default', 
  className, 
  children, 
  ...props 
}: AlertProps) {
  const { container, icon: Icon } = alertVariants[variant];

  return (
    <div
      className={cn(
        "relative w-full rounded-lg border p-4",
        container,
        className
      )}
      {...props}
    >
      <div className="flex gap-3">
        <Icon className="h-5 w-5 shrink-0 mt-0.5" />
        <div className="flex-1 space-y-1">
          {children}
        </div>
      </div>
    </div>
  );
}

export function AlertTitle({ 
  className, 
  children, 
  ...props 
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    >
      {children}
    </h5>
  );
}

export function AlertDescription({ 
  className, 
  children, 
  ...props 
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <div
      className={cn("text-sm opacity-90", className)}
      {...props}
    >
      {children}
    </div>
  );
}