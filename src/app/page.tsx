'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Atom,
  Sigma,
  Layers,
  Network,
  TrendingUp,
  Eye,
  FlaskConical,
  Code2,
  Brain,
  Cpu,
  Briefcase,
  BookOpen,
  Sparkles,
  GraduationCap,
  ChevronRight,
  Zap,
  Compass,
  FileText,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tensor3D } from '@/components/visualizations/tensor-3d';
import { CPDiagram, TuckerDiagram, TTDiagram, TRDiagram, MPSDiagram } from '@/components/visualizations/tensor-diagrams';
import { CPAnimation } from '@/components/visualizations/cp-animation';
import { useI18n } from '@/components/i18n';
import { learningPath } from '@/lib/navigation';
import { cn } from '@/lib/utils';

const modules = [
  {
    titleKey: 'module.tensor-basics',
    descKey: 'module.desc.tensor-basics',
    href: '/basics',
    icon: Atom,
    color: 'from-blue-500 to-indigo-500',
    countKey: 'module.count.lessons12',
  },
  {
    titleKey: 'module.tensor-algebra',
    descKey: 'module.desc.tensor-algebra',
    href: '/algebra',
    icon: Sigma,
    color: 'from-violet-500 to-purple-500',
    countKey: 'module.count.topics8',
  },
  {
    titleKey: 'module.tensor-decompositions',
    descKey: 'module.desc.tensor-decompositions',
    href: '/decompositions',
    icon: Layers,
    color: 'from-rose-500 to-pink-500',
    countKey: 'module.count.methods40',
    badge: 'Core',
  },
  {
    titleKey: 'module.tensor-networks',
    descKey: 'module.desc.tensor-networks',
    href: '/networks',
    icon: Network,
    color: 'from-amber-500 to-orange-500',
    countKey: 'module.count.structures15',
  },
  {
    titleKey: 'module.optimization',
    descKey: 'module.desc.optimization',
    href: '/optimization',
    icon: TrendingUp,
    color: 'from-emerald-500 to-teal-500',
    countKey: 'module.count.algorithms10',
  },
  {
    titleKey: 'module.visualization',
    descKey: 'module.desc.visualization',
    href: '/visualization',
    icon: Eye,
    color: 'from-cyan-500 to-blue-500',
    countKey: 'module.count.animations6',
  },
  {
    titleKey: 'module.playground',
    descKey: 'module.desc.playground',
    href: '/playground',
    icon: FlaskConical,
    color: 'from-fuchsia-500 to-pink-500',
    countKey: 'module.count.live',
    badge: 'Live',
  },
  {
    titleKey: 'module.code',
    descKey: 'module.desc.code',
    href: '/code',
    icon: Code2,
    color: 'from-lime-500 to-green-500',
    countKey: 'module.count.examples50',
  },
  {
    titleKey: 'module.applications',
    descKey: 'module.desc.applications',
    href: '/applications',
    icon: Briefcase,
    color: 'from-orange-500 to-red-500',
    countKey: 'module.count.cases15',
  },
  {
    titleKey: 'module.ai',
    descKey: 'module.desc.ai',
    href: '/ai',
    icon: Brain,
    color: 'from-indigo-500 to-violet-500',
    countKey: 'module.count.ai10',
    badge: 'New',
  },
  {
    titleKey: 'module.quantum',
    descKey: 'module.desc.quantum',
    href: '/quantum',
    icon: Cpu,
    color: 'from-purple-500 to-fuchsia-500',
    countKey: 'module.count.quantum12',
  },
  {
    titleKey: 'module.papers',
    descKey: 'module.desc.papers',
    href: '/papers',
    icon: FileText,
    color: 'from-pink-500 to-rose-500',
    countKey: 'module.count.refs500',
    badge: 'Hot',
  },
];

const featuredDecompositions = [
  { name: 'CP / PARAFAC', desc: 'Sum of rank-one tensors', href: '/decompositions/cp', diagram: <CPDiagram rank={3} /> },
  { name: 'Tucker / HOSVD', desc: 'Core × factor matrices', href: '/decompositions/tucker', diagram: <TuckerDiagram /> },
  { name: 'Tensor Train', desc: 'Linear chain of 3rd-order cores', href: '/decompositions/tt', diagram: <TTDiagram /> },
  { name: 'Tensor Ring', desc: 'Cyclic train topology', href: '/decompositions/tr', diagram: <TRDiagram /> },
  { name: 'MPS', desc: 'Matrix product state for quantum', href: '/decompositions/mps', diagram: <MPSDiagram /> },
];

