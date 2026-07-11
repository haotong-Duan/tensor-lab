'use client';

import * as React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { cn } from '@/lib/utils';

type MathProps = {
  children: string;
  display?: boolean;
  className?: string;
  block?: boolean;
};

export function Math({ children, display = false, block = false, className }: MathProps) {
  const html = React.useMemo(() => {
    try {
      return katex.renderToString(children, {
        displayMode: display || block,
        throwOnError: false,
        strict: false,
        trust: true,
        output: 'html',
      });
    } catch (e) {
      return `<span class="text-red-500">Error: ${children}</span>`;
    }
  }, [children, display, block]);

  return (
    <span
      className={cn('katex-renderer', block && 'block my-6 text-center', className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function BlockMath({ children, className }: { children: string; className?: string }) {
  return (
    <div
      className={cn(
        'my-6 px-6 py-5 rounded-2xl bg-white/40 dark:bg-white/[0.02] border border-border/40 backdrop-blur-sm overflow-x-auto',
        className,
      )}
    >
      <Math display block>
        {children}
      </Math>
    </div>
  );
}
