import { useEffect, useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/utils/cn';

interface SyntaxHighlighterProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  className?: string;
}

/**
 * SyntaxHighlighter component using prism-react-renderer
 * Supports light and dark themes with line numbers
 */
export default function SyntaxHighlighter({
  code,
  language,
  showLineNumbers = false,
  className,
}: SyntaxHighlighterProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <pre className={cn('overflow-x-auto rounded-lg bg-muted p-4', className)}>
        <code>{code}</code>
      </pre>
    );
  }

  const prismTheme = theme === 'dark' ? themes.vsDark : themes.vsLight;

  return (
    <Highlight theme={prismTheme} code={code.trim()} language={language}>
      {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={cn(
            'overflow-x-auto rounded-lg p-4 text-sm',
            highlightClassName,
            className
          )}
          style={style}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {showLineNumbers && (
                <span className="mr-4 inline-block w-8 select-none text-right opacity-40">
                  {i + 1}
                </span>
              )}
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
