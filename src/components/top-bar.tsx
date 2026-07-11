'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Search, Menu, Sparkles, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './theme-toggle';
import { useI18n } from './i18n';
import { Button } from './ui/button';
import { navigation } from '@/lib/navigation';
import { cn } from '@/lib/utils';

export function TopBar() {
  const pathname = usePathname();
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ⌘K / Ctrl+K to focus search
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const search = document.querySelector<HTMLInputElement>('input[data-search-input="true"]');
        search?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const breadcrumbs = React.useMemo(() => {
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length === 0) return [{ title: 'Home', href: '/' }];
    let acc: { title: string; href: string }[] = [{ title: 'Home', href: '/' }];
    let path = '';
    for (const part of parts) {
      path += `/${part}`;
      const item = navigation.find((n) => n.href === path);
      if (item) acc.push({ title: item.title, href: path });
      else {
        // Look in children
        for (const n of navigation) {
          const child = n.children?.find((c) => c.href === path);
          if (child) {
            acc.push({ title: n.title, href: n.href });
            acc.push({ title: child.title, href: path });
            break;
          }
        }
      }
    }
    return acc;
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-30 transition-all duration-300',
          scrolled
            ? 'bg-background/70 backdrop-blur-2xl border-b border-border/40'
            : 'bg-transparent',
        )}
      >
        <div className="flex items-center gap-3 px-4 lg:px-6 h-14">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-secondary"
            aria-label={t('nav.search.openMenu')}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumbs */}
          <nav className="hidden md:flex items-center gap-1.5 text-sm">
            {breadcrumbs.map((bc, i) => (
              <React.Fragment key={bc.href}>
                {i > 0 && (
                  <span className="text-muted-foreground/40">/</span>
                )}
                <Link
                  href={bc.href}
                  className={cn(
                    'transition-colors',
                    i === breadcrumbs.length - 1
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {bc.title}
                </Link>
              </React.Fragment>
            ))}
          </nav>

          <div className="flex-1" />

          {/* Quick search */}
          <Link href="/search" className="hidden md:block">
            <div className="flex items-center gap-2 h-9 px-3 text-sm rounded-xl bg-secondary/40 border border-border/40 hover:border-border transition-all text-muted-foreground hover:text-foreground">
              <Search className="w-3.5 h-3.5" />
              <span>{t('nav.search.placeholder.short')}</span>
              <kbd className="ml-2 h-5 px-1.5 flex items-center text-[10px] font-mono bg-background/80 border border-border/60 rounded">
                ⌘K
              </kbd>
            </div>
          </Link>

          <a
            href="https://github.com/haotong-Duan"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hidden sm:flex p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>

          <Link href="/playground">
            <Button variant="primary" size="sm" className="hidden sm:inline-flex">
              <Sparkles className="w-3.5 h-3.5" />
              {t('module.playground')}
            </Button>
          </Link>

          <ThemeToggle />
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-80 bg-background border-r border-border overflow-y-auto"
            >
              <div className="p-4">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="font-semibold">{t('brand.name')}</div>
                </div>
                <nav className="space-y-0.5">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    const map: Record<string, string> = {
                      '/': 'module.home',
                      '/basics': 'module.tensor-basics',
                      '/algebra': 'module.tensor-algebra',
                      '/decompositions': 'module.tensor-decompositions',
                      '/networks': 'module.tensor-networks',
                      '/optimization': 'module.optimization',
                      '/visualization': 'module.visualization',
                      '/playground': 'module.playground',
                      '/code': 'module.code',
                      '/ai': 'module.ai',
                      '/quantum': 'module.quantum',
                      '/applications': 'module.applications',
                      '/exercises': 'module.exercises',
                      '/resources': 'module.resources',
                      '/papers': 'module.papers',
                      '/search': 'module.search',
                      '/settings': 'module.settings',
                    };
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors',
                          isActive
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-foreground/80 hover:bg-secondary',
                        )}
                      >
                        <item.icon className="w-4 h-4" />
                        {t(map[item.href] ?? '', item.title)}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
