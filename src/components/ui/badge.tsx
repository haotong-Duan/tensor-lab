import * as React from 'react';
import { cn } from '@/lib/utils';

export function Badge({
  className,
  variant = 'default',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'secondary' | 'outline' | 'gradient' | 'hot' | 'new';
}) {
  const variants = {
    default: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary text-secondary-foreground border-transparent',
    outline: 'border-border text-foreground',
    gradient:
      'bg-gradient-to-r from-brand-500/15 to-violet-500/15 text-brand-700 dark:text-brand-300 border-brand-500/20',
    hot: 'bg-gradient-to-r from-rose-500/15 to-orange-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30',
    new: 'bg-gradient-to-r from-emerald-500/15 to-teal-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
  };
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider transition-colors',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
