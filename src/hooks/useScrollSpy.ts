import { useState, useEffect } from 'react';

export function useScrollSpy(selectors: string[], options?: IntersectionObserverInit) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const elements = selectors
      .map(selector => document.querySelector(selector))
      .filter(Boolean) as Element[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -35% 0px',
        threshold: 0,
        ...options,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, [selectors, options]);

  return activeId;
}