'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen, Clock, Tag, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { Math, BlockMath } from '@/components/ui/math';
import { cn } from '@/lib/utils';

type ContentPageProps = {
  title: string;
  subtitle?: string;
  description?: string;
  category?: string;
  readTime?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Research' | 'All';
  tags?: string[];
  prev?: { title: string; href: string };
  next?: { title: string; href: string };
  children: React.ReactNode;
};

export function ContentPage({
  title,
  subtitle,
  description,
  category,
  readTime,
  level,
  tags = [],
  prev,
  next,
  children,
}: ContentPageProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border/40 bg-gradient-to-b from-secondary/30 to-transparent">
        <div className="max-w-4xl mx-auto px-6 pt-12 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {category && (
                <Badge variant="gradient">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {category}
                </Badge>
              )}
              {level && (
                <Badge
                  variant={
                    level === 'Beginner'
                      ? 'new'
                      : level === 'Intermediate'
                      ? 'default'
                      : level === 'Advanced'
                      ? 'hot'
                      : 'gradient'
                  }
                >
                  {level}
                </Badge>
              )}
              {readTime && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {readTime}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-3 text-lg text-muted-foreground text-balance">{subtitle}</p>
            )}
            {description && (
              <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-2xl">
                {description}
              </p>
            )}
            {tags.length > 0 && (
              <div className="mt-5 flex flex-wrap items-center gap-1.5">
                <Tag className="w-3 h-3 text-muted-foreground" />
                {tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-0.5 rounded-md bg-secondary/60 text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="prose-content"
        >
          {children}
        </motion.div>
      </article>

      {/* Prev/Next */}
      {(prev || next) && (
        <div className="max-w-4xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-8 border-t border-border/40">
            {prev ? (
              <Link href={prev.href}>
                <GlassCard className="p-4 h-full group" hover>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                    Previous
                  </div>
                  <div className="font-medium group-hover:text-primary transition-colors">
                    {prev.title}
                  </div>
                </GlassCard>
              </Link>
            ) : (
              <div />
            )}
            {next && (
              <Link href={next.href} className="md:text-right">
                <GlassCard className="p-4 h-full group" hover>
                  <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground mb-1">
                    Next
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <div className="font-medium group-hover:text-primary transition-colors">
                    {next.title}
                  </div>
                </GlassCard>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

type SectionProps = {
  title?: string;
  subtitle?: string;
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export function Section({ title, subtitle, id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn('mt-12 first:mt-0 scroll-mt-20', className)}>
      {title && (
        <div className="mb-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
          {subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}
        </div>
      )}
      <div className="space-y-4 text-[15px] leading-relaxed">{children}</div>
    </section>
  );
}

type CalloutProps = {
  type?: 'info' | 'tip' | 'warning' | 'definition';
  title?: string;
  children: React.ReactNode;
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const config = {
    info: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', label: '💡 Info', color: 'text-blue-600 dark:text-blue-400' },
    tip: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', label: '✨ Tip', color: 'text-emerald-600 dark:text-emerald-400' },
    warning: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', label: '⚠️ Note', color: 'text-amber-600 dark:text-amber-400' },
    definition: { bg: 'bg-violet-500/10', border: 'border-violet-500/20', label: '📖 Definition', color: 'text-violet-600 dark:text-violet-400' },
  }[type];
  return (
    <div className={cn('rounded-2xl border p-4 my-6', config.bg, config.border)}>
      {title && <div className={cn('font-semibold text-sm mb-1', config.color)}>{title}</div>}
      <div className="text-sm leading-relaxed text-foreground/90 [&>p]:m-0">{children}</div>
    </div>
  );
}

type CodeBlockProps = {
  language?: string;
  filename?: string;
  children: string;
};

export function CodeBlock({ language = 'python', filename, children }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const langColors: Record<string, string> = {
    python: 'text-blue-500',
    matlab: 'text-orange-500',
    javascript: 'text-yellow-500',
    typescript: 'text-blue-400',
    bash: 'text-emerald-500',
  };

  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-border/40 bg-[#0d1117] dark:bg-[#0a0e14] shadow-soft">
      <div className="flex items-center justify-between px-4 py-2 bg-black/30 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          {filename && (
            <span className="text-xs text-white/60 font-mono ml-2">{filename}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className={cn('text-[10px] font-mono uppercase tracking-wider', langColors[language] || 'text-white/40')}>
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="text-[10px] text-white/60 hover:text-white transition-colors"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      <pre className="p-4 overflow-x-auto scrollbar-thin text-[13px] leading-relaxed">
        <code className="font-mono text-white/90">{children}</code>
      </pre>
    </div>
  );
}

export { Math, BlockMath };
