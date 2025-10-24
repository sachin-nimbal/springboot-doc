import { ReactNode } from 'react';
import CopyButton from './CopyButton';
import SyntaxHighlighter from './SyntaxHighlighter';
import { detectLanguage, getLanguageLabel } from '@/utils/highlight';
import { cn } from '@/utils/cn';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  children?: ReactNode;
  className?: string;
}

/**
 * CodeBlock component with syntax highlighting and copy functionality
 * Automatically detects language if not provided
 */
export default function CodeBlock({
  code,
  language,
  title,
  showLineNumbers = false,
  children,
  className,
}: CodeBlockProps) {
  const detectedLanguage = language || detectLanguage(code);
  const languageLabel = getLanguageLabel(detectedLanguage);

  return (
    <div className={cn('group relative my-6 overflow-hidden rounded-lg border border-border', className)}>
      {/* Header with language label and copy button */}
      <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
        <div className="flex items-center space-x-2">
          {title && (
            <>
              <span className="text-sm font-medium text-foreground">{title}</span>
              <span className="text-muted-foreground">•</span>
            </>
          )}
          <span className="text-xs font-medium uppercase text-muted-foreground">
            {languageLabel}
          </span>
        </div>
        <CopyButton text={code} />
      </div>

      {/* Code content */}
      <div className="overflow-x-auto">
        {children || (
          <SyntaxHighlighter
            code={code}
            language={detectedLanguage}
            showLineNumbers={showLineNumbers}
          />
        )}
      </div>
    </div>
  );
}
