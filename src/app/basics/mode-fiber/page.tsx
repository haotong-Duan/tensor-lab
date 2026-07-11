'use client';

import { useState } from 'react';
import { ContentPage, Section, Callout, CodeBlock } from '@/components/content-page';
import { Math, BlockMath } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Tensor3D } from '@/components/visualizations/tensor-3d';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useI18n } from '@/components/i18n';

export default function ModeFiberPage() {
  const { t, locale } = useI18n();
  const [highlightMode, setHighlightMode] = useState<number | null>(null);
  const [fiberIndex, setFiberIndex] = useState(2);

  return (
    <ContentPage
      category={t('module.tensor-basics')}
      level="Beginner"
      readTime="12 min"
      title={t('modefiber.title')}
      subtitle={t('modefiber.subtitle')}
      description={t('modefiber.description')}
      tags={t('modefiber.tag').split(',')}
      prev={{ title: t('tensor.title'), href: '/basics/tensor' }}
      next={{ title: t('basics.topic.rank.title'), href: '/basics/rank' }}
    >
      <Section title={t('modefiber.section.modes')}>
        <p>
          {t('modefiber.modes.p1')}
        </p>
        <BlockMath>
          {`\\mathcal{X} \\in \\mathbb{R}^{I_1 \\times I_2 \\times \\cdots \\times I_N}`}
        </BlockMath>
        <p>
          A <strong>mode-<Math>{`n`}</Math> fiber</strong> of{' '}
          <Math>{`\\mathcal{X}`}</Math> is the vector obtained by fixing every
          index except the <Math>{`n`}</Math>-th. It generalizes the matrix row
          (mode-1 fiber) and column (mode-2 fiber).
        </p>
      </Section>

      <Section title={t('modefiber.section.fibers')}>
        <p>For a 3rd-order tensor <Math>{`\\mathcal{X} \\in \\mathbb{R}^{I_1 \\times I_2 \\times I_3}`}</Math>:</p>
        <ul>
          <li>
            <strong>Mode-1 fiber</strong> (column fiber):{' '}
            {t('modefiber.fibers.mode1')}
          </li>
          <li>
            <strong>Mode-2 fiber</strong> (row fiber):{' '}
            {t('modefiber.fibers.mode2')}
          </li>
          <li>
            <strong>Mode-3 fiber</strong> (tube fiber):{' '}
            {t('modefiber.fibers.mode3')}
          </li>
        </ul>
      </Section>

      <Section title={t('modefiber.section.interactive')}>
        <p>
          Click a mode button to highlight a fiber. The cube below is a
          5×5×5 tensor. Try all three modes.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
          <GlassCard className="p-6" variant="elevated" hover={false}>
            <Tensor3D
              size={280}
              highlightMode={highlightMode}
              highlightFiber={highlightMode !== null ? { mode: highlightMode, index: fiberIndex } : null}
            />
          </GlassCard>
          <GlassCard className="p-6" variant="elevated" hover={false}>
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
              Controls
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-2">Mode</div>
                <div className="flex gap-2">
                  {[0, 1, 2].map((m) => (
                    <Button
                      key={m}
                      variant={highlightMode === m ? 'primary' : 'glass'}
                      size="sm"
                      onClick={() => setHighlightMode(highlightMode === m ? null : m)}
                    >
                      Mode {m + 1}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-2">
                  Fiber index: <span className="font-mono">{fiberIndex}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={4}
                  value={fiberIndex}
                  onChange={(e) => setFiberIndex(parseInt(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span key={i}>{i}</span>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-border/40 text-xs space-y-1.5 font-mono">
                <div className="text-muted-foreground">Highlighted entries form a</div>
                <div>
                  vector in <span className="text-blue-500">ℝ<sup>{highlightMode === null ? '?' : [5, 5, 5][highlightMode]}</sup></span>
                </div>
                <div className="text-muted-foreground pt-1">
                  {highlightMode === 0 && 'X[:, j, k] — varies along i'}
                  {highlightMode === 1 && 'X[i, :, k] — varies along j'}
                  {highlightMode === 2 && 'X[i, j, :] — varies along k'}
                  {highlightMode === null && 'Select a mode to begin'}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </Section>

      <Section title={t('modefiber.section.slices')}>
        <p>
          A <strong>slice</strong> is a 2-D sub-array obtained by fixing all but two
          indices. For an order-3 tensor, the three slices are:
        </p>
        <ul>
          <li>
            <strong>Horizontal slice</strong> (fix mode-3):{' '}
            <Math>{`\\mathcal{X}_{::k} \\in \\mathbb{R}^{I_1 \\times I_2}`}</Math>
          </li>
          <li>
            <strong>Lateral slice</strong> (fix mode-2):{' '}
            <Math>{`\\mathcal{X}_{:j:} \\in \\mathbb{R}^{I_1 \\times I_3}`}</Math>
          </li>
          <li>
            <strong>Frontal slice</strong> (fix mode-1):{' '}
            <Math>{`\\mathcal{X}_{i::} \\in \\mathbb{R}^{I_2 \\times I_3}`}</Math>
          </li>
        </ul>
      </Section>

      <Section title={t('modefiber.section.python')}>
        <CodeBlock language="python" filename="fibers.py">{`import numpy as np

X = np.random.rand(4, 5, 6)   # I1=4, I2=5, I3=6

# Mode-1 fiber (column fiber): fix j=2, k=3
col_fiber = X[:, 2, 3]               # shape (4,)

# Mode-2 fiber (row fiber): fix i=1, k=3
row_fiber = X[1, :, 3]               # shape (5,)

# Mode-3 fiber (tube fiber): fix i=1, j=2
tube_fiber = X[1, 2, :]              # shape (6,)

# Frontal slice (fix mode-1): matrix at i=1
frontal = X[1, :, :]                 # shape (5, 6)

# Lateral slice (fix mode-2)
lateral = X[:, 2, :]                 # shape (4, 6)

# Horizontal slice (fix mode-3)
horizontal = X[:, :, 3]              # shape (4, 5)`}</CodeBlock>
      </Section>

      <Section title={t('modefiber.section.why')}>
        <p>
          Every tensor decomposition can be described in terms of fibers and
          slices. CP factorizes a tensor into a sum of rank-1 terms (each a single
          outer product of <Math>{`N`}</Math> mode-<Math>{`n`}</Math> fibers).
          Tucker and HOSVD operate by aligning factor matrices with mode-1, …,
          mode-<Math>{`N`}</Math> unfoldings.
        </p>
      </Section>
    </ContentPage>
  );
}
