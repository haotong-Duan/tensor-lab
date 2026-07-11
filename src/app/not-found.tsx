'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { Sparkles, Home, Search } from 'lucide-react';
import { useI18n } from '@/components/i18n';

export default function NotFound() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen flex items-center justify-center p-6 mesh-bg">
      <GlassCard className="p-10 max-w-md w-full text-center" variant="elevated" hover={false}>
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-brand-500 to-violet-500 flex items-center justify-center mb-6 shadow-glow">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-5xl font-bold text-gradient-blue mb-2">404</h1>
        <p className="text-lg text-muted-foreground mb-6">
          {t('notfound.title')}
        </p>
        <div className="flex gap-2 justify-center">
          <Link href="/">
            <Button variant="primary">
              <Home className="w-4 h-4" />
              {t('notfound.home')}
            </Button>
          </Link>
          <Link href="/search">
            <Button variant="glass">
              <Search className="w-4 h-4" />
              {t('notfound.search')}
            </Button>
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}
