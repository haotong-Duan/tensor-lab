'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type GlassCardProps = HTMLMotionProps<'div'> & {
  hover?: boolean;
  glow?: boolean;
  variant?: 'default' | 'subtle' | 'elevated';
};

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hover = true, glow = false, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white/60 border-white/40',
      subtle: 'bg-white/40 border-white/30',
      elevated: 'bg-white/80 border-white/60 shadow-glass-lg',
    };
    return (
      <motion.div
        ref={ref}
        className={cn(
          'relative backdrop-blur-2xl border rounded-2xl shadow-glass',
          variants[variant],
          'dark:bg-white/[0.03] dark:border-white/[0.08]',
          glow && 'shadow-glow',
          hover && 'transition-all duration-300 hover:shadow-glass-lg hover:-translate-y-0.5',
          className,
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);
GlassCard.displayName = 'GlassCard';
