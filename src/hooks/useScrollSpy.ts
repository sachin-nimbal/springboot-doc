import { useState, useEffect } from 'react';

/**
 * Custom hook for tracking the currently visible section while scrolling
 * Used for highlighting active items in table of contents
 */
export function useScrollSpy(selectors: string[], offset = 100) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      // Get all elements matching the selectors
      const elements = selectors
        .map((selector) => document.querySelector(selector))
        .filter((el): el is HTMLElement => el !== null);

      // Find the element currently in view
      for (let i = elements.length - 1; i >= 0; i--) {
        const element = elements[i];
        const rect = element.getBoundingClientRect();

        // Check if element is in viewport (with offset for better UX)
        if (rect.top <= offset && rect.bottom >= 0) {
          setActiveId(element.id);
          return;
        }
      }

      // If we're at the top of the page, highlight the first section
      if (window.scrollY < offset && elements.length > 0) {
        setActiveId(elements[0].id);
      }
    };

    // Initial check
    handleScroll();

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [selectors, offset]);

  return activeId;
}
