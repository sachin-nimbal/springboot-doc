import { useState } from 'react';
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';
import { copyToClipboard } from '@/utils/clipboard';
import { cn } from '@/utils/cn';

interface CopyButtonProps {
  text: string;
  className?: string;
}

/**
 * CopyButton component for copying text to clipboard
 * Shows a checkmark briefly after successful copy
 */
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
        'inline-flex items-center justify-center rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className
      )}
      aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
      title={copied ? 'Copied!' : 'Copy to clipboard'}
    >
      {copied ? (
        <CheckIcon className="h-4 w-4 text-green-500" />
      ) : (
        <ClipboardDocumentIcon className="h-4 w-4" />
      )}
    </button>
  );
}
