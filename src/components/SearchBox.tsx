import { useState, useRef, useEffect } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';

interface SearchBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * SearchBox component - modal search interface
 * Activated by Cmd/Ctrl+K keyboard shortcut
 */
export default function SearchBox({ isOpen, onClose }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Reset query when closed
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const searchModal = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[20vh]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl"
            >
              <div className="overflow-hidden rounded-lg border border-border bg-background shadow-2xl">
                {/* Search Input */}
                <div className="flex items-center border-b border-border px-4">
                  <MagnifyingGlassIcon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search documentation..."
                    className="w-full bg-transparent px-4 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none"
                    aria-label="Search"
                  />
                  <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-border bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                    ESC
                  </kbd>
                </div>

                {/* Search Results */}
                <div className="max-h-[60vh] overflow-y-auto p-4">
                  {query.length > 0 ? (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Search functionality is a placeholder. In production, this would query your documentation content.
                      </p>
                      <div className="rounded-lg border border-border p-4 hover:bg-accent transition-colors cursor-pointer">
                        <h4 className="font-medium text-foreground">Example Result</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Matching content for "{query}"...
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-muted-foreground/50" aria-hidden="true" />
                      <p className="mt-4 text-sm text-muted-foreground">
                        Start typing to search documentation
                      </p>
                      <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <kbd className="rounded border border-border bg-muted px-2 py-1">↑↓</kbd>
                          Navigate
                        </span>
                        <span className="flex items-center gap-1">
                          <kbd className="rounded border border-border bg-muted px-2 py-1">↵</kbd>
                          Select
                        </span>
                        <span className="flex items-center gap-1">
                          <kbd className="rounded border border-border bg-muted px-2 py-1">ESC</kbd>
                          Close
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(searchModal, document.body);
}

interface SearchButtonProps {
  onClick: () => void;
  className?: string;
}

/**
 * SearchButton component - trigger for search modal
 * Shows keyboard shortcut hint
 */
export function SearchButton({ onClick, className }: SearchButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors',
        className
      )}
      aria-label="Search documentation"
    >
      <MagnifyingGlassIcon className="h-4 w-4" aria-hidden="true" />
      <span className="hidden sm:inline">Search...</span>
      <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  );
}
