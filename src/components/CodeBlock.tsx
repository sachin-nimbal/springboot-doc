import React from 'react';
import { Highlight } from 'prism-react-renderer';
import { useTheme } from '../hooks/useTheme';
import { CopyButton } from './CopyButton';
import { lightTheme, darkTheme, getLanguage, formatLanguageLabel } from '../utils/highlight';
import { cn } from '../utils/cn';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({ 
  code, 
  language = 'text', 
  title, 
  showLineNumbers = false,
  className 
}: CodeBlockProps) {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? darkTheme : lightTheme;
  const lang = getLanguage(language);

  return (
    <div className={cn("relative group", className)}>
      {/* Header */}
      {(title || language) && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted border border-b-0 rounded-t-lg">
          <div className="flex items-center gap-2">
            {title && (
              <span className="text-sm font-medium text-foreground">{title}</span>
            )}
            {language && (
              <span className="text-xs px-2 py-1 bg-background rounded text-muted-foreground font-mono">
                {formatLanguageLabel(language)}
              </span>
            )}
          </div>
          <CopyButton text={code} size="sm" />
        </div>
      )}

      {/* Code */}
      <div className="relative">
        {!title && !language && (
          <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <CopyButton text={code} size="sm" />
          </div>
        )}
        
        <Highlight theme={theme} code={code.trim()} language={lang}>
          {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={cn(
                highlightClassName,
                "overflow-x-auto p-4 text-sm",
                title || language ? "rounded-t-none rounded-b-lg" : "rounded-lg",
                "border bg-background"
              )}
              style={style}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {showLineNumbers && (
                    <span className="inline-block w-8 text-right mr-4 text-muted-foreground select-none">
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
      </div>
    </div>
  );
}