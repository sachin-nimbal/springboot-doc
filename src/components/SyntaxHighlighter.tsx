import { Highlight, themes } from 'prism-react-renderer';
import { useTheme } from '../hooks/useTheme';
import { cn } from '../utils/cn';

interface SyntaxHighlighterProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
}

export default function SyntaxHighlighter({
  code,
  language,
  showLineNumbers = true,
}: SyntaxHighlighterProps) {
  const { theme } = useTheme();

  return (
    <Highlight
      theme={theme === 'dark' ? themes.nightOwl : themes.github}
      code={code.trim()}
      language={language as 'javascript'}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={cn(
            className,
            'overflow-x-auto p-4 text-sm scrollbar-thin bg-muted/30'
          )}
          style={style}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })} className="table-row">
              {showLineNumbers && (
                <span className="table-cell pr-4 text-right select-none text-muted-foreground/50 w-8">
                  {i + 1}
                </span>
              )}
              <span className="table-cell">
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