export default function HomePage() {
  const { t } = useI18n();
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden mesh-bg">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="gradient" className="mb-6">
              <Sparkles className="w-3 h-3 mr-1" />
              {t('brand.hero.badge')}
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance leading-[1.05]">
              {t('brand.hero.title.line1')}{' '}
              <span className="text-gradient-blue">{t('brand.hero.title.line2')}</span>
              {t('brand.hero.title.line3') && (
                <>
                  <br />
                  {t('brand.hero.title.line3')}
                </>
              )}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              {t('brand.hero.subtitle')}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href="/decompositions">
                <Button size="lg" variant="primary">
                  {t('brand.hero.cta1')}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/playground">
                <Button size="lg" variant="glass">
                  <FlaskConical className="w-4 h-4" />
                  {t('brand.hero.cta2')}
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Hero 3D Tensor */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-16 flex justify-center"
          >
            <GlassCard hover={false} className="px-8 py-6" variant="elevated">
              <div className="flex flex-col items-center gap-3">
                <Tensor3D size={320} />
                <div className="text-xs text-muted-foreground">
                  {t('brand.hero.3d.caption')}
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { labelKey: 'brand.stats.decompositions', value: '40+' },
              { labelKey: 'brand.stats.animations', value: '60+' },
              { labelKey: 'brand.stats.examples', value: '200+' },
              { labelKey: 'brand.stats.papers', value: '500+' },
            ].map((stat) => (
              <GlassCard key={stat.labelKey} className="p-5 text-center" hover={false}>
                <div className="text-3xl font-bold text-gradient-blue">{stat.value}</div>
                <div className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">
                  {t(stat.labelKey)}
                </div>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Decompositions */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <Badge variant="outline" className="mb-3">Featured</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {t('brand.featured.title')}
            </h2>
            <p className="mt-2 text-muted-foreground max-w-xl">
              {t('brand.featured.subtitle')}
            </p>
          </div>
          <Link href="/decompositions" className="hidden md:block">
            <Button variant="ghost" size="sm">
              {t('brand.featured.all')}
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredDecompositions.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={d.href}>
                <GlassCard className="p-6 h-full group">
                  <div className="text-xs text-muted-foreground mb-1">{d.desc}</div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
                    {d.name}
                  </h3>
                  <div className="-mx-2">{d.diagram}</div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/decompositions">
              <GlassCard className="p-6 h-full flex flex-col items-center justify-center text-center group">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-violet-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">{t('brand.featured.all')}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('brand.featured.all.desc')}
                </p>
                <Button variant="ghost" size="sm" className="mt-4">
                  {t('common.explore')}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </GlassCard>
            </Link>
          </motion.div>
        </div>

        {/* Interactive CP demo */}
        <div className="mt-6">
          <CPAnimation />
        </div>
      </section>

      {/* Modules Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-3">Curriculum</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {t('brand.modules.title')}
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            {t('brand.modules.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {modules.map((m, i) => (
            <motion.div
              key={m.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link href={m.href}>
                <GlassCard className="p-5 h-full group relative overflow-hidden">
                  <div
                    className={cn(
                      'absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity bg-gradient-to-br',
                      m.color,
                    )}
                  />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className={cn(
                          'w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br text-white shadow-lg',
                          m.color,
                        )}
                      >
                        <m.icon className="w-5 h-5" />
                      </div>
                      {m.badge && (
                        <Badge variant={m.badge === 'Core' ? 'gradient' : m.badge === 'Live' ? 'hot' : 'new'}>
                          {m.badge}
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                      {t(m.titleKey)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(m.descKey)}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{t(m.countKey)}</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Learning Path */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-3">
            <Compass className="w-3 h-3 mr-1" />
            Learning Path
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {t('brand.path.title')}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t('brand.path.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {learningPath.map((p, i) => (
            <motion.div
              key={p.level}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={p.href}>
                <GlassCard className="p-6 text-center group" hover>
                  <div
                    className={cn(
                      'w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform',
                      p.color,
                    )}
                  >
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="font-semibold">
                    {i === 0 && t('level.beginner')}
                    {i === 1 && t('level.intermediate')}
                    {i === 2 && t('level.advanced')}
                    {i === 3 && t('level.research')}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {i === 0 && t('brand.path.beginner')}
                    {i === 1 && t('brand.path.intermediate')}
                    {i === 2 && t('brand.path.advanced')}
                    {i === 3 && t('brand.path.research')}
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Tensor Lab */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <GlassCard className="p-10 md:p-14" variant="elevated">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <Badge variant="gradient" className="mb-4">
                <Zap className="w-3 h-3 mr-1" />
                {t('brand.why.badge')}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                {t('brand.why.title')}
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {t('brand.why.body')}
              </p>
              <div className="mt-6 space-y-2">
                {[
                  t('brand.points.math'),
                  t('brand.points.realtime'),
                  t('brand.points.code'),
                  t('brand.points.domains'),
                ].map((point) => (
                  <div key={point} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {point}
                  </div>
                ))}
              </div>
              <Link href="/basics">
                <Button variant="primary" className="mt-6">
                  {t('brand.why.cta')}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-3">
                <GlassCard className="p-4 aspect-square flex flex-col items-center justify-center text-center" hover>
                  <Atom className="w-7 h-7 text-blue-500 mb-2" />
                  <div className="text-xs font-medium">{t('brand.why.math')}</div>
                  <div className="text-[10px] text-muted-foreground">{t('brand.why.math.desc')}</div>
                </GlassCard>
                <GlassCard className="p-4 aspect-square flex flex-col items-center justify-center text-center" hover>
                  <Eye className="w-7 h-7 text-violet-500 mb-2" />
                  <div className="text-xs font-medium">{t('brand.why.visual')}</div>
                  <div className="text-[10px] text-muted-foreground">{t('brand.why.visual.desc')}</div>
                </GlassCard>
                <GlassCard className="p-4 aspect-square flex flex-col items-center justify-center text-center" hover>
                  <Code2 className="w-7 h-7 text-emerald-500 mb-2" />
                  <div className="text-xs font-medium">{t('brand.why.code')}</div>
                  <div className="text-[10px] text-muted-foreground">{t('brand.why.code.desc')}</div>
                </GlassCard>
                <GlassCard className="p-4 aspect-square flex flex-col items-center justify-center text-center" hover>
                  <Brain className="w-7 h-7 text-rose-500 mb-2" />
                  <div className="text-xs font-medium">{t('brand.why.research')}</div>
                  <div className="text-[10px] text-muted-foreground">{t('brand.why.research.desc')}</div>
                </GlassCard>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      <footer className="border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-primary" />
            {t('brand.footer.tagline')}
          </div>
          <div className="text-xs text-muted-foreground">
            {t('brand.footer.note')}
          </div>
        </div>
      </footer>
    </div>
  );
}
