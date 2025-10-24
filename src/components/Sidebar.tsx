import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';
import {
  HomeIcon,
  RocketLaunchIcon,
  CodeBracketIcon,
  CubeIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

interface NavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Overview', href: '/overview', icon: HomeIcon },
      { title: 'Quick Setup', href: '/getting-started', icon: RocketLaunchIcon },
    ],
  },
  {
    title: 'Core Concepts',
    items: [
      { title: 'Annotations', href: '/annotations', icon: CodeBracketIcon },
      { title: 'Base Entities', href: '/entities', icon: CubeIcon },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { title: 'REST Endpoints', href: '/rest-endpoints', icon: GlobeAltIcon },
    ],
  },
];

/**
 * Sidebar navigation component
 * Shows hierarchical navigation with icons and active state
 */
export default function Sidebar() {
  const location = useLocation();

  return (
    <nav className="h-full overflow-y-auto scrollbar-thin px-4 py-6" aria-label="Sidebar navigation">
      <div className="space-y-6">
        {navigation.map((section) => (
          <div key={section.title}>
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground/70 hover:bg-accent hover:text-foreground'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {Icon && <Icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
