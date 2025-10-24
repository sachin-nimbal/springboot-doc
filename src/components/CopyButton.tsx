import React from 'react';
import { CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline';

interface CopyButtonProps {
  onCopy: () => void;
  copied: boolean;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ onCopy, copied }) => {
  return (
    <button
      onClick={onCopy}
      className="flex items-center space-x-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors duration-200"
      title={copied ? 'Copied!' : 'Copy to clipboard'}
    >
      {copied ? (
        <>
          <CheckIcon className="h-3 w-3" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <ClipboardIcon className="h-3 w-3" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
};
