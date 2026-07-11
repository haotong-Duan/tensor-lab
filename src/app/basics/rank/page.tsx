'use client';

import { ContentPage, Section, BlockMath, Math as MathExpr, CodeBlock, Callout } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';
import { useI18n } from '@/components/i18n';

export default function RankPage() {
  const { t } = useI18n();
  return (
    <ContentPage
      category={t('module.tensor-basics')}
      title={t('rank.title')}
      subtitle={t('rank.subtitle')}
      description="Unlike matrix rank, tensor rank is NP-hard to compute in general and behaves quite differently. We cover the definitions, computation, and surprising properties."
      level="Intermediate"
      readTime="~ 15 min"
      tags={t('rank.tag').split(',')}
      prev={{ title: 'Slices', href: '/basics/slices' }}
      next={{ title: t('basics.topic.norm.title'), href: '/basics/norm' }}
    >
      <Section title="Definition">
        <p>
          A tensor has <strong>rank</strong> <MathExpr>{`R`}</MathExpr> if it can be
          written as a sum of <MathExpr>{`R`}</MathExpr> rank-1 tensors, and{' '}
          <MathExpr>{`R`}</MathExpr> is the smallest such number.
        </p>
        <BlockMath>
          {`\\text{rank}(\\mathcal{X}) = \\min \\left\\{ R \\,:\\, \\mathcal{X} = \\sum_{r=1}^{R} \\mathbf{a}_r^{(1)} \\circ \\cdots \\circ \\mathbf{a}_r^{(N)} \\right\\}`}
        </BlockMath>
      </Section>

      <Section title="Subtle properties">
        <Callout type="warning" title="Tensor rank is not what you'd expect">
          <ul>
            <li>It is <strong>NP-hard</strong> to compute in general (Hillar & Lim, 2013).</li>
            <li>The rank can be <em>strictly larger</em> than any matrix rank of its unfoldings.</li>
            <li>It is <em>not</em> upper-semicontinuous: arbitrarily small perturbations can increase rank.</li>
            <li>The set of rank-<MathExpr>{`R`}</MathExpr> tensors has measure zero for any fixed <MathExpr>{`R`}</MathExpr>.</li>
          </ul>
        </Callout>
      </Section>

      <Section title="Generic rank">
        <p>
          For an order-3 tensor with dimensions <MathExpr>{`I \\times J \\times K`}</MathExpr>{' '}
          (all equal), the <strong>generic</strong> rank — the rank of almost all tensors
          — is the smallest <MathExpr>{`R`}</MathExpr> such that the space of rank-<MathExpr>{`R`}</MathExpr> tensors has the same dimension as the ambient space:
        </p>
        <BlockMath>
          {`R(I, J, K)_{\\text{generic}} = \\left\\lceil \\frac{IJK}{I + J + K - 2} \\right\\rceil`}
        </BlockMath>
      </Section>

      <Section title="Border rank">
        <p>
          A tensor has <strong>border rank</strong> <MathExpr>{`\\underline{R}`}</MathExpr>{' '}
          if it is a limit of rank-<MathExpr>{`R`}</MathExpr> tensors, even if its
          own rank is <MathExpr>{`> R`}</MathExpr>. Border rank is upper-semicontinuous
          and easier to compute.
        </p>
      </Section>

      <Section title="Computation">
        <p>
          There is no closed-form algorithm for tensor rank. Practical approaches:
        </p>
        <ul>
          <li><strong>CP-ALS</strong>: try increasing ranks until the residual is small enough.</li>
          <li><strong>Greedy search</strong>: grow the rank one at a time.</li>
          <li><strong>Convex relaxations</strong>: nuclear-norm heuristics (mostly for symmetric tensors).</li>
        </ul>
      </Section>

      <Section title="Multilinear rank">
        <p>
          A related concept is the <strong>multilinear rank</strong>{' '}
          <MathExpr>{`(R_1, \\dots, R_N)`}</MathExpr>:
        </p>
        <BlockMath>
          {`R_n = \\text{rank}(\\mathcal{X}_{(n)})`}
        </BlockMath>
        <p>
          where <MathExpr>{`\\mathcal{X}_{(n)}`}</MathExpr> is the mode-<MathExpr>{`n`}</MathExpr> unfolding. Multilinear rank is well-defined, but is the rank
          of a Tucker decomposition, not CP.
        </p>
      </Section>

      <Section title="Python: checking tensor rank numerically">
        <CodeBlock language="python" filename="rank.py">{`import tensorly as tl
from tensorly.decomposition import parafac
import numpy as np

# Create a random tensor (likely full rank)
X = tl.tensor(np.random.rand(20, 30, 25))

# CP with increasing rank
for r in [5, 10, 20, 40, 80, 160, 320]:
    try:
        _, factors = parafac(X, rank=r, n_iter_max=200, tol=1e-6)
        X_hat = tl.cp_to_tensor((None, factors))
        err = tl.norm(X - X_hat, 2) / tl.norm(X, 2)
        print(f"R={r:4d}: rel error = {err:.4e}")
    except Exception as e:
        print(f"R={r}: failed ({e})")`}</CodeBlock>
      </Section>

      <Section title="References">
        <div className="space-y-2 not-prose">
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">NP-hardness</div>
            <div className="text-sm">
              Hillar, C. J. & Lim, L.-H. (2013). <em>Most tensor problems are
              NP-hard.</em> J. ACM, 60(6), 1-39.
            </div>
          </GlassCard>
        </div>
      </Section>
    </ContentPage>
  );
}
