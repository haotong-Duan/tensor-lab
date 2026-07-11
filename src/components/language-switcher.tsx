'use client';

import * as React from 'react';
import { Globe, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n, type Locale } from './i18n';
import { cn } from '@/lib/utils';

const labels: Record<Locale, { native: string; english: string }> = {
  en: { native: 'English', english: 'English' },
  zh: { native: '简体中文', english: 'Simplified Chinese' },
};

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Language"
        className={cn(
          'flex items-center gap-1.5 rounded-md transition-colors',
          compact
            ? 'p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground'
            : 'h-8 px-2.5 text-xs font-medium bg-secondary/60 hover:bg-secondary text-foreground border border-border/40',
        )}
        title="Change language"
      >
        <Globe className="w-3.5 h-3.5" />
        {!compact && <span>{labels[locale].native}</span>}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 bottom-full mb-1.5 min-w-[180px] z-50 glass-card p-1 shadow-glass-lg"
          >
            {(Object.keys(labels) as Locale[]).map((code) => (
              <button
                key={code}
                onClick={() => {
                  setLocale(code);
                  setOpen(false);
                }}
                className={cn(
                  'w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md text-sm transition-colors',
                  locale === code
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-secondary/60 text-foreground',
                )}
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">{labels[code].native}</span>
                  <span className="text-[10px] text-muted-foreground">{labels[code].english}</span>
                </div>
                {locale === code && <Check className="w-3.5 h-3.5 text-primary" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
