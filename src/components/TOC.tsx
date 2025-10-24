import { useScrollSpy } from '../hooks/useScrollSpy';
import { cn } from '../utils/cn';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TOCProps {
  items: TOCItem[];
  className?: string;
}

export function TOC({ items, className }: TOCProps) {
  const activeId = useScrollSpy(items.map(item => `#${item.id}`));

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (items.length === 0) return null;

  return (
    <div className={cn("space-y-2", className)}>
      <h4 className="text-sm font-semibold text-foreground mb-4">On this page</h4>
      <nav className="space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={cn(
              "block w-full text-left text-sm transition-colors hover:text-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm",
              item.level === 2 && "pl-0",
              item.level === 3 && "pl-4",
              item.level === 4 && "pl-8",
              activeId === item.id
                ? "text-primary font-medium"
                : "text-muted-foreground"
            )}
          >
            {item.title}
          </button>
        ))}
      </nav>
    </div>
  );
}