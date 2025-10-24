import React, { useState, useRef, useEffect } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SearchBoxProps {
  onClose?: () => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (onClose) {
      inputRef.current?.focus();
    }
  }, [onClose]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && onClose) {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Search query:', query);
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="Search documentation... (⌘K)"
            className="w-full pl-10 pr-10 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
          />
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded"
            >
              <XMarkIcon className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isFocused && query && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-4 text-sm text-muted-foreground">
            Search results for "{query}" will appear here
          </div>
        </div>
      )}
    </div>
  );
};
