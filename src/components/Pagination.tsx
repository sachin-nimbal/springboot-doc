import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { cn } from '../utils/cn';

interface PaginationItem {
  title: string;
  href: string;
  description?: string;
}

interface PaginationProps {
  previous?: PaginationItem;
  next?: PaginationItem;
  className?: string;
}

export function Pagination({ previous, next, className }: PaginationProps) {
  if (!previous && !next) return null;

  return (
    <nav className={cn("flex items-center justify-between border-t pt-6", className)}>
      {previous ? (
        <Link
          to={previous.href}
          className="group flex items-center gap-3 rounded-lg border p-4 hover:bg-muted transition-colors max-w-xs"
        >
          <ChevronLeftIcon className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
          <div className="text-left">
            <div className="text-xs text-muted-foreground mb-1">Previous</div>
            <div className="font-medium text-sm">{previous.title}</div>
            {previous.description && (
              <div className="text-xs text-muted-foreground mt-1">{previous.description}</div>
            )}
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          to={next.href}
          className="group flex items-center gap-3 rounded-lg border p-4 hover:bg-muted transition-colors max-w-xs text-right"
        >
          <div className="text-right">
            <div className="text-xs text-muted-foreground mb-1">Next</div>
            <div className="font-medium text-sm">{next.title}</div>
            {next.description && (
              <div className="text-xs text-muted-foreground mt-1">{next.description}</div>
            )}
          </div>
          <ChevronRightIcon className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}