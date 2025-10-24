import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'bordered';
  hoverable?: boolean;
}

/**
 * Card component for displaying content in a container
 * Supports multiple variants and hover effects
 */
export default function Card({ 
  children, 
  className, 
  variant = 'default',
  hoverable = false 
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg bg-card text-card-foreground',
        {
          'border border-border': variant === 'bordered' || variant === 'default',
          'shadow-lg': variant === 'elevated',
          'transition-all duration-300 hover:shadow-xl hover:-translate-y-1': hoverable,
        },
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn('p-6 pb-4', className)}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={cn('text-2xl font-semibold tracking-tight', className)}>
      {children}
    </h3>
  );
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn('text-sm text-muted-foreground mt-2', className)}>
      {children}
    </p>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn('p-6 pt-0', className)}>
      {children}
    </div>
  );
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn('p-6 pt-4 border-t border-border', className)}>
      {children}
    </div>
  );
}
