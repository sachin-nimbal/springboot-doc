import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import tocData from '../data/toc.json';

interface SidebarItem {
  title: string;
  href: string;
  children?: SidebarItem[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isItemActive = isActive(item.href);
    const hasActiveChild = hasChildren && item.children?.some(child => isActive(child.href));

    return (
      <div key={item.href} className="mb-1">
        <Link
          to={item.href}
          onClick={onClose}
          className={`
            flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors duration-200
            ${isItemActive || hasActiveChild
              ? 'bg-primary/10 text-primary font-medium'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }
            ${level > 0 ? 'ml-4' : ''}
          `}
        >
          <span>{item.title}</span>
          {hasChildren && (
            <ChevronRightIcon 
              className={`h-4 w-4 transition-transform duration-200 ${
                hasActiveChild ? 'rotate-90' : ''
              }`} 
            />
          )}
        </Link>
        
        {hasChildren && hasActiveChild && (
          <div className="mt-1 space-y-1">
            {item.children?.map(child => renderSidebarItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-80 bg-background border-r border-border
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:top-0 lg:h-screen
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Documentation</h2>
            <p className="text-sm text-muted-foreground">CrudX Framework API Reference</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {tocData.map(item => renderSidebarItem(item))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border">
            <div className="text-xs text-muted-foreground">
              <p>CrudX Framework v1.0.0</p>
              <p>Built with React & Tailwind CSS</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
