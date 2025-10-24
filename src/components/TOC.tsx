import React, { useState, useEffect } from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TOCProps {
  items: TOCItem[];
}

export const TOC: React.FC<TOCProps> = ({ items }) => {
  const [isVisible, setIsVisible] = useState(false);
  const activeId = useScrollSpy(items.map(item => item.id));

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show TOC when scrolled past 200px and there's more content below
      setIsVisible(scrollTop > 200 && scrollTop < documentHeight - windowHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible || items.length === 0) {
    return null;
  }

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 w-64 max-h-96 overflow-y-auto bg-background/95 backdrop-blur border border-border rounded-lg shadow-lg z-40">
      <div className="p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">On this page</h3>
        <nav className="space-y-1">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`
                block text-sm transition-colors duration-200
                ${item.level === 1 ? 'font-medium' : 'font-normal'}
                ${item.level === 2 ? 'ml-2' : item.level === 3 ? 'ml-4' : ''}
                ${activeId === item.id
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};
