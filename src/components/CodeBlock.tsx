import React, { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { CopyButton } from './CopyButton';

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  filename,
  showLineNumbers = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative group">
      {/* Header */}
      {(filename || language) && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border rounded-t-lg">
          <div className="flex items-center space-x-2">
            {filename && (
              <span className="text-sm font-medium text-foreground">{filename}</span>
            )}
            {language && (
              <span className="px-2 py-1 text-xs font-medium text-muted-foreground bg-muted-foreground/10 rounded">
                {language}
              </span>
            )}
          </div>
          <CopyButton onCopy={handleCopy} copied={copied} />
        </div>
      )}

      {/* Code */}
      <div className="relative">
        <Highlight
          theme={themes.vsDark}
          code={code}
          language={language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} rounded-lg ${filename ? 'rounded-t-none' : ''} overflow-x-auto scrollbar-thin`}
              style={style}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {showLineNumbers && (
                    <span className="inline-block w-8 text-muted-foreground select-none mr-4">
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
};
