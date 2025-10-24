import { NavLink } from 'react-router-dom';
import { DocumentTextIcon as FileText, RocketLaunchIcon as Rocket, TagIcon as Tag, CircleStackIcon as Database, BoltIcon as Zap } from '@heroicons/react/24/outline';
import { cn } from '../utils/cn';

const navigation = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Overview', path: '/overview', icon: FileText },
      { title: 'Getting Started', path: '/getting-started', icon: Rocket },
    ],
  },
  {
    title: 'Core Concepts',
    items: [
      { title: 'Annotations', path: '/annotations', icon: Tag },
      { title: 'Entities', path: '/entities', icon: Database },
      { title: 'REST Endpoints', path: '/rest-endpoints', icon: Zap },
    ],
  },
];

export default function Sidebar() {
  return (
    <div className="py-6 px-4 space-y-6 scrollbar-thin">
      {navigation.map((section) => (
        <div key={section.title}>
          <h3 className="label-text mb-2 px-3">{section.title}</h3>
          <nav className="space-y-1">
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors focus-ring',
                      isActive
                        ? 'bg-accent text-accent-foreground font-medium border-l-2 border-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                    )
                  }
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.title}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      ))}
    </div>
  );
}
