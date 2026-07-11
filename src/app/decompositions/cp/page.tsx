'use client';

import { useState, useMemo, useEffect } from 'react';
import { ContentPage, Section, Callout, CodeBlock } from '@/components/content-page';
import { Math, BlockMath } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { CPDiagram } from '@/components/visualizations/tensor-diagrams';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Info, Cpu, BookOpen, Zap, History } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/components/i18n';

export default function CPPage() {
  const { t } = useI18n();
  const [rank, setRank] = useState(3);
  const [animating, setAnimating] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!animating) return;
    const t = setInterval(() => {
      setStep((s) => (s + 1) % (rank + 1));
    }, 800);
    return () => clearInterval(t);
  }, [animating, rank]);

  return (
    <ContentPage
      category="Tensor Decomposition"
      title="CP / CANDECOMP / PARAFAC"
      subtitle="Canonical Polyadic Decomposition"
      description="Express a tensor as a sum of R rank-one tensors. The simplest and most widely used tensor factorization, with deep uniqueness properties."
      level="Intermediate"
      readTime="~ 45 min"
      tags={['CP', 'CANDECOMP', 'PARAFAC', 'rank-1', 'ALS', 'uniqueness']}
      prev={{ title: 'All Decompositions', href: '/decompositions' }}
      next={{ title: 'Tucker & HOSVD', href: '/decompositions/tucker' }}
    >
      <Section title={t('cp.section.intuition')}>
        <p>
          {t('cp.intuition.p1')}
        </p>
        <p>
          {t('cp.intuition.p2')}
        </p>
        <BlockMath>
          {`\\mathcal{X} \\approx \\sum_{r=1}^{R} \\lambda_r \\, \\mathbf{a}_r \\circ \\mathbf{b}_r \\circ \\mathbf{c}_r`}
        </BlockMath>
        <p>
          where <Math>{`\\mathbf{a}_r \\in \\mathbb{R}^{I_1}, \\mathbf{b}_r \\in \\mathbb{R}^{I_2}, \\mathbf{c}_r \\in \\mathbb{R}^{I_3}`}</Math>{' '}
          {t('cp.scale.desc')}
        </p>
        <Callout type="tip" title={t('cp.callout.rankone')}>
          {t('cp.callout.rankone.body')}
        </Callout>
      </Section>

      <Section title={t('cp.section.visualization')}>
        <p>
          {t('cp.viz.caption')}
        </p>
        <div className="flex justify-center my-6">
          <GlassCard className="p-4" variant="elevated" hover={false}>
            <CPDiagram rank={3} />
          </GlassCard>
        </div>
      </Section>

      <Section title={t('cp.section.interactive')}>
        <p>
          {t('cp.interactive.p1')}
        </p>
        <div className="my-8 not-prose">
          <GlassCard className="p-6" variant="elevated" hover={false}>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 w-full">
                <CPDiagram rank={rank} />
              </div>
              <div className="w-full md:w-64 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Rank R</span>
                    <span className="text-2xl font-bold text-gradient-blue">{rank}</span>
                  </div>
                  <Slider
                    value={[rank]}
                    onValueChange={(v) => setRank(v[0])}
                    min={1}
                    max={8}
                    step={1}
                  />
                </div>
                <div className="pt-3 border-t border-border/40 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Parameters</span>
                    <span className="font-mono">{rank * (10 + 12 + 14)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reconstruction fit</span>
                    <span className="font-mono text-emerald-500">
                      {(100 * (1 - 0.6 ** rank)).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ALS iteration</span>
                    <span className="font-mono">{globalThis.Math.min(step, rank)} / {rank}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="glass"
                    onClick={() => setAnimating(!animating)}
                    className="flex-1"
                  >
                    {animating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    {animating ? 'Pause' : 'Run ALS'}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => { setStep(0); setAnimating(false); }}>
                    <RotateCcw className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </Section>

      <Section title={t('cp.section.matrix')}>
        <p>
          {t('cp.matrix.p1')}
        </p>
        <BlockMath>
          {`\\mathbf{A} = [\\mathbf{a}_1 \\, \\mathbf{a}_2 \\, \\cdots \\, \\mathbf{a}_R] \\in \\mathbb{R}^{I_1 \\times R}`}
        </BlockMath>
        <p>
          and similarly <Math>{`\\mathbf{B}, \\mathbf{C}`}</Math>. Element-wise, the model is:
        </p>
        <BlockMath>
          {`\\mathcal{X}_{ijk} \\approx \\sum_{r=1}^{R} \\lambda_r \\, A_{ir} B_{jr} C_{kr}`}
        </BlockMath>
        <p>
          or, in the Khatri-Rao form using <Math>{`\\mathbf{K} = \\mathbf{A} \\odot \\mathbf{B}`}</Math>:
        </p>
        <BlockMath>
          {`\\mathcal{X}_{(1)} \\approx \\mathbf{A} \\, \\mathbf{\\Lambda} \\, (\\mathbf{C} \\odot \\mathbf{B})^T`}
        </BlockMath>
        <p>
          where <Math>{`\\mathcal{X}_{(1)}`}</Math> is the mode-1 unfolding and{' '}
          <Math>{`\\mathbf{\\Lambda} = \\text{diag}(\\lambda_1, \\dots, \\lambda_R)`}</Math>.
        </p>
      </Section>

      <Section title={t('cp.section.why')}>
        <div className="grid md:grid-cols-3 gap-3 not-prose">
          <GlassCard className="p-5">
            <Zap className="w-5 h-5 text-blue-500 mb-2" />
            <div className="font-semibold mb-1">Uniqueness</div>
            <p className="text-sm text-muted-foreground">
              {t('cp.history.advantage')}
            </p>
          </GlassCard>
          <GlassCard className="p-5">
            <History className="w-5 h-5 text-violet-500 mb-2" />
            <div className="font-semibold mb-1">History</div>
            <p className="text-sm text-muted-foreground">
              Independently proposed by Hitchcock (1927), Carroll & Chang (CANDECOMP, 1970),
              and Harshman (PARAFAC, 1970).
            </p>
          </GlassCard>
          <GlassCard className="p-5">
            <Cpu className="w-5 h-5 text-emerald-500 mb-2" />
            <div className="font-semibold mb-1">Versatile</div>
            <p className="text-sm text-muted-foreground">
              Used in chemometrics, signal processing, recommender systems, neuroscience,
              and modern AI as a building block for tensorized networks.
            </p>
          </GlassCard>
        </div>
      </Section>

      <Section title={t('cp.section.als')}>
        <p>
          {t('cp.als.p1')}
        </p>
        <Callout type="definition" title="ALS update for A">
          With <Math>{`\\tilde{\\mathbf{X}}^{(1)} = \\mathcal{X}_{(1)}`}</Math>{' '}
          and the Khatri-Rao structure, the update for <Math>{`\\mathbf{A}`}</Math> is:
          <BlockMath>{`\\mathbf{A} \\leftarrow \\arg\\min_{\\mathbf{A}} \\left\\| \\tilde{\\mathbf{X}}^{(1)} - \\mathbf{A} \\, \\mathbf{\\Lambda} \\, (\\mathbf{C} \\odot \\mathbf{B})^T \\right\\|_F^2`}</BlockMath>
          which has the closed-form solution
          <BlockMath>{`\\mathbf{A} \\leftarrow \\tilde{\\mathbf{X}}^{(1)} \\, [(\\mathbf{C} \\odot \\mathbf{B}) \\, \\mathbf{\\Lambda}]^\\dagger`}</BlockMath>
          where <Math>{`\\dagger`}</Math> is the Moore-Penrose pseudoinverse. The columns of{' '}
          <Math>{`\\mathbf{A}`}</Math> are then normalized and the scale absorbed into{' '}
          <Math>{`\\mathbf{\\Lambda}`}</Math>.
        </Callout>
        <p>
          Repeat for <Math>{`\\mathbf{B}, \\mathbf{C}`}</Math> in turn, then iterate until
          convergence. Each ALS sweep is one pass through all modes.
        </p>
      </Section>

      <Section title={t('cp.section.complexity')}>
        <div className="grid md:grid-cols-2 gap-4 not-prose">
          <GlassCard className="p-5" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{t('cp.complexity.periter')}</div>
            <div className="font-mono text-sm space-y-1">
              <div>Time: <span className="text-blue-500">O(R² · ΠIₙ + R³ · ΣIₙ)</span></div>
              <div>Space: <span className="text-violet-500">O(R · ΣIₙ)</span></div>
            </div>
          </GlassCard>
          <GlassCard className="p-5" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">For Iₙ = I, order N</div>
            <div className="font-mono text-sm space-y-1">
              <div>Time: <span className="text-blue-500">O(R² · Iᴺ + R³ · N · I)</span></div>
              <div>Space: <span className="text-violet-500">O(R · N · I)</span></div>
            </div>
          </GlassCard>
        </div>
      </Section>

      <Section title={t('cp.section.python')}>
        <CodeBlock language="python" filename="cp_decomposition.py">{`import tensorly as tl
from tensorly.decomposition import parafac
import numpy as np

# Create a 3rd-order tensor with known CP structure
I1, I2, I3 = 30, 40, 20
R = 5  # true rank

# Random factors
A_true = np.random.randn(I1, R)
B_true = np.random.randn(I2, R)
C_true = np.random.randn(I3, R)

# Build tensor: X[i,j,k] = sum_r A[i,r] * B[j,r] * C[k,r]
X = tl.tensor(np.einsum('ir,jr,kr->ijk', A_true, B_true, C_true))

# CP decomposition via ALS (rank 5)
rank = 5
(cp_weights, cp_factors), errors = parafac(
    X, rank=rank, n_iter_max=100, tol=1e-8, return_errors=True
)

# cp_factors is a list: [A, B, C]
A, B, C = cp_factors

# Reconstruct
X_hat = tl.cp_to_tensor((cp_weights, cp_factors))

# Reconstruction error
err = tl.norm(X - X_hat, 2) / tl.norm(X, 2)
print(f"Relative error: {err:.2e}")
print(f"ALS iterations: {len(errors)}")
print(f"Final error:    {errors[-1]:.2e}")`}</CodeBlock>
      </Section>

      <Section title={t('cp.section.matlab')}>
        <CodeBlock language="matlab" filename="cp_decomposition.m">{`% Add Tensor Toolbox to path: addpath('tensor_toolbox')
rng(42);

I1 = 30; I2 = 40; I3 = 20; R = 5;

% Build ground-truth CP tensor
A_true = randn(I1, R);
B_true = randn(I2, R);
C_true = randn(I3, R);
X = ktensor({A_true, B_true, C_true});

% CP via Alternating Least Squares
[cp_result, ~, output] = cp_als(X.tensor, R, ...
    'maxiters', 100, ...
    'tol',      1e-8, ...
    'printitn', 10);

% Reconstruction error
X_hat = full(cp_result);
err = norm(X.tensor(:) - X_hat(:)) / norm(X.tensor(:));
fprintf('Relative error: %.2e\\n', err);
fprintf('ALS iterations: %d\\n', output.iter);
fprintf('Final fit:      %.4f\\n', output.fit);`}</CodeBlock>
      </Section>

      <Section title={t('cp.uniqueness.title')}>
        <Callout type="definition" title="Kruskal's condition">
          Let <Math>{`k_{\\mathbf{A}}`}</Math> denote the Kruskal rank (max number of
          columns that are linearly independent in every subset). If
          <BlockMath>
            {`k_{\\mathbf{A}} + k_{\\mathbf{B}} + k_{\\mathbf{C}} \\geq 2R + 2`}
          </BlockMath>
          then the CP decomposition of a 3rd-order tensor of rank <Math>{`R`}</Math> is
          unique up to permutation and scaling of the components.
        </Callout>
        <p>
          This is a remarkable property with no matrix analog: SVD is unique only after
          imposing orthogonality and sign conventions.
        </p>
      </Section>

      <Section title={t('cp.section.references')}>
        <div className="space-y-2 not-prose">
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Foundational</div>
            <div className="text-sm">
              Hitchcock, F. L. (1927). <em>The expression of a tensor or a polyadic as a sum
              of products.</em> Journal of Mathematics and Physics, 6(1-4), 164-189.
            </div>
          </GlassCard>
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Independent re-discovery</div>
            <div className="text-sm">
              Carroll, J. D. & Chang, J. J. (1970). <em>Analysis of individual differences
              in multidimensional scaling via an N-way generalization of "Eckart-Young"
              decomposition.</em> Psychometrika.
            </div>
          </GlassCard>
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">PARAFAC</div>
            <div className="text-sm">
              Harshman, R. A. (1970). <em>Foundations of the PARAFAC procedure.</em> UCLA
              Working Papers in Phonetics.
            </div>
          </GlassCard>
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Textbook</div>
            <div className="text-sm">
              Kolda, T. G. & Bader, B. W. (2009). <em>Tensor Decompositions and Applications.</em>{' '}
              SIAM Review, 51(3), 455-500. <span className="text-muted-foreground">— the canonical reference.</span>
            </div>
          </GlassCard>
        </div>
      </Section>
    </ContentPage>
  );
}
