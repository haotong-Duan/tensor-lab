'use client';

import { ContentPage, Section } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';
import { Settings as SettingsIcon, Moon, Sun, Sparkles, Bell, Globe } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useI18n, type Locale } from '@/components/i18n';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const { t, locale, setLocale } = useI18n();
  return (
    <ContentPage category={t('module.settings')} title={t('settings.title')} subtitle={t('settings.subtitle')}>
      <Section title={t('settings.appearance')}>
        <GlassCard className="p-5 not-prose" hover={false}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Sun className="w-4 h-4 dark:hidden" />
              <Moon className="w-4 h-4 hidden dark:block" />
            </div>
            <div className="flex-1">
              <div className="font-medium">{t('settings.theme')}</div>
              <div className="text-sm text-muted-foreground">{t('settings.theme.desc')}</div>
            </div>
            <ThemeToggle />
          </div>
        </GlassCard>

        <GlassCard className="p-5 not-prose mt-3" hover={false}>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center mt-0.5">
              <Globe className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="font-medium">{t('settings.language')}</div>
              <div className="text-sm text-muted-foreground">{t('settings.language.desc')}</div>
              <div className="mt-3 flex gap-2">
                {(['en', 'zh'] as Locale[]).map((code) => (
                  <button
                    key={code}
                    onClick={() => setLocale(code)}
                    className={cn(
                      'px-3 py-1.5 text-sm rounded-lg border transition-colors',
                      locale === code
                        ? 'bg-primary/15 text-primary border-primary/30'
                        : 'bg-secondary/40 border-border hover:bg-secondary',
                    )}
                  >
                    {code === 'en' ? 'English' : '简体中文'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>
      </Section>

      <Section title={t('settings.about')}>
        <GlassCard className="p-5 not-prose" hover={false}>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('settings.version')}</span>
              <span className="font-mono">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('settings.builtWith')}</span>
              <span>Next.js, React, TypeScript, Tailwind, Framer Motion, KaTeX</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('settings.license')}</span>
              <span>© Tensor Lab</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Author</span>
              <a href="https://github.com/haotong-Duan" target="_blank" rel="noreferrer" className="text-primary hover:underline">
                haotong-Duan
              </a>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <a href="mailto:15102633721@163.com" className="text-primary hover:underline">15102633721@163.com</a>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">X</span>
              <a href="mailto:dht768279750@gmail.com" className="text-primary hover:underline">dht768279750@gmail.com</a>
            </div>
          </div>
        </GlassCard>
      </Section>
    </ContentPage>
  );
}
