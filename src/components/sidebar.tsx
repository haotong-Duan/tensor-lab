'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ChevronRight,
  Sparkles,
  Github,
  Twitter,
  Mail,
  BookOpen,
  Zap,
  Cpu,
} from 'lucide-react';
import { navigation, type NavItem } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';
import { LanguageSwitcher } from './language-switcher';
import { useI18n } from './i18n';

const AUTHOR = {
  github: 'https://github.com/haotong-Duan',
  email: '15102633721@163.com',
  twitter: 'dht768279750@gmail.com', // X / Twitter handle/email
};

function getModuleKey(href: string): string {
  // Map href to module.* key
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
  return map[href] ?? 'module.home';
}

function getModuleDescKey(href: string): string {
  const map: Record<string, string> = {
    '/': 'module.desc.home',
    '/basics': 'module.desc.tensor-basics',
    '/algebra': 'module.desc.tensor-algebra',
    '/decompositions': 'module.desc.tensor-decompositions',
    '/networks': 'module.desc.tensor-networks',
    '/optimization': 'module.desc.optimization',
    '/visualization': 'module.desc.visualization',
    '/playground': 'module.desc.playground',
    '/code': 'module.desc.code',
    '/ai': 'module.desc.ai',
    '/quantum': 'module.desc.quantum',
    '/applications': 'module.desc.applications',
    '/exercises': 'module.desc.exercises',
    '/resources': 'module.desc.resources',
    '/papers': 'module.desc.papers',
    '/search': 'module.desc.search',
    '/settings': 'module.desc.settings',
  };
  return map[href] ?? '';
}

export function Sidebar() {
  const pathname = usePathname();
  const { t, locale } = useI18n();
  const [search, setSearch] = React.useState('');
  const [openGroups, setOpenGroups] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    // Auto-open group if a child is active
    navigation.forEach((item) => {
      if (item.children?.some((c) => pathname === c.href || pathname.startsWith(c.href + '/'))) {
        setOpenGroups((prev) => new Set(prev).add(item.href));
      }
    });
  }, [pathname]);

  const filtered = React.useMemo(() => {
    if (!search) return navigation;
    const lower = search.toLowerCase();
    const filter = (items: NavItem[]): NavItem[] =>
      items
        .map((item) => {
          const translated = t(getModuleKey(item.href), item.title).toLowerCase();
          if (
            item.title.toLowerCase().includes(lower) ||
            translated.includes(lower) ||
            (item.description ?? '').toLowerCase().includes(lower)
          )
            return item;
          if (item.children) {
            const kids = filter(item.children);
            if (kids.length) return { ...item, children: kids };
          }
          return null;
        })
        .filter((x): x is NavItem => x !== null);
    return filter(navigation);
  }, [search, t, locale]);

  const toggle = (href: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(href)) next.delete(href);
      else next.add(href);
      return next;
    });
  };

  return (
    <aside className="hidden lg:flex flex-col w-72 h-screen sticky top-0 border-r border-border/40 bg-background/60 backdrop-blur-2xl">
      {/* Logo */}
      <div className="px-5 pt-6 pb-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-violet-500 blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <div className="font-semibold text-[15px] leading-tight tracking-tight">
              {t('brand.name')}
            </div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">
              {t('brand.tagline')}
            </div>
          </div>
        </Link>
      </div>

      {/* Search */}
      <div className="px-4 pb-3">
        <Link href="/search">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              data-search-input="true"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('nav.search.placeholder')}
              className="w-full h-9 pl-9 pr-12 text-sm rounded-xl bg-secondary/50 border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all"
            />
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:flex h-5 items-center gap-0.5 px-1.5 text-[10px] font-mono text-muted-foreground bg-background/80 border border-border/60 rounded">
              ⌘K
            </kbd>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 pb-6">
        <div className="space-y-0.5">
          {filtered.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href + '/')) ||
              item.children?.some((c) => pathname === c.href);
            const hasChildren = item.children && item.children.length > 0;
            const isOpen = openGroups.has(item.href) || !!search;
            const title = t(getModuleKey(item.href), item.title);

            return (
              <div key={item.href}>
                <div
                  className={cn(
                    'group flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm transition-all',
                    isActive
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-foreground/80 hover:bg-secondary/60 hover:text-foreground',
                  )}
                >
                  <item.icon
                    className={cn(
                      'w-4 h-4 shrink-0 transition-colors',
                      isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground',
                    )}
                  />
                  <Link href={item.href} className="flex-1 truncate">
                    {title}
                  </Link>
                  {item.badge && (
                    <span
                      className={cn(
                        'text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full',
                        item.badge === 'Core' && 'bg-primary/15 text-primary',
                        item.badge === 'Hot' && 'bg-rose-500/15 text-rose-600 dark:text-rose-400',
                        item.badge === 'New' && 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
                        item.badge === 'Live' && 'bg-violet-500/15 text-violet-600 dark:text-violet-400',
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                  {hasChildren && (
                    <button
                      onClick={() => toggle(item.href)}
                      className="p-0.5 rounded hover:bg-background/50"
                    >
                      <ChevronRight
                        className={cn(
                          'w-3.5 h-3.5 transition-transform text-muted-foreground',
                          isOpen && 'rotate-90',
                        )}
                      />
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {hasChildren && isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-4 mt-0.5 pl-3 border-l border-border/40 space-y-0.5">
                        {item.children!.map((child) => {
                          const childActive = pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                'flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] transition-all',
                                childActive
                                  ? 'bg-primary/10 text-primary font-medium'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40',
                              )}
                            >
                              <child.icon className="w-3.5 h-3.5" />
                              <span className="truncate">{child.title}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-border/40 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <a
            href={AUTHOR.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
          <a
            href={`https://x.com/${AUTHOR.twitter}`}
            target="_blank"
            rel="noreferrer"
            aria-label="X (Twitter)"
            className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <Twitter className="w-3.5 h-3.5" />
          </a>
          <a
            href={`mailto:${AUTHOR.email}`}
            aria-label="Email"
            className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
