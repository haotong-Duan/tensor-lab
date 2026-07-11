import { ContentPage, Section, Callout, CodeBlock } from '@/components/content-page';
import { Math as MathExpr, BlockMath } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Tensor CUR / Sketch · Tensor Lab' };

export default function CURPage() {
  return (
    <ContentPage
      category="Tensor Decomposition"
      title="Tensor CUR & Sketch"
      subtitle="Data-aware decompositions that preserve the original entries"
      description="CUR uses a small number of actual rows, columns, and fibers of the tensor as the basis — preserving interpretability that random projections destroy."
      level="Advanced"
      readTime="~ 25 min"
      tags={['CUR', 'sketch', 'data-aware', 'interpretable', 'randomized']}
      prev={{ title: 't-SVD', href: '/decompositions/t-svd' }}
      next={{ title: 'PARATUCK', href: '/decompositions/paratuck' }}
    >
      <Section title="Idea">
        <p>
          Classical CP/Tucker factors are dense — every entry of the factor is a
          combination of all original entries. This destroys interpretability: a
          chemist asking "which molecules contribute most?" cannot answer.
        </p>
        <p>
          <strong>Tensor CUR</strong> selects a small set of <em>actual</em> rows,
          columns, and fibers (the "C", "U", and "R" of CUR) and uses them as the basis.
          Each factor remains interpretable.
        </p>
      </Section>

      <Section title="Selection by leverage scores">
        <p>
          For each fiber, compute its <strong>leverage score</strong> from the top
          left singular vectors of the mode-<MathExpr>{`n`}</MathExpr> unfolding.
          Sample fibers with probability proportional to leverage score squared.
        </p>
        <BlockMath>
          {`\\pi_i^{(n)} = \\frac{1}{R_n} \\sum_{r=1}^{R_n} (\\mathbf{U}_r^{(n)})_{i}^2`}
        </BlockMath>
      </Section>

      <Section title="The U join tensor">
        <p>
          After selecting the rows, columns, and fibers, we form the small{' '}
          <em>intersection tensor</em> and compute its pseudoinverse:
        </p>
        <BlockMath>
          {`\\mathcal{U} = \\mathcal{W}^\\dagger \\in \\mathbb{R}^{c \\times u \\times r}`}
        </BlockMath>
        <p>
          where <MathExpr>{`\\mathcal{W}`}</MathExpr> is the intersection of the
          selected rows, columns, and tubes.
        </p>
      </Section>

      <Section title="Tensor sketch: randomized version">
        <p>
          For very large tensors, sampling by leverage score is expensive. The{' '}
          <strong>tensor sketch</strong> replaces the sampling with a random linear
          sketch (CountSketch or Gaussian) of the mode-<MathExpr>{`n`}</MathExpr>{' '}
          unfolding, achieving a similar effect in near-linear time.
        </p>
      </Section>

      <Section title="Randomized Tucker">
        <p>
          For HOSVD on a huge tensor, we can avoid computing the full SVD by
          multiplying the mode-<MathExpr>{`n`}</MathExpr> unfolding with a random
          Gaussian <MathExpr>{`\\mathbf{\\Omega} \\in \\mathbb{R}^{I_n \\times (R_n + p)}`}</MathExpr>{' '}
          where <MathExpr>{`p`}</MathExpr> is a small oversampling parameter (e.g.
          10), then doing QR + SVD on the small resulting matrix.
        </p>
      </Section>

      <Section title="Python: leverage-score sampling">
        <CodeBlock language="python" filename="cur.py">{`import numpy as np
from tensorly.decomposition import tucker

def tensor_cur(X, ranks, oversample=10):
    """Data-aware Tucker via leverage-score sampling."""
    N = X.ndim
    indices = []
    factors = []

    for n in range(N):
        # Compute leading left singular vectors of mode-n unfolding
        unfolding = np.moveaxis(X, n, 0).reshape(X.shape[n], -1)
        U, S, Vt = np.linalg.svd(unfolding, full_matrices=False)
        Un = U[:, :ranks[n]]

        # Leverage scores
        lev = (Un ** 2).sum(axis=1)
        lev = lev / lev.sum()

        # Sample with replacement
        c = min(ranks[n] + oversample, X.shape[n])
        idx = np.random.choice(X.shape[n], size=c, replace=False, p=lev)
        indices.append(idx)

        # Selected fibers form the factor
        if n == 0:
            factors.append(Un[idx, :])
        else:
            factors.append(Un[idx, :])

    # Form core by contraction
    core = X.copy()
    for n, (idx, U) in enumerate(zip(indices, factors)):
        # Multiply mode n by U^T (left-inverse)
        Ut = np.linalg.pinv(U)
        # Apply to selected mode
        ...

    return core, factors, indices`}</CodeBlock>
      </Section>

      <Section title="References">
        <div className="space-y-2 not-prose">
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Tensor CUR</div>
            <div className="text-sm">
              Drineas, P. & Mahoney, M. W. (2007). <em>A randomized algorithm for a
              tensor-based generalization of the singular value decomposition.</em>{' '}
              Linear Algebra Appl., 420(2-3), 553-571.
            </div>
          </GlassCard>
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Randomized Tucker</div>
            <div className="text-sm">
              Halko, N., Martinsson, P.-G., & Tropp, J. A. (2011). <em>Finding structure
              with randomness.</em> SIAM Review, 53(2), 217-288.
            </div>
          </GlassCard>
        </div>
      </Section>
    </ContentPage>
  );
}
