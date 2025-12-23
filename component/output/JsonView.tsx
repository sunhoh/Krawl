'use client';
import { useState } from 'react';

import { cn } from '@/libs/utils';
import { Metadata } from '@/types/global';

interface Props {
  data: Metadata;
  value: string;
}

export const JsonView = ({ data, value }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className='w-full rounded-lg border border-[#e9ecef] bg-[#f8f9fa] p-4 shadow-inner'>
      <div className='mb-2 flex items-center justify-between border-b border-gray-200 pb-2'>
        <span className='text-xs font-bold text-gray-500 uppercase'>JSON</span>
        <button
          onClick={handleCopy}
          className={cn(
            'cursor-pointer rounded border border-[#e9ecef] px-2 py-1 text-[10px] transition-all duration-200',
            'hover:bg-zinc-200',
          )}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <pre className='scrollbar-thin scrollbar-thumb-gray-300 overflow-x-auto font-mono text-[13px] leading-relaxed text-gray-800'>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};
