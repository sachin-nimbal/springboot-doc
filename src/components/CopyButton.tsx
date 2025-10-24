import { useState } from 'react';
import { ClipboardIcon as Copy, CheckIcon as Check } from '@heroicons/react/24/outline';
import { copyToClipboard } from '../utils/clipboard';
import { cn } from '../utils/cn';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export default function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium',
        'rounded-md border border-border bg-background',
        'hover:bg-accent hover:text-accent-foreground',
        'focus-ring transition-colors',
        className
      )}
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          Copy
        </>
      )}
    </button>
  );
}
