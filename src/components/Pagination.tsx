import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { cn } from '@/utils/cn';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * Pagination component for navigating through paginated content
 * Shows page numbers with previous/next controls
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const pages: (number | string)[] = [];
  
  // Always show first page
  pages.push(1);

  // Show ellipsis or pages around current page
  if (currentPage > 3) {
    pages.push('...');
  }

  // Show pages around current page
  for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
    pages.push(i);
  }

  // Show ellipsis before last page if needed
  if (currentPage < totalPages - 2) {
    pages.push('...');
  }

  // Always show last page if there's more than one page
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return (
    <nav
      aria-label="Pagination"
      className={cn('flex items-center justify-center space-x-2', className)}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'inline-flex items-center justify-center rounded-md border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50',
        )}
        aria-label="Previous page"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </button>

      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-muted-foreground"
              aria-hidden="true"
            >
              ...
            </span>
          );
        }

        const pageNumber = page as number;
        const isActive = pageNumber === currentPage;

        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            aria-label={`Page ${pageNumber}`}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-md border text-sm font-medium transition-colors',
              isActive
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-background hover:bg-accent hover:text-accent-foreground'
            )}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          'inline-flex items-center justify-center rounded-md border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50',
        )}
        aria-label="Next page"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </nav>
  );
}
