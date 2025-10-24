import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
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

interface MobileDrawerProps {
  onClose: () => void;
}

/**
 * MobileDrawer component for mobile navigation
 * Slides in from the left with backdrop
 */
export default function MobileDrawer({ onClose }: MobileDrawerProps) {
  const location = useLocation();

  // Close drawer when route changes
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
        aria-hidden="true"
      />

      {/* Drawer */}
      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed left-0 top-0 bottom-0 z-50 w-64 overflow-y-auto border-r border-border bg-background lg:hidden"
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground leading-none">
                CrudX
              </span>
              <span className="text-xs text-muted-foreground leading-none">
                Framework
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-lg p-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Close menu"
          >
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <nav className="px-4 py-6" aria-label="Mobile navigation">
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
      </motion.aside>
    </>
  );
}
