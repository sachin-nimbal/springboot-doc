import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';
import { cn } from '../utils/cn';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'light', icon: SunIcon, label: 'Light' },
    { value: 'dark', icon: MoonIcon, label: 'Dark' },
    { value: 'system', icon: ComputerDesktopIcon, label: 'System' },
  ] as const;

  return (
    <div className="flex items-center rounded-lg border bg-background p-1">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={cn(
            'flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
            'hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            theme === value
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
          title={`Switch to ${label.toLowerCase()} theme`}
        >
          <Icon className="h-4 w-4" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}