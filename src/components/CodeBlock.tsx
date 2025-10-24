import { Suspense, lazy } from 'react';
import { cn } from '../utils/cn';
import { getLanguageLabel } from '../utils/highlight';
import CopyButton from './CopyButton';

// Lazy load the syntax highlighter to reduce initial bundle size
const SyntaxHighlighter = lazy(() => import('./SyntaxHighlighter'));

interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  className?: string;
  title?: string;
}

export default function CodeBlock({
  code,
  language,
  showLineNumbers = true,
  className,
  title,
}: CodeBlockProps) {
  return (
    <div className={cn('relative rounded-lg overflow-hidden border border-border my-4', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
        <div className="flex items-center gap-2">
          {title && <span className="text-xs font-medium">{title}</span>}
          <span className="text-xs text-muted-foreground label-text">
            {getLanguageLabel(language)}
          </span>
        </div>
        <CopyButton text={code} />
      </div>

      {/* Code */}
      <div className="relative">
        <Suspense
          fallback={
            <pre className="p-4 overflow-x-auto bg-muted/30 scrollbar-thin">
              <code className="text-sm font-mono">{code}</code>
            </pre>
          }
        >
          <SyntaxHighlighter
            code={code}
            language={language}
            showLineNumbers={showLineNumbers}
          />
        </Suspense>
      </div>
    </div>
  );
}
