import { useScrollSpy } from '@/hooks/useScrollSpy';
import { cn } from '@/utils/cn';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TOCProps {
  items: TOCItem[];
  className?: string;
}

/**
 * Table of Contents component with scroll spy
 * Highlights current section and provides quick navigation
 */
export default function TOC({ items, className }: TOCProps) {
  // Get IDs for scroll spy
  const selectors = items.map((item) => `#${item.id}`);
  const activeId = useScrollSpy(selectors, 100);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Update URL hash without triggering scroll
      window.history.pushState(null, '', `#${id}`);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <nav className={cn('space-y-1', className)} aria-label="Table of contents">
      <h4 className="font-semibold text-foreground mb-4">On this page</h4>
      <ul className="space-y-2 text-sm">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              className={cn('transition-all', {
                'pl-0': item.level === 2,
                'pl-4': item.level === 3,
                'pl-8': item.level === 4,
              })}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={cn(
                  'block py-1 transition-colors hover:text-foreground border-l-2',
                  isActive
                    ? 'border-primary text-primary font-medium'
                    : 'border-transparent text-muted-foreground'
                )}
              >
                <span className="pl-3">{item.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
